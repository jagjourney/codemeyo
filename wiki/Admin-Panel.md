# Admin Panel

The **Admin Panel** lives at [codemeyo.com/admin](https://codemeyo.com/admin) and is powered by **Filament v5** on top of Laravel 12. It's the backoffice for the Jag Journey team — users, donations, subscriptions, content, feature flags, audit log.

Access is gated. You need `role=admin` on your `users` row (granted manually via database or `artisan tinker` by an existing admin). Non-admin users who hit `/admin` see a 403.

> This page is for Jag Journey, LLC team members and contributors who've been granted admin access. Most users don't need it.

---

## Access + auth

Sign in at [codemeyo.com/login](https://codemeyo.com/login) with an admin-role account, then navigate to `/admin`. Filament's panel plug-in runs its own `canAccessPanel()` check that rejects any non-admin user — even authenticated non-admins see a hard 403.

2FA is strongly recommended on admin accounts (enforced in production once we roll the 2FA-required policy). See [Account System → 2FA setup](Account-System#2fa-setup).

---

## Resources (CRUD pages)

Filament resources are declared in `website-app/app/Filament/Admin/Resources/*`. As of v1.9.1:

| Resource | Route | Purpose |
|---|---|---|
| **Users** | `/admin/users` | View, edit, ban, unban users |
| **Donations** | `/admin/donations` | Donation history, test/live mode toggle, refund link-outs |
| **Subscriptions** | `/admin/subscriptions` | App-store subscriptions reconciled from Apple/Google RTDN |
| **Platform Entitlements** | `/admin/platform-entitlements` | Manually grant / revoke Pro or Team access |
| **CMS Pages** | `/admin/cms-pages` | Block-based page builder — see [CMS Page Builder](CMS-Page-Builder) |
| **CMS Assets** | `/admin/cms-assets` | Media library (images, videos, PDFs uploaded for CMS pages and blog) |
| **Blog Posts** | `/admin/blog-posts` | Rich-text blog CRUD, draft/publish workflow |
| **Announcements** | `/admin/announcements` | In-app + web banners (`GET /api/v1/announcements` reads these) |
| **Feature Flags** | `/admin/feature-flags` | Boolean toggles gating routes + features |
| **Usage Events** | `/admin/usage-events` | Opt-in telemetry aggregates |
| **Audit Log** | `/admin/audit-logs` | Every admin-scope action, read-only |

---

## User ban flow

Ban a user:

1. Open `/admin/users`.
2. Click a user row.
3. Top-right **Ban user** action.
4. Enter a reason (required — it's shown on the user's login attempts so they know what happened).
5. Confirm.

Effects:

- User row gets `banned_at=<now>` and `ban_reason=<text>`.
- User's Sanctum tokens are revoked immediately.
- Their websocket connections (pairing sessions, if any) are terminated.
- They cannot sign in to web or app — `/login` shows the reason, `/api/v1/auth/login` returns `403 account_banned`.
- Their rows are preserved (no data loss).
- Audit log entry is created: `admin.user.ban` with the banning admin's id + reason + target user id.

**Unban:**

1. Same page, **Unban user** action.
2. Confirm. No reason required.
3. Sanctum tokens stay revoked — user has to sign back in (fresh session).
4. Audit log: `admin.user.unban`.

---

## Settings — 10 tabs

`/admin/settings` is a single Filament Page (not a Resource) with 10 tabs of key-value configuration. Settings are stored in the `settings` table and cached via Redis.

| Tab | What's in it |
|---|---|
| **Stripe (Donations)** | Test + Live Stripe keys, webhook secret, mode toggle, Stripe product sync |
| **Authentication** | Password policy, session lifetime, 2FA requirements, Sign in with Apple creds |
| **Mail** | SMTP host/port/user/pass/from, "Send Test Email" button |
| **App Stores (IAP)** | Apple shared secret, bundle ID, Google service account JSON, product IDs |
| **Pricing** | Display prices for Pro / Team on the `/subscribe` page |
| **Security** | CORS origins, rate-limit tuning, trusted proxies, IP deny list |
| **Cache & Queue** | Cache driver, queue driver, Horizon worker counts, connection tuning |
| **Storage** | MinIO / S3 credentials, CDN base URL, media upload size limits |
| **Features & Site** | Site name, logo, feature flag defaults, SEO meta |
| **Site Content** | Announcement banner text, homepage CTA copy |
| **System Info** | Read-only: PHP/Laravel versions, git commit, server hostname, disk usage |

v1.9.1 added a **Send Test Email** header action on the Mail tab — one click sends a diagnostic email to the admin's own address so you know SMTP is wired up before real users start getting registration / 2FA / receipt emails.

Source: `website-app/app/Filament/Admin/Pages/Settings.php`.

---

## Donations

`/admin/donations` shows every donation event received via the Stripe webhook at `/api/webhooks/stripe`.

Columns:

- Date, Email, Name
- Amount (in USD)
- Type (one-time / monthly)
- Stripe mode (test / live)
- Stripe charge/subscription id (click-out to Stripe dashboard)
- Status (succeeded / pending / refunded / disputed)

**Backfill script (git history):** if you ever lose donation rows (e.g. webhook was misconfigured for a period), there's a `php artisan donations:backfill` command in git history that replays Stripe's `/v1/charges?created[gte]=…` and creates missing rows. Dry-run by default; pass `--commit` to actually write. Commit SHA is in the v1.9.1 merge. See [Donations → Backfilling missed donations](Donations#backfilling-missed-donations).

---

## Entitlements (Platform Entitlements)

The `platform_entitlements` table holds the canonical "is this user Pro?" data, reconciled from:

- Apple App Store Server Notifications (via the Apple IAP webhook)
- Google Play RTDN (via the Google IAP webhook)
- Manual grants (admins assigning complimentary Pro)

Each row ties a user to a platform (`apple_iap`, `google_play`, `manual`), a product id (`pro_monthly_12_99`, `pro_yearly_119_00`, etc.), and a start/end timestamp.

The desktop + mobile apps read the union of all active entitlements via `GET /api/v1/entitlements` and cache the result for 24 hours.

**Manually grant Pro:**

1. `/admin/platform-entitlements` → **Create**.
2. Pick a user, platform `manual`, product id (cosmetic), set expiry.
3. Save. Audit log entry created. User's app picks up the change on next entitlement refresh.

---

## Feature Flags

Boolean flags gating features site-wide. Routes in `website-app/routes/web.php` and `api.php` use `->middleware('feature:<flag>')` to conditionally expose themselves.

Current flags (as of v1.9.1):

| Flag | Default | Gates |
|---|---|---|
| `donations_enabled` | on | `/donate`, Stripe donation checkout |
| `blog_enabled` | on | `/blog`, `/blog/{slug}` |
| `public_api_docs` | on | `/api/docs` (Swagger UI) |
| `auto_updater` | on | `/api/v1/updater/latest/*` |
| `remote_pc_code_enabled` | off | Remote PC Code pairing flow (still gated; see [Mobile App](Mobile-App#remote-pc-code)) |
| `referral_credits` | off | Future referral program |
| `usage_cost_alerts` | off | Future cost-alert feature |

Flip a flag at `/admin/feature-flags` — effective immediately, no deploy required.

---

## Audit Log

`/admin/audit-logs` is a read-only chronological feed of every admin-scope action:

- Admin signed in / out
- User banned / unbanned
- Entitlement created / updated / revoked
- Settings changed (diff stored)
- Announcement published
- Feature flag flipped
- CMS page published / unpublished

Each row has timestamp, admin user, action type, target (if any), and a JSON payload (old + new values for updates).

Rows are never deleted by admins. There's a `php artisan audit-logs:prune` command that archives rows > 2 years old to cold storage, but it hasn't been run yet.

---

## Media Library

`/admin/cms-assets` is the unified media upload + browse UI for CMS pages and blog posts.

- Upload images, videos, PDFs.
- Stored on configured S3/MinIO (via the Storage tab in Settings).
- Each asset has a public URL, content type, size, width/height (images), alt text field.
- Filament image picker components across the panel reference this library.

---

## CMS Page Builder

Separate page — see [CMS Page Builder](CMS-Page-Builder) for the full block reference.

Short version: `/admin/cms-pages` lets you compose marketing pages from 10 prebuilt block types. Published pages auto-route based on slug (`/{slug}` catch-all in `web.php`).

---

## Development

If you're running the panel locally (`php artisan serve` + `npm run dev` in `website-app/`):

1. Seed an admin: `php artisan db:seed --class=AdminUserSeeder` (or set `role=admin` manually).
2. Set `APP_ENV=local` to disable 2FA enforcement while you dev.
3. The panel auto-reloads on Filament component changes thanks to Vite.

---

## Related pages

- [CMS Page Builder](CMS-Page-Builder) — the 10 block types and catch-all routing.
- [Donations](Donations) — Stripe config and backfill.
- [Account System](Account-System) — user account data model.
- [Backend API](Backend-API) — the endpoints the panel populates.
- [Release Notes](Release-Notes) — admin panel shipped in v1.9.0.
