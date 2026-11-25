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

/** Optional values handed to the consultation popup, e.g. from the calculator. */
export interface ConsultPrefill {
  monthlyBill: number;
  systemSize: number;
  propertyType: PropertyType;
}

interface QuoteContextValue {
  /** Whether the free consultation popup is showing. */
  consultOpen: boolean;
  /** Values to pre-fill when the popup was opened from the calculator. */
  prefill: ConsultPrefill | null;
  openConsult: (prefill?: ConsultPrefill) => void;
  closeConsult: () => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [consultOpen, setConsultOpen] = useState(false);
  const [prefill, setPrefill] = useState<ConsultPrefill | null>(null);

  const openConsult = useCallback((data?: ConsultPrefill) => {
    setPrefill(data ?? null);
    setConsultOpen(true);
  }, []);
  const closeConsult = useCallback(() => setConsultOpen(false), []);

  const value = useMemo(
    () => ({ consultOpen, prefill, openConsult, closeConsult }),
    [consultOpen, prefill, openConsult, closeConsult],
  );

  return <QuoteContext value={value}>{children}</QuoteContext>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}
