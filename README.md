# Homestead Seoul Website

Single-page bilingual (KO/EN) marketing website with Cloudflare Pages Functions inquiry API.

## Local files
- `index.html` - UI structure and content sections
- `styles.css` - mobile-first design system and animations
- `script.js` - i18n, drawer nav, gallery, contact links, inquiry submit
- `functions/api/inquiry.js` - Turnstile + Resend + Solapi backend endpoint
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

Admin menu stores values in browser `localStorage` key:
- `homestead_admin_overrides`

## Admin access control
- `admin-login.html` Google sign-in success is required before `admin.html` is accessible.
- Allowed account:
  - `homesteadseoul@gmail.com`
- Set your Google OAuth client id in `admin-login.html`:
  - `GOOGLE_CLIENT_ID = "REPLACE_WITH_GOOGLE_CLIENT_ID.apps.googleusercontent.com"`

## Cloudflare Pages setup
1. Deploy this folder as a Cloudflare Pages project.
2. Enable Pages Functions (auto by `functions/` directory).
3. Add these environment variables:
   - `RESEND_API_KEY`
   - `EMAIL_TO`
   - `EMAIL_FROM`
   - `SOLAPI_API_KEY`
   - `SOLAPI_API_SECRET`
   - `SMS_TO`
   - `SMS_FROM`
   - `TURNSTILE_SECRET_KEY`
4. In Cloudflare Turnstile, create a site and replace `data-sitekey` in `index.html`.

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
