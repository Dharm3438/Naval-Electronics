"use client";

import { useSyncExternalStore } from "react";
import { Megaphone } from "lucide-react";
import { site } from "@/lib/site";

const noopSubscribe = () => () => {};
const closesAt = Date.parse(site.offer.registrationCloses);
const isOpen = () => Date.now() <= closesAt;

/**
 * "Registration closes on …" callout for the festival offer. The check runs in
 * the browser, so a statically prerendered page stops showing the deadline the
 * moment it passes — no rebuild needed.
 */
export default function OfferDeadline() {
  const open = useSyncExternalStore(noopSubscribe, isOpen, () => true);
  if (!open) return null;

  return (
    <p className="mt-6 flex items-start gap-3 rounded-2xl bg-amber/15 px-4 py-3 ring-1 ring-amber/40 backdrop-blur-md">
      <Megaphone className="mt-0.5 h-5 w-5 shrink-0 text-amber" aria-hidden />
      <span className="text-sm leading-snug text-white sm:text-[15px]">
        <strong className="font-extrabold text-amber">
          Limited-time offer!
        </strong>{" "}
        Solar registration is open only until{" "}
        <strong className="font-bold">
          {site.offer.registrationClosesDisplay}
        </strong>
        . Book today.
      </span>
    </p>
  );
}
