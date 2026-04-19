# Roadmap

What we're working on. Nothing here has a ship date — this is intent, not a commitment.

For what's already shipped see [Release Notes](Release-Notes) and [Home → What's new](Home#whats-new-in-v19x).

---

## Near-term (the next few months)

### Remote PC Code — Pro launch

The headline feature for mobile and the reason Pro exists. Pair your phone with your desktop, drive your coding agent from anywhere.

**Current state:** "Coming Soon" teaser in the Remote tab on both desktop and mobile (since v1.9.0). The pairing endpoints (`POST /api/v1/pair/initiate`, `POST /api/v1/pair/complete`) are built on the server side. The WebSocket transport + pairing UI is what we're still polishing.

**When we flip the gate:**

- Remote PC Code will be a **Pro** feature.
- Sold **exclusively through Apple App Store IAP + Google Play Billing** — no web purchase path.
- Free accounts keep all local-only features (they always will).

Status: active development.

### Pro subscriptions live on App Store + Google Play

The `/subscribe` page at codemeyo.com already shows Apple + Google badges in place of Stripe Checkout (since v1.9.0). The actual IAP products are submitted for review. Once approved, Pro unlocks Remote PC Code + cross-device sync.

Price at launch is set in `/admin/settings` → App Stores (IAP) — current plan is $12.99/mo or $119/yr on mobile, no web price. See `docs/PLAN_PHASE7_SAAS_PLATFORM.md` for the rationale.

### Sign in with Apple (web)

Required by App Store Review Guideline 4.8 once the app offers any third-party login. Routes already stubbed in (`/auth/apple`, `/auth/apple/callback`) — inert until the `APPLE_SIGNIN_CLIENT_ID` / `SECRET` / `REDIRECT_URI` settings are populated.

Status: code done, credentials pending Apple Developer account setup.

### Cross-device conversation sync

Your chat history follows your account between desktop, iOS, and Android. Pro feature (the server storage cost is real).

**What it'll look like:**

- Opt in per conversation (not every chat gets synced — privacy).
- End-to-end encrypted with a key derived from your password (we literally can't read synced conversations; losing your password means losing your encrypted backups).
- Last-write-wins resolution — no branch merging on the server side.

Status: schema sketched. Implementation pending the Remote launch.

### Referral credits

Give a friend a month of Pro, get one free. Standard referral program mechanics, tracked server-side.

Status: design done, not started. Gated by feature flag `referral_credits` (currently off).

---

## Medium-term

### MCP marketplace

A browsable, search-able directory of MCP servers — free and paid, curated + community-submitted. Install with one click, creators get paid for paid servers, Jag Journey takes a small cut.

**How it ties together:**

- Existing in-app Registry tab (50+ curated servers) becomes the "Official" section of the marketplace.
- Community MCP servers submitted via a CLI tool we publish.
- Review queue + security scanning for `.mcpb` bundles.
- Paid MCP servers gated by Pro + a separate per-server purchase.

Status: concept. No code yet.

### Usage cost alerts

Opt-in notifications when your BYOK spend crosses a threshold you set per-provider. E.g. "Alert me if Claude usage exceeds $50 this week."

**How:** the existing Usage panel already tracks per-provider cost locally. We add thresholds + a background check + a native OS notification.

Status: design done. Feature flag `usage_cost_alerts` exists (currently off).

### Export conversations

Export any conversation as **Markdown**, **PDF**, or **JSON**. Already supported for Markdown / JSON since v0.1.7 or so — PDF and richer formatting are the remaining gap.

Status: Markdown export is shipped. PDF pending.

### AI personality presets

Saved system-prompt presets you can apply per conversation. E.g. "Python tutor", "Code reviewer who hates any line over 80 chars", "Rewrite this like a senior staff engineer explaining it to a junior".

Status: concept.

### Claude Code plugin

An integration for users who live in the terminal. Probably a standalone CLI that shares the same Rust core + LLM adapter layer as the desktop app. Same BYOK, same Deep Think, no UI.

Status: concept. Would require splitting the Rust core into a crate.

---

## Long-term / ideas

Things we've talked about, no commitment yet:

- **SSO for Team tier** — Google Workspace, Microsoft Entra, SAML. Needed once Team is a real tier.
- **Team workspaces** — shared projects and conversations scoped to a team account.
- **Admin impersonation** — log in as a user (with consent + audit log) to debug their issue. Filament supports this natively.
- **Blog comments** — on `/blog/{slug}` posts. Gated by account.
- **Code search across all projects** — one query, find hits across every project you've opened.
- **Custom agent tools via MCP** — but scaffolded for non-developers with a GUI tool builder.
- **Voice input** — dictate your task instead of typing. OS-level Whisper / Apple Dictation integration.
- **Screen-share pairing** — Remote PC Code's sibling, but for live debugging with a remote teammate.
- **Scheduled agent runs** — "Every Monday at 9am, check my CI for failures and propose fixes."
- **Local model fine-tuning for Ollama** — one-button "teach Ollama about this codebase" workflow.

---

## What we've intentionally said no to

Being explicit about the un-roadmap too:

- **Hosting LLMs ourselves.** BYOK only. Our servers never see your prompts — that's a core promise.
- **An editor we build from scratch.** Monaco (the VS Code engine) already works and we're not in the code-editor business.
- **A web app at codemeyo.com/app.** The desktop + mobile apps are the product. The website is marketing + account + API.
- **Stripe subscriptions for Pro.** Intentionally removed in v1.9.0 — app stores only.
- **Plugins we don't control.** MCP covers the extensibility story. No internal JS plugin system.
- **Publishing the desktop app's source code.** Source is closed and will stay closed. We may publish specific pieces separately in the future (e.g. a standalone MCP server SDK).

---

## How priorities get set

We pick what ships next based on, roughly:

1. **Does it unblock revenue?** (Pro launch, Remote PC Code)
2. **Is Apple / Google blocking us from submitting without it?** (Sign in with Apple, privacy disclosures)
3. **Does it reduce support load?** (Better error messages, in-app changelog, "Send Test Email" button)
4. **Does a paying user ask for it?** (Early Pro users' requests get priority)
5. **Does it pay dividends across many features?** (MCP marketplace, shared infra, CI speedups)

We don't ship things because they'd look cool in a demo. Every bullet above has a reader-facing reason.

---

## How to influence the roadmap

- **File an issue at [github.com/jagjourney/codemeyo/issues](https://github.com/jagjourney/codemeyo/issues).** Bug reports and feature requests are the biggest input.
- **Email support@jagjourney.com** with feedback. We read all of it.
- **Donate at [codemeyo.com/donate](https://codemeyo.com/donate).** Revenue buys us time to build. Every donation directly funds a day of development work.
- **Subscribe to Pro** (when it launches). Pro revenue funds the roadmap.

---

## Related pages

- [Release Notes](Release-Notes) — what's already shipped.
- [Mobile App → Remote PC Code](Mobile-App#remote-pc-code) — the big near-term unlock.
- [Account System](Account-System) — the foundation for everything Pro.
- [Contributing](Contributing) — how to file bugs or feature requests.
