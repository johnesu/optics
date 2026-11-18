import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck, Star } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion";
import { Badge, ButtonLink } from "@/components/ui";
import { DEALERS } from "@/lib/data";
import { initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Verified dealerships",
  description:
    "Meet the verified dealers on OPTICS — inspected inventory, documented history and accountable service.",
};

export default function DealershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Dealerships"
        title={
          <>
            Names you can{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              hold to account.
            </span>
          </>
        }
        description="Every dealership on OPTICS is identity-checked, premises-verified and held to a published standard. Six are live in the demo; more are in review."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/dealer/register" size="lg">
            Apply as a dealer
          </ButtonLink>
          <ButtonLink href="/about" variant="glass" size="lg">
            Our standard
          </ButtonLink>
        </div>
      </PageHero>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {DEALERS.map((dealer, i) => (
            <Reveal key={dealer.slug} delay={i * 0.05}>
              <Link
                href={`/dealerships/${dealer.slug}`}
                className="group block overflow-hidden rounded-[24px] border border-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-lift"
              >
                <div className="relative aspect-[16/8] overflow-hidden bg-paper-2">
                  <Photo
                    src={dealer.cover}
                    alt={`${dealer.name} showroom`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex gap-1.5">
                    {dealer.verified ? (
                      <Badge tone="glass">
                        <ShieldCheck className="size-3" strokeWidth={2.4} />
                        Verified
                      </Badge>
                    ) : null}
                    <Badge tone="glass">Since {dealer.since}</Badge>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <span
                      className="grid size-11 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
                      style={{ backgroundColor: dealer.accent }}
                    >
                      {initials(dealer.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                        {dealer.name}
                      </h2>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink/45">
                        <MapPin className="size-3" strokeWidth={2} />
                        {dealer.location}
                      </p>
                    </div>
                    <ArrowUpRight className="size-4.5 shrink-0 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
                  </div>

                  <p className="mt-3 text-[13px] leading-relaxed text-ink/55">
                    {dealer.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <div className="flex items-center gap-3 text-[12px] text-ink/50">
                      <span className="flex items-center gap-1 font-semibold text-ink">
                        <Star
                          className="size-3.5 fill-signal text-signal"
                          strokeWidth={0}
                        />
                        {dealer.rating.toFixed(1)}
                      </span>
                      <span>{dealer.reviewCount} reviews</span>
                      <span>{dealer.inventoryCount} listings</span>
                    </div>
                    <div className="flex gap-1.5">
                      {dealer.specialties.slice(0, 2).map((s) => (
                        <Badge key={s} tone="neutral">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-2/50 py-14 md:py-20">
        <div className="container-x grid gap-10 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Identity & premises",
              d: "CAC registration, director ID and physical showroom verification before a single listing goes live.",
            },
            {
              n: "02",
              t: "Inventory standards",
              d: "Each vehicle needs an inspection report, clear photos and an honest condition grade.",
            },
            {
              n: "03",
              t: "Accountable service",
              d: "Response times and buyer reviews are published. Repeated failures suspend the account.",
            },
          ].map((item) => (
            <div key={item.n} className="border-t border-ink/15 pt-5">
              <p className="font-display text-[11px] font-bold tracking-[0.16em] text-signal">
                {item.n}
              </p>
              <h3 className="mt-2.5 font-display text-[16px] font-semibold text-ink">
                {item.t}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/55">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
