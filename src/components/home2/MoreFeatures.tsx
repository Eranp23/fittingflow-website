import { BarChart3, ClipboardCheck, FileText, Mail, MessageSquareText, PenLine, Receipt, Users, type LucideIcon } from "lucide-react";
import { Eyebrow } from "./ui";

/** Plan labels follow the live plans (checked Nov 11). Update here if the plans change in SuperAdmin. */
const items: { icon: LucideIcon; title: string; text: string; plan: string }[] = [
  { icon: PenLine, title: "Digital Pickup Signature", text: "Customers sign electronically when collecting completed garments or orders.", plan: "All plans" },
  { icon: Users, title: "Customer Management", text: "Customer profiles, appointment history, notes and orders.", plan: "All plans" },
  { icon: Receipt, title: "Invoices & Payments", text: "Payment history, balances, receipts and deposits.", plan: "All plans" },
  { icon: FileText, title: "Estimates & Quotes", text: "Create and manage customer estimates.", plan: "See pricing" },
  { icon: ClipboardCheck, title: "Task Management", text: "Track tasks, due dates and assignments.", plan: "All plans" },
  { icon: BarChart3, title: "Reports & Analytics", text: "Revenue, appointments and business performance.", plan: "All plans" },
  { icon: Mail, title: "Email Marketing & Reminders", text: "Customer communication and automated notifications.", plan: "Reminders: all plans · Campaigns: Professional & Business" },
  { icon: MessageSquareText, title: "Customer Portal & Chat", text: "Order tracking and customer messaging.", plan: "Professional & Business" },
];

export default function MoreFeatures() {
  return (
    <section className="bg-white px-5 pt-20 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-[1320px] text-center">
        <Eyebrow>Built in, not bolted on</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-[32px] font-medium leading-tight tracking-[-0.01em] text-[#191E49] md:text-[44px]">
          More of what your boutique runs on
        </h2>
        <ul className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f) => (
            <li key={f.title} className="group flex flex-col rounded-[22px] border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3764F3]/40 hover:shadow-[0_20px_50px_rgba(55,100,243,0.14)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EEF1FF] text-[#3764F3] transition-colors group-hover:bg-[#3764F3] group-hover:text-white">
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#191E49]">{f.title}</h3>
              <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-slate-500">{f.text}</p>
              <p className="mt-4 text-xs font-semibold text-[#F22DCE]">{f.plan}</p>
            </li>
          ))}
        </ul>
        <a href="/pricing" className="mt-8 inline-block text-[15px] font-semibold text-[#3764F3] underline underline-offset-4">Compare what each plan includes</a>
      </div>
    </section>
  );
}
