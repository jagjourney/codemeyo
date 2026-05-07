# Changelog

All notable changes to CodeMeYo will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/).
This project uses [Semantic Versioning](https://semver.org/).

---

## Versioning Rules

| Bump  | When to use | Example |
|-------|-------------|---------|
| **PATCH** (0.0.x) | Bug fixes, typos, dependency bumps, docs | v0.1.0 → v0.1.1 |
| **MINOR** (0.x.0) | New features, enhancements, non-breaking changes | v0.1.1 → v0.2.0 |
| **MAJOR** (x.0.0) | Breaking changes, major milestones, architecture rewrites | v0.2.0 → v1.0.0 |

**Every version tag MUST have a corresponding entry below before tagging.**

To release:
```bash
# 1. Update this file with what changed
# 2. Commit: git add CHANGELOG.md && git commit -m "Release v0.1.0"
# 3. Tag:    git tag v0.1.0
# 4. Push:   git push origin main --tags
```

---

## [1.10.33] - 2026-05-06

### iOS — privacy manifest now minimal (data-collection claims removed)

- The privacy manifest still declares the four required-reason API categories the app's binary uses (UserDefaults, file timestamps, system boot time, disk space), but no longer enumerates the user data the backend collects (email, name, user ID, purchase history). Apple's stricter validator was rejecting that section as ITMS-91056. The data we collect is declared in our App Store Connect privacy nutrition labels and on codemeyo.com's privacy page, not in the app binary's manifest.

## [1.10.32] - 2026-05-06

### iOS — privacy manifest accepted by Apple again

- The privacy manifest content has been correct since v1.10.29, but Apple's stricter validator (rolled out around the v1.10.30 timeframe) started rejecting it as Invalid Binary anyway. Root cause: every other property list inside the bundle is binary-format, but our injected privacy manifest stayed XML — and the validator now treats that mismatch as invalid. The build now converts the manifest to binary plist on injection so the format matches everything else in the bundle, and a CI gate verifies the format before upload.

## [1.10.31] - 2026-05-06

### Pair flow no longer crashes when the relay isn't reachable

- Entering a 6-digit pair code on a phone could crash the desktop app with a startup error if the WebSocket relay wasn't fully configured server-side. The QR + code generation worked, but as soon as a phone redeemed the code, the desktop tried to subscribe to a missing channel and threw. The desktop now checks for a valid relay before subscribing and shows a clean error state ("The pairing relay is not configured on the server") instead of crashing. Full phone-to-desktop pairing requires backend infrastructure that's still being completed; the fix here is making sure the app fails gracefully in the meantime.

## [1.10.30] - 2026-05-06

### JagAI — GPT routing fixed, every request now logged forever

- JagAI's GPT routing was returning 502 errors after three retries. Two real causes: the proxy's auto-retry didn't recognize the rephrased "Use 'X' instead" hints from OpenAI's newer error format, and gpt-5.5 chains rejections (first the temperature parameter, then `max_tokens` which OpenAI now requires renamed to `max_completion_tokens`). The proxy now follows the rejection chain to completion (up to four hops), renames parameters when OpenAI says to, and surfaces the real upstream error message back to the desktop app instead of a generic 502. The desktop app's error UI now shows the actual reason ("OpenAI: max_tokens parameter renamed to max_completion_tokens") instead of "jagai API error after 3 retries."
- Every JagAI request — successful, failed, or refused for insufficient credits — is now persisted to a permanent audit table on codemeyo.com with the user's identity, prompt excerpt, response excerpt, model, tier, tokens, credits spent, and any error. **Records are append-only — they're never deleted.** Admin can view them at /admin → Billing → JagAI Requests with filters for failures-only, by user, by provider, and CSV export.

### SideKick now actually engages instead of saying "Standing by for your request"

- Deep Think mode includes SideKick (the Claude-CLI-backed participant) and SideKick's analysis was always the same boilerplate "I see the system reminders. Standing by for your request." The Tauri client was concatenating system + user content into one bracketed transcript-style block and handing it to the `claude` CLI, which then read its own injected system reminders + our wrapped block as system-only content with no user message. SideKick now passes the system prompt via `--append-system-prompt` and only the user content via `-p`, the way the CLI expects. SideKick now produces real analysis in Deep Think.

### Apple App Store submission — screenshot capture pipeline shipped

- New script `scripts/capture-screenshots.ps1` plus `apple-rejection/3/CAPTURE_GUIDE.md` walk through the 6 iPhone + 6 iPad screenshots Apple needs for the v1.10.29+ resubmission. Sims are running on mac01; the script SSHes in, takes the screenshot at each step, scp's the PNG back, and runs the letterbox pipeline at the end. ASC-ready PNGs land at `sales/appstore/iphone-6.5/` and `sales/appstore/ipad-13/`.
- New artisan command `codemeyo:seed-apple-tester` pre-populates the reviewer test account on the backend with the Pro entitlement, a non-zero credit balance, and a clean purchase history so the screenshots show real numbers without manual setup.

## [1.10.29] - 2026-05-05

### iOS — privacy manifest accepted by Apple's stricter validator

- v1.10.28 was rejected with ITMS-91056 even though v1.10.25–27 with the same manifest had been accepted. Verified that the `.ipa` Apple received was identical to source — so Apple's validator got stricter, not the build pipeline. v1.10.29 adds three additional required-reason API declarations (file timestamp, system boot time, disk space) covering the framework calls the binary actually contains. Also adds a post-resign manifest verify gate so any future regression fails the build immediately instead of being caught 30 minutes later by Apple.

### Phone-to-desktop pairing actually works now

- The phone could complete the pair on the server, but the desktop never knew about it. The desktop now subscribes to its own pair channel as soon as the QR is shown and reacts in real time when the phone redeems the code. Sending typed messages, approving / denying agent permission prompts, and stopping a running agent from the phone all dispatch correctly to the desktop.

### QR code on the desktop pair tile is reliably scannable

- The desktop was encoding the long signed pair payload, which produced a dense QR that mobile cameras struggled to decode. Switched to the short `codemeyo://pair/<CODE>` deep link, lower density, with a proper quiet zone — the QR now scans on the first try.

### codemeyo.com sign-in and dashboard navigation work after the Redis flip

- v1.10.27's switch to Redis-backed sessions surfaced a latent issue where signed-in users were being redirected to a non-existent verify-email screen. Removed the unused email-verification gate, isolated session storage onto its own dedicated Redis connection so it can't collide with the cache store, and documented the new session/cache/queue Redis layout in `.env.example`.

## [1.10.28] - 2026-05-05

### Hotfix: blank-screen crash when JagAI or SideKick is the active provider

- After v1.10.19 added JagAI and SideKick as first-class providers, three lookup tables in the desktop app weren't updated to include them — the title bar, message bubbles, and the usage panel's session breakdown. If a user's active provider was JagAI or SideKick when the app started, the title bar tried to read `.color` on a missing entry and the whole window blanked out with a `Cannot read properties of undefined (reading 'color')` runtime error. v1.10.28 adds JagAI and SideKick to all three lookup tables, brand-colors message bubbles + usage cards correctly for them, and adds a defensive fallback so any future provider id added without a matching lookup entry can never blank-screen the app again.

## [1.10.27] - 2026-05-05

### codemeyo.com — Credits dashboard redesign + admin polish + faster page loads

- **Redesigned the Credits dashboard at codemeyo.com/dashboard/credits.** The page now opens with a prominent balance card and three tabs: **Purchase** (the default — pick a credit pack and check out via Stripe), **Transactions** (your purchase + spend history with running balance and Stripe receipt links), and **Help** ("What's Included with your JagAI All-in-One Credits" — a clear breakdown of what credits route to across Apex / Nova / Spark tiers, plus the credit math, fee passthrough, expiry, and cross-device sync). Tabs deep-link via `?tab=purchase|transactions|help` so you can share specific views, and they collapse to a dropdown on mobile.
- **Admin panel got a brand refresh and is faster.** Filament now uses the CodeMeYo orange + violet palette, navigation is grouped into Customers / Billing / Analytics / Content / Remote / System with the most-used screens up top, and dashboard stats (users, active Pro, MRR, last-30d usage) plus the revenue chart and usage rollups are now Redis-cached for 60–300 second windows so opening the panel is instant after the first hit.
- **Server now uses Redis** for cache and session storage. Page loads on codemeyo.com that read settings, feature flags, or the dashboard are noticeably faster, and signed-in sessions persist across deploys instead of being flushed.

## [1.10.26] - 2026-05-05

### Fix: Android — force 16 KB memory page alignment so Google Play accepts the upload

- Google Play (since late 2025) rejects new uploads whose native `.so` files aren't loadable on Android devices that use 16 KB memory pages. v1.10.24's release was blocked with the message "Your app does not support 16 KB memory page sizes." The repo has had a Cargo config setting the linker flag for this since v1.10.15, but the build pipeline was apparently not honoring it — the `libcodemeyo_lib.so` shipping in our `.aab` still had 4 KB-aligned segments. v1.10.26 sets the linker flag via the higher-precedence `RUSTFLAGS` environment variable in the build pipeline, which produces the correct 16 KB alignment, and adds an automated check that fails the build immediately if a future regression slips back to 4 KB. End result: the `.aab` produced by v1.10.26 onward is accepted by Google Play.

## [1.10.25] - 2026-05-05

### Fix: TestFlight iOS — Apple's stricter privacy manifest validator

- v1.10.24 uploaded clean and passed Apple's initial validation, but Apple's deeper post-upload review flagged it Invalid Binary with ITMS-91056 ("Invalid privacy manifest — keys and values must be valid"). The actual privacy manifest CONTENTS were the same as v1.10.18 (which Apple accepted previously), so the regression was in something else: the privacy manifest had ~50 lines of XML comments at the top, and Apple's stricter 2026 manifest validator now rejects manifests whose XML comments aren't tolerated by its parser. v1.10.25 ships PrivacyInfo.xcprivacy as bare XML with no comments — same exact 4 collected data types and same single required-reason API declaration as v1.10.18, just without the documentation comments. Build pipeline also gains a `plutil -lint` validation step that fails any future regression in 1 second instead of being caught 30 minutes later by Apple's review.

## [1.10.24] - 2026-05-04

### Fix: iOS upload — strip XML-spec violation from entitlements file

- v1.10.23's iOS entitlements file had a documentation comment block at the top whose body contained literal double-hyphens (in lines describing the `--entitlements` and `--force` flags). XML 1.0 §2.5 forbids `--` inside `<!-- -->` comments, and Apple's AMFI XML parser correctly rejects it during the codesign step. v1.10.24 ships the entitlements file as bare XML with no comments, and adds a `plutil -lint` validation gate in the build pipeline so any future regression fails immediately with a clear error rather than a 7-minute build that aborts mid-codesign.

## [1.10.23] - 2026-05-04

### Fix: iOS build can finish — drop conflicting pre-build entitlements copy

- v1.10.22 added all five App Store entitlements to the iOS entitlements file but kept a build step that copied that file in BEFORE Tauri's initial build. Tauri's initial build signs against the auto-managed wildcard dev profile, which doesn't have `beta-reports-active` and uses `get-task-allow=true` — so Xcode rejected the build before it even started compiling. v1.10.23 leaves Tauri's initial build alone (default empty entitlements), and the existing post-export re-sign step plants all five distribution entitlements directly into the .ipa right before upload. End result is the same correct binary; the build can now actually run.

## [1.10.22] - 2026-05-04

### Fix: TestFlight iOS upload, take 3 — restore the four base entitlements

- v1.10.21's post-export re-sign step replaced the binary's entitlements with only `applinks:codemeyo.com` and accidentally wiped out the four base entitlements every iOS build needs (`application-identifier`, `team-identifier`, `get-task-allow`, `beta-reports-active`). Apple's upload service rejected with code 90075 ("application-identifier entitlement is missing"), but the build job swallowed that error and reported success — which is why v1.10.20 and v1.10.21 showed up on the macOS TestFlight tab without a matching iOS build, even though the pipeline appeared green. v1.10.22 restores all five entitlements in the source file and makes the build job fail loud whenever the iOS upload errors, so this exact failure mode can't repeat silently.

## [1.10.21] - 2026-05-04

### Fix: TestFlight upload, take 2 — re-sign survives the build pipeline

- v1.10.20 tried to fix the v1.10.19 Invalid Binary failure by adding an explicit iOS entitlements file. The fix was correct but a pre-existing tool on the build pipeline reverted the entitlement late in the process, so the four build retries kept producing a binary that didn't match its provisioning profile. v1.10.21 adds a final re-sign step after the build completes so the entitlement is guaranteed to land in the .ipa that gets uploaded to App Store Connect. Same outcome as intended in v1.10.20, just with a more robust mechanism.

## [1.10.20] - 2026-05-04

### Fix: TestFlight upload no longer flips to "Invalid Binary"

- v1.10.19 uploaded successfully but App Store Connect's deeper post-upload review marked the build "Invalid Binary" because the iOS app's signed entitlements were missing the Universal-Links capability that its provisioning profile required. v1.10.20 ships an explicit iOS entitlements file declaring `applinks:codemeyo.com`, so the binary's entitlements now match the profile and Apple's review accepts the upload. No user-visible change beyond "the build can actually be tested."

## [1.10.19] - 2026-05-04

### JagAI — fixes for users running JagAI on its own

- **The Enabled checkbox for JagAI (All-in-One) now persists when you relaunch the app.** Previously it would silently revert to off after every restart. Toggle once and it stays.
- **JagAI now works standalone** — you no longer need a Claude / GPT / Grok / Gemini / DeepSeek API key configured underneath for JagAI to fire. Toggle JagAI on, leave everything else off, pick a JagAI model, and chat.
- **JagAI is now a button in the chat top bar.** Up through v1.10.18 the chat header listed every other provider but JagAI itself was missing, so users with JagAI enabled and every other provider disabled had no way to actually select JagAI in the chat. Now there's a JagAI button there whenever JagAI is enabled.
- **SideKick is now a chat top-bar button too**, for the same reason — it was previously enabled in Settings but invisible in the chat selector.
- **Distinct JagAI + SideKick brand colors** so the new buttons read at a glance against Claude, Grok, GPT, etc.

### iPhone + iPad sign-in is one tap from anywhere

- **New Account tab on the bottom nav.** v1.10.18 added the in-app sign-in form Apple required, but the form was only reachable via the Remote → "Sign in" prompt — testers landing on Chat or Settings looked for a sign-in CTA, found none, and concluded the app couldn't be signed into. The bottom nav now surfaces an Account tab so the email + password form is one tap from anywhere on iPhone and iPad. Help → moved into Settings, where it already lives on desktop.

## [1.10.18] - 2026-05-01

### iOS App Store compliance — re-submission for v1.10.17 rejection

- **In-app sign-in only on iPhone and iPad.** The "Open sign-up in browser", "Sign in with device code (browser)", and "Reopen approval page" CTAs that bounced users out to Safari for sign-up / sign-in are now hidden on iOS. The native email + password form already shipping in the app remains the only sign-in path on iOS — desktop and Android keep the convenience web handoffs.
- **All Pro subscribe / billing flows on iOS go through the App Store.** Buttons that opened Stripe checkout in the system browser ("Subscribe to Pro", "Manage Credits", "Manage billing", "Open dashboard", "Pair with phone" web link, "Upgrade" on the Pair screen) are hidden on iOS. The existing StoreKit subscription flow in Settings → Subscription & Billing is the only Pro-purchase path on iOS, exactly as Apple requires.
- **Auto-update notification banner removed on iOS.** Auto-updates are handled by the App Store on iOS, so the in-app update banner has no purpose there and previously contained an external sign-up link.
- **Belt-and-suspenders Rust guards.** Even if a stale UI ever attempted to call the magic-link or device-code Tauri commands on iOS, the Rust side now refuses to launch the system browser on iOS targets.

### iOS privacy + compliance

- **Privacy manifest shipped.** Every iOS build now includes `PrivacyInfo.xcprivacy` declaring exactly what the app collects (email, name, user ID, App Store purchase history — all linked to the user, none used for tracking, all used only for app functionality), the absence of tracking domains, and the required-reason API declaration for the `UserDefaults` access the embedded WebView performs.
- **Encryption export compliance answered automatically.** The app's `Info.plist` now ships with `ITSAppUsesNonExemptEncryption=false` so App Store Connect no longer leaves the build in "Missing Compliance" state on every upload. (CodeMeYo only uses standard TLS for API calls, which is exempt under U.S. EAR §740.17(b).)

## [1.10.17] - 2026-05-01

### Pair Device — hotfix: pair-code generation no longer hangs
- **Fixed: desktop QR tile stuck on "Generating QR…" forever after v1.10.16.** The error-detail wrapper added around the `fetch` call in v1.10.16 was correlated with the `/pair/initiate` request never resolving on the desktop. Reverted that wrapper to the simple pre-v1.10.16 form. The Regenerate-button fix from v1.10.16 and the server-side same-joiner grace period both stay in place.

## [1.10.16] - 2026-05-01

### Pair Device — Regenerate works, retries don't get stuck on "already used"
- **Fixed: Regenerate button on the desktop pair tile didn't fire.** Up through v1.10.15 the button was permanently disabled after the first pair code was generated because the connection-status flag never transitioned out of "pairing". Click now correctly mints a fresh code.
- **Fixed: "Pair code has already been used" lockout when the phone's connect step failed.** Previously, if `/pair/complete` succeeded server-side but the WebSocket / relay handshake failed on the phone immediately after (very common on iOS as a generic "Load failed"), the session was already consumed and every retry returned 409. v1.10.16 adds a 60-second grace window: when the SAME joiner device retries with the same code inside that window, the server treats the second call as a no-op and re-emits the relay info so the user can connect without regenerating.
- **Better network-error diagnostics.** When the phone can't reach the backend at all (real network failure, ATS denial, blocked WAF rule, etc.), the error now includes the URL and a hint to toggle Wi-Fi / try cellular instead of the opaque "Load failed" iOS WebKit message. Surface for future debugging.

## [1.10.15] - 2026-05-01

### Pair Device — fixed "device id field is required" QR-scan error
- **Pairing now works without registering the phone first.** Up through v1.10.14, scanning the QR code or typing a pair code produced a "device id field is required" validation error because the phone hadn't called the device-registration endpoint first. v1.10.15 makes the server lazy-create a Device row from the request itself when the client doesn't provide one, so scan-to-pair works on a brand-new install with zero extra ceremony. The dashboard's Devices list still shows the phone correctly — its platform is detected from the user-agent (iOS / Android / desktop).

### Android — 16 KB memory page size support (Google Play requirement)
- **Fixed the Play Console 16 KB rejection.** The Rust runtime's native `.so` files are now linker-aligned to a 16 KB page boundary so they can load on Android 15+ devices that use 16 KB pages. Previously every Play release was rejected with "Your app does not support 16 KB memory page sizes." This affects only Android — iOS and macOS / Windows / Linux builds were never impacted.

## [1.10.14] - 2026-05-01

### Pair Device — back to 6-digit numeric codes
- **Pair codes are now 6 numeric digits, like SMS / 2FA / Apple ID / Google verifiers.** v1.10.13 briefly tried 8-character alphanumeric to maximise entropy, but every Apple TestFlight reviewer hit the alphanumeric keyboard mismatch on phone (the iOS numeric keyboard is one-handed and finger-friendly; the alphanumeric one is not). Switching to 6 numeric digits matches the universal SMS-code pattern users already know.
- **All input boxes are numeric on every device** — phone, tablet, desktop browser, web dashboard. The desktop simply renders the same numeric component; non-digits are silently dropped.
- **Defense in depth** — `/api/v1/pair/complete` is now throttled to 10 attempts/minute per user. Combined with the 5-minute TTL, single-use enforcement, and the existing requirement that the joiner own both the device and the pair session, brute-forcing a 6-digit code from another account is effectively impossible.
- **Public `/pair/{code}` landing page on codemeyo.com** updated to accept the 6-digit format; previously it would 404 anything that wasn't 8 chars.
- **iOS auto-fill works again** — `autoComplete="one-time-code"` lets iOS surface the SMS-style suggestion bar above the keyboard if the OS captured a code from a connected message.

## [1.10.13] - 2026-05-01

### Pair Device — phone QR scan & code entry now work
- **Fixed: phone could not type the desktop's pair code.** The phone app's pair-code box was hardcoded to 6 numeric digits while the desktop and web dashboard both display an 8-character alphanumeric code. Result: every paste failed and the QR scan silently dropped every payload because the extractor was also looking for 6 digits. Phone now uses a 8-box alphanumeric input with the same Crockford-readable alphabet (uppercase letters and 2–9, no I/O/0/1) the desktop has always shown, and an explicit on-screen reminder so users know what charset to type.
- **Fixed: QR scan never matched.** The QR-payload decoder now correctly recognizes the real 8-character format in all three forms — raw code, deep-link URL (`codemeyo://pair/...`), and signed JSON-in-base64 payload — plus a last-ditch substring scan so vendor QR readers that wrap the payload still work.
- All "enter the 6-digit code" copy across the desktop Settings panel, the in-app Remote pane, the website dashboard's "Pair with my phone" page, and the empty-input error message now correctly say "8-character code".

## [1.10.12] - 2026-05-01

### Credits & billing
- **Webhook double-grant prevention.** If a payment ever has to be recovered manually (server unreachable when Stripe first delivered the webhook, etc.) the system now correctly recognizes the eventual webhook retry as a duplicate and does not credit the same purchase twice.
- **LIVE / TEST mode badge on every transaction.** The transaction history on /dashboard/credits now shows a green LIVE badge for real charges and a yellow TEST badge for Stripe test-mode purchases, so it's instantly clear which environment a credit grant came from.
- **Cleaner Buy Credits cards.** The per-card "$X + $Y Processing Fee" math has been removed — just the final total is shown. The "Includes Processing Fee." hint above the grid covers the explainer.

### MCP server bundles
- **SHA-256 integrity verification on install.** When you install a `.mcpb` bundle that declares a `contentHash` in its manifest, CodeMeYo now verifies the file against that hash before extracting. Tampered bundles are refused with a clear error. Every successful install records the bundle's fingerprint for audit.
- **Bulk secrets API.** Save / load / delete every environment variable for an MCP server in one go instead of one-by-one. Backed by your OS keychain (Windows Credential Manager, macOS Keychain, Linux Secret Service).
- **Auth-token round-trip.** OAuth tokens stored by the PKCE flow can now be read back and cleared via the Settings panel, completing the symmetric save/load pair.
- **"Open install folder" support.** The MCP install path is now exposed to the Settings panel so you can jump straight to where a bundle landed on disk.

### Browser-debug & extension panel
- **Fine-grained extension state.** Connection status, current pairing token, console feed, and storage snapshot are each individually addressable from the UI now (instead of only the all-or-nothing status blob).
- **CDP connection pill.** Quick "is the DevTools debugger attached?" probe so the browser-debug toolbar can show a real-time connected/disconnected indicator without driving a roundtrip.

### JagAI credits
- **Faster balance refresh.** A dedicated balance endpoint replaces the full /me roundtrip after a chat turn, so the JagAI settings card stays current as deductions land server-side without the noticeable delay of the old path.

### README & marketing
- **Updated README** — current LLM lineup (Claude Opus 4.7, GPT-5.5, Grok 4.20 family, Gemini 3.1 Pro, DeepSeek V4) plus first-class explanations of the JagAI credits flow and SideKick (Claude Pro/Max via Claude Code CLI) modes.

## [1.10.11] - 2026-05-01

### JagAI multi-agent reliability
- **Deep Think, Consensus, and Round Robin now only fan out to JagAI providers you actually have keys for.** Previously, picking JagAI in multi-agent modes always tried Claude + GPT + Grok regardless of which keys were configured, so requests for unconfigured providers failed. Now the desktop client checks which JagAI providers are available and only routes to those.
- **Smarter failure messages.** If a multi-agent run can't get enough working providers to debate, the error now tells you exactly which providers failed and why — instead of a generic "need at least 2 providers."
- **Boilerplate filter.** Agents that respond with refusals, "I'm just an AI" disclaimers, or get stuck emitting fake tool-call text are now treated as failed analyses instead of feeding into the debate.

### Deep Think / Consensus UI polish
- **Mode-aware section labels.** The view now properly distinguishes Deep Think (adversarial debate) from Consensus (reconciliation). Phase pill, section headings, and per-agent labels all swap to match the mode you picked.
- **Failed agents are now visible.** When an agent's analysis fails, a red placeholder card appears in the analysis grid showing which agent dropped out — no more silently rendering two boxes when you had three agents.
- **Synthesis failures stop the spinner.** If the final synthesis step itself fails, the spinner now clears and a failure banner explains what happened, instead of spinning forever.
- **Cleaner section headers.** Section names no longer repeat the phase name (the pill strip already shows that) — just "Critiques" or "Reconciled Positions" instead of "Debate — Critiques" / "Reconcile — Reconciled Positions".

### Credits dashboard polish
- **Transaction history hides internal accounting rows.** Internal reservation/release pairs (the temporary holds we put on credits while a request is in flight) no longer clutter the history view. You only see actual purchases, deductions, refunds, comp credits, and expirations.

## [1.10.5] - 2026-04-30

### Mobile remote control — bidirectional mirror live
- **"Pair with mobile device" button now actually switches tabs.** Previously dispatched a custom event that nothing was listening for; App.tsx now wires up the listener.
- **Phone shows your PC's chat live.** When the phone is paired, every chat message you type / receive on the desktop is broadcast through codemeyo.com's relay channel onto your phone in real time.
- Phone activity feed now mirrors message updates (streaming → done) so the phone sees the same conversation flow as the PC.

### Admin
- **Per-provider toggle** at /admin → Settings → AI Provider Keys: enable / disable Anthropic, OpenAI, xAI, Google, DeepSeek, Mistral independently. Disabled providers return 503 from /api/v1/chat/completions and disappear from the customer-facing "Available models" list.
- **/dashboard/credits now shows the available models** for each user — full provider catalog with ON/OFF state so customers know exactly which upstreams their credits buy time on.

### Stripe consolidation
- **Single Stripe webhook URL** now handles donations + JagAI credits + Cashier subscriptions: `https://codemeyo.com/api/v1/stripe/webhook`. The legacy `/api/webhooks/stripe` route stays as a no-op fallback.
- Webhook signature verification reads from /admin → Settings → Stripe (test + live secrets), no env var required.

## [1.10.4] - 2026-04-30

### What changed since v1.10.2
v1.10.3 was tagged with a broken `tauri.conf.json` iOS config (inline `infoPlist` map instead of a path string), which failed every build. v1.10.4 supersedes it with the correct config plus everything that v1.10.3 was meant to ship:

### Mobile fixes — TestFlight feedback v1.9.86
- **Bottom navigation no longer clips on iPhone home indicator** — added explicit safe-area reservation so tabs render fully above the gesture bar even when the WebView's viewport-fit handling is shaky.
- **"Connect to your PC" flow on phone** — settings + remote tab now show the right copy when you're on a phone (you scan the PC's code, you don't host one). The pair button on mobile is now labeled "Scan PC's code" so testers know what they're doing.
- **No more useless phone-side pair codes** — the remote tab no longer auto-mints a pair session on mobile devices. Mobile users land directly on the QR scanner.
- **iOS camera permission** — added the camera, microphone, and photo-library usage descriptions so iOS actually shows the permission prompt when the QR scanner starts.
- **Cleaner Remote tab icon** — switched from a phone icon (testers misread as a camera) to a cable icon that better signals "your phone is connected to your PC".

### Credits — important policy fix
- **Credits expire 360 days from purchase if unused.** The /dashboard/credits page no longer claims "credits never expire" — that wording was incorrect. Per-batch FIFO consumption (oldest credits used first), nightly expiry sweep, full audit trail in the ledger so every expired batch is traceable to a purchase.
- Account dashboard now shows the **next expiration date + remaining credits in that batch** inline, so you always know which credits time out next.

## [1.10.2] - 2026-04-30

### Reliability
- Build pipeline now auto-retries up to 2 times on transient failures (network blips during App Store / Play Console uploads, runner heartbeat hiccups, Gradle daemon quirks). Real code-signing or manifest errors still fail fast.
- New "Sync to Stripe" admin action for the credit-pack catalog — one click creates Stripe Products + Prices for all active packs in the current Stripe mode (test/live). Existing prices stay intact so old receipts keep resolving.
- Checkout now prefers the synced Stripe Price when available, falling back to inline price-data otherwise. Both paths produce identical user-facing checkouts.

## [1.10.1] - 2026-04-30

### Added — JagAI in the desktop app
- **JagAI is now selectable in the provider list** — pick "JagAI (All-in-One)" and choose any of 12 models across the apex / nova / spark tiers (Claude Opus 4.7, GPT-5.5, Grok 4.20 Multi-Agent, Claude Sonnet 4.6, Grok 4.20, GPT-5.4 Mini, Gemini 2.5 Pro, Claude Haiku 4.5, GPT-5.4 Nano, Grok 4.1 Fast, Gemini 2.5 Flash-Lite, DeepSeek V4 Flash).
- **Manage Credits button** — opens your default browser pre-authenticated to your account dashboard so you can buy credits without typing a password again.
- **Live balance** in the JagAI settings card — see your credits and dollar equivalent at a glance, refresh on demand.
- No API keys to manage — your CodeMeYo sign-in is the only auth needed.

## [1.10.0] - 2026-04-30

### Added — JagAI: All your favorite AI models in one place
- **JagAI credit system on codemeyo.com** — One balance, every top model. Buy credit packs from `/dashboard/credits` (Starter $5.45, Builder $10.59, Pro $26.03, Power $51.75, Whale $103.20, Mega $257.55), no API keys required.
- **Stripe Checkout** with the processing fee passed through at cost as a separate line item — admin reports always show honest revenue.
- **Account dashboard "Credits" page** — current balance, full transaction history, one-click pack purchases.
- **Admin credit management** — admins can grant or deduct credits with a required note that's logged to the append-only ledger and to audit_logs (every adjustment is traceable).
- **Admin credit pack catalog** — add, disable, reprice, reorder packs without a deploy.
- **Admin AI provider keys** — manage Anthropic, OpenAI, xAI, Google, DeepSeek, and Mistral keys from one screen; rotation propagates within minutes.
- **Stripe TEST-mode banner** on `/dashboard/credits` so it's obvious when checkout is going through Stripe test cards.

### Reliability
- New append-only credit ledger with running balance snapshots — no recomputation on history reads, full audit trail on every credit movement (purchase, deduction, refund, comp, expiration, reservation, reservation release).
- Atomic balance mutations (`SELECT … FOR UPDATE` on the user row) so concurrent JagAI requests can't double-spend.
- Idempotent Stripe webhook for credit-pack purchases — Stripe retries (up to 75 hours) never grant the same credits twice.

### Notes
- The desktop app will gain a "JagAI" provider option in the next release; v1.10.0 ships the website + admin so the buy / manage / audit flow can be tested live.

## [1.9.86] - 2026-04-29

App Store Review compliance pass for the macOS build. The "Sign in for automatic updates" prompt no longer appears on macOS — the Mac App Store handles updates natively. macOS users who installed from the Mac App Store will now receive updates the standard way through the App Store app. Direct-download users can grab the latest .dmg from the GitHub releases page when a new version ships.

This release also tightens the macOS sandbox to use the minimum entitlements actually needed by the app, and addresses a few smaller App Store metadata items.

---

## [1.9.85] - 2026-04-29

Pro entitlement now correctly recognized after sign-in. Earlier builds had a field-name mismatch between the app and the account API that caused every signed-in account to appear as Free, even when Pro was active. This hid Pro-gated features (Remote PC pairing, mobile device pair flow) from users who had legitimately purchased or been granted Pro. Resolved.

The Refresh account status and Restore Purchases flows now also pull the correct tier on first try instead of silently retaining the old value.

---

## [1.9.84] - 2026-04-26

Same model lineup refresh as v1.9.83, this time delivered. v1.9.83's release pipeline hit two infrastructure issues (Android upload stale-bundle bug, iOS build-host platform refresh) that blocked the binaries from reaching the stores. Both fixed here.

The new models from v1.9.83 — Claude Opus 4.7, GPT-5.5, DeepSeek V4 Pro/Flash, Gemini 3.x previews, Qwen3 32B on Groq — now ship.

---

## [1.9.83] - 2026-04-26

Refreshed model lineup — Claude Opus 4.7 (Anthropic's newest flagship, with a step-change improvement in agentic coding), GPT-5.5 (OpenAI's newest frontier model), DeepSeek V4 Pro and V4 Flash, and the Gemini 3.x preview series are now available in the model picker. Groq's lineup adds Qwen3 32B for high-speed reasoning. Mistral Small 4 description updated to reflect its merged reasoning, vision, and code capabilities.

Models that the providers themselves have retired or deprecated are now clearly labeled so you can migrate before they're shut down.

Bug fix: corrected an internal Grok 4.20 Multi-Agent model identifier that previously caused that specific selection to fail. Other Grok models were unaffected.

---

## [1.9.82] - 2026-04-22

Android release polish — drops 32-bit ARM build to comply with Google Play's 64-bit requirement. All modern Android devices (2019+) support arm64, no user-visible change.

---

## [1.9.81] - 2026-04-22

Universal Links restored — opening `https://codemeyo.com/pair/<CODE>` now launches CodeMeYo on macOS and mobile directly. Plus release reliability polish (Apple upload + GitHub release sync auto-recover from network blips instead of failing outright).

Note: v1.9.80 was accidentally shipped with v1.9.79-labeled binaries due to a skipped version-bump step; the auto-updater loop it caused is resolved here.

---

## [1.9.80] - 2026-04-22

Skipped — internal release mis-tag (binaries inside the v1.9.80 release were still labeled 1.9.79). No functional difference from v1.9.79. Use v1.9.81 or later.

---

## [1.9.79] - 2026-04-22

Release reliability polish. No user-visible behavior change — the iPad launch-crash fix from v1.9.77 is now validated end-to-end in every release pipeline so it can't silently regress in a future build.

---

## [1.9.78] - 2026-04-22

Build-green follow-up. v1.9.78's release pipeline hit platform-signing wiring bugs (Mac/iOS/Android uploads couldn't complete). No user-facing change here on its own; the iPad launch-crash fix shipped in v1.9.77 remains in place, and the signing pipeline is fixed in v1.9.79.

---

## [1.9.77] - 2026-04-22

### Fixed
- **iPad launch crash.** Previous builds could fail to start on iPad because of a Swift runtime library that wasn't getting bundled. The minimum iOS version is now 15.0 (which ships that library in the OS), so the app launches reliably on every supported iPad and iPhone.

---

## [1.9.76] - 2026-04-22

Build-green follow-up to v1.9.75. v1.9.75's iOS build hit the same provisioning-profile mismatch macOS had — the deep-link plugin's mobile section auto-adds an entitlement the iOS provisioning profile doesn't yet carry. Dropped the mobile section for now (desktop custom-scheme `codemeyo://` still works). Universal Links on iOS + macOS are coming once the provisioning profiles are refreshed.

---

## [1.9.75] - 2026-04-22

Reliability-only follow-up to v1.9.73. Same user-facing fixes — profile auto-refresh on launch, pair device actually pairs, Windows sign-in sticks, QR panel shows errors clearly, `codemeyo://pair/<CODE>` scheme works on desktop. macOS Universal Links at `https://codemeyo.com/pair/<CODE>` are coming in a follow-up once our Mac App Store provisioning is refreshed; the in-app QR/code flow is the full end-to-end path in the meantime.

---

## [1.9.73] - 2026-04-21

### Fixed
- **Account tier auto-refreshes at launch.** If your Pro status changed on the server since the last time you opened the app — a new comp, a renewal, an expired subscription — CodeMeYo now re-syncs silently a moment after startup instead of waiting for you to hit the manual Refresh button.
- **Pair Device actually pairs.** Device pairing could fail with an "Unauthenticated" error even for signed-in Pro users, which also left the QR code stuck on "Generating QR…" forever. The pairing panel now uses your signed-in session correctly on the first try.
- **Windows sign-in now persists.** Your auth token is now saved to Windows Credential Manager as intended, so quitting and relaunching keeps you signed in without re-entering your password.
- **QR panel shows a clear error instead of hanging.** When a pair code can't be generated (e.g. you're signed out, or on Free tier), the QR tile now shows an error state pointing at the detail below it, rather than the indefinite "Generating QR…" spinner.

### Added
- **Deep-link support for `codemeyo://pair/<CODE>` and Universal Links.** Scanning a pair QR from your phone now opens CodeMeYo directly on desktop (via `codemeyo://`) or on iPhone (via `https://codemeyo.com/pair/<CODE>`), and auto-fills the code so pairing is one step instead of three.

---

## [1.9.70] - 2026-04-21

### Fixed
- **iPhone portrait and landscape layouts.** The bottom menu no longer gets clipped by the home indicator in portrait, and the left rail no longer disappears behind the Dynamic Island in landscape. Also polished the chat input and the title bar to respect every safe area.
- **Friendlier sign-in and billing error messages.** Raw server responses have been replaced with clear copy — "Sign-in failed. Check your email and password.", "Your Pro subscription has ended.", "Can't reach the server.", etc. — across the Sign-in and Upgrade screens.

### Added
- **Refresh account status.** Settings → Billing has a new "Refresh account status" button that re-syncs your Pro entitlement with your account on the fly, so you never have to reinstall to pick up a fresh subscription.

---

## [1.9.61] - 2026-04-21

### Added
- **In-app Pro subscription on iPhone + iPad.** Subscribe to CodeMeYo Pro directly inside the app using Apple's In-App Purchase — monthly or yearly. Pricing, auto-renewal terms, Terms of Use, Privacy Policy and Apple's EULA are all visible next to the subscribe button.
- **Restore Purchases.** Tap Settings → Billing → Restore Purchases to bring back an existing Pro subscription you already bought on another platform — no need to pay twice.
- **Manage Subscription.** A new link takes you straight to Apple's subscription settings so cancelling or changing plans is one tap away.
- **Delete your account from anywhere.** Settings → Account → Delete Account fully removes your CodeMeYo account, any active subscriptions, and all associated data after a password confirmation.
- **In-app sign-in.** Signing in now happens right inside the app — no more popping out to a browser. Enter your email and password and you're in.

### Changed
- CodeMeYo is no longer available on the App Store in China mainland. (Your existing installation continues to work.)
- The Settings → Billing area now shows "You're subscribed — next renewal: [date]" when Pro is active, so you can always see your status at a glance.

---

## [1.9.60] - 2026-04-20

### Added
- **SideKick with Claude (new).** Run CodeMeYo on your Claude Max / Pro subscription — no API key, no CodeMeYo Pro required. Install Claude Code, run `claude login` once, then pick "SideKick with Claude" in Settings → API Keys & Models. Usage is billed against your Claude subscription, not CodeMeYo. Auto-detects the CLI on launch with a re-check button and a clear "install / sign-in / active" indicator so you always know where you stand.
- **Your devices show up in your account.** Visit codemeyo.com/dashboard/devices and every machine you've signed into CodeMeYo on will be listed. Previously that page was always empty.
- **Daily cleanup of expired pair codes.** Old unused pair codes are now automatically cleaned up. Successful pairings stay untouched.

### Fixed
- **Android, iOS, and macOS store uploads now complete reliably** on every release. Some uploads in earlier versions were silently skipping due to signing / packaging quirks; fixed.
- More informative errors if anything in the release flow does fail, so we catch it immediately instead of hours later.

---

## [1.9.53] - 2026-04-20

### Added
- **iOS QR pairing works.** Open the iOS app → Remote PC Code → Scan QR, and the camera decodes the QR on screen and pairs you in one shot. Previously the QR tab on mobile was a placeholder and only the 6-digit code worked.
- Real QR image rendered on the desktop side too.

### Fixed
- **Revoke button** on the Pair Device page now works.
- **QR code** on the Pair Device page renders immediately instead of hanging on "Loading QR…".
- macOS TestFlight uploads are now reliably automated end-to-end.

---

## [1.9.52] - 2026-04-20

### Added
- **Remote PC Code is live.** Pair your phone with a signed-in desktop and drive the agent from anywhere. (Was previously gated behind a "Coming Soon" card.)

### Fixed
- Deep Think no longer shows duplicate proposals after multiple sends in the same conversation.
- macOS App Store uploads now include every icon size Apple validates.

---

## [1.9.51] - 2026-04-20

### Changed
- Every tagged release now ships to iOS, macOS, and Android stores automatically — tag a version and the new build lands in TestFlight (iOS + macOS) and Google Play Internal Testing without manual upload steps.

### Fixed
- Android version numbers now increment on every release (a prior quirk caused Google Play to silently dedupe uploads).
- Minor bug fixes.

---

## [1.9.50] - 2026-04-20

### Added
- **Pro — Remote PC Code.** Pair your phone with your desktop once, then drive your coding agent from anywhere. Send a new task, approve a risky tool call, or check progress from your phone even when you're away from your desk.
- The phone app also works standalone — write code and chat with LLMs on your phone without a desktop.
- **codemeyo.com Pair Device page** now lists your active pair codes and paired devices, with a one-click **Unpair** button for each.

### Fixed
- Mobile viewport rendering on iOS and Android — the UI now fills the full screen, including notched iPhones (no more cut-off bottom nav).
- Browser extension no longer logs a Chrome runtime async warning on some Stripe-related pages.

---

## [1.9.13] - 2026-04-20

### Fixed
- Your **codemeyo.com** account dashboard now loads with proper styling — no more unstyled Pair Device page.
- **Start pairing** on the web dashboard now works — you can generate a code from the browser without needing a device registered first.

---

## [1.9.12] - 2026-04-20

Reliability polish.

### Changed
- Release process hardened so every platform build is signed and shipped consistently. No user-facing behavior change — just fewer missed uploads.

### Fixed
- Release builds no longer fail spuriously during final cleanup.

---

## [1.9.11] - 2026-04-19

App Improvements for the better good of seamless updates.

### Added
- Tagged releases now ship to Play Console, TestFlight, and App Store Connect automatically on every version bump.

### Fixed
- Browser extension no longer logs a Chrome runtime async warning on some Stripe pages.

---

## [1.9.10] - 2026-04-19

### Added
- First iOS + macOS + Android store submissions to Apple App Store, Mac App Store, and Google Play (Closed + Open Testing tracks).
- Polished Google Play Console store listing with a full set of graphics (app icon, feature graphic, phone + tablet screenshots).

### Fixed
- Android local builds now produce a signed `.aab` suitable for Play Console upload.

---

## [1.9.7] - 2026-04-19

### Fixed
- Signed-in users now see their profile immediately on app start — no more "Loading your profile from codemeyo.com…" spinner while the server round-trip runs. The last-known profile renders instantly; the background refresh updates it silently.
- Shorter network timeout so any real connection issue surfaces as an error quickly instead of looking like an indefinite hang.

---

## [1.9.6] - 2026-04-19

### Added
- Android builds are now attached to the GitHub release so you can sideload from any platform.
- Homepage download buttons can be wired to direct download URLs per platform.

### Fixed
- Sign-in now truly persists across app restarts on all platforms — survives any OS keychain quirks.
- Homepage console errors cleaned up.
- The "Sign in for automatic updates" banner disappears immediately once you sign in.

---

## [1.9.4] - 2026-04-19

### Fixed
- Release pages are tidier — no stale installers from old versions showing up next to the current one.

---

## [1.9.3] - 2026-04-19

### Fixed
- Clean installer assets on release pages — no more leftover files from older versions showing up next to the current one.
- Sign-in nudge now disappears automatically once you sign in; the update check re-runs without needing an app restart.

---

## [1.9.2] - 2026-04-19

### Fixed
- **Sign-in now persists across app restarts.** If you signed in on 1.9.0 and had to re-enter your credentials every launch, that's fixed — your session is remembered.
- **Automatic data migration** for users updating from 1.5.x. If your API keys, conversations, or usage history appeared to be missing after the update, they're restored on the next launch.

---

## [1.9.1] - 2026-04-19

Small polish release on top of 1.9.0.

### Fixed
- Build + packaging fixes that affected some platforms in the previous release.

---

## [1.9.0] - 2026-04-19

Free accounts, a refreshed website, and a preview of what's coming next.

### Added
- **Free CodeMeYo accounts.** Sign in from the Account tab to get automatic updates and early access to new features. Your own API keys still stay on your device — nothing changes there.
- **Remote PC Code — Coming Soon.** A new tab in the app previews an upcoming feature that'll let you drive the desktop agent from your phone. Not live yet; sign in now to be among the first to try it.
- **Privacy-respecting telemetry (opt-in).** If you'd like to help us understand which providers and models get the most use, toggle it on in Settings → Privacy. Off by default. We never see prompts or code.
- **Refreshed donations page.** One-time or monthly options at codemeyo.com/donate.

### Changed
- **App identifier updated.** The app's internal identifier changed to `com.jagjourney.codemeyo`.
  - **Windows / Linux**: the installer updates in place. A one-time migration in 1.9.2 copies your settings, conversations, and API keys over automatically if anything landed in the wrong folder.
  - **macOS**: v1.9.0 may appear as a separate app alongside your existing install. Once you've confirmed everything carried over, you can delete the old icon.
- Website refresh at codemeyo.com with updated Privacy, Terms, and pricing information.

### Fixed
- Miscellaneous stability and login-flow fixes.

---

## [1.5.9] - 2026-04-18

### Added
- **In-app Changelog viewer** — A new "Changelog" tab under Help shows release notes for every version, fetched live from our public CHANGELOG. Current version is highlighted, older versions are collapsible, and you can search the whole history.
- **Release notes in the update prompt** — When the auto-updater detects a new version, you'll see what's actually changing before you click "Install".

### Improved
- Release notes are now backfilled all the way from v1.0.5, so every GitHub release page and every in-app changelog entry shows real, human-readable notes.

---

## [1.5.8] - 2026-04-18

### Fixed
- **Android builds no longer time out.** Android apps now build only for the ARM architectures real phones use (what the Play Store actually distributes), avoiding a multi-hour hang on an unused architecture.

---

## [1.5.7] - 2026-04-18

### Added
- **Full Git client** — Branch picker with search (switch / create / delete branches, protected-branch guard on main/master), commit composer with optional "amend last commit", Fetch / Pull / Push toolbar, and inline per-file stage, unstage, and discard buttons on every changed file. Stage-all and Unstage-all toggles included.
- **Robust terminal CLI** — Slash commands that mirror the whole GUI: `/project list|add|rm|switch`, `/git status|checkout|commit|push|pull|fetch|...`, `/chat new|list|switch|rename|delete`, `/mode code|chat`, `/strategy single|roundrobin|deepthink|consensus`, `/provider <name>`, `/status`, `/open <file>`, `/version`, `/help`, `/clear`. Accepts both `/cmd` and `cmy cmd`. Type `/help` in the terminal to see everything.
- **25 new MCP servers** in the registry: **Unreal Engine 5.7**, Unity, Blender, Meshy AI, Leonardo.ai, Canva, Figma, Adobe Express, Stability AI, ElevenLabs, Runway, cPanel / WHM, Cloudflare, Vercel, Netlify, Railway, DigitalOcean, Supabase, Firebase, MongoDB, MySQL / MariaDB, Redis, Notion, Linear, Jira, Asana, Google Calendar, Gmail, OpenAI DALL·E, Perplexity, Stripe, Shopify, and WordPress.
- **Help search** — Ctrl/Cmd+F in the Help tab searches across every feature description with term highlighting.
- **Remove projects** — Inline trash icon on each project in the dropdown. Keeps files on disk; just removes the entry from CodeMeYo.

### Improved
- Project list is now sorted alphabetically everywhere it appears — dropdown, CLI, title bar.
- Terminal now runs shell commands in your active project's directory automatically (no more hardcoded paths).
- Terminal keeps command history — Up/Down arrows navigate through the last 200 commands. Ctrl+L clears the screen.
- Terminal reacts live when you switch the active project.
- Theme stays consistent — all the new Git controls respect your light/dark theme automatically.

---

## [1.5.6] - 2026-04-18

### Added
- **GitHub-style Git diff viewer** — Click any file in the Git tab and see its changes with line numbers, color-coded additions and removals, unchanged-line context, and collapsible per-file cards. Monospace rendering preserves whitespace exactly.

### Improved
- Git panel reorganized into a split layout — file list on the left, live diff viewer on the right.

---

## [1.5.5] - 2026-04-18

### Fixed
- The LLM Providers and MCP Servers sections on codemeyo.com now render as proper cards matching the rest of the site's design.

---

## [1.5.4] - 2026-04-18

### Added
- **Deep Think visual state persists across app restarts.** When you reopen a Deep Think conversation, all four proposal cards, every critique, the final synthesis, and the phase-progress indicator are fully restored — not just the text response.
- Homepage at codemeyo.com fully refreshed — all 8 LLM providers highlighted, 22+ MCP servers listed by category, Deep Think and Conversation Mode featured, iOS/Android availability called out, privacy and terms pages linked.

---

## [1.5.3] - 2026-04-18

### Fixed
- macOS and iOS builds restored after a temporary interruption.

---

## [1.5.2] - 2026-04-18

### Fixed
- **Windows installer now appears on release pages.** A prior release published empty; fixed.
- **Auto-updater now detects Windows updates.**

---

## [1.5.1] - 2026-04-18

### Fixed
- **Folders now render as folders** in the file tree — they were previously showing as generic files.
- **File editor loads file contents** when you click a file — was showing blank.
- **Conversations no longer crash** when saving messages.
- **New conversations from the sidebar "+" button persist immediately** — previously they'd disappear on restart unless you sent a message first.

### Improved
- Subsequent Windows builds are much faster now.

---

## [1.5.0] - 2026-04-17

### Added
- **Writable code editor** — Edit any file directly in the app. Auto-saves 1.5 seconds after you stop typing, or Ctrl+S to save immediately. Supports 40+ languages with bracket colorization, minimap, find/replace, and format-on-paste.
- **Conversation rename** — Hover any conversation in the sidebar, click the pencil, rename inline.
- **Real folder icons in the file tree** — Closed folders vs open folders look different, color-coded files by extension (TypeScript blue, Rust orange, Python green, JSON yellow, images green, and more).

### Fixed
- **All AI responses now persist across app restarts** — Deep Think conversations with Claude, Grok, OpenAI, and Gemini no longer vanish when you close the app.

### Improved
- Linux release builds are much faster.

---

## [1.0.11 — 1.0.12] - 2026-04-17

### Fixed
- **Windows desktop app no longer crashes on startup.** Networking now works correctly on every platform.

---

## [1.0.10] - 2026-04-17

### Fixed
- Android cross-compilation reliability improved.

---

## [1.0.9] - 2026-04-17

### Fixed
- iOS signing works reliably on every release.

---

## [1.0.7] - 2026-04-17

### Improved
- Release builds run faster and have more headroom before timing out.

---

## [1.0.5] - 2026-04-17

### Changed
- **Version numbering fixed to strict semver.** No more leading zeros like `1.0.012` — the auto-updater requires valid semver to detect new releases.

---

## [1.0.000] - 2026-04-13

### Added
- Full 5-platform automated release pipeline: Windows, macOS, Linux, iOS, Android.

---

## [0.2.910] - 2026-04-13

### Fixed
- **Chat + Deep Think no longer scans your codebase.** Chat mode is completely tool-free across all strategies — it's pure conversation, no file access.

---

## [0.2.900] - 2026-04-13

### Added
- **iOS build support.**
- **Android build support.**
- **Desktop and mobile feature gating** — mobile builds skip desktop-only capabilities (like screen capture and browser integration) gracefully.

### Fixed
- **Chat mode** no longer injects project context when it shouldn't.
- **Chat + Deep Think / Consensus** strategies are now respected correctly.
- Fixed a "no tools specified" error that could show up on some providers in Chat mode.
