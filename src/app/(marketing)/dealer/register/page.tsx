import type { Metadata } from "next";
import {
  BadgeCheck,
  Building2,
  ChartLine,
  Check,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { DealerApplicationForm } from "@/components/forms";
import { Reveal } from "@/components/motion";
import { Badge, Eyebrow, SectionHead } from "@/components/ui";
import { getDealer } from "@/lib/data";

export const metadata: Metadata = {
  title: "Become a dealer",
  description:
    "Apply to join the OPTICS verified dealer network and reach buyers across Nigeria.",
};

const benefits = [
  {
    icon: Users,
    title: "Qualified demand",
    copy: "Buyers arrive with filters applied. You see serious enquiries, not idle browsing.",
  },
  {
    icon: ChartLine,
    title: "Inventory intelligence",
    copy: "Views, saves and enquiry rates per listing so you know what to price and what to drop.",
  },
  {
    icon: ShieldCheck,
    title: "A verified badge",
    copy: "Identity and premises checks that buyers trust — and that competitors can't fake.",
  },
  {
    icon: Building2,
    title: "One workspace",
    copy: "Listings, leads, orders and team roles in a single place. No spreadsheets required.",
  },
];

const requirements = [
  "Registered business (CAC) or verifiable trading name",
  "A physical showroom, yard or storage location",
  "At least three vehicles or units ready to list",
  "Owner or director identity documents",
  "A bank account in the business name",
];

const faqs = [
  {
    q: "How long does approval take?",
    a: "Most applications are reviewed within two business days. Verification visits are scheduled within a week.",
  },
  {
    q: "What does it cost?",
    a: "Listing is free during the demo. In production, dealers pay a monthly subscription rather than per-listing fees.",
  },
  {
    q: "Can I list commercial equipment?",
    a: "Yes. Trucks, buses, vans, pickups, machinery and agricultural units all have dedicated segments.",
  },
  {
    q: "Do you handle payments?",
    a: "Buyers and dealers can transact directly or use OPTICS escrow where enabled. Escrow is optional, never mandatory.",
  },
];

export default function DealerRegisterPage() {
  const dealer = getDealer("savannah-machinery");

  return (
    <>
      <PageHero
        eyebrow="Dealer application"
        title={
          <>
            Put your inventory{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              in front of buyers.
            </span>
          </>
        }
        description="OPTICS is a dealer-only marketplace. Apply once, get verified, and manage everything from a single workspace built for how you actually sell."
      >
        <div className="flex flex-wrap gap-2">
          {["Identity checked", "No listing fees", "Nationwide buyers"].map(
            (item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white/70"
              >
                <Check className="size-3 text-signal" strokeWidth={3} />
                {item}
              </span>
            ),
          )}
        </div>
      </PageHero>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <Eyebrow>Why OPTICS</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-ink">
              Built for dealers who take it seriously.
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map(({ icon: Icon, title, copy }, i) => (
                <Reveal key={title} delay={i * 0.05}>
                  <div className="h-full rounded-[20px] border border-line bg-white p-5">
                    <span className="grid size-9 place-items-center rounded-lg bg-ink text-white">
                      <Icon className="size-4" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-4 font-display text-[14px] font-semibold text-ink">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/55">
                      {copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-[22px] border border-line bg-white">
              <div className="relative h-[180px]">
                <Photo
                  src={dealer?.cover ?? ""}
                  alt="Dealer yard with commercial equipment"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <Badge tone="glass">Member since 2021</Badge>
                  <p className="mt-2 font-display text-[14px] font-semibold text-white">
                    Savannah Machinery · Kaduna
                  </p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                  What we verify
                </p>
                <ul className="mt-3 grid gap-2">
                  {requirements.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-ink/60"
                    >
                      <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-jade" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Reveal>
            <div className="rounded-[26px] border border-line bg-white p-6 shadow-soft md:p-8">
              <Badge tone="signal">Application</Badge>
              <h2 className="mt-4 font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">
                Tell us about the business.
              </h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/55">
                Three short steps. You can save and come back if you need
                documents to hand.
              </p>
              <div className="mt-7">
                <DealerApplicationForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2/50 py-14 md:py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="Questions"
            title="Before you apply."
            description="The things dealers ask us most often."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-[18px] border border-line bg-white p-5"
              >
                <h3 className="font-display text-[14px] font-semibold text-ink">
                  {q}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/55">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
