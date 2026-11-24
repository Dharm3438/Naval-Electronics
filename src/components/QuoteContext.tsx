"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PropertyType } from "@/lib/solar";

export interface QuotePrefill {
  monthlyBill: number;
  systemSize: number;
  propertyType: PropertyType;
  /** Increments on every hand-off so the form can react to repeat clicks. */
  stamp: number;
}

interface QuoteContextValue {
  prefill: QuotePrefill | null;
  sendToForm: (data: Omit<QuotePrefill, "stamp">) => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<QuotePrefill | null>(null);

  const sendToForm = useCallback((data: Omit<QuotePrefill, "stamp">) => {
    setPrefill({ ...data, stamp: Date.now() });
    document
      .getElementById("quote")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Put the cursor in the first empty field once the scroll is under way.
    window.setTimeout(() => {
      document
        .querySelector<HTMLInputElement>("#lead-name")
        ?.focus({ preventScroll: true });
    }, 600);
  }, []);

  const value = useMemo(() => ({ prefill, sendToForm }), [prefill, sendToForm]);

  return <QuoteContext value={value}>{children}</QuoteContext>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}
