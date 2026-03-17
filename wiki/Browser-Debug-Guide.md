# Browser Debug Guide

CodeMeYo includes a 3-level browser debugging system that lets the AI agent see, understand, and interact with your browser. This goes beyond simple screenshots - the agent gets full access to DOM, console logs, network requests, and can click, type, and navigate.

## Overview

| Level | Name | Setup | Capabilities |
|-------|------|-------|-------------|
| 1 | **Window Capture** | Zero setup | Screenshots of any window |
| 2 | **CDP (Chrome DevTools Protocol)** | One-time browser launch | DOM, console, network, JS eval, click, type, navigate |
| 3 | **Browser Extension** | Install extension | Live DOM mutations, localStorage, CSS injection |

## Level 1: Window Capture (Zero Setup)

Works immediately with any browser or application window.

### How to Use
1. Open the **Browser Debug** panel (globe icon in sidebar)
2. Go to the **Capture** tab
3. Click **Detect** to scan for open browser windows
4. Click **Capture** on any window to screenshot it

### What It Does
- Uses native OS window capture (xcap crate)
- Works with Brave, Chrome, Firefox, Edge, and any desktop app
- Images automatically downscaled to 1280px for efficient LLM processing
- Base64 PNG encoding, held in memory only

### Agent Tools
- `ListBrowserWindows` - detect open windows
- `CaptureBrowserWindow` - screenshot a specific window
- `CaptureScreenshot` - screenshot the entire screen or a region

## Level 2: CDP Deep Debugging

Full Chrome DevTools Protocol access. This gives CodeMeYo the same power as your browser's built-in DevTools.

### Setup

**Option A: Use the Launch button (recommended)**
1. Click the **Launch** button in the Browser Debug header
2. CodeMeYo launches Brave (or Chrome/Edge) with `--remote-debugging-port=9222`
3. A separate browser profile is used so it won't interfere with your existing browser windows
4. Click **Connect**

**Option B: Manual launch**
1. Close all instances of Brave/Chrome
2. Reopen with the debug flag:
   ```
   # Windows (Brave)
   "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" --remote-debugging-port=9222

   # macOS (Brave)
   /Applications/Brave\ Browser.app/Contents/MacOS/Brave\ Browser --remote-debugging-port=9222

   # Linux
   brave-browser --remote-debugging-port=9222
   ```
3. Click **Connect** in CodeMeYo

### Important: Why "Connect" Fails

The most common issue is clicking **Connect** when the browser wasn't launched with the debug flag. Chromium browsers ignore `--remote-debugging-port` if an existing instance is already running because the new window just opens in the existing process.

**Solutions:**
- Use the **Launch** button (it creates a separate profile automatically)
- Or close ALL browser windows first, then reopen with the flag
- Or use **Level 3 (Extension)** which requires no browser restart

### What You Can See

| Feature | Description |
|---------|-------------|
| **Console logs** | log, warn, error, exceptions |
| **Network traffic** | Every HTTP request with status, timing, size |
| **DOM structure** | Full HTML or query by CSS selector |
| **Computed CSS** | Resolved styles for any element |
| **JavaScript eval** | Run code in the page context |
| **Screenshots** | Pixel-perfect, rendered by the browser engine (no OS window chrome) |

### What the Agent Can Do

| Action | Description |
|--------|-------------|
| **Navigate** | Go to any URL |
| **Click** | By CSS selector or x,y coordinates |
| **Type** | Fill input fields |
| **Read DOM** | Inspect any element |

### Agent Tools
- `BrowserConnect` - connect to CDP
- `BrowserListTabs` - list open tabs
- `BrowserScreenshot` - pixel-perfect screenshot
- `BrowserGetDOM` - read HTML
- `BrowserEvalJS` - execute JavaScript
- `BrowserGetConsole` - read console logs
- `BrowserGetNetwork` - read network requests
- `BrowserGetStyles` - computed CSS
- `BrowserClick` - click elements
- `BrowserType` - type text
- `BrowserNavigate` - go to URL

## Level 3: Browser Extension

The **CodeMeYo Bridge** extension connects via WebSocket - no browser restart needed. It adds capabilities that CDP cannot provide.

### Setup

1. In CodeMeYo, go to **Browser Debug > Extension** tab
2. Click **Start Server**
3. Copy the auth token displayed
4. In Brave, go to `brave://extensions`
5. Enable **Developer mode** (top right toggle)
6. Click **Load unpacked**
7. Select the `extensions/codemeyo-bridge/` folder from your CodeMeYo installation
8. Click the puzzle piece icon in the toolbar, then click **CodeMeYo Bridge**
9. Paste the token and click **Connect**

### Extension Location

The extension is bundled with CodeMeYo at:
```
extensions/codemeyo-bridge/
  manifest.json      # Manifest V3 extension config
  background.js      # Service worker - manages WebSocket to CodeMeYo
  content.js         # Content script - DOM observer, console intercept
  popup.html         # Extension popup UI
  popup.js           # Popup logic
  icons/             # Extension icons (16, 48, 128px)
```

### Unique Capabilities (beyond CDP)

| Feature | Description |
|---------|-------------|
| **Live DOM mutations** | MutationObserver tracks every change in real time |
| **localStorage / sessionStorage** | Read all keys or specific values |
| **CSS injection** | Inject and remove CSS rules live |
| **Page metadata** | URL, title, and all meta tags without CDP |

### How It Works

```
Browser Extension                    CodeMeYo App
     content.js   --[DOM mutations]-->   Extension Server (ws://127.0.0.1:9333)
     content.js   --[console logs]-->         |
     background.js --[WebSocket]---------->   |
                   <--[commands]-----------   Agent
```

The extension:
- Runs a content script on every page that observes DOM mutations and intercepts console calls
- Background service worker maintains a WebSocket connection to CodeMeYo
- Commands from the agent flow: Agent > Extension Server > Background > Content Script > Page
- Events from the page flow: Content Script > Background > Extension Server > Agent

### Agent Tools
- `ExtGetDOMMutations` - read live DOM changes
- `ExtGetStorage` - read localStorage/sessionStorage
- `ExtInjectCSS` - inject CSS into the page
- `ExtGetPageInfo` - get page URL, title, meta tags

## Security & Privacy

- **CDP is local only** - debug port listens on 127.0.0.1, never exposed to network
- **Extension server is local only** - WebSocket on 127.0.0.1 with one-time auth token
- **Screenshots stay in memory** - not written to disk unless you explicitly save them
- **Extension CSP** - restricts all connections to localhost, never contacts external servers
- **Agent permissions** - read tools work at "auto_read" level, write tools need "auto_all", action tools need "full_auto" or manual approval

## Real-World Workflows

### Debug a broken button
> "The checkout button on localhost:3000/cart doesn't work. Debug it."

1. Agent navigates to the page, takes a screenshot
2. Reads console logs - finds TypeError at CheckoutForm.tsx:47
3. Checks network - sees POST /api/orders returned 400
4. Reads the source file, identifies the bug
5. Fixes the code, screenshots to verify

### Fix slow page load
> "localhost:3000 takes 8 seconds to load. Why?"

1. Agent clears network log, navigates to page
2. Reads all requests - finds /api/products took 6.2s
3. Reads the API route code - spots an N+1 query
4. Fixes with eager loading, reloads, confirms 180ms

### Fix responsive layout
> "Product cards look broken on mobile. Fix it."

1. Agent screenshots desktop layout (looks fine)
2. Evaluates JS to emulate mobile viewport
3. Screenshots mobile view - sees cards overlapping
4. Gets computed styles - finds fixed 300px width
5. Fixes CSS to be responsive, verifies both layouts

## Comparison: CodeMeYo vs Claude Desktop Computer Use

| Feature | Claude CU | CodeMeYo |
|---------|-----------|----------|
| Screenshot | Yes | Yes |
| Click / Type | Yes | Yes |
| DOM inspection | No | Yes |
| Console logs | No | Yes |
| Network sniffing | No | Yes |
| CSS computed styles | No | Yes |
| JS evaluation | No | Yes |
| localStorage access | No | Yes |
| Live DOM mutations | No | Yes |
| CSS injection | No | Yes |
| No browser restart | Yes | Yes* |
| Works with any app | Yes | Yes |

*With extension, no restart needed. CDP requires launching browser with debug flag.

## Troubleshooting

### "Cannot reach CDP at port 9222"
- **Cause:** Browser not running with `--remote-debugging-port=9222`
- **Fix:** Click the **Launch** button, or close all browser instances and reopen with the flag

### Launch button opens but Connect still fails
- Wait 2-3 seconds after launch for the browser to fully start
- Make sure no other process is using port 9222

### Extension shows "Disconnected"
- Make sure the Extension Server is started in CodeMeYo (Extension tab > Start Server)
- Check that the token matches
- Verify the port (default 9333) matches in both the app and extension popup

### CDP Screenshot is blank
- Make sure you're connected to a tab that has content (not a `chrome://` page)
- Try switching to a different tab using BrowserListTabs
