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
