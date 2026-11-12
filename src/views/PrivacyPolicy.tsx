"use client";

import React from "react";
import { Shield, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seoPages";

const PrivacyPolicy = () => {
  const navigate = (to: string) => { window.location.href = to; };

  return (
    <div className="min-h-screen bg-background">
      
      <Header />

      {/* HERO */}
      <section className="pt-28 pb-16 text-center relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-100 to-blue-200 opacity-40 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 space-y-6">

          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 rounded-full px-5 py-2 font-semibold">
            <Shield className="h-4 w-4" />
            Privacy & Data Protection
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Privacy Policy
          </h1>

          <p className="text-gray-600 text-lg">
            Effective Date: January 1, 2026
          </p>

          <p className="text-gray-500 text-sm">
            Last Updated: January 24, 2026
          </p>

        </div>

      </section>

      {/* POLICY CONTENT */}
      <section className="pb-24">

        <div className="max-w-4xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 space-y-10 text-gray-700 leading-relaxed">

            <p>
              This Privacy Policy describes how <strong>Tekgaru LLC d/b/a FittingFlow</strong>
              (“FittingFlow”, “we”, “us”, “our”) collects, uses, stores, and protects
              personal information in connection with our online platform,
              website, mobile applications, and Customer Portal (together,
              the “Services”).
            </p>

            <p>This Privacy Policy applies to:</p>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                Boutiques, alteration shops, and formalwear stores using the Services (“Boutiques”)
              </li>
              <li>
                Boutique customers who access the Customer Portal (“End Users”)
              </li>
            </ul>

            <p>
              By using the Services, you agree to the practices described in this
              Privacy Policy. If you do not agree, you should not use the Services.
            </p>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Information We Collect
              </h2>

              <h3 className="font-semibold mt-4">A. Boutique and Staff Information</h3>

              <ul className="list-disc ml-6 space-y-1">
                <li>Name and contact details</li>
                <li>Business address</li>
                <li>Email and phone</li>
                <li>Account login credentials</li>
                <li>Billing and subscription details</li>
              </ul>

              <h3 className="font-semibold mt-4">
                B. End User (Customer) Information
              </h3>

              <p>Boutiques may input or upload:</p>

              <ul className="list-disc ml-6 space-y-1">
                <li>Name and contact information</li>
                <li>Appointment dates and order details</li>
                <li>Dress selections and designers</li>
                <li>Measurements (bust, waist, hips, length)</li>
                <li>Alteration items and status</li>
                <li>Invoices and payment status</li>
                <li>Customer Images (dress fitting photos)</li>
              </ul>

              <p className="text-sm text-gray-500 mt-2">
                Measurements are collected solely for tailoring/order purposes
                and are not medical information.
              </p>

              <h3 className="font-semibold mt-4">C. Customer Images</h3>

              <p>
                Boutiques may upload images of End Users wearing dresses.
                These images may include identifiable personal information.
                End Users only see their own Customer Images.
              </p>

              <h3 className="font-semibold mt-4">
                D. Automatically Collected Information
              </h3>

              <ul className="list-disc ml-6 space-y-1">
                <li>Device information</li>
                <li>Browser type</li>
                <li>IP address</li>
                <li>Access timestamps</li>
                <li>Usage logs</li>
                <li>Session data</li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. How We Use Personal Information
              </h2>

              <ul className="list-disc ml-6 space-y-1">
                <li>Provide and maintain the Services</li>
                <li>Support boutique workflows such as appointments and orders</li>
                <li>Enable Customer Portal access</li>
                <li>Generate invoices and payment displays</li>
                <li>Perform backups and security monitoring</li>
                <li>Communicate service updates and billing notices</li>
                <li>Comply with legal obligations</li>
              </ul>

              <p className="mt-2">
                We do not use Customer Images for marketing without explicit consent.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Relationship of Parties (Controller vs Processor)
              </h2>

              <p>
                Boutiques act as the <strong>Data Controller</strong> for End User data.
                FittingFlow acts as a <strong>Data Processor</strong> that stores and
                processes data on behalf of Boutiques.
              </p>

              <p className="mt-2">
                Boutiques are responsible for obtaining required consent from End
                Users before submitting customer content or images.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Customer Portal Access
              </h2>

              <p>End Users may view:</p>

              <ul className="list-disc ml-6 space-y-1">
                <li>Their own appointments</li>
                <li>Orders and alterations</li>
                <li>Invoices and payment status</li>
                <li>Shared staff notes</li>
                <li>Their own uploaded images</li>
              </ul>

              <p className="mt-2">
                End Users cannot access other customers’ information.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Payment Processing
              </h2>

              <p>
                Payments between End Users and Boutiques are handled by the Boutique.
                FittingFlow is not the merchant of record and does not process
                consumer payments.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Data Storage and Hosting
              </h2>

              <p>
                Customer content is stored on servers managed by FittingFlow in
                the United States. We may migrate hosting to cloud providers
                such as AWS while maintaining strong security protections.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Data Sharing
              </h2>

              <p>We may share information with:</p>

              <ul className="list-disc ml-6 space-y-1">
                <li>Cloud hosting providers</li>
                <li>Analytics or monitoring services</li>
                <li>Payment gateway integrations</li>
                <li>Legal or accounting advisors</li>
                <li>Government authorities if legally required</li>
              </ul>

              <p className="mt-2 font-semibold">
                We do not sell personal information.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Security
              </h2>

              <p>
                We implement administrative, technical, and physical safeguards
                to protect customer data. However, no system can guarantee
                absolute security.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Data Retention
              </h2>

              <p>
                Data retention depends on Boutique operational needs.
                Boutiques control how long End User data is stored.
              </p>

              <p className="mt-2">
                If a Boutique account is terminated or unpaid, access may be
                suspended and data may be deleted after a retention period.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. End User Rights
              </h2>

              <p>
                Depending on jurisdiction, End Users may have rights to:
              </p>

              <ul className="list-disc ml-6 space-y-1">
                <li>Access their personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion</li>
                <li>Download their data</li>
              </ul>

              <p className="mt-2">
                Requests should be directed to the Boutique.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Cookies
              </h2>

              <p>
                We use cookies and similar technologies for authentication,
                analytics, and performance monitoring.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Children's Data
              </h2>

              <p>
                The Services are not intended for children under 13 and we do
                not knowingly collect such information without authorization.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Changes to This Policy
              </h2>

              <p>
                We may update this Privacy Policy periodically. If changes
                materially affect user rights, we will notify users through
                the Services or via email.
              </p>
            </div>

            {/* SECTION */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                14. International Users
              </h2>

              <p>
                If Boutiques operate outside the United States, data may be
                transferred and processed in the United States.
              </p>
            </div>

            {/* CONTACT */}
            <div className="pt-6 border-t">

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                15. Contact Information
              </h2>

              <p>
                Tekgaru LLC d/b/a FittingFlow
              </p>

              <p>Florida, USA</p>

              <p className="mt-2">
                Email: <strong>support@fittingflow.com</strong>
              </p>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
};

export default PrivacyPolicy;