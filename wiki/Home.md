# CodeMeYo Wiki

**Multi-LLM Autonomous Coding Agent for Desktop and Mobile.**

> **v1.9.1** is the latest release (2026-04-19). Free accounts are now live, **Remote PC Code** is Coming Soon, and Pro will ship exclusively through the **Apple App Store + Google Play** when it launches. [See what's new](#whats-new-in-v19x).

| | |
|---|---|
| **Current version** | v1.9.1 |
| **Platforms** | Windows, macOS, Linux, iOS, Android |
| **Price** | Free (donations welcome). Pro — Coming Soon on Apple / Google. |
| **Website** | [codemeyo.com](https://codemeyo.com) |
| **Download** | [codemeyo.com/download](https://codemeyo.com/download) (free account required) |
| **Bundle ID** | `com.jagjourney.codemeyo` |
| **Releases** | [github.com/jagjourney/codemeyo/releases](https://github.com/jagjourney/codemeyo/releases) |
| **Issues / bug reports** | [github.com/jagjourney/codemeyo/issues](https://github.com/jagjourney/codemeyo/issues) |

---

## What is CodeMeYo

CodeMeYo is a native desktop + mobile application that acts as a fully autonomous coding agent. Give it a task — it reads your codebase, writes and edits files, installs dependencies, runs builds, fixes errors, and commits. All on its own.

It integrates **8 frontier LLM providers** — Claude, GPT, Grok, Gemini, DeepSeek, Mistral, Ollama, and Groq — through a unified adapter system with full tool use and function calling. You bring your own keys (BYOK); your prompts and keys never touch our servers.

Built with **Tauri 2** (Rust backend + React frontend). Runs natively on Windows, macOS, Linux, iOS, and Android with minimal resource use.

---

## What's new in v1.9.x

### v1.9.1 (2026-04-19) — pipeline fixes + homepage CMS wiring

- Android build no longer fails on the duplicated Kotlin classes from the `com.codemeyo.app` → `com.jagjourney.codemeyo` rename.
- `build-website` CI job now passes `--ignore-platform-req=ext-sodium` so composer install works on the AlmaLinux runner.
- Homepage (`/`) now renders from the `cms_pages` row with slug `home` when blocks are populated. Static Blade fallback stays intact for fresh installs.
- "Send Test Email" button added to `/admin/settings` → Mail tab.

### v1.9.0 (2026-04-19) — accounts, admin panel, donations, Remote teaser

- **Account system** is live. Create a free codemeyo.com account from inside the app via device-code flow. Email + password, optional 2FA, verified email required for Pro. See [Account System](Account-System).
- **Remote PC Code** shipped as a **Coming Soon** teaser in the sidebar. Full pairing + Pro gating land in a future release. See [Mobile App](Mobile-App#remote-pc-code).
- **Auto-updater** is now authenticated. Signed-in users pull from `codemeyo.com/api/v1/updater/latest/*`. Guests see "Sign in for updates". See [Auto-Updater](Auto-Updater).
- **Opt-in telemetry** — anonymized LLM call counts only, off by default, toggle in Settings → Privacy.
- **Admin panel** at `codemeyo.com/admin` — 10-tab Settings, CMS page builder, donations, entitlements, blog, feature flags, audit log. See [Admin Panel](Admin-Panel).
- **Donations** at `codemeyo.com/donate` — one-time or monthly Stripe, no account required. See [Donations](Donations).
- **Bundle ID renamed** from `com.codemeyo.app` to `com.jagjourney.codemeyo`. App-data paths moved — see [Configuration](Configuration#application-data-location).
- **Downloads require a free account** now that source is closed.
- **Pricing page** at `codemeyo.com/subscribe` now shows Apple + Google badges only. Web Stripe Checkout for subscriptions was removed — Pro will be sold exclusively in the mobile app stores.

For the full, grouped release history see [Release Notes](Release-Notes).

---

## Quick links

| Topic | Page |
|---|---|
| Install + first launch | [Getting Started](Getting-Started) |
| LLM provider setup (BYOK) | [LLM Providers](LLM-Providers) |
| MCP server configuration | [MCP Servers](MCP-Servers) |
| Free account + 2FA | [Account System](Account-System) |
| Public REST API | [Backend API](Backend-API) |
| Auto-updater behavior | [Auto-Updater](Auto-Updater) |
| iOS / Android | [Mobile App](Mobile-App) |
| Deep Think mode | [Deep Think](Deep-Think) |
| Admin backoffice | [Admin Panel](Admin-Panel) |
| CMS page builder | [CMS Page Builder](CMS-Page-Builder) |
| Donations (Stripe) | [Donations](Donations) |
| Architecture deep-dive | [Architecture](Architecture) |
| Troubleshooting | [Troubleshooting](Troubleshooting) |
| Feature roadmap | [Roadmap](Roadmap) |
| Every version | [Release Notes](Release-Notes) |
| Filing bugs / suggestions | [Contributing](Contributing) |

---

## Upcoming

Nothing below has a ship date. These are the things we're actively working toward.

- **Remote PC Code** — pair your phone with your desktop, drive the coding agent from anywhere. Paid feature at launch, sold through Apple IAP + Google Play Billing only.
- **Cross-device conversation sync** — chat history follows your account between desktop, iOS, and Android.
- **MCP marketplace** — paid, curated, and community-submitted MCP servers with one-click install.
- **Sign in with Apple (web)** — required by App Store Review Guideline 4.8 once the app offers any third-party login. Routes already stubbed in, credentials pending.
- **Referral credits** — give a friend a month of Pro, get one free.
- **Usage cost alerts** — opt-in notifications when your BYOK spend crosses a threshold you set per provider.
- **Export conversations** to Markdown and PDF.
- **Claude Code plugin** for users who live in the terminal.

See [Roadmap](Roadmap) for the full list.

---

## Ecosystem

| | |
|---|---|
| Homepage | [codemeyo.com](https://codemeyo.com) |
| Downloads | [codemeyo.com/download](https://codemeyo.com/download) |
| Sign up / sign in | [codemeyo.com/register](https://codemeyo.com/register) / [codemeyo.com/login](https://codemeyo.com/login) |
| Dashboard | [codemeyo.com/dashboard](https://codemeyo.com/dashboard) |
| Donate | [codemeyo.com/donate](https://codemeyo.com/donate) |
| Subscribe (App Store / Play) | [codemeyo.com/subscribe](https://codemeyo.com/subscribe) |
| OpenAPI spec | [codemeyo.com/api/v1/openapi.json](https://codemeyo.com/api/v1/openapi.json) |
| Swagger UI | [codemeyo.com/api/docs](https://codemeyo.com/api/docs) |
| Support email | support@jagjourney.com |
| Security disclosures | security@jagjourney.com |

Copyright (c) Jag Journey, LLC.
