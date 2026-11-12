import React from 'react';
import Header from "@/components/Header";
import { Shield } from 'lucide-react';
import Footer from '@/components/landing/Footer';
import { pageSeo } from "@/lib/seoPages";

const TermsOfService = () => {

  return (
    <div className="min-h-screen bg-white">
      
      <Header />

      {/* HERO */}
      <section className="pt-28 pb-16 text-center relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-100 to-blue-200 opacity-40 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 space-y-6">

          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 rounded-full px-5 py-2 font-semibold">
            <Shield className="h-4 w-4" />
            Legal Information
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            FittingFlow – Terms of Service
          </h1>

          <p className="text-gray-600 text-lg">
            Please read these terms carefully before using the FittingFlow platform.
          </p>

        </div>
      </section>


      {/* CONTENT */}
      <section className="pb-20">

        <div className="container mx-auto px-6 max-w-4xl">

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">

            <p className="text-gray-500 mb-1">Effective Date: January 1, 2026</p>
            <p className="text-gray-500 mb-8">Last Updated: January 1, 2026</p>

            <p className="text-gray-700 mb-4">
              These Terms of Service (“Terms”) form a legally binding agreement between you or the organization you represent (“Customer”, “you”, “your”) and Tekgaru LLC d/b/a FittingFlow (“FittingFlow”, “we”, “us”, “our”), governing your access to and use of FittingFlow’s software platform, websites, mobile applications, and related services (collectively, the “Services”).
            </p>

            <p className="text-gray-700 mb-8">
              By creating an account, clicking “I agree,” or accessing or using the Services, you accept and agree to be bound by these Terms. If you do not agree, you may not use the Services.
            </p>

            <hr className="border-gray-200 mb-8" />

            {/* SECTION 1 */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Parties and Agreement Structure
            </h2>

            <p className="text-gray-700 mb-2">
              These Terms apply together with:
            </p>

            <p className="text-gray-700 mb-1">
              (a) any order form or subscription you accept (“Order”), and
            </p>

            <p className="text-gray-700 mb-4">
              (b) any policies or service-specific terms we make available.
            </p>

            <p className="text-gray-700 mb-2">
              If there is a conflict, the following order of precedence applies:
            </p>

            <ol className="list-decimal pl-6 text-gray-700 mb-8 space-y-1">
              <li>the Order</li>
              <li>service-specific terms</li>
              <li>these Terms</li>
            </ol>

            <hr className="border-gray-200 mb-8" />

            {/* SECTION 2 */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Eligibility and Authority
            </h2>

            <p className="text-gray-700 mb-8">
              You must be at least the age of majority and capable of entering into a binding contract. If you are using the Services on behalf of an entity, you represent that you have authority to bind that entity and “you” refers to that entity.
            </p>

            <hr className="border-gray-200 mb-8" />

            {/* SECTION 3 */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Description of the Services
            </h2>

            <p className="text-gray-700 mb-4">
              FittingFlow provides cloud-based software for boutiques, alteration shops, formalwear stores, and similar businesses to manage appointments, customers, fittings, orders, alterations, invoices, and related shop workflows.
            </p>

            <p className="text-gray-700 mb-8">
              You may use the Services only for your internal business operations and in compliance with these Terms.
            </p>

            <hr className="border-gray-200 mb-8" />

            {/* Continue all your sections exactly same... */}

            {/* CONTACT */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              22. Contact Information
            </h2>

            <p className="text-gray-700 mb-2">
              For questions regarding these Terms, please contact:
            </p>

            <div className="text-gray-700 mb-4">
              <p className="font-medium">Tekgaru LLC d/b/a FittingFlow</p>
              <p>Florida, USA</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@fittingflow.com"
                  className="text-pink-600 hover:underline"
                >
                  info@fittingflow.com
                </a>
              </p>
            </div>

          </div>

        </div>

      </section>


  <Footer />

    </div>
  );
};

export default TermsOfService;