# Account System

CodeMeYo has a free account system at **codemeyo.com**. Accounts are optional for running the app - the agent, editor, terminal, and all 8 LLM providers work fully offline with BYOK - but they unlock four things:

1. **Auto-updates** (signed-in users only receive automatic update checks; see [Auto-Updater](Auto-Updater))
2. **Download access** (downloads at `codemeyo.com/download` are gated behind a free account)
3. **Pro entitlements** (bought in the app on Apple devices or at codemeyo.com)
4. **Remote PC Code pairing** (see [Mobile App → Remote PC Code](Mobile-App#remote-pc-code))

Accounts are free. Creating one never costs money.

---

## What you get with a free account

| Capability | Free | Pro | Team (future) |
|---|---|---|---|
| Local agent with BYOK for all 8 providers | Yes | Yes | Yes |
| Unlimited Code/Chat sessions | Yes | Yes | Yes |
| Git, file editor, terminal, MCP | Yes | Yes | Yes |
| Automatic updates | Yes | Yes | Yes |
| Download installers from codemeyo.com | Yes | Yes | Yes |
| Early access announcements in-app | Yes | Yes | Yes |
| Feature flags (new stuff behind toggles) | Yes | Yes | Yes |
| Remote PC Code (phone → desktop pairing) | No | Yes | Yes |
| Synced settings + conversation history | No | Yes | Yes |
| Priority support | No | Yes | Yes |
| Shared team workspaces, SSO, admin controls | No | No | Yes |

Current prices are shown in the app and at [codemeyo.com](https://codemeyo.com).

---

## Create an account

### From the website

1. Go to [codemeyo.com/register](https://codemeyo.com/register).
2. Email, password, submit.
3. Confirm the verification email.

### From inside the app

1. Open CodeMeYo.
2. Click the **Account** tab in the sidebar.
3. Click **Sign in via browser** to use [device-code login](#device-code-login), or click **Create account** which opens the register page in your default browser.
4. Complete registration on the web, then return to the app. The account tab will flip to signed-in state automatically.

### Email + password (from inside the app)

If you already registered on the website, you can type your email + password directly in the Account tab. Click **Sign in**.

---

## Device-code login

Device-code flow lets you sign in without typing a password inside the app. Same pattern as `gh auth login`, `gcloud auth login`, or `docker login` on a headless server.

**How it works:**

1. In the app, click **Sign in via browser** in the Account tab.
2. The app calls `POST /api/v1/auth/device/code` and gets back a short user code (e.g. `BJKX-9QLP`) and a verification URL.
3. Your default browser opens `codemeyo.com/device` with the code pre-filled.
4. You confirm the code is right and sign in on the website (if you weren't signed in already).
5. The app polls `POST /api/v1/auth/device/token` every few seconds.
6. Once you approve on the web, the next poll returns a Sanctum bearer token.
7. The app stores the token in the OS keychain and flips the UI to signed-in state.

Why it matters:

- **No keystroke logging risk.** Your password never touches the desktop or mobile app.
- **Works on mobile too.** iOS and Android use the same flow.
- **Works when the app doesn't have a browser engine focused**, e.g. remote desktop sessions.

---

## 2FA setup

Two-factor authentication is available for any account. We strongly recommend turning it on, especially for Pro and Team accounts.

1. Sign in at [codemeyo.com/login](https://codemeyo.com/login).
2. Open [/dashboard/profile](https://codemeyo.com/dashboard/profile).
3. Scroll to **Two-Factor Authentication**.
4. Click **Enable 2FA**. Scan the QR code with your authenticator app (1Password, Authy, Google Authenticator, etc.).
5. Enter the 6-digit code to confirm.
6. **Save your recovery codes.** If you lose the authenticator device, these codes are the only way back in.

Once 2FA is on, every new sign-in (web or device-code) will prompt for a TOTP code.

---

## Email verification

Email verification is required before:

- Pro features unlock
- API tokens can be generated at [/dashboard/tokens](https://codemeyo.com/dashboard/tokens)
- You can receive announcement emails

You can still download and run the app before verifying - verification only gates cloud-backed features.

If the verification email got lost, sign in and you'll see a banner at the top of every page with a **Resend verification** link.

---

## Sanctum API tokens (for developers)

If you want to hit the public API from your own scripts, you can generate long-lived Sanctum tokens:

1. Go to [/dashboard/tokens](https://codemeyo.com/dashboard/tokens).
2. Click **New token**, name it (e.g. `ci-updater-check`), optional scopes.
3. Copy the token - this is the only time you see it.
4. Use as `Authorization: Bearer <token>` against any `/api/v1/*` endpoint.

See the [API reference](https://codemeyo.com/api/docs) for endpoints, scopes, and rate limits.

---

## Devices

Every app install (desktop or mobile) registers itself as a **device** on your account when you sign in. See them at [/dashboard/devices](https://codemeyo.com/dashboard/devices).

Each device shows:

- Device name (machine hostname for desktop; phone model for mobile)
- OS + app version
- Last seen timestamp
- Revoke button

Revoke a device to force it to re-authenticate. Useful if you lose a laptop. Revoke is immediate - the app's Sanctum token is invalidated server-side.

---

## Plans and billing

The in-app Account panel shows your current plan (Free / Pro / Team) with a **Manage billing** link. That link opens:

- **Donors** → `/dashboard/billing` with donation history and receipts.
- **Pro on iOS** → deep link to `apps.apple.com/account/subscriptions`.
- **Pro on Android** → deep link to Google Play subscriptions.

To support CodeMeYo without subscribing, see [codemeyo.com/donate](https://codemeyo.com/donate).

---

## Ban / account suspension

Accounts that break the terms can be suspended, always with a recorded reason. A suspended account:

- Cannot sign into web (`/login` returns a clear "banned" message with the ban reason).
- Cannot sign into the app (`POST /api/v1/auth/login` returns `403 account_banned`).
- Still owns its data - nothing is deleted.

If you think a suspension is a mistake, contact us at [codemeyo.com/contact](https://codemeyo.com/contact).

---

## Delete your account (GDPR)

You own your data. You can delete your account at any time:

1. Sign in and open [/dashboard/profile](https://codemeyo.com/dashboard/profile).
2. Scroll to **Delete account** at the bottom.
3. Type `DELETE` to confirm and click the red button.

Effect:

- Your user row, devices, API tokens, subscriptions, donations (rows kept for accounting but anonymized), usage events, and announcements-read records are purged within 30 days.
- Refunds already in progress are honored if applicable.
- Your locally stored conversations on the desktop / mobile app are **not** deleted - those live on your own hard drive and we never had them. Delete them manually if you want by resetting the local SQLite database (see [Troubleshooting → Reset Settings](Troubleshooting#reset-all-settings)).

If you need help, contact us at [codemeyo.com/contact](https://codemeyo.com/contact).

---

## Privacy

See [codemeyo.com/privacy](https://codemeyo.com/privacy) for the full policy. Short version:

- **We never see your prompts or LLM responses.** Those go straight from the app to the provider.
- **We never see your API keys.** Stored in your OS keychain only.
- **We never see your code.** The agent reads your project files locally.
- **We only see account metadata** - email, plan, device names, and (if you opt in) anonymized LLM call counts.
- **No selling, sharing, or renting** of personal data. Ever.

---

## Related pages

- [API reference](https://codemeyo.com/api/docs) - the REST API that the app and dashboard use.
- [Auto-Updater](Auto-Updater) - how updates work once signed in.
- [Mobile App](Mobile-App) - iOS + Android account parity.
- [Donate](https://codemeyo.com/donate) - optional financial support.
