import type { Metadata } from "next";
import { Eye, Handshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { Counter, Reveal } from "@/components/motion";
import { Badge, ButtonLink, Eyebrow, SectionHead } from "@/components/ui";
import { getDealer, getVehicle } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "OPTICS is a dealer-only vehicle marketplace built around verified inventory, honest pricing and accountability.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Verified or nothing",
    copy: "Every dealer is identity- and premises-checked. Every listing carries a condition grade and inspection trail.",
  },
  {
    icon: Eye,
    title: "Prices in daylight",
    copy: "No hidden markups, no bait listings. What you see is what the dealer is asking, with fees disclosed upfront.",
  },
  {
    icon: Handshake,
    title: "Accountability by design",
    copy: "Reviews, response times and disputes are public. Good dealers compound trust; bad ones lose access.",
  },
  {
    icon: Users,
    title: "Built for the trade",
    copy: "The workspace is designed with dealers, not around them. Listing, leads and orders in one place.",
  },
];

const timeline = [
  {
    year: "2021",
    title: "Six dealers, one spreadsheet",
    copy: "Started as a WhatsApp group of trusted Lagos dealers sharing stock. The problem was always the same: no single source of truth.",
  },
  {
    year: "2023",
    title: "Inspection standard drafted",
    copy: "Formalised the checklist every listing must pass — ownership, history, condition and photography.",
  },
  {
    year: "2025",
    title: "The marketplace opens",
    copy: "OPTICS launches across cars, commercial and equipment with verified dealers in six states.",
  },
  {
    year: "2026",
    title: "Escrow and financing",
    copy: "Rolling out protected payments and dealer-backed financing for buyers who need it.",
  },
];

export default function AboutPage() {
  const image = getVehicle("2023-toyota-land-cruiser-300");
  const dealer = getDealer("northstar-autos");

  return (
    <>
      <PageHero
        eyebrow="About OPTICS"
        title={
          <>
            A marketplace built on{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              proof, not promises.
            </span>
          </>
        }
        description="Nigeria's vehicle trade runs on relationships and reputation. We built the infrastructure that makes both visible — and verifiable."
      />

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow>Why we exist</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.03] font-semibold tracking-[-0.03em] text-ink">
              Buying a vehicle shouldn&apos;t feel like a gamble.
            </h2>
            <div className="mt-5 space-y-4 text-[14px] leading-relaxed text-ink/60">
              <p>
                The average buyer visits six lots, hears eight versions of the
                same history, and still leaves unsure. Dealers waste hours on
                people who were never going to buy.
              </p>
              <p>
                OPTICS fixes both sides. Buyers get one place where inventory is
                verified and comparable. Dealers get qualified demand, clean
                tooling and a reputation that travels with them.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                { to: 1200, suffix: "+", label: "Verified listings" },
                { to: 6, suffix: "", label: "Dealer regions" },
                { to: 2, suffix: "h", label: "Median first reply" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.03em] text-ink">
                    <Counter to={stat.to} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[380px] overflow-hidden rounded-[26px] border border-line md:h-[440px]">
              <Photo
                src={image?.images[0] ?? ""}
                alt="Toyota Land Cruiser on a road outside the city"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="absolute -bottom-5 -left-4 hidden max-w-[230px] rounded-[18px] border border-line bg-white p-4 shadow-lift sm:block">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-jade-soft text-jade">
                  <ShieldCheck className="size-4" />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                  Inspection pass
                </p>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink/60">
                Every listing is checked against a 42-point standard before it
                goes live.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2/50 py-14 md:py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="What we stand for"
            title="Four rules we don't bend."
            description="These aren't marketing lines. They're the criteria we enforce on every dealer and every listing."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, copy }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="flex h-full items-start gap-4 rounded-[22px] border border-line bg-white p-6">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink text-white">
                    <Icon className="size-4.5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-semibold text-ink">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/55">
                      {copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <Eyebrow>History</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.2rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
              From a group chat to a standard.
            </h2>
            <div className="mt-7 overflow-hidden rounded-[22px] border border-line">
              <div className="relative h-[200px]">
                <Photo
                  src={dealer?.cover ?? ""}
                  alt="Northstar Autos showroom"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <Badge tone="glass">Northstar Autos · Abuja</Badge>
                </div>
              </div>
            </div>
          </div>

          <ol className="relative border-l border-line pl-6 md:pl-8">
            {timeline.map((item) => (
              <li key={item.year} className="relative pb-9 last:pb-0">
                <span className="absolute -left-[31px] top-1 grid size-4 place-items-center rounded-full border-2 border-paper bg-signal md:-left-[39px]" />
                <p className="font-display text-[11px] font-bold tracking-[0.16em] text-signal">
                  {item.year}
                </p>
                <h3 className="mt-1.5 font-display text-[16px] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-lg text-[13px] leading-relaxed text-ink/55">
                  {item.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x pb-16 md:pb-24">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-ink px-6 py-12 text-white md:px-12 md:py-16">
          <div className="hero-grid absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-volt/25 blur-[110px]" />
          <div className="relative max-w-2xl">
            <span className="grid size-11 place-items-center rounded-xl bg-white/10 ring-1 ring-inset ring-white/15">
              <Sparkles className="size-5" strokeWidth={1.8} />
            </span>
            <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.04] font-semibold tracking-[-0.03em]">
              Trade with dealers who&apos;ve earned it.
            </h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-white/60">
              Browse verified inventory, or join the network and put your stock in
              front of buyers who are ready to move.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/vehicles" size="lg">
                Browse inventory
              </ButtonLink>
              <ButtonLink href="/dealer/register" variant="glass" size="lg">
                Become a dealer
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
