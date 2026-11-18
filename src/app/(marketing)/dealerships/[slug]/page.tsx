import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Photo } from "@/components/photo";
import { VehicleCard } from "@/components/vehicle-card";
import { Badge, ButtonLink, Eyebrow, SectionHead } from "@/components/ui";
import { DEALERS, getDealer, getDealerVehicles } from "@/lib/data";
import { initials } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return DEALERS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const dealer = getDealer(slug);
  if (!dealer) return { title: "Dealership not found" };
  return { title: dealer.name, description: dealer.tagline };
}

export default async function DealerProfilePage({ params }: { params: Params }) {
  const { slug } = await params;
  const dealer = getDealer(slug);
  if (!dealer) notFound();

  const inventory = getDealerVehicles(dealer.slug);

  return (
    <>
      <section className="relative isolate h-[340px] overflow-hidden bg-ink md:h-[420px]">
        <Photo
          src={dealer.cover}
          alt={`${dealer.name} cover`}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="container-x absolute inset-x-0 bottom-0">
          <Link
            href="/dealerships"
            className="mb-6 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2} />
            All dealerships
          </Link>
        </div>
      </section>

      <section className="container-x -mt-20 pb-14 md:-mt-24 md:pb-20">
        <div className="relative rounded-[24px] border border-line bg-white p-5 shadow-lift md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <span
                className="grid size-14 shrink-0 place-items-center rounded-2xl text-sm font-bold text-white"
                style={{ backgroundColor: dealer.accent }}
              >
                {initials(dealer.name)}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold tracking-[-0.03em] text-ink">
                    {dealer.name}
                  </h1>
                  {dealer.verified ? (
                    <Badge tone="jade">
                      <ShieldCheck className="size-3" strokeWidth={2.4} />
                      Verified
                    </Badge>
                  ) : null}
                </div>
                <p className="mt-1 text-[13px] text-ink/50">{dealer.tagline}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-ink/45">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3" strokeWidth={2} />
                    {dealer.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    <Star className="size-3.5 fill-signal text-signal" strokeWidth={0} />
                    {dealer.rating.toFixed(1)}
                    <span className="font-normal text-ink/40">
                      ({dealer.reviewCount})
                    </span>
                  </span>
                  <span>Since {dealer.since}</span>
                  <span>{dealer.inventoryCount} listings</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <ButtonLink href="/contact" size="md">
                <MessageSquare className="size-4" strokeWidth={2} />
                Contact
              </ButtonLink>
              <ButtonLink
                href={`/vehicles?q=${encodeURIComponent(dealer.name)}`}
                variant="outline"
                size="md"
              >
                All inventory
              </ButtonLink>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
            {dealer.specialties.map((s) => (
              <Badge key={s} tone="neutral">
                {s}
              </Badge>
            ))}
            <Badge tone="neutral">{dealer.state}</Badge>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Inventory</Eyebrow>
                <h2 className="mt-3 text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold tracking-[-0.03em] text-ink">
                  On the lot
                </h2>
              </div>
              <span className="text-[12px] text-ink/40">
                {inventory.length} vehicles
              </span>
            </div>

            {inventory.length ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {inventory.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-2xl border border-dashed border-line bg-paper px-5 py-10 text-center text-sm text-ink/50">
                This dealership has no live listings right now.
              </p>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[22px] border border-line bg-white p-5">
              <h3 className="font-display text-[15px] font-semibold text-ink">
                About the dealership
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
                {dealer.about}
              </p>
            </div>

            <div className="rounded-[22px] border border-line bg-paper p-5">
              <h3 className="font-display text-[15px] font-semibold text-ink">
                Visit the showroom
              </h3>
              <p className="mt-2 flex items-start gap-2 text-[13px] text-ink/60">
                <MapPin className="mt-0.5 size-3.5 shrink-0" strokeWidth={2} />
                {dealer.location}, {dealer.state}
              </p>
              <p className="mt-2 text-[12px] text-ink/40">
                Mon–Sat · 9:00–18:00
              </p>
              <ButtonLink href="/contact" variant="outline" className="mt-4 w-full" size="sm">
                Book an inspection
              </ButtonLink>
            </div>

            <div className="rounded-[22px] bg-ink p-5 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                Buyer protection
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/65">
                Payments held in escrow until you confirm the vehicle matches its
                listing and inspection report.
              </p>
              <Link
                href="/about"
                className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-signal"
              >
                How it works <span aria-hidden>→</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
