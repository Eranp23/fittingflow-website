import JsonLd from "@/components/JsonLd";
import HeaderV2 from "./HeaderV2";
import Hero from "./Hero";
import Logos from "./Logos";
import Reviews from "./Reviews";
import Features from "./Features";
import Storefront from "./Storefront";
import Integrations from "./Integrations";
import Steps from "./Steps";
import Myuverse from "./Myuverse";
import Faq, { homeFaqs } from "./Faq";
import Cta from "./Cta";
import FooterV2 from "./FooterV2";
import { organizationJsonLd, softwareApplicationJsonLd } from "@/lib/seoConfig";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

/** The new home page (Natella's approved "bridal-bloom" design, Nov 2026). */
export default function HomeV2() {
  return (
    <div id="top" className="ff-home min-h-screen overflow-x-hidden bg-white">
      <JsonLd data={[organizationJsonLd, softwareApplicationJsonLd, faqJsonLd]} />
      <HeaderV2 />
      <main>
        <Hero />
        <Logos />
        <Reviews />
        <Features />
        <Storefront />
        <Integrations />
        <Steps />
        <Myuverse />
        <Faq />
        <Cta />
      </main>
      <FooterV2 />
    </div>
  );
}
