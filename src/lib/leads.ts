import { site } from "./site";

/**
 * Where consultation requests go. Both work from a static site because the
 * visitor's browser posts the lead directly — there is no server of our own.
 *
 * 1. Google Sheet + Gmail (preferred): set NEXT_PUBLIC_LEADS_SCRIPT_URL to the
 *    Apps Script web-app URL from docs/google-sheet-leads/. Each lead is added
 *    to the sheet and emailed to the sheet owner.
 * 2. Web3Forms (fallback): set NEXT_PUBLIC_WEB3FORMS_KEY. Email only.
 *
 * Neither value is a secret — both end up in the page's JavaScript by design.
 * They are read at build time, so redeploy after changing them.
 */
const SCRIPT_URL = process.env.NEXT_PUBLIC_LEADS_SCRIPT_URL ?? "";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export interface Lead {
  name: string;
  phone: string;
  property: string;
  bill: string;
  city: string;
  pincode: string;
  systemSize?: number;
}

export async function sendLead(lead: Lead): Promise<void> {
  if (SCRIPT_URL) return sendToGoogleSheet(lead);
  if (WEB3FORMS_KEY) return sendToWeb3Forms(lead);
  if (process.env.NODE_ENV !== "production") {
    console.warn("No lead destination configured — see src/lib/leads.ts. Lead not sent.");
    return;
  }
  throw new Error("Lead form is not configured.");
}

async function sendToGoogleSheet(lead: Lead) {
  // No custom headers: the body goes as text/plain, which keeps this a
  // "simple" cross-origin request. Apps Script cannot answer a CORS preflight.
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ ...lead, source: window.location.href }),
  });
  await expectSuccess(res);
}

async function sendToWeb3Forms(lead: Lead) {
  const bill = `₹${Number(lead.bill).toLocaleString("en-IN")}`;
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `New solar enquiry: ${lead.name}, ${lead.city} (${bill}/month)`,
      from_name: `${site.name} website`,
      Name: lead.name,
      Mobile: `+91 ${lead.phone}`,
      "Property type": lead.property,
      "Monthly light bill": bill,
      City: lead.city,
      Pincode: lead.pincode,
      ...(lead.systemSize ? { "Calculator estimate": `${lead.systemSize} kW system` } : {}),
      "WhatsApp the customer": `https://wa.me/91${lead.phone}`,
    }),
  });
  await expectSuccess(res);
}

async function expectSuccess(res: Response) {
  const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
  if (!res.ok || !data?.success) throw new Error("Lead could not be sent.");
}
