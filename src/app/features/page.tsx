import Header from "@/components/Header";
import FeaturesSection from "@/components/landing/FeaturesGrid";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/features");

export default function FeaturesPage() {
  return (
    <div className="page-urbanist overflow-x-hidden">
      <Header />
      <main>
        <section className="pt-32 pb-12 px-6" style={{ backgroundImage: "url('/uploads/landing/inner.webp')" }}>
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-pink-600 mb-4">Features</p>
            <h1 className="text-4xl md:text-5xl text-slate-900 font-extralight mb-4">
              FittingFlow features for <span className="font-medium text-5xl md:text-6xl">Boutiques &amp; Alterations</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 mb-8">
              FittingFlow helps boutiques and alteration shops manage appointments, fittings, inventory and customers with an elegant and
              powerful platform built for retail operations.
            </p>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Running a bridal workroom? See our{" "}
              <a href="/bridal-alteration-software" className="font-medium text-pink-600 hover:underline">
                bridal alteration software
              </a>{" "}
              guide.
            </p>
          </div>
        </section>
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
