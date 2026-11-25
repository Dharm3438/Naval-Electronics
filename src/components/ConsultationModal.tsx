"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  BadgePercent,
  Building2,
  CheckCircle2,
  Clock,
  Factory,
  Loader2,
  Home,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { submitLead } from "@/lib/leads";
import { site, waLink } from "@/lib/site";
import { useQuote, type ConsultPrefill } from "./QuoteContext";

type PropertyChoice = "Residential" | "Commercial" | "Housing Society";

interface FormState {
  name: string;
  phone: string;
  property: PropertyChoice;
  bill: string;
  city: string;
  pincode: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  name: "",
  phone: "",
  property: "Residential",
  bill: "",
  city: "",
  pincode: "",
};

const propertyChoices: { value: PropertyChoice; icon: typeof Home }[] = [
  { value: "Residential", icon: Home },
  { value: "Commercial", icon: Factory },
  { value: "Housing Society", icon: Building2 },
];

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.name.trim().length < 3) errors.name = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
    errors.phone = "Enter a valid 10-digit mobile number.";
  // Bill, city and pincode are optional, but checked when filled in.
  const bill = form.bill.trim();
  if (bill !== "" && Number(bill) < 300)
    errors.bill = "That bill looks too low — please check.";
  const city = form.city.trim();
  if (city !== "" && city.length < 2) errors.city = "Enter your city.";
  const pincode = form.pincode.trim();
  if (pincode !== "" && !/^[1-9]\d{5}$/.test(pincode))
    errors.pincode = "Enter a valid 6-digit pincode.";
  return errors;
}

function buildMessage(form: FormState, systemSize?: number) {
  return [
    `Hello ${site.name}, I would like a free solar loan consultation (0% interest / 0% down payment).`,
    "",
    `Name: ${form.name.trim()}`,
    `Mobile: ${form.phone.trim()}`,
    `Property type: ${form.property}`,
    ...(form.bill.trim()
      ? [`Monthly light bill: ₹${Number(form.bill).toLocaleString("en-IN")}`]
      : []),
    ...(form.city.trim() ? [`City: ${form.city.trim()}`] : []),
    ...(form.pincode.trim() ? [`Pincode: ${form.pincode.trim()}`] : []),
    ...(systemSize ? [`Calculator estimate: ${systemSize} kW system`] : []),
    "",
    `Enquiry from the ${site.name} website.`,
  ].join("\n");
}

/** Mounted once by the page; shown whenever `openConsult()` is called. */
export default function ConsultationModal({
  clearUrlOnClose = false,
}: {
  /**
   * On the shareable /consultation/ link, switch the address bar back to "/"
   * once the popup closes, so a refresh or a copied link shows the normal site.
   */
  clearUrlOnClose?: boolean;
}) {
  const { consultOpen, prefill, closeConsult } = useQuote();
  const handleClose = useCallback(() => {
    closeConsult();
    if (clearUrlOnClose && window.location.pathname.startsWith("/consultation")) {
      window.history.replaceState(null, "", "/" + window.location.search);
    }
  }, [closeConsult, clearUrlOnClose]);
  if (!consultOpen) return null;
  return <Dialog onClose={handleClose} prefill={prefill} />;
}

function initialForm(prefill: ConsultPrefill | null): FormState {
  if (!prefill) return emptyForm;
  return {
    ...emptyForm,
    bill: String(prefill.monthlyBill),
    property: prefill.propertyType === "commercial" ? "Commercial" : "Residential",
  };
}

function Dialog({
  onClose,
  prefill,
}: {
  onClose: () => void;
  prefill: ConsultPrefill | null;
}) {
  const [form, setForm] = useState<FormState>(() => initialForm(prefill));
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [sending, setSending] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      opener?.focus?.();
    };
  }, [onClose]);

  const update =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      document.getElementById(`consult-${firstKey}`)?.focus();
      return;
    }
    setSending(true);
    setSendFailed(false);
    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        property: form.property,
        bill: form.bill.trim(),
        city: form.city.trim(),
        pincode: form.pincode.trim(),
        systemSize: prefill?.systemSize,
        website: honeypot,
      });
      setSubmitted(form);
    } catch {
      setSendFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-forest/75 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-rise relative max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-wash shadow-2xl sm:rounded-3xl"
      >
        {/* Header band */}
        <div className="relative overflow-hidden bg-forest px-6 pb-6 pt-7 text-white sm:px-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-leaf/30 blur-3xl"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <div className="relative inline-flex items-center gap-1.5 rounded-full bg-leaf px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white">
            <BadgePercent className="h-3.5 w-3.5" aria-hidden />
            0% Interest · 0% Down Payment
          </div>
          <h2
            id="consult-title"
            className="relative mt-4 pr-8 font-display text-2xl font-extrabold leading-tight sm:text-[1.7rem]"
          >
            {submitted ? "Request received" : "Get a free solar loan consultation"}
          </h2>
          {!submitted && (
            <p className="relative mt-2 text-sm leading-relaxed text-white/65">
              Tell us about your property. Our finance expert will call you
              with EMI options, subsidy amount and a firm quote, at no cost to you.
            </p>
          )}
        </div>

        {submitted ? (
          <Success
            data={submitted}
            systemSize={prefill?.systemSize}
            onClose={onClose}
            onReset={() => {
              setSubmitted(null);
              setForm(emptyForm);
            }}
          />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 pt-6 sm:px-8 sm:pb-8">
            {prefill && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-leaf/30 bg-leaf/10 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf-deep" aria-hidden />
                <p className="text-xs font-semibold leading-relaxed text-leaf-deep">
                  From your calculator: {prefill.systemSize} kW system for a ₹
                  {prefill.monthlyBill.toLocaleString("en-IN")} monthly bill.
                </p>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <Field label="Full name" id="consult-name" error={errors.name}>
                <input
                  ref={firstField}
                  id="consult-name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Sunil Deshmukh"
                  value={form.name}
                  onChange={(e) => update("name")(e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  className={inputClass(errors.name)}
                />
              </Field>

              <Field label="Mobile number" id="consult-phone" error={errors.phone}>
                <div className="flex items-stretch">
                  <span className="inline-flex items-center rounded-l-xl border border-r-0 border-forest/15 bg-white px-3 text-sm font-bold text-forest/55">
                    +91
                  </span>
                  <input
                    id="consult-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    placeholder="9876543210"
                    value={form.phone}
                    onChange={(e) =>
                      update("phone")(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    aria-invalid={Boolean(errors.phone)}
                    className={`${inputClass(errors.phone)} rounded-l-none`}
                  />
                </div>
              </Field>

              <fieldset>
                <legend className="mb-1.5 text-sm font-bold text-forest">
                  Property type<span className="ml-0.5 text-leaf-deep">*</span>
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {propertyChoices.map(({ value, icon: Icon }) => {
                    const selected = form.property === value;
                    return (
                      <label
                        key={value}
                        className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 text-center text-xs font-bold transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-leaf/40 ${
                          selected
                            ? "border-leaf bg-leaf/10 text-forest"
                            : "border-forest/10 bg-white text-forest/60 hover:border-forest/25"
                        }`}
                      >
                        <input
                          type="radio"
                          name="consult-property"
                          value={value}
                          checked={selected}
                          onChange={() => update("property")(value)}
                          className="sr-only"
                        />
                        <Icon
                          className={`h-5 w-5 ${selected ? "text-leaf-deep" : "text-forest/40"}`}
                          aria-hidden
                        />
                        {value}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <Field label="Monthly light bill" id="consult-bill" optional error={errors.bill}>
                <div className="flex items-stretch">
                  <span className="inline-flex items-center rounded-l-xl border border-r-0 border-forest/15 bg-white px-3 text-sm font-bold text-forest/55">
                    ₹
                  </span>
                  <input
                    id="consult-bill"
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 3500"
                    value={form.bill}
                    onChange={(e) =>
                      update("bill")(e.target.value.replace(/\D/g, "").slice(0, 7))
                    }
                    aria-invalid={Boolean(errors.bill)}
                    className={`${inputClass(errors.bill)} rounded-l-none`}
                  />
                </div>
              </Field>

              <div className="grid grid-cols-[1fr_9rem] gap-3">
                <Field label="City" id="consult-city" optional error={errors.city}>
                  <input
                    id="consult-city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Your city"
                    value={form.city}
                    onChange={(e) => update("city")(e.target.value)}
                    aria-invalid={Boolean(errors.city)}
                    className={inputClass(errors.city)}
                  />
                </Field>
                <Field label="Pincode" id="consult-pincode" optional error={errors.pincode}>
                  <input
                    id="consult-pincode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={6}
                    placeholder="431001"
                    value={form.pincode}
                    onChange={(e) =>
                      update("pincode")(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    aria-invalid={Boolean(errors.pincode)}
                    className={inputClass(errors.pincode)}
                  />
                </Field>
              </div>
            </div>

            {/* Honeypot: hidden from people, filled in by spam bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="consult-website">Website</label>
              <input
                id="consult-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {sendFailed && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <p className="flex items-start gap-2 font-semibold">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  We couldn&apos;t send your request. Please try again, or reach us
                  directly:
                </p>
                <div className="mt-3 flex flex-wrap gap-2 pl-6">
                  <a
                    href={waLink(buildMessage(form, prefill?.systemSize))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-leaf px-3 py-2 text-xs font-bold text-white hover:bg-leaf-deep"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${site.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-forest/15 bg-white px-3 py-2 text-xs font-bold text-forest hover:border-forest/30"
                  >
                    <Phone className="h-4 w-4 text-leaf" aria-hidden />
                    Call {site.phoneDisplay}
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              aria-busy={sending}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-leaf px-6 py-4 text-base font-bold text-white shadow-xl shadow-leaf/25 transition-all hover:bg-leaf-deep hover:shadow-leaf/40 disabled:cursor-wait disabled:opacity-75"
            >
              {sending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" aria-hidden />
                  {sendFailed ? "Try Again" : "Get Free Consultation"}
                </>
              )}
            </button>

            <p className="mt-4 flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-forest/50">
              <ShieldCheck className="mt-px h-3.5 w-3.5 shrink-0 text-leaf" aria-hidden />
              Your details are used only for this enquiry and never shared.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/** Seconds before the thank-you screen closes itself. */
const AUTO_CLOSE_SECONDS = 10;

function Success({
  data,
  systemSize,
  onClose,
  onReset,
}: {
  data: FormState;
  systemSize?: number;
  onClose: () => void;
  onReset: () => void;
}) {
  // Close automatically so visitors can carry on browsing; "Keep open" stops it.
  const [secondsLeft, setSecondsLeft] = useState<number | null>(AUTO_CLOSE_SECONDS);
  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
      onClose();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onClose]);

  const rows = (
    [
      ["Property", data.property],
      ["Monthly bill", data.bill.trim() && `₹${Number(data.bill).toLocaleString("en-IN")}`],
      ["City", data.city.trim()],
      ["Pincode", data.pincode.trim()],
    ] as [string, string][]
  ).filter(([, v]) => v !== "");
  return (
    <div className="px-6 pb-7 pt-6 text-center sm:px-8 sm:pb-8">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-leaf/12">
        <CheckCircle2 className="h-8 w-8 text-leaf" aria-hidden />
      </span>
      <p className="mt-4 text-sm leading-relaxed text-forest/70 sm:text-base">
        Thank you, {data.name.trim().split(" ")[0]}. Our finance expert will call{" "}
        <strong className="font-bold text-forest">+91 {data.phone}</strong> as soon as
        possible.
      </p>
      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left">
        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
        <p className="text-xs leading-relaxed text-amber-900 sm:text-sm">
          We&apos;re receiving a high number of enquiries right now, so our call may
          take a little longer than usual. If you haven&apos;t heard from us within{" "}
          <strong className="font-bold">2 working days</strong>, please call us on{" "}
          <a
            href={`tel:${site.phone}`}
            className="font-bold underline underline-offset-2 hover:text-amber-950"
          >
            {site.phoneDisplay}
          </a>{" "}
          or message us on WhatsApp.
        </p>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-left shadow-sm">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[11px] font-bold uppercase tracking-wider text-forest/45">{k}</dt>
            <dd className="mt-0.5 text-sm font-bold text-forest">{v}</dd>
          </div>
        ))}
      </dl>
      <a
        href={waLink(buildMessage(data, systemSize))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-leaf px-6 py-4 text-base font-bold text-white shadow-xl shadow-leaf/25 transition-all hover:bg-leaf-deep"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        Send on WhatsApp for a faster reply
      </a>
      <a
        href={`tel:${site.phone}`}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-forest/10 bg-white px-6 py-3.5 text-sm font-bold text-forest transition-colors hover:border-forest/25"
      >
        <Phone className="h-4 w-4 text-leaf" aria-hidden />
        Call {site.phoneDisplay}
      </a>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-sm font-semibold text-forest/55 underline underline-offset-4 hover:text-forest"
      >
        Submit another enquiry
      </button>
      {secondsLeft !== null && (
        <p className="mt-4 text-xs text-forest/45" aria-live="off">
          This window will close in {secondsLeft}s.{" "}
          <button
            type="button"
            onClick={() => setSecondsLeft(null)}
            className="font-semibold text-forest/60 underline underline-offset-2 hover:text-forest"
          >
            Keep open
          </button>
        </p>
      )}
    </div>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm font-medium text-forest outline-none transition-colors placeholder:text-forest/35 focus:border-leaf focus:ring-2 focus:ring-leaf/25 ${
    error ? "border-red-400" : "border-forest/15"
  }`;
}

function Field({
  label,
  id,
  optional = false,
  error,
  children,
}: {
  label: string;
  id: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-forest">
        {label}
        {optional ? (
          <span className="ml-1.5 text-xs font-semibold text-forest/45">(optional)</span>
        ) : (
          <span className="ml-0.5 text-leaf-deep">*</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-start gap-1.5 text-xs font-semibold text-red-600">
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
