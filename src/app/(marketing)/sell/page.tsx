import type { Metadata } from "next";
import {
  BadgeCheck,
  Camera,
  ClipboardCheck,
  Handshake,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { ValuationForm } from "@/components/forms";
import { Reveal } from "@/components/motion";
import { Badge, ButtonLink, Eyebrow, SectionHead } from "@/components/ui";
import { getDealer } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sell your vehicle",
  description:
    "Get a realistic valuation, list with verified dealers and sell without the usual noise.",
};

const steps = [
  {
    icon: ClipboardCheck,
    title: "Tell us about the car",
    copy: "Make, model, year, mileage and condition. Two minutes, no account needed.",
  },
  {
    icon: Wallet,
    title: "Receive a valuation",
    copy: "A market-backed range from dealers actively buying that class of vehicle.",
  },
  {
    icon: Handshake,
    title: "Choose your route",
    copy: "Sell outright, trade in, or list it yourself with inspection support.",
  },
];

const checks = [
  "Identity and ownership documents",
  "Service and accident history",
  "Mileage and odometer consistency",
  "Written inspection report",
  "Clear pricing and condition grade",
  "Secure, documented payment",
];

export default function SellPage() {
  const dealer = getDealer("prime-mobility");

  return (
    <>
      <PageHero
        eyebrow="Sell"
        title={
          <>
            Sell with{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              certainty.
            </span>
          </>
        }
        description="Skip the endless calls and the lowball offers. Start with a valuation that reflects what your vehicle is actually worth in today's market."
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="#valuation" size="lg">
            Get a valuation
          </ButtonLink>
          <ButtonLink href="/dealer/register" variant="glass" size="lg">
            I&apos;m a dealer
          </ButtonLink>
        </div>
      </PageHero>

      <section className="container-x py-14 md:py-20">
        <SectionHead
          eyebrow="How it works"
          title="Three steps, no theatre."
          description="Whether you want to sell outright or simply test the market, the process is the same to start."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="h-full rounded-[22px] border border-line bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-ink text-white">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-[11px] font-bold tracking-[0.16em] text-signal">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[16px] font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/55">
                  {copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="valuation"
        className="border-y border-line bg-paper-2/50 py-14 md:py-20"
      >
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
          <div>
            <Eyebrow>Valuation</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-ink">
              What&apos;s it worth today?
            </h2>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink/55">
              Give us the essentials and we&apos;ll return a realistic range,
              plus the dealers currently buying in that segment.
            </p>

            <div className="relative mt-8 h-[240px] overflow-hidden rounded-[24px] border border-line">
              <Photo
                src={dealer?.cover ?? ""}
                alt="Vehicles prepared for sale"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <Badge tone="glass">Average seller</Badge>
                <p className="mt-2 font-display text-[15px] font-semibold text-white">
                  Lists at market rate within 48 hours
                </p>
                <p className="text-[12px] text-white/55">
                  Based on demo inventory performance
                </p>
              </div>
            </div>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {checks.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13px] text-ink/65"
                >
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-jade" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="rounded-[26px] border border-line bg-white p-6 shadow-soft md:p-8">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-full bg-signal/10 text-signal">
                  <Camera className="size-4" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                  Free valuation
                </span>
              </div>
              <h3 className="mt-4 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">
                Request your estimate.
              </h3>
              <div className="mt-6">
                <ValuationForm />
              </div>
              <p className="mt-6 flex items-start gap-2 border-t border-line pt-5 text-[11.5px] leading-relaxed text-ink/40">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0" />
                Your details stay with the OPTICS valuations desk. No spam, no
                resale of your data.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid items-center gap-8 rounded-[26px] border border-line bg-white p-6 md:grid-cols-[1fr_auto] md:p-10">
          <div>
            <Eyebrow>Dealers</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-ink">
              Sitting on stock you need to move?
            </h2>
            <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-ink/55">
              Join the verified network and list to buyers who are already
              searching. No listing fees during the demo.
            </p>
          </div>
          <ButtonLink href="/dealer/register" size="lg">
            Apply as a dealer
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
