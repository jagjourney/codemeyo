// CodeMeYo Bridge — Popup Script
const statusDot = document.getElementById("statusDot");
const disconnectedView = document.getElementById("disconnectedView");
const connectedView = document.getElementById("connectedView");
const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const tokenInput = document.getElementById("tokenInput");
const portInput = document.getElementById("portInput");

function showConnected() {
  statusDot.classList.add("connected");
  disconnectedView.style.display = "none";
  connectedView.style.display = "block";
}

function showDisconnected() {
  statusDot.classList.remove("connected");
  disconnectedView.style.display = "block";
  connectedView.style.display = "none";
}

// Check current status on popup open
chrome.runtime.sendMessage({ action: "getStatus" }, (response) => {
  if (response && response.connected) {
    showConnected();
  } else {
    showDisconnected();
  }
});

// Load saved port
chrome.storage.local.get(["cmyPort"], (data) => {
  if (data.cmyPort) portInput.value = data.cmyPort;
});

connectBtn.addEventListener("click", () => {
  const token = tokenInput.value.trim();
  const port = parseInt(portInput.value, 10) || 9333;

  if (!token) {
    tokenInput.style.borderColor = "#ef4444";
    return;
  }

  tokenInput.style.borderColor = "";
  chrome.runtime.sendMessage({ action: "connect", token, port }, () => {
    // Wait briefly for connection to establish
    setTimeout(() => {
      chrome.runtime.sendMessage({ action: "getStatus" }, (response) => {
        if (response && response.connected) {
          showConnected();
        }
      });
    }, 1000);
  });
});

disconnectBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "disconnect" }, () => {
    showDisconnected();
  });
});
