import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

/**
 * Shareable link that opens the site with the free-consultation popup already
 * showing, e.g. for WhatsApp or Instagram: https://navalelectronics.in/consultation
 * Closing or submitting the popup leaves the visitor on the normal site.
 */

const title = "Free Solar Consultation: 0% Interest & 0% Down Payment";
const description =
  "Book a free rooftop solar consultation with Naval Electronics. Get EMI options, your PM Surya Ghar subsidy amount and a firm quote, at no cost.";

export const metadata: Metadata = {
  title,
  description,
  // Same content as the home page, so search engines should index "/" only.
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/consultation/",
  },
  twitter: { title, description },
};

export default function ConsultationPage() {
  return <HomePage consultOnLoad />;
}
