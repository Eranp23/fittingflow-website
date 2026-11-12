"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Lock,
  Eye,
  Server,
  CheckCircle,
  Key,
  Database,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

import Footer from '@/components/landing/Footer';
import Header from "@/components/Header";
import CTASection from '@/components/landing/CTASection';
import { pageSeo } from "@/lib/seoPages";

const pillars = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    desc: 'All data is encrypted in transit using TLS 1.3 and stored securely with AES-256 encryption.',
  },
  {
    icon: Server,
    title: 'Secure Cloud Infrastructure',
    desc: 'Our infrastructure runs on secure cloud platforms with continuous monitoring and automated protection.',
  },
  {
    icon: Eye,
    title: 'Privacy by Design',
    desc: 'We collect only essential information and enforce role-based access to protect sensitive data.',
  },
  {
    icon: Database,
    title: 'Automated Backups',
    desc: 'Hourly backups with point-in-time recovery ensure your data is always safe and recoverable.',
  },
  {
    icon: Key,
    title: 'Access Controls',
    desc: 'Multi-factor authentication and granular permissions ensure only authorized users access your data.',
  },
  {
    icon: RefreshCw,
    title: '99.9% Uptime',
    desc: 'Highly available infrastructure designed to keep your business running smoothly.',
  },
];

const compliance = [
  { label: 'GDPR', desc: 'European data privacy compliance.' },
  { label: 'CCPA', desc: 'California privacy protection standards.' },
  { label: 'SOC 2', desc: 'Security and infrastructure compliance.' },
  { label: 'PCI DSS', desc: 'Secure payment processing standards.' },
];

const practices = [
  'Regular penetration testing',
  'Automated vulnerability scanning',
  'Employee security training',
  'Incident response monitoring',
  'Encrypted database connections',
  'Secure API authentication',
  'DDoS protection',
  'Data retention and deletion policies',
];

const DataSecurity = () => {
  const navigate = (to: string) => { window.location.href = to; };

  return (
    <div className="page-urbanist min-h-screen bg-background">
      
      <Header />

      {/* HERO */}
      <section className="pt-28 pb-20 md:pt-36 text-center relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-100 to-blue-200 opacity-40 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 space-y-6">

          <div className="inline-flex items-center gap-2  text-pink-600  px-5 py-2 ">
        
            Security First
          </div>

          <h1 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight">
            Your Data is <span className="text-4xl md:text-6xl font-semibold">Protected</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We protect your boutique data, customer information, and appointments
            using enterprise-grade security infrastructure.
          </p>

        </div>
      </section>

      {/* SECURITY PILLARS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {pillars.map(p => (

              <div
                key={p.title}
                className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-4">
                  <p.icon className="h-6 w-6 text-pink-500" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {p.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {p.desc}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compliance & Certifications
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Our systems meet global standards for privacy, data protection,
              and infrastructure security.
            </p>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {compliance.map(c => (

              <div
                key={c.label}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition text-center"
              >

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mx-auto mb-4">

                  <span className="text-pink-500 font-extrabold text-lg">
                    {c.label}
                  </span>

                </div>

                <p className="text-gray-600 text-sm">
                  {c.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* SECURITY PRACTICES */}
      <section className="py-20">

        <div className="max-w-4xl mx-auto px-6">

          <div className="text-center mb-10">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Security Practices
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

            <div className="grid md:grid-cols-2 gap-4">

              {practices.map(p => (

                <div key={p} className="flex items-start gap-3">

                  <CheckCircle className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700 text-sm">
                    {p}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
   <CTASection />

      <Footer/>

    </div>
  );
};

export default DataSecurity;