import React from "react";

const integrations = [
  { name: "Google", icon: "/icons/google.png" },
  { name: "Facebook", icon: "/icons/facebook.png" },
  { name: "PayPal", icon: "/icons/paypal.png" },
  { name: "Slack", icon: "/icons/slack.png" },
  { name: "Zoom", icon: "/icons/zoom.png" },
  { name: "Stripe", icon: "/icons/stripe.png" },
  { name: "WhatsApp", icon: "/icons/whatsapp.png" },
  { name: "Outlook", icon: "/icons/outlook.png" },
];

const IntegrationsSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-cover bg-center text-center"  style={{ backgroundImage: "url('/uploads/landing/cta-feature.webp')" }}>
      
      {/* Heading */}
      <div className="max-w-2xl mx-auto z-10 relative">
      

        <h2 className="text-3xl md:text-4xl font-light">
          Seamlessly connect the{" "}<br></br>
          <span className="text-3xl md:text-4xl font-medium">tools you already use</span>
        </h2>

        <p className="text-gray-500 mt-4">
          From scheduling and payments to notifications and chat integrations,
          everything you need to run your business smoothly is in one place.
        </p>
      </div>

      {/* Floating Icons */}
      <div className="relative mt-16 -mb-10 flex justify-center items-center" >
        <div className="grid grid-cols-1 gap-8 md:gap-12">
       <img src="/uploads/landing/integration.png" alt="Apps and services that connect with FittingFlow" loading="lazy" className="mx-auto w-[70%]"/>
        </div>
      </div>

       </section>
  );
};

export default IntegrationsSection;