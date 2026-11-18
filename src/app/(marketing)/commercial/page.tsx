import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bus,
  Check,
  Tractor,
  Truck,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { VehicleCard } from "@/components/vehicle-card";
import { Parallax, Reveal } from "@/components/motion";
import { Badge, ButtonLink, Eyebrow, SectionHead } from "@/components/ui";
import { getVehicle, VEHICLES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Commercial vehicles & fleet",
  description:
    "Trucks, buses, vans, pickups and machinery from verified commercial dealers across Nigeria.",
};

const segments = [
  {
    name: "Heavy trucks",
    slug: "heavy-trucks",
    icon: Truck,
    blurb: "Tippers, tankers and long-haul tractors.",
  },
  {
    name: "Buses & coaches",
    slug: "buses",
    icon: Bus,
    blurb: "Staff shuttles, school buses and coaches.",
  },
  {
    name: "Vans & delivery",
    slug: "vans",
    icon: Truck,
    blurb: "Panel vans and last-mile delivery units.",
  },
  {
    name: "Pickups",
    slug: "pickups",
    icon: Truck,
    blurb: "Double-cab workhorses and utility 4x4s.",
  },
  {
    name: "Agriculture",
    slug: "agriculture",
    icon: Tractor,
    blurb: "Tractors, harvesters and implements.",
  },
  {
    name: "Construction",
    slug: "construction",
    icon: Wrench,
    blurb: "Excavators, loaders and site equipment.",
  },
] as const;

const commercialCategories = [
  "heavy-trucks",
  "buses",
  "vans",
  "pickups",
  "agriculture",
  "construction",
];

export default function CommercialPage() {
  const fleet = VEHICLES.filter((v) =>
    commercialCategories.includes(v.category),
  ).slice(0, 6);
  const hero = getVehicle("2024-mercedes-benz-actros-2645");

  return (
    <>
      <PageHero
        eyebrow="Commercial"
        title={
          <>
            Machines that{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              earn their keep.
            </span>
          </>
        }
        description="Buy or finance trucks, buses, vans, pickups and equipment from dealers who understand uptime. Fleet pricing, inspection reports and nationwide delivery."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/vehicles?category=heavy-trucks" size="lg">
            Shop commercial
          </ButtonLink>
          <ButtonLink href="/contact" variant="glass" size="lg">
            Talk to fleet desk
          </ButtonLink>
        </div>
      </PageHero>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <Eyebrow>Built for work</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-ink">
              Downtime is the real cost.
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink/60">
              Every commercial listing on OPTICS includes service history, hours
              or mileage, and a documented inspection. Compare like-for-like
              units before you commit capital.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                "Documented service history",
                "Tonnage & payload verified",
                "Financing introductions",
                "Nationwide delivery",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13.5px] text-ink/70"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-signal/10 text-signal">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[360px] overflow-hidden rounded-[26px] border border-line">
            <Parallax distance={55}>
              <Photo
                src={hero?.images[0] ?? ""}
                alt="Heavy-duty truck at a depot"
                className="h-[460px]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </Parallax>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
              <Badge tone="glass">Fleet ready</Badge>
              <p className="mt-2 font-display text-lg font-semibold text-white">
                Mercedes-Benz Actros 2645
              </p>
              <p className="text-[12px] text-white/60">6x4 tractor · 2024</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2/50 py-14 md:py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="Segments"
            title="Pick the class of machine."
            description="Six commercial segments, each with dealers who specialise in that category."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {segments.map(({ name, slug, icon: Icon, blurb }, i) => (
              <Reveal key={slug} delay={i * 0.04}>
                <Link
                  href={`/vehicles?category=${slug}`}
                  className="group flex h-full items-start gap-4 rounded-[20px] border border-line bg-white p-5 transition-all duration-400 hover:-translate-y-1 hover:border-ink/15 hover:shadow-lift"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-white transition-colors duration-300 group-hover:bg-signal">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-[15px] font-semibold text-ink">
                        {name}
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-ink/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-relaxed text-ink/50">
                      {blurb}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <SectionHead
          eyebrow="Available now"
          title="Commercial stock"
          action={
            <ButtonLink
              href="/vehicles?category=heavy-trucks"
              variant="outline"
              size="sm"
            >
              View all
            </ButtonLink>
          }
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.04}>
              <VehicleCard vehicle={v} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-16 md:pb-24">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-ink px-6 py-12 text-white md:px-12 md:py-16">
          <div className="hero-grid absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-signal/25 blur-[100px]" />
          <div className="relative max-w-2xl">
            <Eyebrow tone="light">Fleet desk</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.04] font-semibold tracking-[-0.03em]">
              Buying five units or fifty?
            </h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-white/60">
              Our fleet desk sources specific specs, negotiates volume pricing and
              coordinates delivery across states. Tell us what the operation needs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg">
                Request fleet quote
              </ButtonLink>
              <ButtonLink href="/dealer/register" variant="glass" size="lg">
                Become a fleet dealer
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
