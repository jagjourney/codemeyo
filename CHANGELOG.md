# Changelog

Customer-facing additions, improvements, and fixes for CodeMeYo.

## Unreleased

## [1.11.4] - 2026-08-26

### Fixed

- On Apple, Settings billing no longer shows a greyed-out Use the App Store on Apple button. Subscribe Monthly and Subscribe Yearly remain the working App Store purchase buttons.

## [1.11.3] - 2026-08-26

### Added

- Paste, pick, or drag documents, spreadsheets, presentations, source files, archives, images, and other files into Chat or Code mode.
- File attachments now stay with saved and forked conversations.

### Improved

- CodeMeYo extracts readable file content for every model and keeps original files available to tool-capable coding agents for deeper inspection.
- Images keep their real file type when sent to vision-capable models.

## [1.11.2] - 2026-08-25

### Improved

- Signed-in users can now find Delete Account directly under Account > Privacy.
- Account deletion now signs out every device immediately and clearly explains permanent deletion timing and App Store subscription handling.

## [1.11.1] - 2026-08-23

### Added

- Added an All Projects tab where you can search, open, add, and remove every project CodeMeYo knows about.
- Added multi-folder selection so you can bring several existing projects into CodeMeYo at once.
- Added quick actions to continue working in a project or open its folder on your computer.
- Added a Mac App Store choice to the CodeMeYo download page alongside the direct macOS download.

### Improved

- The left navigation now follows a clearer Chat, Projects, Files, Git workflow.
- Project management clearly identifies the active project and explains that removing a project from CodeMeYo never deletes its files.
- Project management is available from the command search as well as the left navigation.

### Fixed

- On Apple, Account Plan now shows App Store subscribe buttons, prices, length, Terms of Use, and Privacy Policy. Play Store wording is gone from Apple builds.
- Adding the same folder more than once now selects the existing project instead of creating duplicates.
- CodeMeYo now protects unsaved file changes when removing a project and closes that project's open file references after removal.
- Activity history is no longer displayed in customer dashboards.

## [1.11.0] - 2026-08-19

### Added

- Right-hand Activity bar now has a Subagents tab. Set workers from 1 (main agent only) up to the max for the active provider. Extra workers are billed as more model usage and show live while they run.

## [1.10.61] - 2026-08-18

### Improved

- Reliability and account improvements.

## [1.10.60] - 2026-08-17

### Support

- Official help is only available when usage sharing and crash reports are both on. If either is off, use GitHub issues.

### Remote

- Monthly support of $3 to $9,999 now unlocks phone-to-desktop pairing, the same as Pro. One-time gifts still do not.
- Phone apps can scan the desktop QR, see live tasks, and join the conversation from anywhere. Android now asks for camera permission so the scanner can open.

## [1.10.59] - 2026-08-17

### Bug reports fixed and Improvements made

- The in-app Changelog now loads from the CodeMeYo site.

## [1.10.58] - 2026-08-17

### Models

- Subscription chips now say Claude Code Sub, Codex Sub, and Grok Sub, each with its own color. API chips say Claude API, Grok API, and the other vendor keys.

## [1.10.57] - 2026-08-17

### Improvements and bug fixes

- Reliability and polish.

## [1.10.56] - 2026-08-17

### Updates from the CodeMeYo site

- In-app updates come from this site. Signed-in installs check every 30 minutes and can update in place.
- Release notes come from the public changelog on this site.

### Billing and usage

- Settings, You, Billing shows monthly support, gifts, and a Pay by Jag checkout for monthly or one-time gifts.
- Usage totals can help improve reliability when usage sharing is on.

## [1.10.55] - 2026-08-17

### Downloads from CodeMeYo

- Installers now come from the CodeMeYo site. If you are not signed in, leave your email once so we can send product notes.
- Signed-in accounts get in-app updates. Without an account, CodeMeYo tells you a build is out and sends you to the site to download it.

### Version and build

- The app now shows the marketing version and a Build number, the same way our other desktop apps do.

## [1.10.54] - 2026-08-17

### Official Claude, Codex, and Grok

- Those three official apps need a signed-in CodeMeYo account and monthly support of $3 to $9,999. One-time gifts do not unlock them.
- JagAI credits and pasted API keys still work if you are signed out or not a monthly supporter.
- Turning off usage sharing does not close a paid monthly window.

## [1.10.53] - 2026-08-17

### Easier to find things

- The left rail groups Work, You, and Settings. You can expand it for labels or collapse it to icons, and hide the side panel.
- The title bar now shows the version, the active model, Chat or Code, and the strategy.
- Settings uses tabs: Subscriptions, API keys, Agent, Privacy, Look, Help, and Changelog.

### Subscriptions and API keys are separate

- Subscriptions is Claude Code, Codex, Grok, and JagAI. API keys is the pasted-key path. Claude Code no longer appears twice.

### Extra tools

- MCP is now Extra tools. Start only what you need. Search, filter On or Off, and see a short description instead of a long command list.

### Updates and activity

- Changelog search sits next to Check for update. You can also check every 30 minutes from Privacy.
- While the agent works, an Activity drawer shows live status and you can collapse it.

## [1.10.52] - 2026-08-17

### Claude, Codex, and Grok subscriptions

- Settings now finds the official Claude, Codex, and Grok apps in their normal install folders, even when Windows does not put them on PATH.
- Grok subscription chats no longer fail or stop mid-reply. SuperGrok / grok.com serves Grok 4.6 and 4.5; older Grok IDs still need an API key.
- Longer JagAI replies no longer cut off mid-sentence.

## [1.10.51] - 2026-08-16

### Sending a message no longer closes the Windows app

- Sending a Chat message could close CodeMeYo on Windows. The window now stays open.
- If Claude or Grok is selected without an API key or connected subscription, you get a Settings message instead of a blank crash.

## [1.10.50] - 2026-08-16

### Current models in Settings

- The model picker now lists the current Claude, OpenAI, Grok, Gemini, DeepSeek, Mistral, and Groq models as of August 16, 2026, including speeds and prices.
- New defaults: Claude Sonnet 5, Grok 4.6, GPT-5.6 Terra, Gemini 3.7 Flash.
- JagAI credit tiers now route those current models (Opus 5, GPT-5.6 Sol, Grok 4.6, and the matching Nova and Spark picks).
- Groq no longer offers the Llama 3.1 / 3.3 IDs that shut down today. Use GPT-OSS or Qwen 3.6 instead.

## [1.10.49] - 2026-08-16

### Claude, Codex, and Grok without API keys

- Connect the official Claude Code, Codex, or Grok subscription from Settings so you do not need to paste vendor API keys.
- Claude and Grok still accept a pasted key if you prefer that path.
- On Windows, Connect now starts the official Claude and Grok sign-in flow reliably.
- After you authorize Grok in the browser, Settings shows signed in. It no longer stays stuck on sign-in required.

## [1.10.48] - 2026-08-15

### Account

- You can create a CodeMeYo account or sign in from the Account tab. Signing in is optional if you use your own API keys.
- After you sign in, this device is listed on your account so you can see it on the website.
- The Account tab now shows JagAI credits, your plan, monthly support, and signed-in devices.

### Credits and support

- Buy JagAI credit packs from the Account tab on desktop. Checkout opens in your browser and credits return after you refresh.
- Once a day, CodeMeYo can ask you to support the project on the website. Monthly support of $3 to $9,999 turns off that reminder for 30 days. It does not add JagAI credits.

## [1.10.47] - 2026-08-15

### Sign-in and project path

- JagAI now asks you to sign in when you are signed out, instead of failing with a generic error.
- SideKick and the activity-log Run action now use the project you have open.

### Remote PC Code

- Pairing still sends messages live between your phone and desktop. Diagnostic logs no longer keep the text of those messages or tool output.

### Usage

- Signed-in usage sharing now records app opens, how long the app stayed open, and how long each run took. It still never sends what you type.

## [1.10.46] - 2026-08-15

### Sign-in and project path

- JagAI now asks you to sign in when you are signed out, instead of failing with a generic error.
- SideKick and the activity-log Run action now use the project you have open.

### Remote PC Code

- Pairing still sends messages live between your phone and desktop. Diagnostic logs no longer keep the text of those messages or tool output.

## [1.10.45] - 2026-08-15

- Same user-facing changes as 1.10.46. Download 1.10.46.

## [1.10.44] - 2026-06-23

### Android - pair links open the app reliably

- Fixed Android pair links so scanning or tapping a CodeMeYo pairing link can open the installed app directly instead of staying on the website.
- The manual pair-code fallback still remains available when the app is not installed.

## [1.10.39] - 2026-05-27

### Remote PC Code — stable QR pairing

- Fixed desktop QR pairing so the pair code stays stable instead of regenerating repeatedly.
- Removed unnecessary pairing messages.

## [1.10.38] - 2026-05-27

### Remote PC Code — phone pairing hotfix

- Fixed phone-to-desktop pairing so the secure connection can finish after the QR code is created.
- The desktop pairing screen now opens on the QR view first, making the phone scan flow the default path.

## [1.10.37] - 2026-05-27

### Remote PC Code availability

- Remote PC Code now includes live phone-to-desktop pairing for supported testers.
- Improved reliability for starting a remote control session from the phone app and connecting it to the signed-in desktop app.

## [1.10.36] - 2026-05-11

### macOS launch and window reliability

- Fixed a macOS crash that could occur while maximizing or resizing the app window.

## [1.10.35] - 2026-05-09

### macOS App Store subscriptions

- Mac users can subscribe monthly or yearly, restore purchases, and manage their subscription inside the app, with Terms of Use and Privacy Policy links beside the purchase controls.

## [1.10.34] - 2026-05-06

### iOS privacy compatibility

- Improved iOS privacy compatibility so new versions can be installed and tested reliably.

## [1.10.33] - 2026-05-06

### iOS privacy declarations

- Updated iOS privacy declarations to match the app's published privacy information.

## [1.10.32] - 2026-05-06

### iOS release reliability

- Improved iOS release reliability and privacy compatibility.

## [1.10.31] - 2026-05-06

### Pair flow no longer crashes when the relay isn't reachable

- Entering a pair code no longer crashes the desktop app when the connection is unavailable. CodeMeYo now shows a clear error and lets you try again.

## [1.10.30] - 2026-05-06

### JagAI request reliability

- JagAI requests recover from more model compatibility changes and now show clearer errors when a request cannot finish.

### SideKick now actually engages instead of saying "Standing by for your request"

- SideKick now produces real analysis in Deep Think instead of returning a standing-by message.

## [1.10.29] - 2026-05-05

### iOS privacy compatibility

- Improved iOS privacy compatibility for current Apple requirements.

### Phone-to-desktop pairing actually works now

- The desktop now responds immediately when a phone completes pairing. Messages, permission decisions, and stop actions work from the phone.

### QR code on the desktop pair tile is reliably scannable

- Desktop pairing codes are now easier for phone cameras to scan on the first try.

### Website sign-in and navigation

- Signed-in users stay signed in during updates and no longer encounter a missing verification screen.

## [1.10.28] - 2026-05-05

### Hotfix: blank-screen crash when JagAI or SideKick is the active provider

- Fixed a blank-screen crash when JagAI or SideKick was active at startup, and restored their correct colors throughout the app.

## [1.10.27] - 2026-05-05

### Credits dashboard and website speed

- **Redesigned the Credits dashboard.** A prominent balance card and clear Purchase, Transactions, and Help views make credits easier to buy and understand on desktop and mobile.
- Website pages load faster, and signed-in sessions remain available during updates.

## [1.10.26] - 2026-05-05

### Android compatibility

- Improved compatibility with current Android devices and Google Play requirements.

## [1.10.25] - 2026-05-05

### iOS privacy compatibility

- Improved compatibility with current Apple privacy requirements.

## [1.10.24] - 2026-05-04

### iOS release reliability

- Improved iOS release reliability.

## [1.10.23] - 2026-05-04

### iOS release reliability

- Fixed an issue that could prevent an iOS release from completing.

## [1.10.22] - 2026-05-04

### TestFlight availability

- Fixed an issue that could prevent the iOS build from appearing in TestFlight.

## [1.10.21] - 2026-05-04

### TestFlight availability

- Improved the reliability of iOS TestFlight availability.

## [1.10.20] - 2026-05-04

### Fix: TestFlight upload no longer flips to "Invalid Binary"

- Fixed an issue that prevented the iOS build from becoming available for testing.

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

### iOS sign-in and subscriptions

- **In-app sign-in on iPhone and iPad.** Sign in directly with email and password without leaving CodeMeYo.
- **App Store subscriptions on iOS.** Pro subscribe and billing actions now use the App Store purchase flow.
- **Cleaner iOS updates.** Update notices are handled by the App Store and no longer appear inside the iOS app.

### iOS privacy + compliance

- **Clear privacy disclosures.** iOS now includes current privacy information covering account details and App Store purchase history, with no tracking.
- **Improved App Store compatibility.** Required compliance information is included with the app.

## [1.10.17] - 2026-05-01

### Pair Device: pair-code generation no longer hangs
- **Fixed: desktop QR tile stuck on "Generating QR…".** Pair-code generation responds reliably, and the Regenerate button continues to work.

## [1.10.16] - 2026-05-01

### Pair Device — Regenerate works, retries don't get stuck on "already used"
- **Fixed: Regenerate button on the desktop pair tile didn't fire.** Up through v1.10.15 the button was permanently disabled after the first pair code was generated because the connection-status flag never transitioned out of "pairing". Click now correctly mints a fresh code.
- **Fixed: "Pair code has already been used" lockout after a phone connection failed.** The same device can retry briefly without regenerating its code.
- **Better network errors.** Connection failures now suggest practical steps such as switching between Wi-Fi and cellular.

## [1.10.15] - 2026-05-01

### Pair Device — fixed "device id field is required" QR-scan error
- **Pairing now works on a brand-new phone install.** Scan the QR code or enter the pair code without registering the phone first.

### Android compatibility
- **Improved support for current Android devices.** CodeMeYo meets current Google Play compatibility requirements.

## [1.10.14] - 2026-05-01

### Pair Device — back to 6-digit numeric codes
- **Pair codes are now 6 numeric digits, like SMS / 2FA / Apple ID / Google verifiers.** v1.10.13 briefly tried 8-character alphanumeric to maximise entropy, but every Apple TestFlight reviewer hit the alphanumeric keyboard mismatch on phone (the iOS numeric keyboard is one-handed and finger-friendly; the alphanumeric one is not). Switching to 6 numeric digits matches the universal SMS-code pattern users already know.
- **All input boxes are numeric on every device** — phone, tablet, desktop browser, web dashboard. The desktop simply renders the same numeric component; non-digits are silently dropped.
- **Safer pair codes** with limited attempts, a short lifetime, and single-use protection.
- **Website pairing** now accepts the same 6-digit format as the apps.
- **iOS auto-fill works again** — `autoComplete="one-time-code"` lets iOS surface the SMS-style suggestion bar above the keyboard if the OS captured a code from a connected message.

## [1.10.13] - 2026-05-01

### Pair Device — phone QR scan & code entry now work
- **Fixed: phone could not type the desktop's pair code.** Phone entry now matches the code shown on desktop and clearly explains which characters to use.
- **Fixed: QR scan never matched.** QR scanning now recognizes pair codes from supported camera and scanner apps.
- All "enter the 6-digit code" copy across the desktop Settings panel, the in-app Remote pane, the website dashboard's "Pair with my phone" page, and the empty-input error message now correctly say "8-character code".

## [1.10.12] - 2026-05-01

### Credits & billing
- **Duplicate credit prevention.** Recovered payments no longer risk granting the same credits twice.
- **Clear purchase status.** Transaction history distinguishes real purchases from test purchases.
- **Cleaner Buy Credits cards.** The per-card "$X + $Y Processing Fee" math has been removed — just the final total is shown. The "Includes Processing Fee." hint above the grid covers the explainer.

### Connected-tool bundles
- **Safer bundle installs.** CodeMeYo verifies supported bundles before installation and refuses modified files with a clear error.
- **Manage connected-tool credentials together.** Save, load, or delete all credentials for a connected tool in one action, protected by your operating system.
- **Manage connection access.** Saved authorization can now be reviewed or cleared from Settings.
- **"Open install folder" support.** Jump directly to an installed connected tool's folder from Settings.

### Browser helper panel
- **Clearer browser helper status.** Connection, pairing, activity, and saved-state details are now shown separately.
- **Browser helper status.** The browser toolbar now shows a live connected or disconnected indicator.

### JagAI credits
- **Faster balance refresh.** The JagAI settings card updates more quickly after each chat turn.

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
- **Cleaner transaction history.** Temporary credit holds no longer clutter the list. You only see purchases, deductions, refunds, complimentary credits, and expirations.

## [1.10.5] - 2026-04-30

### Mobile remote control — bidirectional mirror live
- **"Pair with mobile device" button now switches to the correct tab.**
- **Phone shows your PC's chat live.** When paired, desktop messages appear on your phone in real time.
- Phone activity feed now mirrors message updates (streaming → done) so the phone sees the same conversation flow as the PC.

### Available models
- **The Credits dashboard now shows the models available to your account** so you know what your credits can use.

## [1.10.4] - 2026-04-30

### What changed since v1.10.2
This release includes the intended mobile fixes and credit-policy improvements from the previous update.

### Mobile fixes — TestFlight feedback v1.9.86
- **Bottom navigation no longer clips on the iPhone home indicator.** Tabs render fully above the gesture bar.
- **"Connect to your PC" flow on phone** — settings + remote tab now show the right copy when you're on a phone (you scan the PC's code, you don't host one). The pair button on mobile is now labeled "Scan PC's code" so testers know what they're doing.
- **No more useless phone-side pair codes** — the remote tab no longer auto-mints a pair session on mobile devices. Mobile users land directly on the QR scanner.
- **iOS camera permission** — added the camera, microphone, and photo-library usage descriptions so iOS actually shows the permission prompt when the QR scanner starts.
- **Cleaner Remote tab icon** — switched from a phone icon (testers misread as a camera) to a cable icon that better signals "your phone is connected to your PC".

### Credits — important policy fix
- **Credits expire 360 days from purchase if unused.** The Credits page now clearly states this policy, and older credits are used first.
- Account dashboard now shows the **next expiration date + remaining credits in that batch** inline, so you always know which credits time out next.

## [1.10.2] - 2026-04-30

### Reliability
- Improved checkout and purchase reliability while preserving prior receipts.

## [1.10.1] - 2026-04-30

### Added — JagAI in the desktop app
- **JagAI is now selectable in the provider list** — pick "JagAI (All-in-One)" and choose any of 12 models across the apex / nova / spark tiers (Claude Opus 4.7, GPT-5.5, Grok 4.20 Multi-Agent, Claude Sonnet 4.6, Grok 4.20, GPT-5.4 Mini, Gemini 2.5 Pro, Claude Haiku 4.5, GPT-5.4 Nano, Grok 4.1 Fast, Gemini 2.5 Flash-Lite, DeepSeek V4 Flash).
- **Manage Credits button** — opens your default browser pre-authenticated to your account dashboard so you can buy credits without typing a password again.
- **Live balance** in the JagAI settings card — see your credits and dollar equivalent at a glance, refresh on demand.
- No API keys to manage — your CodeMeYo sign-in is the only auth needed.

## [1.10.0] - 2026-04-30

### Added: JagAI, all your favorite AI models in one place
- **One credit balance for leading AI models.** Buy credit packs from your CodeMeYo account without managing API keys.
- **Credits dashboard.** See your balance, purchase credits, and review transaction history in one place.
- **Clear checkout totals.** Processing costs are shown before purchase.

### Reliability
- Concurrent requests no longer risk spending the same credits twice.
- Repeated payment notifications no longer risk granting duplicate credits.

## [1.9.86] - 2026-04-29

The "Sign in for automatic updates" prompt no longer appears on macOS. Mac App Store users receive updates through the App Store, while direct-download users can get the latest installer from CodeMeYo's download page.

This release also includes smaller Mac App Store compatibility improvements.

---

## [1.9.85] - 2026-04-29

Pro status is now recognized correctly after sign-in. Earlier versions could show an active Pro account as Free and hide Pro features such as Remote PC pairing. Resolved.

The Refresh account status and Restore Purchases flows now also pull the correct tier on first try instead of silently retaining the old value.

---

## [1.9.84] - 2026-04-26

The refreshed model lineup is now available across supported platforms.

The new models from v1.9.83 — Claude Opus 4.7, GPT-5.5, DeepSeek V4 Pro/Flash, Gemini 3.x previews, Qwen3 32B on Groq — now ship.

---

## [1.9.83] - 2026-04-26

Refreshed model lineup — Claude Opus 4.7 (Anthropic's newest flagship, with a step-change improvement in agentic coding), GPT-5.5 (OpenAI's newest frontier model), DeepSeek V4 Pro and V4 Flash, and the Gemini 3.x preview series are now available in the model picker. Groq's lineup adds Qwen3 32B for high-speed reasoning. Mistral Small 4 description updated to reflect its merged reasoning, vision, and code capabilities.

Models that the providers themselves have retired or deprecated are now clearly labeled so you can migrate before they're shut down.

Bug fix: Grok 4.20 Multi-Agent can now be selected successfully. Other Grok models were unaffected.

---

## [1.9.82] - 2026-04-22

Android release polish — drops 32-bit ARM build to comply with Google Play's 64-bit requirement. All modern Android devices (2019+) support arm64, no user-visible change.

---

## [1.9.81] - 2026-04-22

Universal Links are restored. Opening a CodeMeYo pairing link now launches the app directly on macOS and mobile. Updates also recover more reliably from temporary network interruptions.

Fixed an update loop that could occur with the previous version.

---

## [1.9.80] - 2026-04-22

No functional changes. Use v1.9.81 or later for the update-loop fix.

---

## [1.9.79] - 2026-04-22

Reliability polish for the earlier iPad launch-crash fix.

---

## [1.9.78] - 2026-04-22

Reliability follow-up for availability across Mac, iOS, and Android.

---

## [1.9.77] - 2026-04-22

### Fixed
- **iPad launch crash.** CodeMeYo now launches reliably on every supported iPad and iPhone running iOS 15 or later.

---

## [1.9.76] - 2026-04-22

Reliability follow-up for iOS and macOS pairing links. Desktop pair links continue to work while Universal Links receive additional compatibility work.

---

## [1.9.75] - 2026-04-22

Reliability follow-up for profile refresh, device pairing, persistent Windows sign-in, clear QR errors, and desktop pair links. The in-app QR and code flow remains available on macOS.

---

## [1.9.73] - 2026-04-21

### Fixed
- **Account tier auto-refreshes at launch.** If your Pro status changed on the server since the last time you opened the app — a new comp, a renewal, an expired subscription — CodeMeYo now re-syncs silently a moment after startup instead of waiting for you to hit the manual Refresh button.
- **Pair Device actually pairs.** Device pairing could fail with an "Unauthenticated" error even for signed-in Pro users, which also left the QR code stuck on "Generating QR…" forever. The pairing panel now uses your signed-in session correctly on the first try.
- **Windows sign-in now persists securely.** Quitting and relaunching keeps you signed in without re-entering your password.
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
- **SideKick with Claude.** Connect your official Claude Max or Pro subscription from Settings, with clear connection status and no pasted API key required.
- **Your devices show up in your account.** Visit codemeyo.com/dashboard/devices and every machine you've signed into CodeMeYo on will be listed. Previously that page was always empty.
- **Daily cleanup of expired pair codes.** Old unused pair codes are now automatically cleaned up. Successful pairings stay untouched.

### Fixed
- **Improved availability on Android, iOS, and macOS stores.**

---

## [1.9.53] - 2026-04-20

### Added
- **iOS QR pairing works.** Open the iOS app → Remote PC Code → Scan QR, and the camera decodes the QR on screen and pairs you in one shot. Previously the QR tab on mobile was a placeholder and only the 6-digit code worked.
- Real QR image rendered on the desktop side too.

### Fixed
- **Revoke button** on the Pair Device page now works.
- **QR code** on the Pair Device page renders immediately instead of hanging on "Loading QR…".
- Improved macOS TestFlight availability.

---

## [1.9.52] - 2026-04-20

### Added
- **Remote PC Code is live.** Pair your phone with a signed-in desktop and drive the agent from anywhere. (Was previously gated behind a "Coming Soon" card.)

### Fixed
- Deep Think no longer shows duplicate proposals after multiple sends in the same conversation.
- The macOS app now includes every icon size required by Apple.

---

## [1.9.51] - 2026-04-20

### Changed
- Updates now reach iOS, macOS, and Android stores more consistently.

### Fixed
- Android updates are now recognized correctly by Google Play.
- Minor bug fixes.

---

## [1.9.50] - 2026-04-20

### Added
- **Pro — Remote PC Code.** Pair your phone with your desktop once, then drive your coding agent from anywhere. Send a new task, approve a risky tool call, or check progress from your phone even when you're away from your desk.
- The phone app also works standalone — write code and chat with LLMs on your phone without a desktop.
- **codemeyo.com Pair Device page** now lists your active pair codes and paired devices, with a one-click **Unpair** button for each.

### Fixed
- Mobile viewport rendering on iOS and Android — the UI now fills the full screen, including notched iPhones (no more cut-off bottom nav).
- Browser helper no longer reports an unnecessary warning on some payment pages.

---

## [1.9.13] - 2026-04-20

### Fixed
- Your **codemeyo.com** account dashboard now loads with proper styling — no more unstyled Pair Device page.
- **Start pairing** on the web dashboard now works — you can generate a code from the browser without needing a device registered first.

---

## [1.9.12] - 2026-04-20

Reliability polish.

### Changed
- Improved update availability across supported platforms.

---

## [1.9.11] - 2026-04-19

App Improvements for the better good of seamless updates.

### Added
- Updates now reach Google Play, TestFlight, and the App Store more consistently.

### Fixed
- Browser helper no longer reports an unnecessary warning on some payment pages.

---

## [1.9.10] - 2026-04-19

### Added
- First iOS + macOS + Android store submissions to Apple App Store, Mac App Store, and Google Play (Closed + Open Testing tracks).
- Polished Google Play Console store listing with a full set of graphics (app icon, feature graphic, phone + tablet screenshots).

### Fixed
- Improved Android availability through Google Play.

---

## [1.9.7] - 2026-04-19

### Fixed
- Signed-in users now see their profile immediately on app start — no more "Loading your profile from codemeyo.com…" spinner while the server round-trip runs. The last-known profile renders instantly; the background refresh updates it silently.
- Shorter network timeout so any real connection issue surfaces as an error quickly instead of looking like an indefinite hang.

---

## [1.9.6] - 2026-04-19

### Added
- Android installers are now available from CodeMeYo's download page for supported direct-install use.
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
- Availability fixes for platforms affected by the previous release.

---

## [1.9.0] - 2026-04-19

Free accounts, a refreshed website, and a preview of what's coming next.

### Added
- **Free CodeMeYo accounts.** Sign in from the Account tab to get automatic updates and early access to new features. Your own API keys still stay on your device — nothing changes there.
- **Remote PC Code — Coming Soon.** A new tab in the app previews an upcoming feature that'll let you drive the desktop agent from your phone. Not live yet; sign in now to be among the first to try it.
- **Privacy-respecting telemetry (opt-in).** If you'd like to help us understand which providers and models get the most use, toggle it on in Settings → Privacy. Off by default. We never see prompts or code.
- **Refreshed donations page.** One-time or monthly options at codemeyo.com/donate.

### Changed
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
- Release notes now cover every version from v1.0.5 onward, both in the app and on the public release page.

---

## [1.5.8] - 2026-04-18

### Fixed
- **Improved Android release availability.** Updates now reach the Play Store more reliably.

---

## [1.5.7] - 2026-04-18

### Added
- **Full Git client** — Branch picker with search (switch / create / delete branches, protected-branch guard on main/master), commit composer with optional "amend last commit", Fetch / Pull / Push toolbar, and inline per-file stage, unstage, and discard buttons on every changed file. Stage-all and Unstage-all toggles included.
- **Robust terminal CLI** — Slash commands that mirror the whole GUI: `/project list|add|rm|switch`, `/git status|checkout|commit|push|pull|fetch|...`, `/chat new|list|switch|rename|delete`, `/mode code|chat`, `/strategy single|roundrobin|deepthink|consensus`, `/provider <name>`, `/status`, `/open <file>`, `/version`, `/help`, `/clear`. Accepts both `/cmd` and `cmy cmd`. Type `/help` in the terminal to see everything.
- **25 new connected tools** across design, coding, cloud, data, productivity, and commerce.
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
- Windows updates are prepared more quickly.

---

## [1.5.0] - 2026-04-17

### Added
- **Writable code editor** — Edit any file directly in the app. Auto-saves 1.5 seconds after you stop typing, or Ctrl+S to save immediately. Supports 40+ languages with bracket colorization, minimap, find/replace, and format-on-paste.
- **Conversation rename** — Hover any conversation in the sidebar, click the pencil, rename inline.
- **Real folder icons in the file tree** — Closed and open folders look different, with color-coded files by language and type.

### Fixed
- **All AI responses now persist across app restarts** — Deep Think conversations with Claude, Grok, OpenAI, and Gemini no longer vanish when you close the app.

### Improved
- Linux updates are prepared more quickly.

---

## [1.0.11 — 1.0.12] - 2026-04-17

### Fixed
- **Windows desktop app no longer crashes on startup.** Networking now works correctly on every platform.

---

## [1.0.10] - 2026-04-17

### Fixed
- Android release reliability improved.

---

## [1.0.9] - 2026-04-17

### Fixed
- iOS release availability is more reliable.

---

## [1.0.7] - 2026-04-17

### Improved
- Updates are prepared more reliably.

---

## [1.0.5] - 2026-04-17

### Changed
- **Improved update detection.** New versions are now recognized more reliably.

---

## [1.0.000] - 2026-04-13

### Added
- Expanded availability across Windows, macOS, Linux, iOS, and Android.

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
