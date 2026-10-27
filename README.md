# Fernandez Carpet Services — website

Static bilingual (EN/ES) landing page for Fernandez Carpet Services: floors, roofs and bathrooms in metro Atlanta.

- `index.html` — the whole site (HTML, CSS and JS in one file). Language toggle EN/ES in the header.
- `img/` — project photos and logo.
- `vercel.json` — Vercel settings (no build step).

## Estimate form
Submissions are sent by email to info@fernandezgc.com through FormSubmit (`FORM_ENDPOINT` in `index.html`).
The first submission on the live domain sends an activation email to that address; click **Activate** once.

## Deploy on Vercel
Import this repository in Vercel → Framework preset: **Other** → no build command, output directory `.` → Deploy.
Then add the custom domain under Project → Settings → Domains.

## SMS relay (Twilio)
`twilio/sms-relay.js` is a Twilio Function, not part of the website (excluded from Vercel by `.vercelignore`).
Customer texts to the business number are forwarded to `OWNER_CELL`; replies sent as `+1XXXXXXXXXX message`
from `OWNER_CELL` go out to the customer from the business number. Deploy it in Twilio Console →
Functions and Assets → Services, set the `OWNER_CELL` environment variable, and point the number's
"A message comes in" to the function. Requires an approved A2P 10DLC campaign.
