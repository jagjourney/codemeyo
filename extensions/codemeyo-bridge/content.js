// CodeMeYo Bridge — Content Script
// Runs on every page. Observes DOM mutations, intercepts console, and
// responds to commands from the background service worker.

(() => {
  // ── DOM Mutation Observer ──────────────────────────────────────────
  let mutationBatch = [];
  let mutationTimer = null;

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      const entry = {
        mutation_type: m.type,
        target_selector: cssPath(m.target),
        timestamp: Date.now(),
        added_nodes: [],
        removed_nodes: [],
      };

      if (m.type === "childList") {
        entry.added_nodes = Array.from(m.addedNodes)
          .filter((n) => n.nodeType === 1)
          .map((n) => n.tagName.toLowerCase() + (n.id ? `#${n.id}` : ""))
          .slice(0, 10);
        entry.removed_nodes = Array.from(m.removedNodes)
          .filter((n) => n.nodeType === 1)
          .map((n) => n.tagName.toLowerCase() + (n.id ? `#${n.id}` : ""))
          .slice(0, 10);
      } else if (m.type === "attributes") {
        entry.attribute_name = m.attributeName;
        entry.old_value = m.oldValue;
        entry.new_value = m.target.getAttribute(m.attributeName);
      }

      mutationBatch.push(entry);
    }

    // Debounce: send batch every 500ms
    if (!mutationTimer) {
      mutationTimer = setTimeout(flushMutations, 500);
    }
  });

  function flushMutations() {
    mutationTimer = null;
    if (mutationBatch.length === 0) return;
    const batch = mutationBatch.splice(0, 50); // max 50 per flush
    for (const entry of batch) {
      chrome.runtime.sendMessage({ type: "dom_mutation", data: entry });
    }
  }

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
      characterData: false,
    });
  }

  // ── Console Intercept ──────────────────────────────────────────────
  const origConsole = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    info: console.info.bind(console),
  };

  function interceptConsole(level) {
    return function (...args) {
      origConsole[level](...args);
      try {
        const text = args
          .map((a) => (typeof a === "string" ? a : JSON.stringify(a)))
          .join(" ");
        chrome.runtime.sendMessage({
          type: "console_entry",
          data: {
            level,
            text: text.slice(0, 2000),
            timestamp: Date.now() / 1000,
            url: location.href,
            line: 0,
            column: 0,
          },
        });
      } catch {
        // Don't break the page if messaging fails
      }
    };
  }

  console.log = interceptConsole("log");
  console.warn = interceptConsole("warning");
  console.error = interceptConsole("error");
  console.info = interceptConsole("info");

  // ── Command Handler ────────────────────────────────────────────────
  let injectedStyleEl = null;

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const { action, params } = msg;

    if (!action) return false;

    switch (action) {
      case "get_storage": {
        const type = params?.storage_type === "session" ? sessionStorage : localStorage;
        const key = params?.key;
        if (key) {
          sendResponse({ [key]: type.getItem(key) });
        } else {
          const entries = {};
          for (let i = 0; i < type.length; i++) {
            const k = type.key(i);
            entries[k] = type.getItem(k);
          }
          sendResponse(entries);
        }
        return true;
      }

      case "inject_css": {
        const css = params?.css || "";
        const removePrev = params?.remove_previous || false;
        if (removePrev && injectedStyleEl) {
          injectedStyleEl.remove();
          injectedStyleEl = null;
        }
        if (css) {
          injectedStyleEl = document.createElement("style");
          injectedStyleEl.setAttribute("data-codemeyo-injected", "true");
          injectedStyleEl.textContent = css;
          document.head.appendChild(injectedStyleEl);
        }
        sendResponse({ ok: true });
        return true;
      }

      case "get_page_info": {
        const meta = {};
        document.querySelectorAll("meta[name], meta[property]").forEach((el) => {
          const name = el.getAttribute("name") || el.getAttribute("property");
          if (name) meta[name] = el.getAttribute("content");
        });
        sendResponse({
          url: location.href,
          title: document.title,
          meta,
          doctype: document.doctype
            ? `<!DOCTYPE ${document.doctype.name}>`
            : null,
        });
        return true;
      }

      case "get_dom": {
        const selector = params?.selector;
        if (selector) {
          const el = document.querySelector(selector);
          sendResponse({
            html: el ? el.outerHTML.slice(0, 50000) : null,
            found: !!el,
          });
        } else {
          sendResponse({
            html: document.documentElement.outerHTML.slice(0, 100000),
            found: true,
          });
        }
        return true;
      }

      default:
        sendResponse({ error: `Unknown action: ${action}` });
        return true;
    }
  });

  // ── Utility ────────────────────────────────────────────────────────

  /** Generate a simple CSS selector path for an element. */
  function cssPath(el) {
    if (!el || el.nodeType !== 1) return "";
    const parts = [];
    let node = el;
    while (node && node.nodeType === 1 && node !== document.body) {
      let selector = node.tagName.toLowerCase();
      if (node.id) {
        selector += `#${node.id}`;
        parts.unshift(selector);
        break;
      }
      const parent = node.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(
          (c) => c.tagName === node.tagName
        );
        if (siblings.length > 1) {
          const idx = siblings.indexOf(node) + 1;
          selector += `:nth-of-type(${idx})`;
        }
      }
      parts.unshift(selector);
      node = parent;
    }
    return parts.join(" > ").slice(0, 200);
  }
})();
