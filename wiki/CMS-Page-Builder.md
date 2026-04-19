# CMS Page Builder

The **Block-Based Page Builder** lets admins compose marketing pages from reusable content blocks without writing HTML. Pages are rendered at `/{slug}` via a catch-all route and can be edited live from the admin panel.

Shipped in v1.9.0. Ten block types, JSON-stored, versioned via Filament's builder component.

**Source:**
- Resource: `website-app/app/Filament/Admin/Resources/CmsPageResource.php`
- Model: `website-app/app/Models/CmsPage.php`
- Block templates: `website-app/resources/views/cms/blocks/*.blade.php`
- Page wrapper: `website-app/resources/views/cms/show.blade.php`

---

## Creating a page

1. Sign in at [codemeyo.com/admin](https://codemeyo.com/admin).
2. Navigate to **CMS Pages**.
3. Click **New Cms Page**.
4. Fill in:
   - **Title** — human-readable page title (used in `<title>` and OG meta).
   - **Slug** — URL path (kebab-case, unique). `about` → `/about`, `codemeyo-for-teams` → `/codemeyo-for-teams`.
   - **Published at** — leave blank to save as draft, set to a past datetime to publish.
   - **Meta description** — SEO snippet.
   - **OG image** — picked from the media library.
5. **Blocks** section — add blocks in order.
6. Save. Click **View** to preview live.

---

## Catch-all routing

Published pages are served by a catch-all route at the bottom of `website-app/routes/web.php`:

```php
Route::get('/{slug}', function (string $slug) {
    $page = CmsPage::query()
        ->where('slug', $slug)
        ->whereNotNull('published_at')
        ->where('published_at', '<=', now())
        ->whereNotNull('blocks')
        ->first();

    if (! $page) abort(404);
    return view('cms.show', ['cmsPage' => $page]);
})->where('slug', '[a-z0-9\-]+')->name('cms.show');
```

Rules:

- **Published** — `published_at` must be set and in the past.
- **Has blocks** — `blocks` JSON must be non-null. Empty-block pages 404 (on purpose).
- **Kebab-case slugs** — regex enforces `[a-z0-9-]+`.
- **Catch-all is last** — named routes like `/login`, `/register`, `/admin`, `/dashboard`, `/api/*` always win. Never override them by accident.

### Homepage special case

The `/` route is also CMS-driven (as of v1.9.1). If a published row with `slug='home'` has populated `blocks`, it's rendered via `cms.show`. Otherwise it falls back to the static Blade template at `resources/views/marketing/index.blade.php`. This means:

- Fresh installs show the static homepage (no broken CMS).
- Once an admin publishes a `home` row with blocks, it takes over immediately.
- Un-publish or clear the blocks to revert to the static fallback.

---

## The 10 block types

Each block is a Filament `Builder\Block` instance. Users pick a type from a dropdown, fill in the block-specific fields, and the builder stores a JSON array on the `blocks` column.

### 1. Hero

Full-width hero section for landing pages.

| Field | Description |
|---|---|
| Eyebrow | Small text above the title (optional) |
| Title | Large headline |
| Subtitle | Supporting paragraph |
| CTA label | Button text |
| CTA URL | Button destination |
| Background image | Picked from media library (optional) |
| Background color | Solid color (optional) |

Renders via `cms/blocks/hero.blade.php`.

### 2. Features Grid

Grid of feature cards. Good for "what's included" pages.

| Field | Description |
|---|---|
| Section title | Heading above the grid |
| Section subtitle | Supporting copy |
| Features | Repeater of `{icon, title, description}` items |
| Columns | 2, 3, or 4 across |

Renders via `cms/blocks/features_grid.blade.php`.

### 3. Providers List

Lists the 8 LLM providers with logos and short descriptions. Used on `/` and `/llm-providers`. Can be filtered to show only some providers.

Renders via `cms/blocks/providers_list.blade.php`.

### 4. Download Cards

Grid of download-platform cards (Windows, macOS, Linux, iOS, Android). Each card auto-links to `/download/{platform}` which runs the download-gate middleware.

Renders via `cms/blocks/download_cards.blade.php`.

### 5. Support CTA

Call-to-action block for support / contact. Typically rendered at the bottom of docs-style pages.

| Field | Description |
|---|---|
| Heading | e.g. "Need help?" |
| Subheading | e.g. "We usually respond within a day." |
| CTA label | Button text |
| CTA URL | Destination (e.g. `mailto:support@jagjourney.com`) |

Renders via `cms/blocks/support_cta.blade.php`.

### 6. FAQ Accordion

Expandable Q&A list.

| Field | Description |
|---|---|
| Section title | Heading |
| Items | Repeater of `{question, answer}` (rich-text answer) |

Renders via `cms/blocks/faq_accordion.blade.php`. Uses native HTML `<details>` for no-JS fallback.

### 7. Rich Text

Arbitrary Filament rich-text editor block. Paragraphs, headings, lists, links, inline images. Good for long-form content that doesn't fit a structured block.

Renders via `cms/blocks/rich_text.blade.php`.

### 8. Image

Single centered image with optional caption.

| Field | Description |
|---|---|
| Image | Media library pick |
| Alt text | Accessibility |
| Caption | Figcaption text (optional) |
| Max width | Constrains rendered width (e.g. `720px`) |

Renders via `cms/blocks/image.blade.php`.

### 9. CTA Banner

Full-width banner strip with a single call to action. Typically "Download now" or "Sign up free".

| Field | Description |
|---|---|
| Heading | Large text |
| Subheading | Optional smaller line |
| CTA label + URL | Button |
| Background color | Picked via color picker |

Renders via `cms/blocks/cta_banner.blade.php`.

### 10. Columns

Two- or three-column layout for side-by-side content. Each column can contain its own rich-text.

| Field | Description |
|---|---|
| Columns | Repeater of `{title, content}` items |
| Column count | 2 or 3 |

Renders via `cms/blocks/columns.blade.php`.

---

## Publishing workflow

**Draft:** leave `published_at` blank. Only admins see it (via `/admin` preview link).

**Scheduled publish:** set `published_at` to a future datetime. The catch-all route's `<= now()` check will start serving it at that moment automatically (no cron required).

**Unpublish:** clear `published_at`, save. The slug 404s immediately.

**Versioning:** currently the `blocks` column overwrites on save. There's no built-in version history — if you need it, wrap the form in Laravel's `HasVersions` or diff via git backup. (TODO: add a `cms_page_revisions` table; tracked in [Roadmap](Roadmap).)

---

## SEO

Published pages include:

- `<title>` from the page title
- `<meta name="description">` from the Meta description field
- `<meta property="og:image">` from the OG image
- Canonical URL to the page's own slug
- `hreflang` = `en` (only language currently)

Structured data (`schema.org/WebPage`) is auto-injected in the wrapper layout.

---

## Performance

- Every CMS page response is cached in Redis for 60 seconds (configurable in Settings → Cache & Queue).
- Editing a page invalidates its cache key immediately on save.
- Assets from the media library are served through Cloudflare with long cache headers.

---

## Limitations

- **No block nesting** — a Columns block cannot contain a Features Grid. If you need that, use Rich Text with custom HTML.
- **No in-place block reordering via drag-drop** yet — use the up/down arrows in the builder UI. Filament v5's builder doesn't have drag-drop without extra JS.
- **Block types are fixed** — adding a new type requires code changes (new Block definition + new Blade template). File an issue if you need a type we don't have.

---

## Related pages

- [Admin Panel](Admin-Panel) — the larger admin context.
- [Backend API](Backend-API) — no CMS endpoints are exposed publicly (intentionally — it's a web-only CMS).
- [Roadmap](Roadmap) — planned CMS improvements.
