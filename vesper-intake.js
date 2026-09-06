"use strict";

const $ = selector => document.querySelector(selector);
const messages = $("#messages");
const product = $("#product");
const messageInput = $("#message");
const filesInput = $("#files");
const fileCount = $("#fileCount");
const sendButton = $("#send");
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
  "https://dio-presence-gateway-public.dio-workflows.workers.dev"
).replace(/\/+$/, "");
const messageMode = "text";

let conversationId = null;
let sessionToken = null;
let sessionReady = false;
let replyCursor = null;
let waitingForReply = false;
const renderedReplies = new Set();

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
function errorMessage(error){
  if (error?.status === 429) {
    return "Vesper's public edge is temporarily rate-limited by Cloudflare. The conversation rail is deployed; retry when the request window reopens.";
  }
  if (error?.status === 403) return "This Vesper session was refused by the public origin gate.";
  return error?.message || "Vesper's public conversation rail is temporarily unavailable.";
}
async function jsonRequest(path, options = {}, withSession = false){
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (withSession && sessionToken) headers.set("X-Vesper-Session-Token", sessionToken);
  const response = await fetch(endpoint(path), {...options, headers});
  const raw = await response.text();
  let body = {};
  if (raw) {
    try { body = JSON.parse(raw); }
    catch { body = {message: raw}; }
  }
  if (!response.ok) {
    const error = new Error(body.message || body.error || `HTTP ${response.status}`);
    error.status = response.status;
    error.body = body;
    throw error;
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
function bindHint(){
  const hinted = params.get("incarnation") || params.get("product") || "";
  if (!hinted) return "";
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
  const body = await jsonRequest(
    "/api/vesper/web/session",
    {method:"POST", body:JSON.stringify({surface:"dio_web"})},
    false,
  );
  const ids = sessionIdentifiers(body);
  if (!ids.conversationId || !ids.token) throw new Error("Vesper session response did not include conversation custody credentials.");
  conversationId = ids.conversationId;
  sessionToken = ids.token;
  sessionReady = true;
  setRoute("Conversation bound", true);
  setNotice("Vesper is ready. Text conversation is bound to the governed public rail.");
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
        appendMessage("vesper", text, "Vesper · governed response");
        rendered += 1;
      }
      replyCursor = advanceCursor(body, rows);
      if (rendered) {
        pulseVesper();
        setRoute("Vesper replied", true);
        setNotice("Reply received through the governed Vesper public rail.");
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
async function send(){
  const text = messageInput.value.trim();
  if (!text) return;
  sendButton.disabled = true;
  messageInput.disabled = true;
  setNotice("Binding your message to Vesper…");
  try {
    await startSession();
    appendMessage("customer", text, "You · submitted");
    const incarnationHint = product.value || params.get("incarnation") || params.get("product") || null;
    await jsonRequest(
      "/api/vesper/web/message",
      {
        method:"POST",
        body:JSON.stringify({
          conversation_id: conversationId,
          text,
          attachments: [],
          incarnation_hint: incarnationHint,
          message_mode: messageMode,
        }),
      },
      true,
    );
    messageInput.value = "";
    setRoute("Message accepted", true);
    setNotice("Message accepted. Waiting for Vesper's governed reply…");
    await pollForReply();
  } catch (error) {
    console.warn("Vesper public web route unavailable", error);
    setRoute(error?.status === 429 ? "Cloudflare quota gate" : "Conversation unavailable", false);
    setNotice(errorMessage(error), true);
  } finally {
    sendButton.disabled = false;
    messageInput.disabled = false;
    messageInput.focus();
  }
}

if (filesInput) filesInput.disabled = true;
if (attachLabel) attachLabel.classList.add("is-disabled");
if (fileCount) fileCount.textContent = "Text bridge v1 · attachments held";
bindHint();

sendButton.addEventListener("click", send);
messageInput.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    send();
  }
});
product.addEventListener("change", () => {
  if (sessionReady) setNotice("Product context changed. The next message will carry the new incarnation hint.");
});

(async () => {
  try { await startSession(); }
  catch (error) {
    console.warn("Vesper initial public session unavailable", error);
    setRoute(error?.status === 429 ? "Cloudflare quota gate" : "Awaiting connection", false);
    setNotice(errorMessage(error), true);
    sendButton.disabled = false;
  }
})();
