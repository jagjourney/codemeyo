# Mobile App

CodeMeYo ships as **iOS** and **Android** apps in addition to the desktop app — all built from the same Tauri 2 + React codebase. The mobile experience is responsive, touch-first, and designed to be "lean in" rather than "do-all" — you keep your laptop for the heavy editing and drive the mobile app for planning, chat, and (eventually) Remote PC Code.

Mobile builds ship in CI alongside desktop since v1.0.000. Bundle ID is `com.jagjourney.codemeyo` on both platforms.

---

## Current distribution status (v1.9.1)

- **iOS** — TestFlight preview. App Store submission is queued, awaiting review turnaround.
- **Android** — Play Open Testing. Play Store public listing pending.

Install URLs (fill in after tomorrow's submissions):

| Platform | Install URL |
|---|---|
| iOS (TestFlight) | **TK — pending App Store Connect approval** |
| Android (Play Open Testing) | **TK — pending Play Console listing** |
| iOS (App Store, public) | Not yet |
| Android (Play Store, public) | Not yet |

TODO: once the submissions resolve, swap the TK placeholders for the real URLs. The build-submission plan is in `docs/APPLE_APP_STORE_SUBMISSION.md` and `docs/GOOGLE_PLAY_SUBMISSION.md`.

---

## System requirements

| Platform | Minimum |
|---|---|
| iOS | iOS 15+ |
| Android | Android 10 (API 29) or later |

### Architectures

- **iOS:** arm64 only (all iPhones and iPads going back to iPhone 5s are arm64).
- **Android:** **aarch64 + armv7** only. We dropped x86_64 Android builds in v1.5.8 because the cross-compile was timing out at ~2 hours on Windows runners, and the Play Store distributes to real phones (all ARM) anyway. Emulators that need x86_64 can use [desktop CodeMeYo](Getting-Started) instead.

---

## Installing

### iOS (TestFlight, preview)

1. Open the TestFlight invitation link on your iPhone or iPad. (TK — link will be posted in the in-app announcement banner and the `#codemeyo` channel.)
2. Accept the invite — TestFlight installs itself if you don't have it.
3. Install CodeMeYo via TestFlight.
4. Launch. Sign in with your free codemeyo.com account.

### Android (Play Open Testing, preview)

1. Open the Open Testing URL. (TK.)
2. Tap **Become a tester**.
3. Install from the Play Store.
4. Launch. Sign in.

### Sideload (advanced, Android only)

For users who want to sideload the `.apk` directly (bypassing Play Store):

1. Download the signed `app-release.apk` from the [GitHub Releases page](https://github.com/jagjourney/codemeyo/releases) for the version you want.
2. Enable **Install from Unknown Sources** in Settings → Security.
3. Open the APK and confirm.

iOS does not allow sideloading without a developer account, so this path is Android-only.

---

## Signing in

Same account system as desktop — [Account System](Account-System).

- **Device-code flow** — recommended on mobile. Tap **Sign in**, a browser opens with a short code, you confirm on the website, the app signs in automatically.
- **Email + password** — supported but less pleasant to type on mobile. Works for folks who prefer it.

Once signed in, the mobile app registers itself as a device on your account (`POST /api/v1/devices/register`). See [/dashboard/devices](https://codemeyo.com/dashboard/devices) to manage.

---

## Feature parity with desktop

The mobile app is **intentionally lean**. Some desktop features don't make sense on a phone, and some are gated by OS limitations.

| Feature | Mobile? | Notes |
|---|---|---|
| Chat with any of 8 LLM providers | Yes | Full BYOK, same keychain-backed storage |
| Code mode (agent writes files) | Yes, for paired sessions | In local-only mode, no filesystem to write to |
| Deep Think | Yes | All strategies work |
| Conversation Mode | Yes | Multi-LLM roundtable |
| MCP servers | Partial | stdio servers can't run on iOS/Android. HTTP MCP servers work. |
| Monaco editor | No | Hidden on mobile (`@media max-width: 768px` kills it). Falls back to `<pre>` blocks for code display. |
| Terminal | No | Hidden on mobile. No shell on iOS; Android's shell isn't useful. |
| File explorer | Simplified | Shows paired desktop's tree when remote-connected; otherwise empty. |
| Git panel | Simplified | No inline diff viewer on mobile. |
| Browser debug (CDP + extension) | No | Desktop only. |
| Screenshots (xcap) | No | Desktop only — `xcap` is the only crate we compile-gated out for mobile. |
| Account panel | Yes | Sign in, subscription, device list |
| Remote PC Code | **Coming Soon** | See below |

Mobile-specific UI lives behind `@media (max-width: 768px)` in CSS and the `<MobileNav>` bottom tab bar (Chat, Files, Git, Settings, More). Desktop is not touched by mobile styles.

---

## Remote PC Code

**Coming Soon.** The headline feature for mobile.

Once it opens up:

1. On your desktop, open the **Remote** tab in the sidebar.
2. Get a short pair code (6 characters).
3. On your phone, open the Remote tab and enter the code.
4. WebSocket pairing completes. Your desktop's project, file tree, chat, and agent are now driven from your phone.
5. Start a task on the couch. Check progress from dinner. Keep shipping.

**Status (v1.9.1):** The Remote tab on both desktop and mobile currently shows a "Coming Soon" teaser. The pairing endpoints at `POST /api/v1/pair/initiate` and `POST /api/v1/pair/complete` exist server-side — the WebSocket transport + UI is what's still being polished. See `src/components/remote/RemotePanel.tsx`:

```jsx
// Remote PC Code is not yet available for public use. We show a teaser
// here so signed-in users know it's on the roadmap. When we open the
// feature up, restore the useRemoteStore wiring + Pro-tier gate + the
// PairingView / ConnectedView branches that previously lived here.
```

**Pricing at launch:**

- Remote PC Code will be a **Pro feature**, not free.
- **Apple App Store IAP:** higher price (covers Apple's 30% cut).
- **Google Play Billing:** same tier.
- **Web purchase:** not offered. Apple's DMA compliance path lets us link out to a cheaper web price but we've decided not to — keeps the billing flow simple.

No ship date promised. Sign in with a free account to be in the early-access queue.

---

## Platform-specific quirks

### iOS

- **App Store Review Guideline 4.8** — once the app offers third-party logins (it will, when Sign in with Apple web lands), we'll need to add Sign in with Apple as an option. Routes for it are stubbed in `website-app/routes/web.php` (`/auth/apple` / `/auth/apple/callback`), waiting on credentials.
- **Guideline 5.1.1(v)** — the app is intentionally usable without an account. Sign-in is optional, only gates updates + Remote PC Code + optional Pro.
- **Privacy nutrition labels** — see `docs/APPLE_PRIVACY_NUTRITION_LABELS.md` for the declared data types. Short version: we collect email + device name + (opt-in) aggregate LLM provider usage counts. Nothing else.
- **Keyboard handling** — the input bar sticks to the bottom above the keyboard on iOS. If it doesn't on your device, file a bug.

### Android

- **Tauri Android init** was done in v0.2.130. Project scaffolding lives at `src-tauri/gen/android/`.
- **Data Safety disclosure** — see `docs/GOOGLE_PLAY_DATA_SAFETY.md`. Mirrors iOS privacy labels.
- **No Play Games Services** — we don't integrate. No leaderboards, no cloud saves via Google.
- **Proguard rules** — `proguard-tauri.pro` references `com.jagjourney.codemeyo.TauriActivity` post-bundle-ID rename. If you're modifying the Android native integration, keep that path in sync.

---

## Upgrading across the bundle-ID rename (v1.9.x)

If you installed v1.8.x or earlier, that was under the `com.codemeyo.app` bundle ID. On mobile:

- **iOS:** TestFlight / App Store treats `com.codemeyo.app` and `com.jagjourney.codemeyo` as two different apps. You'll see both until you manually delete the old one. Your old conversation history is in the old app's sandbox and doesn't migrate automatically — we recommend starting fresh on v1.9+ for a clean slate.
- **Android:** Same deal. Uninstall the old app, install the new.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| App won't accept my password | Device-code login is more reliable on mobile. Tap **Sign in via browser**. |
| Can't pair with desktop | Remote PC Code is still Coming Soon. You're seeing the teaser — there's no actual pairing flow yet. |
| Auto-update never finds a new version | Mobile updates come from the App Store / Play Store, not our updater endpoint. Check for updates in the store. |
| `xcap`-related crash | Shouldn't happen — `xcap` is compile-gated out of mobile builds. File a bug with logs. |
| MCP server won't start | stdio servers can't run on mobile. Use HTTP/remote MCP servers instead. |

---

## Related pages

- [Account System](Account-System)
- [Getting Started](Getting-Started)
- [Auto-Updater](Auto-Updater) — desktop only
- [Roadmap → Remote PC Code](Roadmap)
- [Release Notes](Release-Notes) — v0.2.130 and later for mobile milestones
