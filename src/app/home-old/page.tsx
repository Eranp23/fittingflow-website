import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import HeroSlider from "@/components/landing/HeroSlider";
import { TrustedStrip } from "@/components/landing/TrustedStrip";
import HomeFeaturesGrid from "@/components/landing/HomeFeaturesGrid";
import ClientExperienceSlider from "@/components/landing/ClientExperienceSlider";
import { HowItWorksSection } from "@/components/landing/HowItWorks";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import IntegrationsSection from "@/components/landing/IntegrationsSection";
import LandingFAQ from "@/components/landing/LandingFAQ";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { faqPageJsonLd, organizationJsonLd, softwareApplicationJsonLd } from "@/lib/seoConfig";

export const metadata = { title: { absolute: "FittingFlow (previous home page)" }, robots: { index: false, follow: false } };

const companies = [
  { name: "Be You Be Bold", logo: "/uploads/landing/partners/be-you-be-bold.png" },
  { name: "Pure Home Florida", logo: "/uploads/landing/partners/pure-home-florida.png" },
  { name: "Publish Capital", logo: "/uploads/landing/partners/publish-capital.png" },
  { name: "NCHPEG", logo: "/uploads/landing/partners/nchpeg.png" },
  { name: "Oak Contracting", logo: "/uploads/landing/partners/oak-contracting.png" },
  { name: "Soflonet", logo: "/uploads/landing/partners/soflonet.png" },
  { name: "Chesaco RV", logo: "/uploads/landing/partners/chesaco-rv.png" },
  { name: "Murtech", logo: "/uploads/landing/partners/murtech.png" },
  { name: "Fly Shot Photo", logo: "/uploads/landing/partners/flyshotphoto.png" },
  { name: "Georgia Steel", logo: "/uploads/landing/partners/georgia-steel.jpg" },
  { name: "BW Surgical Supply", logo: "/uploads/landing/partners/bw-surgical.jpg" },
  { name: "PostureCo", logo: "/uploads/landing/partners/postureco.png" },
  { name: "RedRun Fitness", logo: "/uploads/landing/partners/redrun-fitness.jpg" },
  { name: "AARCE", logo: "/uploads/landing/partners/aarce.jpg" },
  { name: "Flatrate Remodeling", logo: "/uploads/landing/partners/flatrate.png" },
  { name: "PNS", logo: "/uploads/landing/partners/pns.jpg" },
];

/** The previous home page, kept at a hidden address for comparison. Safe to delete after launch. */
export default function OldHomePage() {
  return (
    <div className="min-h-screen page-urbanist overflow-x-hidden">
      <JsonLd data={[organizationJsonLd, softwareApplicationJsonLd, faqPageJsonLd]} />
      <Header />
      <main>
        <HeroSlider />
        <TrustedStrip companies={companies} />
        <HomeFeaturesGrid />
        <ClientExperienceSlider />
        <HowItWorksSection
          steps={[
            { num: "01", title: "Set up your boutique", desc: "Add locations, services, appointment types, and store settings in minutes." },
            { num: "02", title: "Run your daily workflow", desc: "Book appointments, manage customers, capture measurements and alterations." },
            { num: "03", title: "Track orders and get paid", desc: "Create orders, record payments, and always know what’s due." },
          ]}
        />
        <FeatureShowcase />
        <IntegrationsSection />
        <LandingFAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
