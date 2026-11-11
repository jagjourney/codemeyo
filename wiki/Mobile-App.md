# Mobile App

CodeMeYo ships as **iOS** and **Android** apps in addition to the desktop app, all from the same Tauri 2 + React codebase. The mobile experience is lean-in: keep the laptop for heavy editing, use the phone for chat and Remote PC Code.

Mobile builds ship alongside desktop since v1.0.000. Bundle ID is `com.jagjourney.codemeyo` on both platforms.

---

## Where to get it

- **iOS** - App Store and TestFlight, as Apple approves each build.
- **Android** - Google Play, as Google approves each build.

Store links appear on [codemeyo.com/download](https://codemeyo.com/download) as each listing opens.

---

## System requirements

| Platform | Minimum |
|---|---|
| iOS | iOS 15+ |
| Android | Android 10 (API 29) or later |

### Architectures

- **iOS:** arm64 only (all iPhones and iPads going back to iPhone 5s are arm64).
- **Android:** **aarch64 + armv7** only. We dropped x86_64 Android builds in v1.5.8; the Play Store distributes to real phones (all ARM) anyway. Emulators that need x86_64 can use [desktop CodeMeYo](Getting-Started) instead.

---

## Installing

### iOS (TestFlight, preview)

1. Open the TestFlight invitation link on your iPhone or iPad.
2. Accept the invite - TestFlight installs itself if you don't have it.
3. Install CodeMeYo via TestFlight.
4. Launch. Sign in with your free codemeyo.com account.

### Android (Play Open Testing, preview)

1. Open the Play Store link from [codemeyo.com/download](https://codemeyo.com/download).
2. Tap **Become a tester**.
3. Install from the Play Store.
4. Launch. Sign in.

### Sideload (advanced, Android only)

For users who want to sideload the `.apk` directly (bypassing Play Store):

1. Download the signed `.apk` from [codemeyo.com/download](https://codemeyo.com/download) when it is offered for your version.
2. Enable **Install from Unknown Sources** in Settings → Security.
3. Open the APK and confirm.

iOS does not allow sideloading without a developer account, so this path is Android-only.

---

## Signing in

Same account system as desktop - [Account System](Account-System).

- **Device-code flow** - recommended on mobile. Tap **Sign in**, a browser opens with a short code, you confirm on the website, the app signs in automatically.
- **Email + password** - supported but less pleasant to type on mobile. Works for folks who prefer it.

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
| Screenshots (xcap) | No | Desktop only - `xcap` is the only crate we compile-gated out for mobile. |
| Account panel | Yes | Sign in, subscription, device list |
| Remote PC Code | Yes | 6-digit code + QR. Pro / Team / monthly support. |

Mobile-specific UI lives behind `@media (max-width: 768px)` in CSS and the `<MobileNav>` bottom tab bar (Chat, Files, Git, Settings, More). Desktop is not touched by mobile styles.

---

## Remote PC Code

Live in the app. Sign in on both devices. Desktop needs Pro, Team, or monthly support.

1. On desktop, open the **Remote** tab. It shows a 6-digit code and QR.
2. On the phone, open Remote, scan or type the code.
3. Send a task. The **desktop** agent runs it on the open project.
4. Approve, Deny, or Stop from the phone. Keep the phone app open for approvals until push ships.

Still being finished: sessions longer than five minutes and joining a shared conversation.

---

## Platform-specific quirks

### iOS

- **Guideline 5.1.1(v)** - the app is intentionally usable without an account. Sign-in is optional, only gates updates + Remote PC Code + optional Pro.
- **Privacy nutrition labels** - the App Store listing shows the declared data types. Short version: we collect email + device name + (opt-in) aggregate LLM provider usage counts. Nothing else.
- **Keyboard handling** - the input bar sticks to the bottom above the keyboard on iOS. If it doesn't on your device, file a bug.

### Android

- **Data Safety disclosure** - shown on the Google Play listing. Mirrors iOS privacy labels.
- **No Play Games Services** - we don't integrate. No leaderboards, no cloud saves via Google.

---

## Upgrading across the bundle-ID rename (v1.9.x)

If you installed v1.8.x or earlier, that was under the `com.codemeyo.app` bundle ID. On mobile:

- **iOS:** TestFlight / App Store treats `com.codemeyo.app` and `com.jagjourney.codemeyo` as two different apps. You'll see both until you manually delete the old one. Your old conversation history is in the old app's sandbox and doesn't migrate automatically - we recommend starting fresh on v1.9+ for a clean slate.
- **Android:** Same deal. Uninstall the old app, install the new.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| App won't accept my password | Device-code login is more reliable on mobile. Tap **Sign in via browser**. |
| Can't pair with desktop | Sign in on both. Desktop needs Pro, Team, or monthly support. Use a fresh code from the desktop Remote tab. |
| Auto-update never finds a new version | Mobile updates come from the App Store / Play Store, not our updater endpoint. Check for updates in the store. |
| `xcap`-related crash | Shouldn't happen - `xcap` is compile-gated out of mobile builds. File a bug with logs. |
| MCP server won't start | stdio servers can't run on mobile. Use HTTP/remote MCP servers instead. |

---

## Related pages

- [Account System](Account-System)
- [Getting Started](Getting-Started)
- [Auto-Updater](Auto-Updater) - desktop only
- [Changelog](https://codemeyo.com/changelog) - mobile changes in each release
