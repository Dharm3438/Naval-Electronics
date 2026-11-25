/**
 * Sends a consultation request to the Google Sheet lead log.
 *
 * The endpoint is a Google Apps Script web app bound to the lead sheet
 * (see docs/lead-sheet-setup.md and scripts/google-sheets/leads-webhook.gs).
 * Its URL is baked in at build time from NEXT_PUBLIC_LEADS_ENDPOINT, which
 * keeps the site a plain static export with no server of its own.
 */

export interface LeadPayload {
  name: string;
  phone: string;
  property: string;
  bill: string;
  city: string;
  pincode: string;
  systemSize?: number;
  /** Honeypot. Always empty for real visitors. */
  website?: string;
}

const endpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT ?? "";

export async function submitLead(lead: LeadPayload): Promise<void> {
  if (!endpoint) {
    // Local dev or a build without the variable: keep the form usable.
    console.warn("NEXT_PUBLIC_LEADS_ENDPOINT is not set; lead was not saved.", lead);
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    // text/plain keeps this a "simple" CORS request (no preflight), which
    // Apps Script web apps cannot answer. The script parses the JSON body.
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...lead, source: window.location.href }),
      redirect: "follow",
      signal: controller.signal,
    });
    const result = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !result?.ok) throw new Error("Lead was not saved");
  } finally {
    clearTimeout(timer);
  }
}
