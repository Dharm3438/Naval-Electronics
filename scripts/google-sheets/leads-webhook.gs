/**
 * Naval Electronics: website lead webhook.
 *
 * Paste this whole file into the lead sheet's Apps Script editor
 * (Extensions → Apps Script), then Deploy → New deployment → Web app,
 * "Execute as: Me", "Who has access: Anyone". See docs/lead-sheet-setup.md.
 *
 * The website POSTs one JSON object per consultation request; this script
 * validates it again (never trust the browser) and appends a row to the
 * "Leads" tab. Column order must match the sheet's header row.
 */

const SHEET_NAME = "Leads";
const PROPERTY_TYPES = ["Residential", "Commercial", "Housing Society"];
/** Ignore a second submit from the same mobile number within this window. */
const DUPLICATE_WINDOW_SECONDS = 120;

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Honeypot: a hidden field real visitors never see. Bots fill it in.
    // Answer "ok" so the bot learns nothing, but store nothing.
    if (data.website) return json({ ok: true });

    const lead = clean(data);
    if (lead.error) return json({ ok: false, error: lead.error });

    const cache = CacheService.getScriptCache();
    const dupKey = "lead:" + lead.phone;
    if (cache.get(dupKey)) return json({ ok: true, duplicate: true });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
      if (!sheet) throw new Error('Tab "' + SHEET_NAME + '" not found');
      const row = sheet.getLastRow() + 1;
      const range = sheet.getRange(row, 1, 1, 11);
      // Keep mobile and pincode as text so digits are never reformatted.
      range.setNumberFormats([[
        "dd-mmm-yyyy hh:mm", "@", "@", "@", "₹#,##0", "@", "@", "0.0", "@", "@", "@",
      ]]);
      range.setValues([[
        new Date(),
        lead.name,
        lead.phone,
        lead.property,
        lead.bill,
        lead.city,
        lead.pincode,
        lead.systemSize,
        lead.source,
        "New",
        "",
      ]]);
    } finally {
      lock.releaseLock();
    }

    cache.put(dupKey, "1", DUPLICATE_WINDOW_SECONDS);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "Server error" });
  }
}

/** A GET from a browser shows that the deployment is live. */
function doGet() {
  return json({ ok: true, service: "Naval Electronics leads" });
}

function clean(d) {
  const name = text(d.name, 80);
  const phone = String(d.phone || "").replace(/\D/g, "");
  const property = PROPERTY_TYPES.indexOf(d.property) >= 0 ? d.property : "Residential";
  const billText = String(d.bill == null ? "" : d.bill).trim();
  const bill = Number(billText);
  const city = text(d.city, 60);
  const pincode = String(d.pincode || "").replace(/\D/g, "");
  const size = Number(d.systemSize);

  if (name.length < 3) return { error: "Invalid name" };
  if (!/^[6-9]\d{9}$/.test(phone)) return { error: "Invalid mobile number" };
  // Bill, city and pincode are optional, but checked when filled in.
  if (billText && (!isFinite(bill) || bill < 300 || bill > 10000000)) {
    return { error: "Invalid bill" };
  }
  if (city && city.length < 2) return { error: "Invalid city" };
  if (pincode && !/^[1-9]\d{5}$/.test(pincode)) return { error: "Invalid pincode" };

  return {
    name: name,
    phone: phone,
    property: property,
    bill: billText ? Math.round(bill) : "",
    city: city,
    pincode: pincode,
    systemSize: isFinite(size) && size > 0 && size < 1000 ? size : "",
    source: text(d.source, 300),
  };
}

/**
 * Trim, cap the length, and stop text being read as a formula: a value that
 * starts with = + - or @ gets a leading apostrophe (shown as plain text).
 */
function text(value, max) {
  const s = String(value == null ? "" : value).replace(/\s+/g, " ").trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
