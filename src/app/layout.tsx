import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

/*
 * Inter and Plus Jakarta Sans (both SIL Open Font License), self-hosted as
 * variable fonts cut down to the characters the site uses: basic Latin plus
 * ₹ — – · • … × − © → and curly quotes. Google's own "latin" subset leaves out
 * ₹, which made browsers download a second "latin-ext" file per font (~107 KB).
 *
 * To regenerate (e.g. after adding text with a new symbol), download from
 *   https://fonts.googleapis.com/css2?family=Inter:wght@100..900&text=<chars>
 *   https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500..800&text=<chars>
 * and save the woff2 linked in each response over the files in ./fonts.
 * A character missing from the files still shows, in the fallback font.
 */
const inter = localFont({
  src: "./fonts/inter-var-subset.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-var-subset.woff2",
  variable: "--font-jakarta",
  weight: "500 800",
  display: "swap",
});

const title =
  "Rooftop Solar with 0% Interest & 0% Down Payment | Naval Electronics";
const description =
  "Naval Electronics installs turnkey rooftop solar for homes, housing societies and industries. 0% interest, 0% down payment, up to ₹78,000 PM Surya Ghar subsidy and complete systems from ₹1,80,000 with top brands.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s | Naval Electronics",
  },
  description,
  keywords: [
    "rooftop solar 0% interest",
    "solar 0% down payment",
    "PM Surya Ghar Muft Bijli Yojana",
    "MSEDCL net metering",
    "solar subsidy 78000",
    "commercial rooftop solar",
    "Naval Electronics solar",
    "on-grid rooftop solar",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title,
    description,
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Naval Electronics — engineered rooftop solar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "Solar Energy Installation",
};

export const viewport: Viewport = {
  themeColor: "#0B3B2C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-wash text-forest">{children}</body>
    </html>
  );
}
