import { CalendarCheck, Shirt, Store, TrendingUp } from "lucide-react";
import { DemoButton, Eyebrow, TrialButton } from "./ui";

const steps = [
  { icon: Store, title: "Set up your boutique", text: "Add your boutique details, services, staff and inventory to get started quickly." },
  { icon: CalendarCheck, title: "Manage appointments", text: "Schedule bridal consultations, organize bookings and manage your calendar with ease." },
  { icon: Shirt, title: "Track fittings & orders", text: "Keep track of fittings, alterations, order progress and client preferences in one place." },
  { icon: TrendingUp, title: "Grow your business", text: "Take payments, send reminders, build stronger client relationships and track performance." },
];

export default function Steps() {
  return (
    <section className="bg-gradient-to-b from-white to-[#F6F7FF] px-5 py-20 md:py-28 lg:px-8">
      <div className="mx-auto max-w-[1320px] text-center">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-[32px] font-medium leading-tight tracking-[-0.01em] text-[#191E49] md:text-[44px]">
          Your Boutique, Simplified in 4 Easy Steps
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 md:text-lg">
          From setting up your boutique to growing client relationships, manage every part of your bridal business in one place.
        </p>
        <ol className="mt-9 grid gap-4 md:mt-12 md:gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="group relative rounded-[24px] border border-transparent bg-white p-6 md:p-7 shadow-[0_10px_40px_rgba(25,30,73,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3764F3]/25 hover:shadow-[0_24px_60px_rgba(55,100,243,0.16)]"
            >
              <span className="absolute right-6 top-5 text-[44px] font-bold leading-none text-[#191E49]/[0.06] transition-colors group-hover:text-[#F22DCE]/20" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EEF1FF] text-[#3764F3] transition-colors group-hover:bg-[#3764F3] group-hover:text-white">
                <s.icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-[#191E49]">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <TrialButton />
          <DemoButton />
        </div>
      </div>
    </section>
  );
}
