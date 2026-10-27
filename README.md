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
