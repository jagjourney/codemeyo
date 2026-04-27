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
