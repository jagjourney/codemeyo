// CodeMeYo Bridge — Background Service Worker
// Manages WebSocket connection to CodeMeYo Tauri app and routes messages
// between the extension content scripts and the app.

let ws = null;
let reconnectTimer = null;
let reconnectDelay = 1000;
const MAX_RECONNECT_DELAY = 30000;

// Load stored config and connect if we have a token
chrome.storage.local.get(["cmyToken", "cmyPort", "cmyConnected"], (data) => {
  if (data.cmyToken && data.cmyConnected) {
    connect(data.cmyPort || 9333, data.cmyToken);
  }
});

function connect(port, token) {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    return;
  }

  try {
    ws = new WebSocket(`ws://127.0.0.1:${port}`);
  } catch (e) {
    scheduleReconnect(port, token);
    return;
  }

  ws.onopen = () => {
    // Send auth token
    ws.send(JSON.stringify({ type: "auth", token }));
    reconnectDelay = 1000;
  };

  ws.onmessage = (event) => {
    let msg;
    try {
      msg = JSON.parse(event.data);
    } catch {
      return;
    }

    if (msg.type === "auth_ok") {
      chrome.storage.local.set({ cmyConnected: true });
      updateBadge("connected");
      return;
    }

    if (msg.type === "command") {
      handleCommand(msg);
    }
  };

  ws.onclose = () => {
    ws = null;
    chrome.storage.local.set({ cmyConnected: false });
    updateBadge("disconnected");
    scheduleReconnect(port, token);
  };

  ws.onerror = () => {
    // onclose will fire after onerror
  };
}

function disconnect() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  if (ws) {
    ws.close();
    ws = null;
  }
  chrome.storage.local.set({ cmyConnected: false, cmyToken: "" });
  updateBadge("disconnected");
}

function scheduleReconnect(port, token) {
  if (reconnectTimer) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    // Check if we still should reconnect
    chrome.storage.local.get(["cmyToken", "cmyConnected"], (data) => {
      if (data.cmyToken) {
        connect(port, data.cmyToken);
      }
    });
    reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY);
  }, reconnectDelay);
}

function updateBadge(status) {
  const color = status === "connected" ? "#22c55e" : "#ef4444";
  const text = status === "connected" ? "ON" : "";
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({ text });
}

// ── Command handling ─────────────────────────────────────────────────

async function handleCommand(msg) {
  const { id, action, params } = msg;

  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) {
      sendResponse(id, { error: "No active tab" });
      return;
    }

    // Forward command to content script and await response
    const response = await chrome.tabs.sendMessage(tab.id, { action, params, id });
    sendResponse(id, response);
  } catch (e) {
    sendResponse(id, { error: e.message || String(e) });
  }
}

function sendResponse(id, data) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "response", id: String(id), data }));
  }
}

function sendEvent(type, data) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type, data }));
  }
}

// ── Messages from content scripts ────────────────────────────────────

chrome.runtime.onMessage.addListener((msg, sender, sendResponseFn) => {
  // Messages from popup
  if (msg.action === "connect") {
    chrome.storage.local.set({ cmyToken: msg.token, cmyPort: msg.port || 9333 });
    connect(msg.port || 9333, msg.token);
    sendResponseFn({ ok: true });
    return;
  }

  if (msg.action === "disconnect") {
    disconnect();
    sendResponseFn({ ok: true });
    return;
  }

  if (msg.action === "getStatus") {
    const connected = ws && ws.readyState === WebSocket.OPEN;
    sendResponseFn({ connected });
    return;
  }

  // Forward content script events to CodeMeYo
  if (msg.type === "dom_mutation" || msg.type === "console_entry" || msg.type === "storage_snapshot") {
    sendEvent(msg.type, msg.data);
    return;
  }

  return false;
});
