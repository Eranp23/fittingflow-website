const companies = [
  ["Be You Be Bold", "be-you-be-bold.png"],
  ["Pure Home Florida", "pure-home-florida.png"],
  ["Publish Capital", "publish-capital.png"],
  ["NCHPEG", "nchpeg.png"],
  ["Oak Contracting", "oak-contracting.png"],
  ["Soflonet", "soflonet.png"],
  ["Chesaco RV", "chesaco-rv.png"],
  ["Murtech", "murtech.png"],
  ["Fly Shot Photo", "flyshotphoto.png"],
  ["Georgia Steel", "georgia-steel.jpg"],
  ["BW Surgical Supply", "bw-surgical.jpg"],
  ["PostureCo", "postureco.png"],
  ["RedRun Fitness", "redrun-fitness.jpg"],
  ["AARCE", "aarce.jpg"],
  ["Flatrate Remodeling", "flatrate.png"],
  ["PNS", "pns.jpg"],
] as const;

/** Moving logo strip. Heading to be confirmed by Natella (not all of these are boutiques). */
export default function Logos() {
  const row = [...companies, ...companies];
  return (
    <section className="bg-white pb-16 pt-10 md:pb-20" aria-label="Businesses we work with">
      <p className="text-center text-[15px] font-semibold text-[#191E49]">Trusted by businesses we work with</p>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="flex w-max items-center gap-14 [animation:ff-marquee_48s_linear_infinite] hover:[animation-play-state:paused] md:gap-20">
          {row.map(([name, file], i) => (
            <li key={`${file}-${i}`} aria-hidden={i >= companies.length} className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/uploads/landing/partners/${file}`}
                alt={i < companies.length ? name : ""}
                loading="lazy"
                className="h-9 w-auto max-w-[150px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-11"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
