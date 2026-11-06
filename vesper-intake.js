"use strict";

const $ = selector => document.querySelector(selector);
const messages = $("#messages");
const product = $("#product");
const journeyState = $("#journeyState");
const journeyDetails = $("#journeyDetails");
const journeyFields = $("#journeyFields");
const journeyActions = $("#journeyActions");
const nameInput = $("#customerName");
const emailInput = $("#customerEmail");
const organisationInput = $("#customerOrganisation");
const desiredOutcomeInput = $("#desiredOutcome");
const neededByInput = $("#neededBy");
const workContextInput = $("#workContext");
const INTAKE_CONTRACT = "dio.vesper.public_intake.v1";
const messageInput = $("#message");
const filesInput = $("#files");
const fileCount = $("#fileCount");
const sendButton = $("#send");
const voiceButton = $("#voice");
const notice = $("#notice");
const routeState = $("#routeState");
const routeCandidates = $("#routeCandidates");
const vesperPortraitWrap = $("#vesperPortraitWrap");
const attachLabel = document.querySelector(".attach");

const params = new URLSearchParams(location.search);
const cfg = window.DIO_SITE_CONFIG || {};
const apiOrigin = (
  params.get("api") ||
  cfg.vesperPresenceApiOrigin ||
  "https://api.dioworkflows.co.za"
).replace(/\/+$/, "");
let conversationId = null;
let sessionToken = null;
let sessionReady = false;
let replyCursor = null;
let waitingForReply = false;
let mediaRecorder = null;
let mediaStream = null;
let voiceChunks = [];
let voiceRecording = false;
const renderedReplies = new Set();
const renderedJourneyActions = new Set();
let currentJourney = null;
const custodyKey = `dio.actual.vesper:${apiOrigin}`;
let sessionPromise = null;
let pendingSubmission = JSON.parse(sessionStorage.getItem(`${custodyKey}:pending`) || "null");
let productContextChanged = false;

function clearPending(){
  pendingSubmission = null;
  sessionStorage.removeItem(`${custodyKey}:pending`);
}
async function bindPending(path, body){
  const request = JSON.parse(body);
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body));
  const digest = [...new Uint8Array(bytes)].map(value=>value.toString(16).padStart(2,"0")).join("");
  if (pendingSubmission && (pendingSubmission.digest !== digest || pendingSubmission.path !== path)){
    throw new Error("An earlier submission is unresolved. Restore its original message and files before retrying.");
  }
  if (!pendingSubmission){
    const candidate = {id:crypto.randomUUID(), digest, path,
      message:request.message || "", hint:request.incarnation_hint || "",
      contextChanged:request.product_context_changed === true,
      contact:request.contact || {}, intakeContext:request.intake_context || {},
      hasBinary:Boolean(request.audio_b64 || request.attachments?.length), body};
    // Persist exact retry bytes before issuing the request. If tab storage is
    // full, no submission leaves the browser and custody remains unchanged.
    sessionStorage.setItem(`${custodyKey}:pending`, JSON.stringify(candidate));
    pendingSubmission = candidate;
  }
  return JSON.stringify({...request, client_message_id:pendingSubmission.id});
}

function endpoint(path){ return `${apiOrigin}${path}`; }
function sleep(ms){ return new Promise(resolve => setTimeout(resolve, ms)); }
function pulseVesper(duration = 1600){
  if (!vesperPortraitWrap) return;
  vesperPortraitWrap.classList.add("is-speaking");
  clearTimeout(pulseVesper.timer);
  pulseVesper.timer = setTimeout(() => vesperPortraitWrap.classList.remove("is-speaking"), duration);
}
function setNotice(text, error = false){
  notice.textContent = text;
  notice.classList.toggle("error", error);
}
function setRoute(text, ok = false){
  routeState.textContent = text;
  routeState.className = `state ${ok ? "ok" : "wait"}`;
}
function avatarNode(role){
  if (role === "customer") {
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "Y";
    return avatar;
  }
  const avatar = document.createElement("img");
  avatar.className = "avatar vesper-message-avatar";
  avatar.src = "assets/vesper-public.webp";
  avatar.alt = "Vesper";
  return avatar;
}
function appendMessage(role, text, metaText){
  const wrap = document.createElement("article");
  wrap.className = `msg ${role === "customer" ? "customer" : "vesper"}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.append(document.createTextNode(String(text ?? "")));
  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = metaText || (role === "customer" ? "You" : "Vesper · governed response");
  bubble.appendChild(meta);
  wrap.append(avatarNode(role), bubble);
  messages.appendChild(wrap);
  messages.scrollTop = messages.scrollHeight;
  return wrap;
}
function replyAudio(row){
  return row?.reply?.audio ?? row?.audio ?? null;
}

function attachReplyAudio(wrap, audio){
  if (!wrap || !audio) return;
  if (audio.state && audio.state !== "ready") return;
  if (!audio.content_b64 || !audio.mime_type) return;

  const binary = atob(audio.content_b64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  const url = URL.createObjectURL(
    new Blob([bytes], {type: audio.mime_type})
  );

  const player = document.createElement("audio");
  player.className = "reply-audio";
  player.controls = true;
  player.preload = "metadata";
  player.src = url;

  wrap.querySelector(".bubble")?.appendChild(player);

  player.play()
    .then(() => pulseVesper(2400))
    .catch(() => {});
}

function errorMessage(error){
  if (error?.status === 429) {
    return "Vesper's public API is temporarily rate-limited. Please retry shortly.";
  }
  if (error?.status === 403) return "This Vesper session was refused by the public origin gate.";
  return error?.message || "Vesper's public conversation rail is temporarily unavailable.";
}

// Coordinate custody renewal between tabs without replaying customer actions.
async function ensureVesperCustody() {
  if (!conversationId || !sessionToken) return;

  const sync = () => {
    let stored = null;
    try {
      stored = JSON.parse(localStorage.getItem(custodyKey) || "null");
    } catch {}

    if (stored?.conversationId === conversationId && stored.token) {
      sessionToken = stored.token;
      sessionStorage.setItem(custodyKey, JSON.stringify(stored));
    }
    return stored;
  };

  // The Web Locks API provides cross-tab mutual exclusion.
  // Without it, retain existing authentication but do not rotate
  // automatically, avoiding competing rotations.
  if (!navigator.locks?.request) {
    sync();
    return;
  }

  await navigator.locks.request(
    `dio-vesper-renew:${apiOrigin}:${conversationId}`,
    async () => {
      const stored = sync();
      const expiresAt = Number(stored?.expiresAt || 0);
      const issuedAt = Number(stored?.issuedAt || 0);

      // Prefer the server-provided expiry. Older sessions fall back
      // to the original 20-hour renewal threshold.
      const renewAt = expiresAt
        ? expiresAt - 4 * 60 * 60 * 1000
        : issuedAt
          ? issuedAt + 20 * 60 * 60 * 1000
          : 0;

      if (Date.now() < renewAt) return;

      const response = await fetch(
        endpoint("/api/vesper/web/session/renew"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Vesper-Session-Token": sessionToken
          },
          body: JSON.stringify({conversation_id: conversationId})
        }
      );

      if (!response.ok) {
        throw new Error(
          "This Vesper conversation could not be renewed. " +
          "Its history remains preserved; authenticated recovery " +
          "may be required."
        );
      }

      const body = await response.json();
      const next = body?.session;

      if (
        next?.conversation_id !== conversationId ||
        typeof next?.session_token !== "string" ||
        !next.session_token
      ) {
        throw new Error("Vesper renewal returned invalid custody.");
      }

      const expirySeconds = Number(next.expires_at);
      if (!Number.isFinite(expirySeconds) ||
          expirySeconds * 1000 <= Date.now()) {
        throw new Error("Vesper returned an invalid token expiry.");
      }

      const updated = {
        ...(stored?.conversationId === conversationId ? stored : {}),
        conversationId,
        token: next.session_token,
        issuedAt: Date.now(),
        expiresAt: expirySeconds * 1000
      };

      sessionToken = updated.token;
      localStorage.setItem(custodyKey, JSON.stringify(updated));
      sessionStorage.setItem(custodyKey, JSON.stringify(updated));
    }
  );
}

// Adopt newer credentials from another tab for the SAME conversation.
window.addEventListener("storage", (event) => {
  if (event.key !== custodyKey || !event.newValue) return;
  try {
    const updated = JSON.parse(event.newValue);
    if (
      updated.conversationId === conversationId &&
      updated.token
    ) {
      sessionToken = updated.token;
      sessionStorage.setItem(custodyKey, JSON.stringify(updated));
    }
  } catch {}
});

async function jsonRequest(path, options = {}, withSession = false){
  const submission = options.method === "POST" && ["/api/vesper/web/message", "/api/vesper/web/voice"].includes(path);
  if (submission) options = {...options, body:await bindPending(path, options.body)};
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  let response;
  if (withSession) {
    if (!sessionToken || !conversationId) {
      throw new Error("Authenticated Vesper session required.");
    }

    // Renewal takes the exclusive lock. Authenticated requests
    // take a shared lock, preventing rotation during a request.
    await ensureVesperCustody();

    const authenticatedFetch = async () => {
      // Refresh credentials after obtaining the shared lock.
      // Another tab may have renewed while this tab was waiting.
      let latest = null;
      try {
        latest = JSON.parse(localStorage.getItem(custodyKey) || "null");
      } catch {}

      if (latest?.conversationId === conversationId && latest.token) {
        sessionToken = latest.token;
        sessionStorage.setItem(custodyKey, JSON.stringify(latest));
      }

      headers.set("X-Vesper-Session-Token", sessionToken);
      return fetch(endpoint(path), {...options, headers});
    };

    if (navigator.locks?.request) {
      response = await navigator.locks.request(
        `dio-vesper-renew:${apiOrigin}:${conversationId}`,
        {mode: "shared"},
        authenticatedFetch
      );
    } else {
      response = await authenticatedFetch();
    }
  } else {
    response = await fetch(endpoint(path), {...options, headers});
  }
  const raw = await response.text();
  let body = {};
  if (raw) {
    try { body = JSON.parse(raw); }
    catch { body = {message: raw}; }
  }
  if (!response.ok) {
    if (submission && body.processing_state === "REJECTED_NO_CANONICAL_EFFECT") clearPending();
    const error = new Error(body.message || body.error || `HTTP ${response.status}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }
  if (submission && body.state === "completed"){
    clearPending();
    productContextChanged = false;
  }
  return body;
}
function sessionIdentifiers(body){
  const row = body.session || body;
  return {
    conversationId: row.conversation_id || body.conversation_id || row.id || null,
    token: row.session_token || row.token || body.session_token || body.token || null,
  };
}
function safeIncarnationHint(raw){
  const value = String(raw || "").trim();
  if (!value) return null;
  if (value.toLowerCase() === "vesper") return null;
  return value;
}

function journeyButton(label, action, ref, handler){
  const button=document.createElement("button"); button.type="button"; button.className="journey-action"; button.textContent=label;
  button.addEventListener("click",()=>handler(action,ref)); journeyActions.appendChild(button);
}
function renderJourney(journey){
  currentJourney=journey; journeyFields?.replaceChildren(); journeyActions?.replaceChildren(); journeyDetails?.replaceChildren();
  const view=journey?.view;
  if(!view){ if(journeyState) journeyState.textContent="A resolved request opens a case"; return; }
  const facts=view.facts||{}, intake=facts.intake||{}, quote=facts.quote||{}, order=facts.order||{}, settlement=facts.settlement||{}, fulfilment=facts.fulfilment||{}, delivery=facts.delivery||{}, communication=facts.communication||{};
  journeyState.textContent=`${view.stage.replaceAll("_"," ")} · ${view.product_id||"DIO service"}`;
  journeyState.className="state "+(["QUOTE_READY","PAYMENT_VERIFIED","WORK_QUEUED","PROCESSING","REVIEW_READY","DELIVERED","CLOSED"].includes(view.stage)?"ok":"wait");
  const detail=text=>{const row=document.createElement("div");row.textContent=text;journeyDetails.appendChild(row);};
  if(view.case_id) detail(`Customer case reference: ${view.case_id}`);
  if(communication.customer_id) detail(`Customer ID: ${communication.customer_id}`);
  else detail(`Customer identity: ${communication.customer_identity_state||"unverified"} · account ID not linked`);
  if(communication.contact_email) detail(`Email on this case: ${communication.contact_email}`);
  if(fulfilment.job_id) detail(`Job ID: ${fulfilment.job_id}`);
  else detail("Job ID: not assigned yet");
  const attachmentGroups=new Map();
  for(const attachment of facts.attachments||[]){const key=attachment.sha256||attachment.file_name||attachment.attachment_id;const group=attachmentGroups.get(key)||{attachment,count:0};group.count++;attachmentGroups.set(key,group);}
  for(const {attachment,count} of attachmentGroups.values()) detail(`Sample ${attachment.file_name||attachment.attachment_id}: ${attachment.state||"quarantined"}${count>1?` · ${count} identical upload records`:""} · not inspected`);
  if(intake.missing_input_ids?.length) detail(`Still needed: ${intake.missing_input_ids.join(", ")}`);
  const provided=intake.provided_inputs||{};
  if(Object.keys(provided).length){const unit=(intake.required_inputs||[]).find(row=>row.field_id==="scope_quantity")?.semantic_unit||"units";const parts=[];if(provided.scope_quantity)parts.push(`${provided.scope_quantity} ${unit}`);if(provided.buyer_class)parts.push(`buyer ${provided.buyer_class}`);if(provided.requested_outcome)parts.push(String(provided.requested_outcome));if(parts.length)detail(`Saved customer-stated scope: ${parts.join(" · ")}`);}
  if(facts.scope?.state) detail(`Scope: ${facts.scope.state.toLowerCase()}`);
  if(quote.quote_id){const row=document.createElement("div");row.className="journey-quote";row.textContent=`Quote ${quote.quote_id}: ${quote.currency||"ZAR"} ${quote.amount??"amount pending"} · presentation only`;journeyDetails.appendChild(row);}
  else if(quote.quote_request_id){const row=document.createElement("div");row.className="journey-quote";row.textContent=`Quote request ${quote.quote_request_id}: awaiting operator pricing review · no quotation issued`;journeyDetails.appendChild(row);}
  if(quote.reason) detail(`Quote review: ${String(quote.reason).replaceAll("_"," ")}`);
  if(order.invoice_id||order.invoice_state) detail(`Invoice: ${order.invoice_state||"not created"}${order.invoice_id?` · ${order.invoice_id}`:""}`);
  if(order.invoice_id&&order.invoice_state==="issued"){const button=document.createElement("button");button.type="button";button.className="journey-action";button.textContent="Open issued invoice";button.addEventListener("click",async()=>{button.disabled=true;try{const response=await fetch(endpoint(`/api/vesper/web/invoice?conversation_id=${encodeURIComponent(conversationId)}`),{headers:{"X-Vesper-Session-Token":sessionToken}});if(!response.ok)throw new Error("Invoice is unavailable");const blob=await response.blob(),url=URL.createObjectURL(blob);window.open(url,"_blank","noopener");setTimeout(()=>URL.revokeObjectURL(url),60000);}catch(error){setNotice(errorMessage(error),true);}finally{button.disabled=false;}});journeyActions.appendChild(button);}
  if(order.invoice_id&&order.invoice_state==="issued"){
    renderOrderCorrespondence();
  }
  if(order.payment_state) detail(`Payment: ${order.payment_state}${order.checkout_available?" · checkout link issued":""}`);
  if(order.operator_review_required) detail("Next step: operator pricing review is pending");
  if(settlement.settlement_class) detail(`Payment verification: ${settlement.settlement_class}`);
  if(fulfilment.state) detail(`Work: ${fulfilment.state}`);
  if(communication.outlook_draft_count||communication.outlook_sent_receipt_count) detail(`Email: ${communication.outlook_draft_count} draft(s), ${communication.outlook_sent_receipt_count} send receipt(s)`);
  if(delivery.delivery_receipt_id){detail(`Return pack: ${delivery.sent?"delivered":"prepared, not sent"}`);if(delivery.sent&&delivery.channel==="web_portal"){const button=document.createElement("button");button.type="button";button.className="journey-action";button.textContent="Download released return package";button.addEventListener("click",async()=>{button.disabled=true;try{const response=await fetch(endpoint(`/api/vesper/web/package?conversation_id=${encodeURIComponent(conversationId)}`),{headers:{"X-Vesper-Session-Token":sessionToken}});if(!response.ok)throw new Error("Released package is unavailable");const blob=await response.blob(),url=URL.createObjectURL(blob),anchor=document.createElement("a");anchor.href=url;anchor.download="DIO-return-package.zip";document.body.appendChild(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}catch(error){setNotice(errorMessage(error),true);}finally{button.disabled=false;}});journeyActions.appendChild(button);}}
  else if(facts.deliverables?.manifest_id) detail(`Return pack: ${facts.deliverables.artifact_count||0} item(s) · ${facts.deliverables.release_state||"awaiting release review"}`);
  if(!order.invoice_id&&!order.checkout_available) detail("Invoice and checkout: not issued · email sending: approval required");
  const actions=view.actions||[], get=id=>actions.find(row=>row.action_id===id);
  if(get("OPEN_INTAKE")&&(intake.missing_input_ids||[]).length) journeyButton("Complete missing order details","OPEN_INTAKE",get("OPEN_INTAKE").action_ref,submitJourneyAction);
  if(get("RECORD_INTAKE_INPUTS")){
    const missing=new Set(intake.missing_input_ids||[]), defs=(intake.required_inputs||[]).filter(row=>missing.has(row.field_id)), controls={};
    for(const field of defs){const wrap=document.createElement("div"),label=document.createElement("label");label.textContent=field.field_id==="requested_outcome"?(view.product_id==="Document Studio Edit"?"Describe deliverables, output formats, deadline and editing boundaries":"What outcome should this work produce?"):field.field_id==="buyer_class"?"Who is the work for?":`How many ${(field.semantic_unit||"units")+(String(field.semantic_unit||"units").endsWith("s")?"":"s")} are in scope?`;wrap.appendChild(label);let input;
      if(field.kind==="enum"){input=document.createElement("select");input.className="journey-input";const empty=document.createElement("option");empty.value="";empty.textContent="Choose one…";empty.selected=true;input.appendChild(empty);(field.allowed_values||[]).forEach((value,index)=>{const option=document.createElement("option");option.value=value;option.textContent=field.labels?.[index]||value;input.appendChild(option);});}
      else if(field.kind==="integer"){input=document.createElement("input");input.type="number";input.min=field.minimum||1;input.placeholder="Enter a whole number";input.className="journey-input";}
      else{input=document.createElement("textarea");input.rows=3;input.maxLength=4000;input.placeholder="Describe the result you need";input.className="journey-input";}
      wrap.appendChild(input);journeyFields.appendChild(wrap);controls[field.field_id]=input;}
    if(defs.length) journeyButton("Save order details","RECORD_INTAKE_INPUTS",get("RECORD_INTAKE_INPUTS").action_ref,async(a,ref)=>{const inputs={};for(const [key,control] of Object.entries(controls))inputs[key]=control.value.trim();await submitJourneyAction(a,ref,{inputs});});
  }
  if(get("ASSESS_SCOPE")&&!intake.missing_input_ids?.length) journeyButton("Review scope","ASSESS_SCOPE",get("ASSESS_SCOPE").action_ref,submitJourneyAction);
  if(get("PREPARE_QUOTE")&&(view.product_id!=="Document Studio Edit"||(facts.attachments||[]).length)) journeyButton("Prepare quote for operator review","PREPARE_QUOTE",get("PREPARE_QUOTE").action_ref,submitJourneyAction);
  else if(get("PREPARE_QUOTE")&&view.product_id==="Document Studio Edit") detail("Upload one sample before requesting quote review; the sample is held for operator clearance.");
  // Render the customer-facing action issued by the canonical journey. Never infer acceptance from quote text.
  if(get("ACCEPT_QUOTE")&&quote.quote_id&&quote.quote_truth_sha256&&get("ACCEPT_QUOTE").action_ref){
    journeyButton(`Accept quote ${quote.quote_id}`,"ACCEPT_QUOTE",get("ACCEPT_QUOTE").action_ref,async(action,actionRef)=>{
      const confirmed=window.confirm(`Accept exact quote ${quote.quote_id} for ${quote.currency||"ZAR"} ${quote.amount}?\n\nThis records your final order intake and may advance the invoice workflow.`);
      if(!confirmed)return;
      await submitJourneyAction(action,actionRef,{quote_id:quote.quote_id,quote_truth_sha256:quote.quote_truth_sha256});
    });
  }
  if(get("REQUEST_OPERATOR")) journeyButton(view.stage==="QUOTE_READY"?"Request invoice & payment follow-up":"Ask an operator to review", "REQUEST_OPERATOR", get("REQUEST_OPERATOR").action_ref, submitJourneyAction);
}
function renderOrderCorrespondence(){
  const wrap=document.createElement("section");wrap.className="journey-panel";
  const heading=document.createElement("strong");heading.textContent="Next: email your document bundle";wrap.appendChild(heading);
  const explanation=document.createElement("p");explanation.textContent="After opening your invoice, add your name and email, then approve order correspondence. DIO will prepare a secure invitation for operator-approved sending. Reply to that email with your DOCX bundle, or use its secure Vesper link. Payment and production remain held.";wrap.appendChild(explanation);
  const name=document.createElement("input");name.type="text";name.maxLength=140;name.placeholder="Contact name";name.required=true;name.className="journey-input";name.value=nameInput?.value||"";
  const mail=document.createElement("input");mail.type="email";mail.maxLength=254;mail.placeholder="Email address";mail.required=true;mail.className="journey-input";mail.value=emailInput?.value||"";
  const org=document.createElement("input");org.type="text";org.maxLength=140;org.placeholder="Organisation (optional)";org.className="journey-input";org.value=organisationInput?.value||"";
  const consentWrap=document.createElement("label");const consent=document.createElement("input");consent.type="checkbox";consentWrap.append(consent,document.createTextNode(" I consent to DIO using this email for correspondence about this order and its document submission."));
  const note=document.createElement("p");note.className="muted";
  const submit=document.createElement("button");submit.type="button";submit.className="journey-action";submit.textContent="Save contact & prepare email handoff";
  submit.addEventListener("click",async()=>{
    if(!name.value.trim()||!mail.validity.valid||!mail.value.trim()||!consent.checked){note.textContent="Enter your name and valid email, and tick correspondence consent.";return;}
    submit.disabled=true;
    try{
      const response=await jsonRequest("/api/vesper/web/order-contact",{method:"POST",body:JSON.stringify({conversation_id:conversationId,customer_name:name.value.trim(),customer_email:mail.value.trim(),organisation:org.value.trim(),consent:true})},true);
      note.textContent=`${response.state.replaceAll("_"," ")}. No email sent; operator approval required.`;
      await refreshOrderCorrespondenceStatus(note,submit);
    }catch(e){note.textContent=`Contact details could not be recorded: ${errorMessage(e)}`;submit.disabled=false;}
  });
  wrap.append(name,mail,org,consentWrap,submit,note);journeyFields.appendChild(wrap);
  refreshOrderCorrespondenceStatus(note,submit).catch(()=>{});
}
async function refreshOrderCorrespondenceStatus(note,submit){
  const result=await jsonRequest(`/api/vesper/web/order-contact?conversation_id=${encodeURIComponent(conversationId)}`,{method:"GET"},true);
  if(result.state==="AWAITING_ORDER_CONTACT")return;
  note.textContent=`Contact recorded (${result.customer_email||"email pending"}). ${String(result.state||"").replaceAll("_"," ")}. Email sending still requires operator approval.`;
  submit.disabled=true;
}

async function refreshJourney(){
  if(!conversationId||!sessionToken)return;
  const body=await jsonRequest(`/api/vesper/web/journey?conversation_id=${encodeURIComponent(conversationId)}`,{method:"GET"},true);
  renderJourney(body.journey);
}
async function submitJourneyAction(action,actionRef,payload={}){
  journeyActions?.querySelectorAll("button").forEach(button=>button.disabled=true);
  try{
    const body=await jsonRequest("/api/vesper/web/journey",{method:"POST",body:JSON.stringify({conversation_id:conversationId,action,action_ref:actionRef,payload})},true);
    const actionMessage=[...(body.session?.messages||[])].reverse().find(row=>row.journey_action_ref===actionRef);
    const messageKey=`${actionRef}:${actionMessage?.journey_payload_sha256||""}`;
    if(body.assistant_message&&!renderedJourneyActions.has(messageKey)){appendMessage("vesper",body.assistant_message);renderedJourneyActions.add(messageKey);}
    if(Number.isInteger(body.session?.messages?.length)){replyCursor=Math.max(Number(replyCursor)||0,body.session.messages.length);renderedReplies.add(String(body.session.messages.length));}
    renderJourney(body.journey);setNotice(`Order record updated: ${body.journey.view?.stage?.replaceAll("_"," ")||"active"}. No payment, email, or release was triggered.`);
  }catch(error){setNotice(`Order update needs attention: ${errorMessage(error)}`,true);await refreshJourney().catch(()=>{});}
}


function bindHint(){
  const hinted = safeIncarnationHint(
    params.get("incarnation")
    || params.get("product")
    || ""
  );
  if (!hinted) {
    routeCandidates.textContent = "General Vesper front door";
    return "";
  }
  if (![...product.options].some(option => option.value === hinted)) {
    const option = document.createElement("option");
    option.value = hinted;
    option.textContent = hinted;
    product.appendChild(option);
  }
  product.value = hinted;
  routeCandidates.textContent = `Bound context: ${hinted}`;
  return hinted;
}
async function startSession(){
  if (sessionReady) return true;
  if (sessionPromise) return sessionPromise;
  sessionPromise = bindSession();
  try { return await sessionPromise; }
  finally { sessionPromise = null; }
}

async function redeemEmailResumeInvitation(){
  const fragment = new URLSearchParams(location.hash.slice(1));
  const invitation = fragment.get("resume");
  if (!invitation) return;

  history.replaceState(null, "", location.pathname + location.search);

  if (!/^[A-Za-z0-9_-]{40,64}$/.test(invitation))
    throw new Error("Invalid Vesper invitation.");

  const result = await jsonRequest(
    "/api/vesper/web/session/resume",
    {
      method: "POST",
      body: JSON.stringify({invitation_token: invitation})
    },
    false
  );

  const session = result?.session;
  if (!session?.conversation_id || !session?.session_token)
    throw new Error("Authenticated resume was not established.");

  const expirySeconds = Number(session.expires_at);
  if (!Number.isFinite(expirySeconds) ||
      expirySeconds * 1000 <= Date.now())
    throw new Error("Vesper returned an invalid resume expiry.");

  const restored = {
    conversationId: session.conversation_id,
    token: session.session_token,
    issuedAt: Date.now(),
    expiresAt: expirySeconds * 1000
  };

  // Both stores must agree before authenticated restoration.
  // Existing cross-tab renewal reads localStorage first.
  localStorage.setItem(custodyKey, JSON.stringify(restored));
  sessionStorage.setItem(custodyKey, JSON.stringify(restored));
}

async function bindSession(){
  await redeemEmailResumeInvitation();
  // Prefer the current tab's custody, then the same-browser
  // persistent custody. Never resume using an ID without its token.
  const savedRaw = sessionStorage.getItem(custodyKey)
    || localStorage.getItem(custodyKey);
  const saved = savedRaw ? JSON.parse(savedRaw) : null;
  if (saved){
    if (!saved.conversationId || !saved.token)
      throw new Error("Saved conversation custody is incomplete.");
    conversationId = saved.conversationId;
    sessionToken = saved.token;
    const body = await jsonRequest(`/api/vesper/web/session?conversation_id=${encodeURIComponent(conversationId)}`, {method:"GET"}, true);
    const session = body.session;
    if (!session || session.conversation_id !== conversationId) throw new Error("The earlier conversation needs reconciliation.");
    messages.replaceChildren();
    for (const row of (session.messages || []).slice(1)) appendMessage(row.role === "customer" ? "customer" : "vesper", row.text);
    if (session.contact) {
      if (nameInput) nameInput.value = session.contact.name || "";
      if (emailInput) emailInput.value = session.contact.email || "";
      if (organisationInput) organisationInput.value = session.contact.organisation || "";
    }
    const lastCustomerMessage = [...(session.messages || [])].reverse().find(row => row.role === "customer");
    const savedContext = lastCustomerMessage?.intake_context || {};
    if (desiredOutcomeInput) desiredOutcomeInput.value = savedContext.desired_outcome || "";
    if (neededByInput) neededByInput.value = savedContext.needed_by || "";
    if (workContextInput) workContextInput.value = savedContext.work_context || "";
    replyCursor = (session.messages || []).length;
    if (pendingSubmission){
      const recovered = (body.replies || []).some(row=>String(row.source_message_id || "").endsWith(`:${pendingSubmission.id}`));
      if (recovered){ clearPending(); messageInput.value = ""; }
      else {
        messageInput.value = pendingSubmission.message;
        product.value = pendingSubmission.hint;
        if (pendingSubmission.contact) {
          if (nameInput) nameInput.value = pendingSubmission.contact.name || "";
          if (emailInput) emailInput.value = pendingSubmission.contact.email || "";
          if (organisationInput) organisationInput.value = pendingSubmission.contact.organisation || "";
        }
        if (pendingSubmission.intakeContext) {
          if (desiredOutcomeInput) desiredOutcomeInput.value = pendingSubmission.intakeContext.desired_outcome || "";
          if (neededByInput) neededByInput.value = pendingSubmission.intakeContext.needed_by || "";
          if (workContextInput) workContextInput.value = pendingSubmission.intakeContext.work_context || "";
        }
        productContextChanged = pendingSubmission.contextChanged;
        setNotice(pendingSubmission.hasBinary ? "An earlier submission is unresolved. Press Send to retry its original audio or file." : "An earlier submission is unresolved. Retry its original message.");
      }
    }
    // Persist only AFTER the server authenticates this session.
    // A successful authenticated GET may already have renewed
    // custody. Never overwrite that new token with the stale saved one.
    const latest = JSON.parse(localStorage.getItem(custodyKey) || "null");
    const restored = (
      latest?.conversationId === conversationId &&
      latest.token === sessionToken
    ) ? latest : {...saved, token: sessionToken};
    sessionStorage.setItem(custodyKey, JSON.stringify(restored));
    localStorage.setItem(custodyKey, JSON.stringify(restored));
    sessionReady = true;
    setRoute("Conversation restored", true);
    await refreshJourney();
    return true;
  }
  if (pendingSubmission) throw new Error("The earlier submission needs its original conversation restored.");
  const body = await jsonRequest(
    "/api/vesper/web/session",
    {method:"POST", body:JSON.stringify({
      intake_contract: INTAKE_CONTRACT, operation: "open_session",
      surface: bindHint() ? "product_site" : "dio_web",
      incarnation_hint: safeIncarnationHint(product.value),
      contact: {name:nameInput?.value || "", email:emailInput?.value || "", organisation:organisationInput?.value || ""},
    })},
    false,
  );
  const ids = sessionIdentifiers(body);
  ids.issuedAt = Date.now();
  if (!ids.conversationId || !ids.token) throw new Error("Vesper session response did not include conversation custody credentials.");
  conversationId = ids.conversationId;
  sessionToken = ids.token;
  sessionStorage.setItem(custodyKey, JSON.stringify(ids));
  localStorage.setItem(custodyKey, JSON.stringify(ids));
  sessionReady = true;
  setRoute("Conversation bound", true);
  setNotice("Vesper is ready. Text conversation is bound to the governed public rail.");
  await refreshJourney();
  return true;
}
function replyRows(body){
  if (Array.isArray(body)) return body;
  return body.replies || body.items || body.results || [];
}
function replyText(row){
  return row?.reply?.text ?? row?.text ?? row?.message?.text ?? null;
}
function replyKey(row, text){
  return String(row?.sequence ?? row?.id ?? row?.reply_id ?? `${row?.created_at || ""}:${text}`);
}
function advanceCursor(body, rows){
  if (body && body.next_after !== undefined && body.next_after !== null) return body.next_after;
  const last = rows.at(-1);
  return last?.sequence ?? last?.id ?? last?.reply_id ?? replyCursor;
}
async function pollForReply(){
  if (waitingForReply) return;
  waitingForReply = true;
  try {
    for (let attempt = 0; attempt < 24; attempt += 1) {
      const query = new URLSearchParams({conversation_id: conversationId});
      if (replyCursor !== null && replyCursor !== undefined) query.set("after", String(replyCursor));
      const body = await jsonRequest(`/api/vesper/web/replies?${query.toString()}`, {method:"GET"}, true);
      const rows = replyRows(body);
      let rendered = 0;
      for (const row of rows) {
        const text = replyText(row);
        if (!text) continue;
        const key = replyKey(row, text);
        if (renderedReplies.has(key)) continue;
        renderedReplies.add(key);
        const wrap = appendMessage(
          "vesper",
          text,
          "Vesper · governed response"
        );
        attachReplyAudio(
          wrap,
          replyAudio(row),
        );
        rendered += 1;
      }
      replyCursor = advanceCursor(body, rows);
      if (rendered) {
        pulseVesper();
        setRoute("Vesper replied", true);
        setNotice("Reply received through the governed Vesper public rail.");
        await refreshJourney();
        return;
      }
      await sleep(2000);
    }
    setRoute("Reply pending", false);
    setNotice("Your message is bound and queued. Vesper has not produced a public reply yet.");
  } finally {
    waitingForReply = false;
  }
}
const MAX_WEB_ATTACHMENT_BYTES = 2097152;

async function selectedWebAttachment(){
  const file = filesInput?.files?.[0] || null;

  if (!file) return null;

  if (filesInput.files.length > 1) {
    throw new Error(
      "Vesper accepts one attachment per message."
    );
  }

  if (
    file.size <= 0
    || file.size > MAX_WEB_ATTACHMENT_BYTES
  ) {
    throw new Error(
      "Attachment must be between 1 byte and 2 MiB."
    );
  }

  const bytes = new Uint8Array(
    await file.arrayBuffer()
  );

  return {
    file_name: file.name,
    mime_type:
      file.type || "application/octet-stream",
    content_b64: bytesToBase64(bytes),
  };
}

async function send(){
  if (pendingSubmission?.hasBinary && pendingSubmission.body){
    sendButton.disabled = true;
    try {
      await startSession();
      // Session recovery may already prove this exact request completed.
      if (pendingSubmission){
        const {path, body} = pendingSubmission;
        const original = JSON.parse(body);
        const retryBody = JSON.stringify({...original, client_message_id:pendingSubmission.id});
        await jsonRequest(path, {method:"POST", body:retryBody}, true);
        messageInput.value = "";
        if (filesInput) filesInput.value = "";
        setNotice("Original submission accepted. Waiting for Vesper…");
        await pollForReply();
      }
    } catch (error) {
      setNotice(`${errorMessage(error)} Press Send to retry the original submission.`, true);
    } finally {
      sendButton.disabled = false;
    }
    return;
  }
  const text = messageInput.value.trim();
  const selectedFile =
    filesInput?.files?.[0] || null;

  if (!text && !selectedFile) return;

  sendButton.disabled = true;
  messageInput.disabled = true;
  if (filesInput) filesInput.disabled = true;
  setNotice("Binding your message to Vesper…");
  try {
    await startSession();

    const attachment =
      await selectedWebAttachment();

    appendMessage(
      "customer",
      text || `Attached ${attachment.file_name}`,
      attachment
        ? `You · ${attachment.file_name} · submitted`
        : "You · submitted"
    );

    const incarnationHint = safeIncarnationHint(
      product.value
      || params.get("incarnation")
      || params.get("product")
      || null
    );
    await jsonRequest(
      "/api/vesper/web/message",
      {
        method:"POST",
        body:JSON.stringify({
          intake_contract: INTAKE_CONTRACT, operation: "submit_message",
          conversation_id: conversationId,
          message: text,
          attachments:
            attachment ? [attachment] : [],
          contact: {name:nameInput?.value || "", email:emailInput?.value || "", organisation:organisationInput?.value || ""},
          intake_context: {desired_outcome:desiredOutcomeInput?.value || "", needed_by:neededByInput?.value || "", work_context:workContextInput?.value || ""},
          incarnation_hint: incarnationHint,
          product_context_changed: productContextChanged,
        }),
      },
      true,
    );
    messageInput.value = "";

    if (filesInput) {
      filesInput.value = "";
    }

    if (fileCount) {
      fileCount.textContent =
        "One file · max 2 MiB · quarantine only";
    }

    setRoute("Message accepted", true);
    setNotice("Message accepted. Waiting for Vesper's governed reply…");
    await pollForReply();
  } catch (error) {
    console.warn("Vesper public web route unavailable", error);
    setRoute(error?.status === 429 ? "API rate limit" : "Conversation unavailable", false);
    setNotice(errorMessage(error), true);
  } finally {
    sendButton.disabled = false;
    messageInput.disabled = false;
    if (filesInput) filesInput.disabled = false;
    messageInput.focus();
  }
}

if (filesInput) {
  filesInput.disabled = false;

  filesInput.addEventListener("change", () => {
    const file = filesInput.files?.[0];

    if (!file) {
      fileCount.textContent =
        "One file · max 2 MiB · quarantine only";
      return;
    }

    const sizeKiB = Math.ceil(file.size / 1024);

    fileCount.textContent =
      `${file.name} · ${sizeKiB} KiB · quarantine only`;
  });
}

if (attachLabel) {
  attachLabel.classList.remove("is-disabled");
}

if (fileCount) {
  fileCount.textContent =
    "One file · max 2 MiB · quarantine only";
}

bindHint();

function preferredVoiceMime(){
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
    "audio/ogg",
  ];

  return candidates.find(
    type => MediaRecorder.isTypeSupported(type)
  ) || "";
}

function bytesToBase64(bytes){
  let binary = "";
  const chunkSize = 0x8000;

  for (
    let offset = 0;
    offset < bytes.length;
    offset += chunkSize
  ) {
    binary += String.fromCharCode(
      ...bytes.subarray(
        offset,
        offset + chunkSize,
      )
    );
  }

  return btoa(binary);
}

async function submitVoiceBlob(blob){
  if (!blob?.size) {
    throw new Error(
      "No voice audio was captured."
    );
  }

  if (blob.size > 2 * 1024 * 1024) {
    throw new Error(
      "Voice note is too large. Please keep it shorter."
    );
  }

  await startSession();

  const bytes = new Uint8Array(
    await blob.arrayBuffer()
  );

  const incarnationHint = safeIncarnationHint(
    product.value
    || params.get("incarnation")
    || params.get("product")
    || null
  );

  // Capture only the DOM nodes created by this specific voice turn.
  const existingVoiceMessageNodes = new Set(messages.children);
  appendMessage(
    "customer",
    "🎙 Voice message",
    "You · voice submitted"
  );
  const thisVoiceMessageNodes = [...messages.children].filter(
    node => !existingVoiceMessageNodes.has(node)
  );

  const voiceSubmission = await jsonRequest(
    "/api/vesper/web/voice",
    {
      method: "POST",
      body: JSON.stringify({
        intake_contract: INTAKE_CONTRACT, operation: "submit_voice",
        conversation_id: conversationId,
        audio_b64: bytesToBase64(bytes),
        mime_type:
          (blob.type || "audio/webm")
            .split(";", 1)[0],
        incarnation_hint: incarnationHint,
        contact: {name:nameInput?.value || "", email:emailInput?.value || "", organisation:organisationInput?.value || ""},
        intake_context: {desired_outcome:desiredOutcomeInput?.value || "", needed_by:neededByInput?.value || "", work_context:workContextInput?.value || ""},
        product_context_changed: productContextChanged,
      }),
    },
    true,
  );

  setRoute(
    "Voice accepted",
    true,
  );

  setNotice(
    "Voice accepted. Waiting for Vesper's governed reply…"
  );

  // The server returns the transcript only after canonical persistence.
  // Replace the temporary voice bubble without changing the saved record.
  const recognizedVoiceText =
    typeof voiceSubmission?.transcript === "string"
      ? voiceSubmission.transcript.trim()
      : "";

  if (recognizedVoiceText) {
    const matches = [];
    for (const container of thisVoiceMessageNodes) {
      if (!messages.contains(container)) continue;
      const walker = document.createTreeWalker(
        container, NodeFilter.SHOW_TEXT
      );
      let node;
      while ((node = walker.nextNode())) {
        if (node.textContent.trim() === "🎙 Voice message") {
          matches.push(node);
        }
      }
    }
    if (matches.length === 1) {
      matches[0].textContent = recognizedVoiceText;
    } else {
      // A concurrent voice turn must never receive this transcript.
      // The saved canonical session remains authoritative.
      console.warn(
        "Voice transcript persisted; unique placeholder not found"
      );
    }
  }

  await pollForReply();
}

async function toggleVoiceRecording(){
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    setNotice("Voice capture is not supported by this browser.", true);
    return;
  }

  if (voiceRecording) {
    voiceRecording = false;
    voiceButton.disabled = true;
    voiceButton.classList.remove("is-recording");
    voiceButton.setAttribute("aria-pressed", "false");
    voiceButton.textContent = "🎙 Talk to Vesper";
    setNotice("Vesper is listening…");
    mediaRecorder.stop();
    return;
  }

  try {
    await startSession();

    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const mime = preferredVoiceMime();

    mediaRecorder = new MediaRecorder(
      mediaStream,
      mime ? {mimeType: mime} : undefined
    );

    voiceChunks = [];

    mediaRecorder.ondataavailable = event => {
      if (event.data?.size) voiceChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const type =
        mediaRecorder?.mimeType
        || voiceChunks[0]?.type
        || "audio/webm";

      const blob = new Blob(
        voiceChunks,
        {type}
      );

      for (const track of mediaStream?.getTracks() || []) {
        track.stop();
      }

      mediaStream = null;
      mediaRecorder = null;
      voiceChunks = [];

      try {
        await submitVoiceBlob(blob);
      } catch (error) {
        console.warn(
          "Vesper web voice submission failed",
          error
        );
        setRoute("Voice unavailable", false);
        setNotice(errorMessage(error), true);
      } finally {
        voiceButton.disabled = false;
      }
    };

    mediaRecorder.start();
    voiceRecording = true;

    voiceButton.classList.add("is-recording");
    voiceButton.setAttribute("aria-pressed", "true");
    voiceButton.textContent = "■ Stop";

    setRoute("Listening", true);
    setNotice(
      "Vesper is listening. Tap Stop when finished."
    );
  } catch (error) {
    console.warn(
      "Vesper microphone unavailable",
      error
    );

    for (const track of mediaStream?.getTracks() || []) {
      track.stop();
    }

    mediaStream = null;
    mediaRecorder = null;
    voiceChunks = [];
    voiceRecording = false;

    voiceButton.classList.remove("is-recording");
    voiceButton.setAttribute("aria-pressed", "false");
    voiceButton.textContent = "🎙 Talk to Vesper";
    voiceButton.disabled = false;

    setRoute("Microphone unavailable", false);
    setNotice(
      "Microphone access was refused or unavailable.",
      true
    );
  }
}

sendButton.addEventListener("click", send);

if (voiceButton) {
  voiceButton.addEventListener(
    "click",
    toggleVoiceRecording
  );
}
messageInput.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    send();
  }
});
product.addEventListener("change", () => {
  productContextChanged = true;
  if (sessionReady) setNotice("Product context changed. The next message will carry the new incarnation hint.");
});

(async () => {
  try { await startSession(); }
  catch (error) {
    console.warn("Vesper initial public session unavailable", error);
    setRoute(error?.status === 429 ? "API rate limit" : "Awaiting connection", false);
    setNotice(errorMessage(error), true);
    sendButton.disabled = false;
  }
})();

