# Donations

**[codemeyo.com/donate](https://codemeyo.com/donate)** accepts one-time and monthly donations via Stripe Checkout. Donations are the only payment flow on the website — Pro subscriptions are sold exclusively through the Apple App Store and Google Play.

You don't need an account to donate. Donations are tax-deductible only if you're in a jurisdiction that accepts them for an LLC — check with your accountant. We are **Jag Journey, LLC**, not a registered nonprofit.

---

## How users donate

1. Visit [codemeyo.com/donate](https://codemeyo.com/donate).
2. Pick an amount — $5, $10, $25, $50, $100, or **Custom** ($5 minimum, $9999 maximum).
3. Optional: toggle **Make it monthly** for a recurring subscription.
4. Click **Donate** → redirected to Stripe Checkout.
5. Complete payment with card / Apple Pay / Google Pay / bank debit.
6. Redirected back to `/donate/thanks`.
7. Stripe emails a receipt. The donation webhook records the event.

The `/donate` route is gated behind the `donations_enabled` feature flag — admins can disable the donation page entirely at `/admin/feature-flags` if we ever need to pause it.

---

## What happens server-side

### One-time donations

- Stripe triggers `checkout.session.completed`.
- The webhook at `POST /api/webhooks/stripe` (see `website-app/routes/web.php`) verifies the signature, reads the session, and creates a `donations` row with `type='one_time'`.
- Row appears in `/admin/donations` and (if the user is signed in with the same email) on `/dashboard/billing`.

### Monthly donations

- Stripe triggers `invoice.paid` each successful month.
- Each invoice creates a separate `donations` row with `type='monthly'`, linked by the Stripe subscription id.
- Failed renewal (`invoice.payment_failed`) doesn't create a row — Stripe's own dunning flow handles it.

Either way, the webhook is **idempotent** by Stripe event id — replaying events never double-counts a donation.

---

## Test vs live mode

The Filament admin at `/admin/settings` → **Stripe (Donations)** has a **Mode** selector with two options:

| Mode | Used for |
|---|---|
| **Test** | Local dev, preview environments, anyone clicking around. Fake card `4242 4242 4242 4242` works. |
| **Live** | Real money. |

Both modes have separate:

- Publishable key
- Secret key
- Webhook signing secret (`whsec_...`)
- Stripe product + price ids (for the monthly subscription)

The `stripe_mode` setting is read at every webhook call and every `/donate/checkout` call. **The mode the donation was paid in is stored on the donation row itself**, so flipping modes later doesn't mangle history.

### Common gotcha: donation missing from `/dashboard/billing`

If the user donated in **test** mode but the admin panel is now in **live** mode (or vice versa), `/dashboard/billing` filters by the current mode. Flip back to the right mode temporarily, or just show all donations regardless of mode (controller code is the source of truth).

---

## Stripe webhook setup

### The webhook URL

Register this URL in your Stripe dashboard:

```
https://codemeyo.com/api/webhooks/stripe
```

Note: **not** `/api/v1/stripe/webhook` — donations use the top-level `/api/webhooks/stripe` route (see `website-app/routes/web.php`). The `/api/v1/stripe/webhook` path exists but is reserved for subscription events that we don't currently use (Pro subscriptions are app-store-only).

### Events to subscribe

In Stripe's webhook setup, select these events:

- `checkout.session.completed` — one-time donations + first monthly donation
- `invoice.paid` — recurring monthly donations
- `invoice.payment_failed` — (optional, for dunning reporting)
- `customer.subscription.updated` — subscription edits
- `customer.subscription.deleted` — subscription cancellations

### The webhook signing secret

1. In Stripe → Webhooks → your endpoint, copy the **Signing secret** (starts with `whsec_`).
2. Paste into `/admin/settings` → Stripe (Donations) → Webhook Signing Secret (for the matching mode).
3. Save.

Signature verification happens on every webhook request. Mismatched signature → 400, not processed. Log line with the Stripe event id goes to `storage/logs/laravel.log`.

---

## Where donations appear

### User-facing

- [/dashboard/billing](https://codemeyo.com/dashboard/billing) — the signed-in user's own donation history + receipt emails (see `website-app/app/Http/Controllers/Dashboard/BillingController.php`).

### Admin-facing

- [/admin/donations](https://codemeyo.com/admin/donations) — every donation row, filterable by mode, status, type.

### Stripe

- Stripe dashboard → Payments / Subscriptions. Click-through from the admin panel via the Stripe charge id.

---

## Refunds

CodeMeYo doesn't refund donations automatically — they're voluntary, refund is a human decision.

To refund:

1. Open the donation in `/admin/donations`.
2. Click the Stripe charge id link — opens Stripe dashboard.
3. Issue refund in Stripe.
4. Stripe fires `charge.refunded`, which updates the donation row's `status` to `refunded`.

The refunded donation stays visible in both the user's and admin's UI, just marked as refunded.

---

## Backfilling missed donations

If the webhook was misconfigured for a period (wrong URL, bad signing secret, server down), donations might not have been recorded server-side even though Stripe captured the money. To recover:

There's an artisan command in the website-app repo — reference the script in git history around the v1.9.1 merge. The command:

1. Hits `GET /v1/charges?created[gte]=<since>` on Stripe's API.
2. For each charge not already in `donations`, creates the row with the correct mode + type.
3. Dry-runs by default. Pass `--commit` to actually write.

Rough usage (check the committed version for exact flags):

```bash
cd website-app
php artisan donations:backfill --since=2026-04-01 --mode=live --dry-run
# Review output. If it looks right:
php artisan donations:backfill --since=2026-04-01 --mode=live --commit
```

TODO (`website-app/app/Console/Commands/`): the exact command class name varies by commit — grep for `donations:backfill` in recent history to find the current version. Flagging this so the wiki stays honest if the command renames.

---

## Privacy

Donation rows store:

- Amount + currency + Stripe charge id
- Email (from Stripe Checkout)
- Name (optional — Stripe Checkout lets donors skip it)
- Mode + type + status + created_at

**No** card numbers, CVVs, billing addresses, or anything PCI-scoped. That all lives with Stripe.

If a user deletes their account (see [Account System → Delete your account](Account-System#delete-your-account-gdpr)), donation rows are **anonymized** (email + name stripped, Stripe id preserved) rather than deleted — needed for accounting.

---

## Monthly subscription management (user-facing)

Donors with recurring donations can manage them from Stripe's **customer portal**. There's a **Manage subscription** link on `/dashboard/billing` that generates a short-lived Stripe portal URL. On that portal the donor can:

- Update card / payment method
- Change billing email
- Cancel the subscription
- Download invoices

The portal is all Stripe-hosted — we don't handle card data.

---

## Related pages

- [Admin Panel → Donations](Admin-Panel#donations)
- [Admin Panel → Settings 10-tab](Admin-Panel#settings--10-tabs)
- [Backend API → Webhooks](Backend-API#webhooks-signature-verified-no-bearer-token)
- [Troubleshooting → I donated but don't see it](Troubleshooting#i-donated-but-dont-see-it-in-dashboardbilling)
