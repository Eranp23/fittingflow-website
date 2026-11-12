/** Myuverse "coming soon" banner. Wide screens use the designed banner; phones get real text and the phones picture. */
export default function Myuverse() {
  const intro =
    "Optional future integration to help users discover boutiques, connect with the community, and explore reels. It can also support customer engagement through social interactions, updates, and personalized recommendations.";
  return (
    <section aria-labelledby="myuverse-title" className="bg-[#F6F7FF]">
      <h2 id="myuverse-title" className="sr-only">Myuverse app: One move. Built for your world. Coming soon.</h2>
      <p className="sr-only">{intro}</p>

      {/* Wide screens */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/home2/myuverse-banner.webp"
        alt="Myuverse app, coming soon: One move. Built for your world. Two phones show boutique discovery, bookings, community questions and reels."
        width={1920}
        height={577}
        loading="lazy"
        className="hidden w-full md:block"
      />

      {/* Phones */}
      <div className="overflow-hidden bg-gradient-to-b from-[#3F6FBE] to-[#4879C5] px-6 pt-12 text-white md:hidden" aria-hidden="true">
        <p className="text-[34px] font-extrabold uppercase leading-[0.95] tracking-tight">One move.<br />Built for<br />your world.</p>
        <p className="mt-5 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#3764F3]">Coming soon</p>
        <p className="mt-5 text-[15px] leading-relaxed text-white/95">{intro}</p>
        <div className="mt-6 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uploads/home2/myuverse-icon.webp" alt="" width={56} height={56} className="h-14 w-14 rounded-2xl" />
          <p className="text-lg font-extrabold uppercase italic leading-tight">Myuverse<br />app</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/uploads/home2/myuverse-phones.webp" alt="" width={600} height={577} loading="lazy" className="-mx-6 mt-2 block w-[calc(100%+3rem)] max-w-none" />
      </div>
    </section>
  );
}
