# FAQ

Short answers. For deeper dives, follow the links.

---

### Is CodeMeYo free?

**The app is free.** Desktop and mobile. Download, install, use forever with your own LLM API keys. No paywalls on local-only features.

**Pro is not free and not shipped yet.** When Pro launches (target v2.0.0), it'll be sold exclusively through Apple App Store + Google Play — no web subscription. Pro unlocks Remote PC Code + cross-device conversation sync.

**Donations are welcome** at [codemeyo.com/donate](https://codemeyo.com/donate). Not required, genuinely appreciated. See [Donations](Donations).

---

### Is the source code available?

No. Source is closed. We don't accept pull requests and the GitLab repo is private. Binaries are published to GitHub Releases only.

See [Contributing](Contributing) for how to file bugs and suggestions.

---

### Do I need an account?

**To download:** yes, since v1.9.0. Create a free account at [codemeyo.com/register](https://codemeyo.com/register).

**To run the app:** no. Once installed, the app works fully without signing in. You just won't get auto-updates and (later) Remote PC Code.

**To receive auto-updates:** yes. Signed-in users get updates via the authenticated updater endpoint. Guests stay on their installed version until they sign in or manually download. See [Auto-Updater](Auto-Updater).

---

### What LLMs does CodeMeYo support?

Eight providers via BYOK (bring your own key):

| Provider | Get a key |
|---|---|
| **Anthropic (Claude)** | [console.anthropic.com](https://console.anthropic.com) |
| **OpenAI (GPT)** | [platform.openai.com](https://platform.openai.com) |
| **xAI (Grok)** | [console.x.ai](https://console.x.ai) |
| **Google (Gemini)** | [aistudio.google.com](https://aistudio.google.com) |
| **DeepSeek** | [platform.deepseek.com](https://platform.deepseek.com) |
| **Mistral** | [console.mistral.ai](https://console.mistral.ai) |
| **Ollama (local, no key)** | [ollama.com](https://ollama.com) |
| **Groq** | [console.groq.com](https://console.groq.com) |

See [LLM Providers](LLM-Providers) for the per-provider walkthrough.

---

### Does CodeMeYo see my prompts or my API keys?

**No.** Never.

- API keys live in your OS keychain, not our servers.
- LLM requests go directly from the app to the provider over HTTPS. We are never the middleman.
- Your code, prompts, and LLM responses never touch codemeyo.com.

The only thing we see is account metadata (email, device names, plan) and — if you opt in — anonymized LLM call counts (just `{provider, model, at}`, no content).

Full policy at [codemeyo.com/privacy](https://codemeyo.com/privacy).

---

### What platforms are supported?

| Platform | Formats |
|---|---|
| Windows | `.msi`, `.exe` |
| macOS | `.dmg` (Apple Silicon + Intel) |
| Linux | `.deb`, `.rpm`, `.AppImage` |
| iOS | Via TestFlight (App Store submission pending) |
| Android | Via Play Open Testing (listing pending), or sideload the signed `.apk` |

See [Getting Started](Getting-Started#system-requirements) for minimums.

---

### Can I use CodeMeYo offline?

**The app runs offline.** Full editor, file explorer, git, terminal.

**Cloud LLMs need internet** — Claude, GPT, Grok, Gemini, DeepSeek, Mistral, Groq all require an internet connection to hit their APIs.

**Ollama is fully local** — install a model locally and you can work entirely offline with no LLM API keys. See [LLM Providers → Ollama](LLM-Providers#7-ollama-local-models).

---

### What is Deep Think?

A multi-LLM strategy: all your enabled providers analyze your task in parallel, critique each other, and synthesize a single answer.

Great for hard problems where you want multiple perspectives. Expensive — uses 3-4× the tokens of Single. See [Deep Think](Deep-Think).

---

### What is MCP?

**Model Context Protocol** — an open JSON-RPC standard for connecting AI agents to external tools and data sources. CodeMeYo is a reference-quality MCP client and works with any spec-compliant server.

Optional — CodeMeYo works fully without any MCP servers. Useful if you want the agent to hit databases, APIs, GitHub, Slack, etc. See [MCP Servers](MCP-Servers).

---

### How is CodeMeYo different from Claude Code or Cursor?

- **It acts, not advises.** The agent loop reads your codebase, writes files, runs builds, fixes errors, and commits — no suggestion-and-accept step.
- **8 providers in one app.** Switch between Claude / GPT / Grok / Gemini / DeepSeek / Mistral / Groq / Ollama freely, or use Deep Think to have all of them debate.
- **Native desktop + mobile app.** Not a VS Code extension. Native binaries on Windows, macOS, Linux, iOS, Android.
- **Full MCP support.** Extend with any MCP-compatible server.
- **BYOK.** You pay the LLM providers directly — no markup, no monthly app fee (until Pro launches and that's just for Remote PC Code).

See `docs/CODEMEYO_VS_CLAUDE_DESKTOP.md` for the full feature comparison (internal-planning doc, pulled highlights into the Browser Debug Guide and Architecture pages).

---

### How do I report a bug?

1. Search [existing issues](https://github.com/jagjourney/codemeyo/issues) first.
2. If new, [open a GitHub issue](https://github.com/jagjourney/codemeyo/issues/new) with steps to reproduce, expected vs actual, OS + version, CodeMeYo version, log excerpts.
3. For private reports: `support@jagjourney.com`.
4. For security: `security@jagjourney.com`.

See [Contributing](Contributing).

---

### How do I contribute?

**Code:** you can't. Source is closed, no PRs accepted.

**Feedback:** file issues, email suggestions, donate. All actively read and acted on.

---

### Does the app have telemetry?

**Opt-in only.** Off by default. If you enable it in Settings → Privacy, we receive:

- Anonymized LLM call counts `{provider, model, at}`
- Never: prompts, responses, code, keys, tokens consumed, IP

Signed-in accounts only. Helps us see which providers are popular.

---

### Can I change the bundle ID back?

No. The rename from `com.codemeyo.app` to `com.jagjourney.codemeyo` in v1.9.0 is permanent. It matches the `com.jagjourney.*` convention across our apps and avoids a macOS bundle-naming quirk with the `.app` suffix.

Your old data directory stays on disk (unused) until you delete it. See [Configuration → Upgrading from older bundle ID](Configuration#upgrading-from-older-bundle-id).

---

### How does auto-update work?

1. App periodically hits `GET /api/v1/updater/latest/{platform}-{arch}` with your Sanctum bearer token.
2. If a newer version exists, prompts you with release notes.
3. Click **Install** — downloads signed archive, verifies signature, replaces binary, restarts.

Signed-in only. Guests see "Sign in for updates". See [Auto-Updater](Auto-Updater).

---

### What does LLM usage cost?

CodeMeYo itself is free. LLM providers charge per token. Rough rates (check providers for current pricing):

| Model | Input / 1M tokens | Output / 1M tokens |
|---|---|---|
| Claude Sonnet 4.6 | ~$3.00 | ~$15.00 |
| GPT-5.4 | ~$2.50 | ~$15.00 |
| Grok 3 | ~$3.00 | ~$15.00 |
| GPT-4.1 Nano | ~$0.20 | ~$0.80 |
| DeepSeek V3.2 | ~$0.28 | ~$0.42 |
| Grok 4.1 Fast Reasoning | ~$0.20 | ~$0.50 |
| Ollama (local) | $0 | $0 |

The Usage panel in the app tracks tokens + estimated cost live per session.

For free local inference: use **Ollama** with an open-weight model.

---

### Why is Remote PC Code "Coming Soon"?

Because it's not shipped yet. The Remote tab in the sidebar shows a teaser while we finish the pairing WebSocket + UI. When it opens up, it'll be a Pro feature (Apple IAP + Google Play only).

Sign in with a free account now to be in the early-access queue. See [Roadmap → Remote PC Code](Roadmap#remote-pc-code--pro-launch) and [Mobile App → Remote PC Code](Mobile-App#remote-pc-code).

---

### Is the source code available?

No. Source is closed. We may publish specific pieces separately in the future (e.g. a standalone MCP server SDK) but the app itself is closed. See [Contributing](Contributing).

---

### Where do I get help?

- [Troubleshooting](Troubleshooting) — common issues + fixes.
- [GitHub Issues](https://github.com/jagjourney/codemeyo/issues) — bug reports.
- `support@jagjourney.com` — private reports.
- `security@jagjourney.com` — security disclosures.
- [Donate](https://codemeyo.com/donate) — buy us coffee, we'll keep shipping.

---

## Related pages

- [Home](Home)
- [Getting Started](Getting-Started)
- [Troubleshooting](Troubleshooting)
- [Contributing](Contributing)
