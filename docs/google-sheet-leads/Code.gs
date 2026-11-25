/**
 * Naval Electronics — website enquiries → Google Sheet + email.
 *
 * Paste this whole file into Extensions → Apps Script of the leads Google
 * Sheet, then deploy it as a web app. Full steps: docs/google-sheet-leads/README.md
 *
 * Every consultation request from the website becomes one row in the
 * "Leads" tab and an email to NOTIFY_EMAIL.
 */

/** Who gets the email. Leave empty to use the Google account that owns this script. */
var NOTIFY_EMAIL = "";

var SHEET_NAME = "Leads";
var HEADERS = [
  "Received (IST)",
  "Name",
  "Mobile",
  "Property type",
  "Monthly bill (₹)",
  "City",
  "Pincode",
  "Calculator estimate",
  "Status",
  "Notes",
  "Page",
];

function doPost(e) {
  var lead;
  try {
    lead = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply_(false, "Invalid request");
  }

  var problem = validate_(lead);
  if (problem) return reply_(false, problem);

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  var sheet;
  try {
    sheet = getSheet_();
    sheet.appendRow([
      Utilities.formatDate(new Date(), "Asia/Kolkata", "dd MMM yyyy, hh:mm a"),
      safe_(lead.name),
      "'+91 " + lead.phone, // leading ' keeps Sheets from treating it as a formula or number
      safe_(lead.property),
      Number(lead.bill),
      safe_(lead.city),
      "'" + lead.pincode,
      lead.systemSize ? Number(lead.systemSize) + " kW" : "",
      "New",
      "",
      safe_(lead.source || ""),
    ]);
  } finally {
    lock.releaseLock();
  }

  // The row is saved even if the email fails (e.g. daily quota reached).
  try {
    sendEmail_(lead, sheet.getParent().getUrl());
  } catch (err) {
    console.error("Email failed: " + err);
  }

  return reply_(true);
}

/** Lets you open the web-app URL in a browser to check it is deployed. */
function doGet() {
  return ContentService.createTextOutput("Naval Electronics lead endpoint is running.");
}

function validate_(lead) {
  if (!lead || typeof lead !== "object") return "Invalid request";
  if (!lead.name || String(lead.name).trim().length < 3) return "Invalid name";
  if (!/^[6-9]\d{9}$/.test(String(lead.phone))) return "Invalid mobile";
  if (!/^\d{3,7}$/.test(String(lead.bill))) return "Invalid bill";
  if (!lead.city || String(lead.city).trim().length < 2) return "Invalid city";
  if (!/^[1-9]\d{5}$/.test(String(lead.pincode))) return "Invalid pincode";
  if (String(lead.name).length > 100 || String(lead.city).length > 100) return "Too long";
  return "";
}

function sendEmail_(lead, sheetUrl) {
  var to = NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
  var bill = "₹" + Number(lead.bill).toLocaleString("en-IN");
  var rows = [
    ["Name", lead.name],
    ["Mobile", "+91 " + lead.phone],
    ["Property type", lead.property],
    ["Monthly light bill", bill],
    ["City", lead.city],
    ["Pincode", lead.pincode],
  ];
  if (lead.systemSize) rows.push(["Calculator estimate", lead.systemSize + " kW system"]);

  var html =
    '<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">' +
    "<h2 style=\"margin:0 0 12px\">New solar enquiry from the website</h2>" +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows
      .map(function (r) {
        return (
          '<tr><td style="color:#666">' + esc_(r[0]) + "</td><td><b>" + esc_(String(r[1])) + "</b></td></tr>"
        );
      })
      .join("") +
    "</table>" +
    '<p style="margin-top:16px">' +
    '<a href="tel:+91' + lead.phone + '">📞 Call</a> &nbsp;·&nbsp; ' +
    '<a href="https://wa.me/91' + lead.phone + '">💬 WhatsApp</a> &nbsp;·&nbsp; ' +
    '<a href="' + sheetUrl + '">📋 Open all leads</a>' +
    "</p></div>";

  var text = rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n") +
    "\n\nWhatsApp: https://wa.me/91" + lead.phone + "\nAll leads: " + sheetUrl;

  MailApp.sendEmail({
    to: to,
    subject: "New solar enquiry: " + lead.name + ", " + lead.city + " (" + bill + "/month)",
    body: text,
    htmlBody: html,
    name: "Naval Electronics website",
  });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#fde68a");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Stops text that starts with = + - @ from being run as a spreadsheet formula. */
function safe_(value) {
  var s = String(value).trim().slice(0, 300);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function esc_(s) {
  return s.replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function reply_(success, error) {
  return ContentService.createTextOutput(
    JSON.stringify(success ? { success: true } : { success: false, error: error })
  ).setMimeType(ContentService.MimeType.JSON);
}

/** Run this once from the editor (▶ Run) to grant permissions and send a test lead. */
function testSetup() {
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        name: "Test Customer",
        phone: "9876543210",
        property: "Residential",
        bill: "3500",
        city: "Chalisgaon",
        pincode: "424101",
        systemSize: 3,
        source: "testSetup",
      }),
    },
  });
  console.log(res.getContent());
}
