"use strict";

const $ = selector => document.querySelector(selector);
const messages = $("#messages");
const product = $("#product");
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
const messageMode = "text";

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
function safeIncarnationHint(raw){
  const value = String(raw || "").trim();
  if (!value) return null;
  if (value.toLowerCase() === "vesper") return null;
  return value;
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
          conversation_id: conversationId,
          message: text,
          attachments:
            attachment ? [attachment] : [],
          incarnation_hint: incarnationHint,
          message_mode: messageMode,
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

  appendMessage(
    "customer",
    "🎙 Voice message",
    "You · voice submitted"
  );

  await jsonRequest(
    "/api/vesper/web/voice",
    {
      method: "POST",
      body: JSON.stringify({
        conversation_id: conversationId,
        audio_b64: bytesToBase64(bytes),
        mime_type:
          (blob.type || "audio/webm")
            .split(";", 1)[0],
        incarnation_hint: incarnationHint,
        message_mode: "voice",
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
