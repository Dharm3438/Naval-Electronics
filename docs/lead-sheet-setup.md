# Consultation leads → Google Sheet

Every "Get Free Consultation" submission is added as a new row to one shared
Google Sheet. The site stays a static export: the form posts straight to a
small Google Apps Script attached to the sheet, and the script appends the row.

- **Lead sheet:** [Naval Electronics – Website Leads](https://docs.google.com/spreadsheets/d/1sepLG8mfip66G1WlDpsIaNNOkWQaN_zBlvQLAU5xxJ8/edit)
- **Script source:** [`scripts/google-sheets/leads-webhook.gs`](../scripts/google-sheets/leads-webhook.gs)
- **Website code:** `src/lib/leads.ts` (sending) and `src/components/ConsultationModal.tsx` (form)

## Columns on the `Leads` tab

| Column | Filled by |
|---|---|
| Submitted at | Script (India time) |
| Name, Mobile, Property type, Monthly bill (₹), City, Pincode | Visitor |
| Calculator estimate (kW) | Website, when the form was opened from the solar calculator |
| Source page | Website (page URL, including any `utm_` campaign tags) |
| Status | Script sets `New`; the team changes it from the dropdown |
| Follow-up notes | The team |

Don't rename the `Leads` tab, and don't reorder or insert columns between
A and K: the script writes by position. Adding columns **after K** is fine.

## One-time setup (about 5 minutes)

1. Open the lead sheet, then **Extensions → Apps Script**.
2. Delete the sample code in `Code.gs`, paste in the whole of
   `scripts/google-sheets/leads-webhook.gs`, and click **Save**.
3. Click **Deploy → New deployment**. Under "Select type" choose **Web app**.
   - Description: `Website leads`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, then **Authorize access** and allow it with the Google
   account that owns the sheet. (Google shows an "unverified app" warning for
   your own scripts: choose *Advanced → Go to … (unsafe)*. It's your script.)
5. Copy the **Web app URL**. It looks like
   `https://script.google.com/macros/s/AKfy…/exec`.
6. Check it: open the URL in a browser. You should see
   `{"ok":true,"service":"Naval Electronics leads"}`.

"Anyone" only means the website's visitors can *send* a lead to the script.
Nobody can read the sheet through it.

## Connect the website

The URL is read at build time from `NEXT_PUBLIC_LEADS_ENDPOINT`.

- **Render:** Dashboard → the `naval-electronics` static site → **Environment**
  → add `NEXT_PUBLIC_LEADS_ENDPOINT` = the web app URL → **Save, rebuild and
  deploy**.
- **Hostinger / any other static host:** build locally with the variable set,
  then upload `out/` as usual:
  ```bash
  NEXT_PUBLIC_LEADS_ENDPOINT="https://script.google.com/macros/s/…/exec" npm run build
  ```
- **Local development:** put the same line in `.env.local` (not committed).

Without the variable the form still shows the thank-you screen, but nothing is
saved and the browser console logs a warning.

## Test it

Submit the form on the live site with your own number. A row should appear in
the sheet within a few seconds. Submitting the same number again within two
minutes is ignored, so double-clicks don't create duplicate rows.

## Updating the script later

Edit the code in Apps Script, then **Deploy → Manage deployments → ✏️ Edit →
Version: New version → Deploy**. This keeps the same URL, so the website does
not need rebuilding. (Creating a *new deployment* instead gives a new URL.)

## Sharing and privacy

The sheet holds customers' names and phone numbers. Share it with named team
members only (**Share → add their Google accounts**), and keep "General access"
set to **Restricted**, never "Anyone with the link".

## What the script protects against

- Every field is checked again on the server, with the same rules as the form.
- A hidden "honeypot" field catches most spam bots; their submissions are dropped.
- Text starting with `=`, `+`, `-` or `@` is stored as plain text, never as a formula.
- Mobile numbers and pincodes are stored as text, so no digits are lost.
- A lock makes simultaneous submissions go to separate rows.
- If saving fails, the visitor sees an error with WhatsApp and call buttons, so
  the lead isn't lost.
