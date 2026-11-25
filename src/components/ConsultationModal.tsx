"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  BadgePercent,
  Building2,
  CheckCircle2,
  Factory,
  Home,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
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
  if (form.bill.trim() === "") errors.bill = "Enter your average monthly bill.";
  else if (Number(form.bill) < 300) errors.bill = "That bill looks too low — please check.";
  if (form.city.trim().length < 2) errors.city = "Enter your city.";
  if (!/^[1-9]\d{5}$/.test(form.pincode.trim()))
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
    `Monthly light bill: ₹${Number(form.bill).toLocaleString("en-IN")}`,
    `City: ${form.city.trim()}`,
    `Pincode: ${form.pincode.trim()}`,
    ...(systemSize ? [`Calculator estimate: ${systemSize} kW system`] : []),
    "",
    `Enquiry from the ${site.name} website.`,
  ].join("\n");
}

/** Mounted once by the page; shown whenever `openConsult()` is called. */
export default function ConsultationModal() {
  const { consultOpen, prefill, closeConsult } = useQuote();
  if (!consultOpen) return null;
  return <Dialog onClose={closeConsult} prefill={prefill} />;
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      document.getElementById(`consult-${firstKey}`)?.focus();
      return;
    }
    setSubmitted(form);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/75 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-rise relative max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl"
      >
        {/* Header band */}
        <div className="relative overflow-hidden bg-ink px-6 pb-6 pt-7 text-white sm:px-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-amber/30 blur-3xl"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <div className="relative inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink">
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
            onReset={() => {
              setSubmitted(null);
              setForm(emptyForm);
            }}
          />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 pt-6 sm:px-8 sm:pb-8">
            {prefill && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-emerald/30 bg-emerald/10 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-deep" aria-hidden />
                <p className="text-xs font-semibold leading-relaxed text-emerald-deep">
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
                  <span className="inline-flex items-center rounded-l-xl border border-r-0 border-ink/15 bg-white px-3 text-sm font-bold text-ink/55">
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
                <legend className="mb-1.5 text-sm font-bold text-ink">
                  Property type<span className="ml-0.5 text-amber-deep">*</span>
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {propertyChoices.map(({ value, icon: Icon }) => {
                    const selected = form.property === value;
                    return (
                      <label
                        key={value}
                        className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 text-center text-xs font-bold transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-amber/40 ${
                          selected
                            ? "border-amber bg-amber/10 text-ink"
                            : "border-ink/10 bg-white text-ink/60 hover:border-ink/25"
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
                          className={`h-5 w-5 ${selected ? "text-amber-deep" : "text-ink/40"}`}
                          aria-hidden
                        />
                        {value}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <Field label="Monthly light bill" id="consult-bill" error={errors.bill}>
                <div className="flex items-stretch">
                  <span className="inline-flex items-center rounded-l-xl border border-r-0 border-ink/15 bg-white px-3 text-sm font-bold text-ink/55">
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
                <Field label="City" id="consult-city" error={errors.city}>
                  <input
                    id="consult-city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="e.g. Aurangabad"
                    value={form.city}
                    onChange={(e) => update("city")(e.target.value)}
                    aria-invalid={Boolean(errors.city)}
                    className={inputClass(errors.city)}
                  />
                </Field>
                <Field label="Pincode" id="consult-pincode" error={errors.pincode}>
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

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-6 py-4 text-base font-bold text-ink shadow-xl shadow-amber/25 transition-all hover:bg-amber-deep hover:shadow-amber/40"
            >
              <Send className="h-5 w-5" aria-hidden />
              Get Free Consultation
            </button>

            <p className="mt-4 flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-ink/50">
              <ShieldCheck className="mt-px h-3.5 w-3.5 shrink-0 text-emerald" aria-hidden />
              Your details are used only for this enquiry and never shared.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Success({
  data,
  systemSize,
  onReset,
}: {
  data: FormState;
  systemSize?: number;
  onReset: () => void;
}) {
  const rows: [string, string][] = [
    ["Property", data.property],
    ["Monthly bill", `₹${Number(data.bill).toLocaleString("en-IN")}`],
    ["City", data.city.trim()],
    ["Pincode", data.pincode],
  ];
  return (
    <div className="px-6 pb-7 pt-6 text-center sm:px-8 sm:pb-8">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald/12">
        <CheckCircle2 className="h-8 w-8 text-emerald" aria-hidden />
      </span>
      <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">
        Thank you, {data.name.trim().split(" ")[0]}. Our finance expert will call{" "}
        <strong className="font-bold text-ink">+91 {data.phone}</strong> within one
        working day.
      </p>
      <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-left shadow-sm">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/45">{k}</dt>
            <dd className="mt-0.5 text-sm font-bold text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <a
        href={waLink(buildMessage(data, systemSize))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-6 py-4 text-base font-bold text-white shadow-xl shadow-emerald/25 transition-all hover:bg-emerald-deep"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        Send on WhatsApp for a faster reply
      </a>
      <a
        href={`tel:${site.phone}`}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-ink/10 bg-white px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:border-ink/25"
      >
        <Phone className="h-4 w-4 text-emerald" aria-hidden />
        Call {site.phoneDisplay}
      </a>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-sm font-semibold text-ink/55 underline underline-offset-4 hover:text-ink"
      >
        Submit another enquiry
      </button>
    </div>
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
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-ink">
        {label}
        <span className="ml-0.5 text-amber-deep">*</span>
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
