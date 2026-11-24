import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const title =
  "Rooftop Solar in Chhatrapati Sambhajinagar | Naval Electronics Solar Installation";
const description =
  "Naval Electronics installs turnkey rooftop solar for homes, housing societies and MIDC industries in Chhatrapati Sambhajinagar (Aurangabad). Up to ₹78,000 PM Surya Ghar subsidy, complete MSEDCL net-metering and 25-year panel warranty.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s | Naval Electronics",
  },
  description,
  keywords: [
    "rooftop solar Chhatrapati Sambhajinagar",
    "solar panel installation Aurangabad",
    "PM Surya Ghar Muft Bijli Yojana Maharashtra",
    "MSEDCL net metering",
    "solar subsidy 78000",
    "commercial solar MIDC Waluj",
    "Naval Electronics solar",
    "on-grid solar Marathwada",
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
        alt: "Naval Electronics — engineered rooftop solar in Chhatrapati Sambhajinagar",
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
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-cream text-ink">{children}</body>
    </html>
  );
}
