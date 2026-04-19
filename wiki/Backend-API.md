# Backend API

The **codemeyo.com** backend is a Laravel 12 + Filament v5 application that serves the marketing site, user dashboard, admin panel, and a **public REST API** that the desktop + mobile apps (and, optionally, your own scripts) call.

This page documents the `/api/v1/*` endpoints. The canonical spec is served live at [codemeyo.com/api/v1/openapi.json](https://codemeyo.com/api/v1/openapi.json) (and `/openapi.yaml`). A Swagger UI is hosted at [codemeyo.com/api/docs](https://codemeyo.com/api/docs).

**Base URL:** `https://codemeyo.com/api/v1`

---

## Authentication

All non-webhook, non-public endpoints require a **Sanctum bearer token**:

```http
Authorization: Bearer <token>
```

### Getting a token

**Three ways to get a token:**

1. **Device-code flow (used by the app itself)** — `POST /auth/device/code` → poll `POST /auth/device/token`. See [Account System → Device-code login](Account-System#device-code-login).
2. **Email + password** — `POST /auth/login` with `{"email": ..., "password": ...}`. For direct clients only; the in-app UI uses device-code.
3. **Dashboard-generated token** — sign in at [codemeyo.com/dashboard/tokens](https://codemeyo.com/dashboard/tokens), click **New token**. Long-lived, revocable. Best for scripts and CI.

Token scopes (when creating via the dashboard): `read` (default), `write`, `admin` (admin users only). Tokens without a scope act as `read`.

---

## Rate limits

Rate limits are per-IP on unauth endpoints and per-token on authed ones:

| Endpoint | Limit |
|---|---|
| `POST /auth/register` | 6 / minute |
| `POST /auth/login` | 10 / minute |
| `POST /auth/device/code` | 10 / minute |
| `POST /auth/device/token` | 30 / minute (polling endpoint) |
| Authed endpoints (default) | 60 / minute |
| Webhooks | No limit (signature-verified) |

Exceeding a limit returns `429 Too Many Requests` with a `Retry-After` header.

---

## Public endpoints

### `POST /auth/register`

Create an account.

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "you@example.com",
  "password": "strong-password",
  "name": "Your Name"
}
```

Returns `201 Created` with a Sanctum token. Email verification link is sent. Unverified accounts can sign in and use the app but cannot access Pro features or generate API tokens.

### `POST /auth/login`

```json
{ "email": "you@example.com", "password": "strong-password" }
```

Returns `200 OK` with `{ "token": "...", "user": {...} }`. Returns `403 account_banned` for banned users.

### `POST /auth/device/code`

Start a device-code flow.

```http
POST /api/v1/auth/device/code
Content-Type: application/json

{ "client_name": "CodeMeYo Desktop 1.9.1" }
```

Response:

```json
{
  "device_code": "long-opaque-string",
  "user_code": "BJKX-9QLP",
  "verification_uri": "https://codemeyo.com/device",
  "verification_uri_complete": "https://codemeyo.com/device?code=BJKX-9QLP",
  "expires_in": 600,
  "interval": 5
}
```

### `POST /auth/device/token`

Poll for the device token. Call every `interval` seconds (respect the `slow_down` response if you get one).

```json
{ "device_code": "<from the code endpoint>" }
```

Responses:

- `200 OK` with `{ "access_token": "...", "user": {...} }` once the user has approved in the browser.
- `428 authorization_pending` — keep polling.
- `429 slow_down` — double your poll interval.
- `410 expired_token` — start over.

### Webhooks (signature-verified, no bearer token)

| Endpoint | Purpose | Signature |
|---|---|---|
| `POST /stripe/webhook` | Stripe donation events | `Stripe-Signature` HMAC SHA256 |
| `POST /iap/apple/notify` | Apple App Store Server Notifications V2 | Full ES256 JWS + Apple Root CA G3 pinning |
| `POST /iap/google/notify` | Google Play RTDN | RS256 JWT + JWKS cache + Pub/Sub account match |

Apple + Google verification was hardened in v1.9.0 — see the Security section of the [Release Notes](Release-Notes#190).

Note: the **donation** Stripe webhook lives at `/api/webhooks/stripe` (outside `/api/v1/*` for historical reasons). Register that URL in Stripe. The `/api/v1/stripe/webhook` endpoint handles subscription events (not currently used since Pro is app-store-only).

### `GET /openapi.json` · `GET /openapi.yaml`

The live OpenAPI 3.1 spec. Use these to generate clients in any language. Swagger UI at [codemeyo.com/api/docs](https://codemeyo.com/api/docs).

---

## Authenticated endpoints

All require `Authorization: Bearer <token>`.

### `GET /me`

Returns the authenticated user's profile + plan.

```json
{
  "id": 42,
  "email": "you@example.com",
  "name": "Your Name",
  "plan": "free",
  "email_verified": true,
  "created_at": "2026-04-19T13:12:05Z"
}
```

### `POST /auth/logout`

Revokes the current token. Other tokens stay valid.

### `GET /entitlements`

Returns the user's current entitlements — what Pro features they have, where they came from (Stripe web / Apple IAP / Google Play Billing), expiry timestamps. Used by the app to cache plan state for 24h offline.

```json
{
  "plan": "pro",
  "source": "apple_iap",
  "expires_at": "2026-05-19T00:00:00Z",
  "features": {
    "remote_pc_code": true,
    "cross_device_sync": true,
    "priority_support": true
  }
}
```

### `POST /devices/register`

Register a device (the app calls this on sign-in):

```json
{
  "name": "My Laptop",
  "platform": "windows",
  "app_version": "1.9.1",
  "os_version": "Windows 11 26200",
  "fingerprint": "sha256-of-stable-machine-id"
}
```

### `GET /devices` · `DELETE /devices/{id}`

List registered devices and revoke them. Users can also manage devices from [/dashboard/devices](https://codemeyo.com/dashboard/devices).

### `POST /pair/initiate` · `POST /pair/complete`

The pairing flow for Remote PC Code. Generates a short code on desktop, completes the pair on mobile. Currently gated — the `/pair/*` endpoints exist server-side but the desktop/mobile UI is behind the "Coming Soon" teaser (see [Mobile App → Remote PC Code](Mobile-App#remote-pc-code)).

### `POST /usage/events`

Opt-in telemetry. Ping when the user triggers an LLM call so we can measure which providers are popular:

```json
{
  "events": [
    { "provider": "claude", "model": "claude-sonnet-4-6", "at": "2026-04-19T14:00:00Z" },
    { "provider": "gpt", "model": "gpt-5.4", "at": "2026-04-19T14:00:05Z" }
  ]
}
```

**Never sends prompts, responses, tokens consumed, code, or API keys.** Just `{provider, model, at}`. Off by default — users opt in at Settings → Privacy.

### `GET /usage/summary`

User's own aggregated usage for the last 30 days. Purely cosmetic ("your top 3 providers this month").

### `GET /updater/latest/{platform}`

Authenticated updater endpoint. `{platform}` is one of:

- `windows-x86_64`
- `darwin-aarch64`
- `darwin-x86_64`
- `linux-x86_64`

Returns a Tauri-compatible `latest.json` document:

```json
{
  "version": "1.9.1",
  "notes": "…",
  "pub_date": "2026-04-19T12:00:00Z",
  "platforms": {
    "windows-x86_64": {
      "signature": "<base64 minisign>",
      "url": "https://signed-github-releases-url.tar.gz"
    }
  }
}
```

Signed-in Free + Pro users both get this. Guests (unauthenticated) get a 401 — by design, see [Auto-Updater](Auto-Updater). Gated behind the `auto_updater` feature flag (always on in production, toggle-off-able for emergency ops).

### `GET /announcements`

Announcements / release notes / promo content the admin team publishes via the `/admin/announcements` CRUD. Used to show in-app banners.

---

## Error format

All errors use a consistent JSON shape:

```json
{
  "error": "validation_error",
  "message": "The email field is required.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

Common codes:

| Code | HTTP | Meaning |
|---|---|---|
| `validation_error` | 422 | Request body failed validation |
| `unauthenticated` | 401 | Missing or invalid token |
| `forbidden` | 403 | Authenticated but not allowed |
| `account_banned` | 403 | User is banned |
| `feature_disabled` | 503 | Feature flag is off |
| `rate_limited` | 429 | Throttle exceeded |
| `not_found` | 404 | Resource doesn't exist |
| `server_error` | 500 | Something broke on our side — retry with backoff |

---

## Client generation

The OpenAPI spec is a full OpenAPI 3.1 document. Generate a client in your language of choice:

```bash
# TypeScript
npx openapi-typescript https://codemeyo.com/api/v1/openapi.json -o codemeyo-api.ts

# Python
openapi-python-client generate --url https://codemeyo.com/api/v1/openapi.json

# Go
oapi-codegen -package codemeyo https://codemeyo.com/api/v1/openapi.json > codemeyo.go
```

---

## Source-of-truth files (for Jag Journey team)

Route definitions live in:

- `website-app/routes/api.php` — all `/api/v1/*` routes
- `website-app/app/Http/Controllers/Api/V1/*` — controller classes
- `website-app/app/Http/Controllers/Api/V1/OpenApiController.php` — spec generator

The `/api/v1/openapi.json` response is programmatically generated from the route list + Laravel request validation rules + controller docblocks — don't hand-write the spec.

---

## Related pages

- [Account System](Account-System) — registration, device-code login, 2FA.
- [Auto-Updater](Auto-Updater) — how the desktop app consumes `/updater/latest`.
- [Admin Panel](Admin-Panel) — the Filament UI that drives announcements, entitlements, feature flags.
- [Donations](Donations) — Stripe webhook details.
