# Homestead Seoul Website

Single-page bilingual (KO/EN) marketing website with Cloudflare Workers + Static Assets.

## Local files
- `index.html` - UI structure and content sections
- `styles.css` - mobile-first design system and animations
- `script.js` - i18n, drawer nav, gallery, contact links, inquiry submit
- `src/index.js` - Worker API (`/api/inquiry`, `/api/public-config`) + static asset pass-through
- `wrangler.jsonc` - Worker + assets configuration
- `admin-login.html` - Google sign-in page for admin access
- `admin.html` - admin editor (requires authenticated session)

## Required image files
Put these in `images/`:
- `1.png`
- `2.png`
- `3.png`
- `4.png`
- `5.png`
- `6.png`

## Update contact values
Edit from `admin.html` (recommended) or directly in `script.js`:
- branding (KO/EN)
- hero text and image
- gallery image paths
- pricing text
- contact values (`phone`, `email`, `kakaoUrl`, `whatsappNumber`, `mapEmbed`)
- You can upload local image files directly in `admin.html` (stored in browser localStorage as Data URL)

Admin menu stores values in browser `localStorage` key:
- `homestead_admin_overrides`

## Admin access control
- `admin-login.html` Google sign-in success is required before `admin.html` is accessible.
- Allowed account defaults to `homesteadseoul@gmail.com`
- Admin login page reads these from Worker env via `/api/public-config`:
  - `GOOGLE_CLIENT_ID`
  - `ADMIN_ALLOWED_EMAIL` (optional; default `homesteadseoul@gmail.com`)
- `www` and apex are unified by Worker redirect (`308`) to one canonical host.

## Cloudflare Workers setup
1. Deploy repository with Cloudflare Git integration (Workers & Pages UI).
2. Ensure `wrangler.jsonc` is in repo root.
3. Add Worker variables/secrets:
   - `CANONICAL_HOST` (recommended: `homesteadseoul.com`)
   - `GOOGLE_CLIENT_ID`
   - `ADMIN_ALLOWED_EMAIL` (optional)
   - `RESEND_API_KEY`
   - `EMAIL_TO`
   - `EMAIL_FROM`
   - `SOLAPI_API_KEY` (optional)
   - `SOLAPI_API_SECRET` (optional)
   - `SMS_TO` (optional)
   - `SMS_FROM` (optional)
   - `TURNSTILE_SECRET_KEY` (optional)
4. For Turnstile widget, set real site key in `index.html` (`data-sitekey`).

## API contract
`POST /api/inquiry`

Request JSON:
```json
{
  "name": "string",
  "contact": "string",
  "message": "string",
  "language": "ko|en",
  "turnstileToken": "string"
}
```

Response JSON:
```json
{
  "ok": true,
  "message": "..."
}
```

## Notes
- SMS send is non-blocking by design (email success is required for `ok=true`).
- Pricing is manual seasonal range display in the UI (`script.js` i18n copy).
- Use `/api/health` to confirm runtime config flags after deployment.
