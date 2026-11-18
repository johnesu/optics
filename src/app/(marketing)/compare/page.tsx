"use client";

import Link from "next/link";
import { ArrowLeftRight, Plus, X } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { useShop } from "@/components/providers";
import { Badge, Button, ButtonLink, Eyebrow } from "@/components/ui";
import { VEHICLES } from "@/lib/data";
import { cn, formatMileage, formatPrice, POWER_SHORT } from "@/lib/utils";

const ROWS: { label: string; get: (v: (typeof VEHICLES)[number]) => string }[] = [
  { label: "Price", get: (v) => formatPrice(v.price) },
  { label: "Year", get: (v) => String(v.year) },
  { label: "Condition", get: (v) => v.condition },
  { label: "Mileage", get: (v) => formatMileage(v.mileage) },
  { label: "Powertrain", get: (v) => POWER_SHORT[v.powertrain] },
  { label: "Transmission", get: (v) => v.transmission },
  { label: "Drivetrain", get: (v) => v.drivetrain },
  { label: "Location", get: (v) => v.location },
  { label: "Range", get: (v) => (v.rangeKm ? `${v.rangeKm} km` : "—") },
  { label: "Battery", get: (v) => (v.batteryKwh ? `${v.batteryKwh} kWh` : "—") },
];

export default function ComparePage() {
  const { compare, isComparing, toggleCompare, clearCompare } = useShop();
  const vehicles = compare
    .map((slug) => VEHICLES.find((v) => v.slug === slug))
    .filter((v): v is (typeof VEHICLES)[number] => Boolean(v));

  return (
    <>
      <PageHero
        eyebrow="Compare"
        title={
          <>
            Two, three.{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              Side by side.
            </span>
          </>
        }
        description="Put up to three vehicles next to each other and compare the numbers that actually matter."
      />

      <section className="container-x py-12 md:py-16">
        {vehicles.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-[24px] border border-dashed border-line bg-white px-6 py-14 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-paper-2 text-ink/40">
              <ArrowLeftRight className="size-5" strokeWidth={1.9} />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink">
              Nothing to compare yet
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink/50">
              Add vehicles using the compare button on any listing card or vehicle
              page. You can compare up to three at once.
            </p>
            <ButtonLink href="/vehicles" className="mt-5" size="md">
              Browse vehicles
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[12.5px] text-ink/50">
                Comparing{" "}
                <span className="font-semibold text-ink">{vehicles.length}</span> of 3
              </p>
              <Button variant="ghost" size="sm" onClick={clearCompare}>
                <X className="size-3.5" strokeWidth={2} />
                Clear all
              </Button>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <div
                className="grid min-w-[640px] gap-4"
                style={{
                  gridTemplateColumns: `160px repeat(${vehicles.length}, minmax(0, 1fr))`,
                }}
              >
                <div />

                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="overflow-hidden rounded-[20px] border border-line bg-white"
                  >
                    <div className="relative aspect-[4/3] bg-paper-2">
                      <Photo src={v.images[0]} alt={v.title} sizes="33vw" />
                      <button
                        type="button"
                        onClick={() => toggleCompare(v.slug)}
                        aria-label={`Remove ${v.title} from comparison`}
                        className="absolute right-2.5 top-2.5 z-10 grid size-7 place-items-center rounded-full bg-ink/70 text-white backdrop-blur transition-colors hover:bg-ink"
                      >
                        <X className="size-3.5" strokeWidth={2.4} />
                      </button>
                      <div className="absolute bottom-2.5 left-2.5">
                        <Badge tone="glass">{POWER_SHORT[v.powertrain]}</Badge>
                      </div>
                    </div>
                    <div className="p-3.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                        {v.make}
                      </p>
                      <Link
                        href={`/vehicles/${v.slug}`}
                        className="mt-1 block text-[13.5px] font-semibold leading-snug text-ink hover:text-signal"
                      >
                        {v.title}
                      </Link>
                    </div>
                  </div>
                ))}

                {vehicles.length < 3 ? (
                  <div className="flex flex-col items-center justify-center gap-2 rounded-[20px] border border-dashed border-line bg-paper px-4 py-10 text-center">
                    <span className="grid size-9 place-items-center rounded-full bg-white text-ink/40 shadow-soft">
                      <Plus className="size-4" strokeWidth={2} />
                    </span>
                    <p className="text-[12px] font-medium text-ink/55">
                      Add another vehicle
                    </p>
                    <ButtonLink href="/vehicles" variant="outline" size="sm">
                      Browse
                    </ButtonLink>
                  </div>
                ) : null}

                {ROWS.map((row) => (
                  <div key={row.label} className="contents">
                    <div className="flex items-center border-t border-line py-3 pr-3 text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink/40">
                      {row.label}
                    </div>
                    {vehicles.map((v) => (
                      <div
                        key={`${v.id}-${row.label}`}
                        className={cn(
                          "flex items-center border-t border-line py-3 text-[13px] font-medium text-ink",
                        )}
                      >
                        {row.get(v)}
                      </div>
                    ))}
                    {vehicles.length < 3 ? <div className="border-t border-line" /> : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/vehicles" variant="outline" size="md">
                Keep browsing
              </ButtonLink>
              <ButtonLink href="/contact" size="md">
                Ask an adviser
              </ButtonLink>
            </div>
          </>
        )}
      </section>

      <section className="border-t border-line bg-paper-2/50 py-10">
        <div className="container-x">
          <p className="max-w-xl text-[12px] leading-relaxed text-ink/45">
            Comparison is saved in this browser for the demo. Once accounts go live,
            your shortlist and comparison follow you across devices.
          </p>
        </div>
      </section>
    </>
  );
}
