# Homestade Bangbae Website

Single-page bilingual (KO/EN) marketing website with Cloudflare Pages Functions inquiry API.

## Local files
- `index.html` - UI structure and content sections
- `styles.css` - mobile-first design system and animations
- `script.js` - i18n, drawer nav, gallery, contact links, inquiry submit
- `functions/api/inquiry.js` - Turnstile + Resend + Solapi backend endpoint

## Required image files
Put these in `images/`:
- `building_outlook.png`
- `Corridor.png`
- `lobby.png`
- `Room_1.png`
- `Room_2.png`
- `Room3.png`
- `Room_4.png`

## Update contact values
Edit `CONTACT_CONFIG` in `script.js`:
- `phone`
- `email`
- `kakaoUrl`
- `whatsappNumber`
- `mapEmbed`

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
