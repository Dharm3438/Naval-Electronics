import ConsultationModal from "@/components/ConsultationModal";
import Brands from "@/components/Brands";
import Customers from "@/components/Customers";
import FAQ from "@/components/FAQ";
import Finance from "@/components/Finance";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import { QuoteProvider } from "@/components/QuoteContext";
import SolarCalculator from "@/components/SolarCalculator";
import SubsidyTable from "@/components/SubsidyTable";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhyNaval from "@/components/WhyNaval";
import { site } from "@/lib/site";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  name: site.name,
  description:
    "Turnkey rooftop solar installation, MSEDCL net-metering and PM Surya Ghar subsidy processing in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra.",
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line2,
    addressLocality: site.city,
    addressRegion: "Maharashtra",
    postalCode: "431001",
    addressCountry: "IN",
  },
  areaServed: [site.city, site.cityAlt, "Marathwada", "Maharashtra"],
  openingHours: "Mo-Sa 09:30-19:30",
  priceRange: "₹₹",
};

export default function Page() {
  return (
    <QuoteProvider>
      <script
        type="application/ld+json"
        // Static, trusted business data serialised at build time.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <main>
        {/* 1. Hero banner with 0% interest / 0% down consultation offer */}
        <Hero />
        {/* 2. Brands  3. Reviews */}
        <Brands />
        <Customers />
        <Projects />
        {/* Extras: subsidy → process & material → finance → calculator → FAQ */}
        <SubsidyTable />
        <Process />
        <WhyNaval />
        <Finance />
        <SolarCalculator />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <WhatsAppButton />
      <ConsultationModal />
    </QuoteProvider>
  );
}
