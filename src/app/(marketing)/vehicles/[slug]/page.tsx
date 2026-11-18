import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  Gauge,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { Photo } from "@/components/photo";
import { VehicleCard } from "@/components/vehicle-card";
import { VehicleGallery } from "@/components/vehicle-gallery";
import { Badge, ButtonLink, Divider, Eyebrow } from "@/components/ui";
import { getDealer, getVehicle, relatedVehicles, VEHICLES } from "@/lib/data";
import {
  formatMileage,
  formatPrice,
  formatPriceFull,
  POWER_LABEL,
  POWER_SHORT,
} from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return VEHICLES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return { title: "Vehicle not found" };
  return {
    title: vehicle.title,
    description: vehicle.description,
  };
}

export default async function VehicleDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const dealer = getDealer(vehicle.dealerSlug);
  const related = relatedVehicles(vehicle, 3);

  const quickSpecs = [
    { label: "Year", value: String(vehicle.year), icon: Calendar },
    { label: "Mileage", value: formatMileage(vehicle.mileage), icon: Gauge },
    { label: "Transmission", value: vehicle.transmission, icon: Check },
    { label: "Drivetrain", value: vehicle.drivetrain, icon: ShieldCheck },
  ];

  return (
    <>
      <div className="border-b border-line bg-paper">
        <div className="container-x flex items-center gap-2 py-4 text-[12px] text-ink/45">
          <Link href="/vehicles" className="flex items-center gap-1.5 hover:text-ink">
            <ArrowLeft className="size-3.5" strokeWidth={2} />
            All vehicles
          </Link>
          <span className="text-ink/20">/</span>
          <span className="truncate text-ink/70">{vehicle.title}</span>
        </div>
      </div>

      <section className="container-x py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_368px]">
          <div>
            <VehicleGallery images={vehicle.images} title={vehicle.title} />

            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={vehicle.powertrain === "BEV" ? "volt" : "jade"}>
                  {POWER_SHORT[vehicle.powertrain]} ·{" "}
                  {POWER_LABEL[vehicle.powertrain]}
                </Badge>
                <Badge tone="neutral">{vehicle.condition}</Badge>
                {dealer?.verified ? (
                  <Badge tone="jade">
                    <ShieldCheck className="size-3" strokeWidth={2.4} />
                    Verified dealer
                  </Badge>
                ) : null}
              </div>

              <h1 className="mt-4 text-[clamp(1.8rem,3.6vw,2.9rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-ink">
                {vehicle.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink/50">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" strokeWidth={2} />
                  {vehicle.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Gauge className="size-3.5" strokeWidth={2} />
                  {formatMileage(vehicle.mileage)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" strokeWidth={2} />
                  {vehicle.year}
                </span>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {quickSpecs.map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white px-4 py-4">
                  <Icon className="size-4 text-ink/30" strokeWidth={1.9} />
                  <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                    {label}
                  </p>
                  <p className="mt-1 text-[13.5px] font-semibold text-ink">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Eyebrow>Overview</Eyebrow>
              <p className="mt-4 text-[15px] leading-[1.75] text-ink/65">
                {vehicle.description}
              </p>
            </div>

            <div className="mt-9">
              <Eyebrow>Highlights</Eyebrow>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {vehicle.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink/70"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-jade-soft text-jade">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Eyebrow>Specification</Eyebrow>
              <dl className="mt-4 overflow-hidden rounded-2xl border border-line">
                {Object.entries(vehicle.specs).map(([key, value], i) => (
                  <div
                    key={key}
                    className={`grid grid-cols-[1fr_1.2fr] gap-4 px-4 py-3.5 text-[13px] ${
                      i % 2 === 0 ? "bg-white" : "bg-paper"
                    }`}
                  >
                    <dt className="text-ink/45">{key}</dt>
                    <dd className="font-medium text-ink">{value}</dd>
                  </div>
                ))}
                {vehicle.rangeKm ? (
                  <div className="grid grid-cols-[1fr_1.2fr] gap-4 border-t border-line bg-white px-4 py-3.5 text-[13px]">
                    <dt className="text-ink/45">Electric range</dt>
                    <dd className="font-medium text-ink">{vehicle.rangeKm} km</dd>
                  </div>
                ) : null}
                {vehicle.batteryKwh ? (
                  <div className="grid grid-cols-[1fr_1.2fr] gap-4 border-t border-line bg-paper px-4 py-3.5 text-[13px]">
                    <dt className="text-ink/45">Battery capacity</dt>
                    <dd className="font-medium text-ink">
                      {vehicle.batteryKwh} kWh
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-volt/20 bg-volt-soft px-5 py-4">
              <Zap className="mt-0.5 size-4.5 shrink-0 text-volt" strokeWidth={2} />
              <p className="text-[12.5px] leading-relaxed text-ink/65">
                <span className="font-semibold text-ink">Inspection report available.</span>{" "}
                This listing includes the full 148-point inspection, history check
                and photo set. Ask the dealer to share it before you travel.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[22px] border border-line bg-white p-5 shadow-soft">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                Asking price
              </p>
              <p className="mt-1 font-display text-[32px] leading-none font-semibold tracking-[-0.03em] text-ink">
                {formatPrice(vehicle.price)}
              </p>
              <p className="mt-1.5 text-[12px] text-ink/40">
                {formatPriceFull(vehicle.price)}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge tone="neutral">{vehicle.color}</Badge>
                <Badge tone="neutral">{vehicle.category.replace("-", " ")}</Badge>
              </div>

              <div className="mt-5 space-y-2">
                <ButtonLink href="#enquire" className="w-full" size="lg">
                  Contact dealer
                </ButtonLink>
                <ButtonLink
                  href="/compare"
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Add to compare
                </ButtonLink>
              </div>

              <Divider className="my-5" />

              {dealer ? (
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-bold text-white">
                      {dealer.name
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-ink">
                        {dealer.name}
                      </p>
                      <p className="text-[11.5px] text-ink/45">
                        {dealer.location} · {dealer.rating.toFixed(1)} ★
                      </p>
                    </div>
                  </div>
                  <ButtonLink
                    href={`/dealerships/${dealer.slug}`}
                    variant="ghost"
                    size="sm"
                    className="mt-3 w-full justify-between border border-line"
                  >
                    View dealership
                    <span aria-hidden>→</span>
                  </ButtonLink>
                </div>
              ) : null}
            </div>

            <div
              id="enquire"
              className="mt-5 rounded-[22px] border border-line bg-paper p-5"
            >
              <EnquiryForm
                vehicleTitle={vehicle.title}
                dealerName={dealer?.name ?? "the dealer"}
              />
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-line bg-paper py-14 md:py-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Keep looking</Eyebrow>
                <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-ink">
                  Similar listings
                </h2>
              </div>
              <ButtonLink href="/vehicles" variant="outline" size="sm">
                Browse all
              </ButtonLink>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="border-t border-line">
          <Photo src={vehicle.images[0]} alt="" className="sr-only" />
        </div>
      )}
    </>
  );
}
