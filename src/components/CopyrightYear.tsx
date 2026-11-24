"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
const clientYear = () => new Date().getFullYear();

/**
 * Renders the current calendar year, read in the browser rather than at build
 * time so a statically prerendered footer never shows a stale year.
 */
export function CopyrightYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(noopSubscribe, clientYear, () => fallback);
  return <>{year}</>;
}
