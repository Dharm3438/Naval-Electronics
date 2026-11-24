"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { site, waLink } from "@/lib/site";
import { estimate, formatINR } from "@/lib/solar";
import { useQuote } from "./QuoteContext";

type PropertyChoice = "Residential" | "Commercial / Industrial" | "Housing Society";

interface FormState {
  name: string;
  phone: string;
  locality: string;
  property: PropertyChoice;
  bill: string;
  systemSize: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  name: "",
  phone: "",
  locality: "",
  property: "Residential",
  bill: "",
  systemSize: "",
};

const propertyChoices: PropertyChoice[] = [
  "Residential",
  "Commercial / Industrial",
  "Housing Society",
];

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.name.trim().length < 3)
    errors.name = "Please enter your full name (at least 3 characters).";
  if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (form.locality.trim().length < 3)
    errors.locality = "Enter your locality or 6-digit pincode.";
  if (form.bill.trim() !== "" && Number(form.bill) < 500)
    errors.bill = "Monthly bill looks too low — please check.";
  return errors;
}

/** Composes the WhatsApp hand-off message from the submitted enquiry. */
function buildMessage(form: FormState) {
  const lines = [
    `Hello ${site.name}, I would like a rooftop solar quote.`,
    "",
    `Name: ${form.name.trim()}`,
    `Phone / WhatsApp: ${form.phone.trim()}`,
    `Locality / Pincode: ${form.locality.trim()}`,
    `Property type: ${form.property}`,
  ];
  if (form.bill.trim())
    lines.push(`Average monthly bill: ₹${Number(form.bill).toLocaleString("en-IN")}`);
  if (form.systemSize.trim())
    lines.push(`Estimated system size: ${form.systemSize} kW`);
  lines.push("", `Enquiry from the ${site.name} website.`);
  return lines.join("\n");
}

export default function LeadForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const { prefill } = useQuote();
  const [appliedStamp, setAppliedStamp] = useState(0);

  // Receive the calculator hand-off. Adjusting state during render (rather
  // than in an effect) is React's recommended pattern for reacting to a
  // changed prop/context value without an extra commit.
  if (prefill && prefill.stamp !== appliedStamp) {
    setAppliedStamp(prefill.stamp);
    setSubmitted(null);
    setForm((prev) => ({
      ...prev,
      bill: String(prefill.monthlyBill),
      systemSize: String(prefill.systemSize),
      property:
        prefill.propertyType === "commercial"
          ? "Commercial / Industrial"
          : prev.property === "Housing Society"
            ? "Housing Society"
            : "Residential",
    }));
  }

  const update =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSubmitted(form);
  };

  if (submitted) {
    const billValue = Number(submitted.bill);
    const quick =
      billValue >= 500
        ? estimate(
            billValue,
            submitted.property === "Residential" ? "residential" : "commercial",
          )
        : null;

    return (
      <section id="quote" className="bg-ink py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-7 text-center shadow-2xl sm:p-10">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald/12">
              <CheckCircle2 className="h-9 w-9 text-emerald" aria-hidden />
            </span>
            <h2 className="mt-6 font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Thank you, {submitted.name.trim().split(" ")[0]} — enquiry
              recorded
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65 sm:text-base">
              A Naval Electronics engineer will call you on{" "}
              <strong className="font-bold text-ink">
                +91 {submitted.phone}
              </strong>{" "}
              within one working day to schedule your free site survey in{" "}
              {submitted.locality}.
            </p>

            <dl className="mt-7 grid gap-3 rounded-2xl bg-cream p-5 text-left sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                  Property type
                </dt>
                <dd className="mt-0.5 text-sm font-bold text-ink">
                  {submitted.property}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                  Locality / Pincode
                </dt>
                <dd className="mt-0.5 text-sm font-bold text-ink">
                  {submitted.locality}
                </dd>
              </div>
              {quick && (
                <>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                      Indicative system
                    </dt>
                    <dd className="mt-0.5 text-sm font-bold text-ink">
                      {submitted.systemSize || quick.systemSize} kW ·{" "}
                      {quick.roofArea.toLocaleString("en-IN")} sq. ft.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                      Estimated annual saving
                    </dt>
                    <dd className="mt-0.5 text-sm font-bold text-emerald-deep">
                      {formatINR(quick.annualSavings)}
                    </dd>
                  </div>
                </>
              )}
            </dl>

            <p className="mt-7 text-sm font-semibold text-ink">
              Want a response in minutes instead? Send the same details on
              WhatsApp.
            </p>
            <a
              href={waLink(buildMessage(submitted))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-6 py-4 text-base font-bold text-white shadow-xl shadow-emerald/25 transition-all hover:bg-emerald-deep"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Send Details via WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmitted(null);
                setForm(emptyForm);
              }}
              className="mt-4 text-sm font-semibold text-ink/55 underline underline-offset-4 hover:text-ink"
            >
              Submit another enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="bg-ink py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-12 lg:px-8">
        <div className="lg:pt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-amber">
            Free Site Survey
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.75rem]">
            Get your engineered solar quote
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
            Share a few details and we will send a capacity recommendation, a
            subsidy breakdown and a firm turnkey price for your roof in{" "}
            {site.city}. No deposit, no pressure.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {[
              { icon: Clock, text: "Callback within one working day" },
              { icon: ShieldCheck, text: "Your number is used only for this enquiry" },
              { icon: MapPin, text: `On-site survey across ${site.region}` },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden />
                <span className="text-sm font-medium text-white/75">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:gap-6">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-2.5 text-sm font-bold text-white hover:text-amber"
            >
              <Phone className="h-4 w-4 text-amber" aria-hidden />
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2.5 text-sm font-bold text-white hover:text-amber"
            >
              <Mail className="h-4 w-4 text-amber" aria-hidden />
              {site.email}
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl bg-cream p-6 shadow-2xl sm:p-8"
        >
          {prefill && (
            <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-emerald/30 bg-emerald/10 px-4 py-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-deep" aria-hidden />
              <p className="text-xs font-semibold leading-relaxed text-emerald-deep">
                Loaded from your calculator: {prefill.systemSize} kW system for
                a ₹{prefill.monthlyBill.toLocaleString("en-IN")} monthly bill.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-5">
            <Field
              label="Full name"
              id="lead-name"
              error={errors.name}
              required
            >
              <input
                id="lead-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Sunil Deshmukh"
                value={form.name}
                onChange={(e) => update("name")(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                className={inputClass(errors.name)}
              />
            </Field>

            <Field
              label="Phone / WhatsApp number"
              id="lead-phone"
              error={errors.phone}
              required
              hint="10 digits, no +91"
            >
              <div className="flex items-stretch">
                <span className="inline-flex items-center rounded-l-xl border border-r-0 border-ink/15 bg-white px-3 text-sm font-bold text-ink/55">
                  +91
                </span>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={(e) =>
                    update("phone")(e.target.value.replace(/[^\d]/g, "").slice(0, 10))
                  }
                  aria-invalid={Boolean(errors.phone)}
                  className={`${inputClass(errors.phone)} rounded-l-none`}
                />
              </div>
            </Field>

            <Field
              label="Locality / Pincode"
              id="lead-locality"
              error={errors.locality}
              required
            >
              <input
                id="lead-locality"
                name="locality"
                type="text"
                autoComplete="postal-code"
                placeholder="e.g. CIDCO N-4, 431003"
                value={form.locality}
                onChange={(e) => update("locality")(e.target.value)}
                aria-invalid={Boolean(errors.locality)}
                className={inputClass(errors.locality)}
              />
            </Field>

            <Field label="Property type" id="lead-property" required>
              <select
                id="lead-property"
                name="property"
                value={form.property}
                onChange={(e) =>
                  update("property")(e.target.value as PropertyChoice)
                }
                className={`${inputClass()} appearance-none bg-white pr-10`}
              >
                {propertyChoices.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Monthly bill (₹)"
                id="lead-bill"
                error={errors.bill}
                hint="Optional"
              >
                <input
                  id="lead-bill"
                  name="bill"
                  type="text"
                  inputMode="numeric"
                  placeholder="4500"
                  value={form.bill}
                  onChange={(e) =>
                    update("bill")(e.target.value.replace(/[^\d]/g, ""))
                  }
                  aria-invalid={Boolean(errors.bill)}
                  className={inputClass(errors.bill)}
                />
              </Field>
              <Field
                label="System size (kW)"
                id="lead-size"
                hint="From calculator"
              >
                <input
                  id="lead-size"
                  name="systemSize"
                  type="text"
                  inputMode="decimal"
                  placeholder="4"
                  value={form.systemSize}
                  onChange={(e) =>
                    update("systemSize")(e.target.value.replace(/[^\d.]/g, ""))
                  }
                  className={inputClass()}
                />
              </Field>
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-6 py-4 text-base font-bold text-ink shadow-xl shadow-amber/25 transition-all hover:bg-amber-deep hover:shadow-amber/40"
          >
            <Send className="h-5 w-5" aria-hidden />
            Request My Free Solar Quote
          </button>

          <a
            href={waLink(
              form.name.trim() || form.phone.trim()
                ? buildMessage(form)
                : `Hello ${site.name}, I would like a rooftop solar quote for my property in ${site.city}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald/35 bg-white px-6 py-3.5 text-sm font-bold text-emerald-deep transition-all hover:border-emerald hover:bg-emerald/5"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Send Details via WhatsApp
          </a>

          <p className="mt-4 text-center text-xs leading-relaxed text-ink/50">
            By submitting you agree to be contacted about your solar enquiry. We
            never share your number with third parties.
          </p>
        </form>
      </div>
    </section>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm font-medium text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-amber focus:ring-2 focus:ring-amber/25 ${
    error ? "border-red-400" : "border-ink/15"
  }`;
}

function Field({
  label,
  id,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-bold text-ink">
          {label}
          {required && <span className="ml-0.5 text-amber-deep">*</span>}
        </label>
        {hint && !error && (
          <span className="text-[11px] font-semibold text-ink/45">{hint}</span>
        )}
      </div>
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
