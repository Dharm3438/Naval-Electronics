"use client";

import type { ReactNode } from "react";
import { useQuote } from "./QuoteContext";

/** Any button that opens the free loan-consultation popup. */
export default function ConsultButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const { openConsult } = useQuote();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => {
        onClick?.();
        openConsult();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
