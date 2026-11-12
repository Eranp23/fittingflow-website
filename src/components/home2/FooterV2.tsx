import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { DemoButton } from "./ui";

const needs = [
  "Appointment scheduling",
  "Customer portal & chat",
  "Alterations & measurements",
  "Marketing & email",
  "POS, deposits & layaway",
  "Reports & analytics",
  "Inventory & orders",
];

const columns: { title: string; links: [string, string][] }[] = [
  { title: "FittingFlow", links: [["Features", "/features"], ["Pricing", "/pricing"], ["Switch for free", "/switch"], ["Why FittingFlow", "/why-fittingflow"]] },
  { title: "Company", links: [["About us", "/about"], ["Blog", "/blog"], ["Contact", "/contact"], ["FAQs", "/#faq"]] },
  {
    title: "Guides",
    links: [
      ["Boutique software", "/boutique-software"],
      ["Bridal alteration software", "/bridal-alteration-software"],
      ["Alteration software", "/alteration-software"],
      ["Best boutique software", "/best-boutique-software"],
    ],
  },
  { title: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms & Conditions", "/terms"], ["Data Security", "/data-security"]] },
];

const socials = [
  ["Facebook", "https://www.facebook.com/profile.php?id=61589879087854", Facebook],
  ["X", "https://x.com/fittingflow", Twitter],
  ["Instagram", "https://instagram.com/fittingflow", Instagram],
  ["LinkedIn", "https://www.linkedin.com/company/fittingflow/", Linkedin],
  ["YouTube", "https://www.youtube.com/@Fittingflow", Youtube],
] as const;

/** Dark footer from the new design. App-store buttons are left out until an app is in the stores. */
export default function FooterV2() {
  return (
    <footer className="bg-[#161A42] text-white">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 lg:grid-cols-[1.45fr_1fr] lg:gap-0 lg:px-8 lg:py-20">
        <div className="lg:border-r lg:border-white/10 lg:pr-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uploads/white-logo.png" alt="FittingFlow" width={170} height={44} className="h-11 w-auto" loading="lazy" />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
            The all-in-one platform for bridal and formalwear boutiques. From the first consultation to the final
            pickup, we help you run your shop.
          </p>

          <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Everything your boutique needs:</p>
          <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {needs.map((n) => (
              <li key={n}>
                <a href="/features" className="text-xl font-medium text-white/90 transition-colors hover:text-[#ff7fe6]">{n}</a>
              </li>
            ))}
          </ul>
          <a href="/features" className="mt-4 inline-block text-[15px] font-semibold text-[#8FA8FF] underline underline-offset-4 hover:text-white">
            Explore more
          </a>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={href}>
                      <a href={href} className="text-[15px] text-white/75 transition-colors hover:text-white">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pl-16">
          <p className="text-[15px] text-white/75">Run your boutique anywhere, on computer, tablet or phone.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uploads/landing/footer.webp" alt="" width={416} height={357} loading="lazy" className="mt-4 aspect-[16/10] w-full rounded-2xl object-cover" />
          <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-[#3764F3] px-6 py-5">
            <a href="/pricing" className="text-lg font-extrabold uppercase italic leading-tight tracking-wide hover:underline">Start your free<br />trial today</a>
            <DemoButton variant="white" className="!h-11 shrink-0 !px-5 !text-sm" />
          </div>
          <div className="mt-8 space-y-2 text-[15px] text-white/80">
            <p>Call us on: <a href="tel:+18888390060" className="font-semibold text-white hover:underline">(888) 839-0060</a></p>
            <p><a href="mailto:info@fittingflow.com" className="hover:underline">info@fittingflow.com</a></p>
          </div>
          <ul className="mt-5 flex gap-2.5">
            {socials.map(([name, href, Icon]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`FittingFlow on ${name}`} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#F22DCE]">
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-[13px] text-white/55 lg:px-8">
          <p>© {new Date().getFullYear()} FittingFlow. All rights reserved. Tekgaru LLC d/b/a FittingFlow.</p>
          <a href="#top" className="hover:text-white">Back to Top ↑</a>
        </div>
      </div>
    </footer>
  );
}
