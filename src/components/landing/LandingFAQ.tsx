import { landingFaqs } from "@/lib/seoConfig";

const LandingFAQ = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-white" id="faq">
      <div className="max-w-3xl mx-auto">
        <p className="text-pink-500 font-medium mb-3 text-center">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-light text-[#191E49] text-center mb-10">
          Common questions about{" "}
          <span className="text-3xl md:text-4xl font-medium">FittingFlow</span>
        </h2>
        <div className="space-y-4">
          {landingFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4"
            >
              <summary className="cursor-pointer list-none font-medium text-[#191E49] flex items-center justify-between gap-4">
                {faq.question}
                <span className="text-pink-500 text-xl leading-none group-open:hidden">+</span>
                <span className="text-pink-500 text-xl leading-none hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFAQ;
