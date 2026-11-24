import { MessageCircle } from "lucide-react";
import { site, waLink } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      href={waLink(
        `Hello ${site.name}, I saw your website and would like to know more about rooftop solar for my property in ${site.city}.`,
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Naval Electronics on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-emerald py-3.5 pl-3.5 pr-4 text-white shadow-2xl shadow-emerald/40 transition-all hover:bg-emerald-deep hover:shadow-emerald/60 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6 shrink-0" aria-hidden />
      <span className="hidden text-sm font-bold sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
}
