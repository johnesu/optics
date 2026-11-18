"use client";

import { Heart } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { useShop } from "@/components/providers";
import { VehicleCard } from "@/components/vehicle-card";
import { Button, ButtonLink } from "@/components/ui";
import { VEHICLES } from "@/lib/data";

export default function SavedPage() {
  const { favorites, clearFavorites } = useShop();
  const vehicles = favorites
    .map((slug) => VEHICLES.find((v) => v.slug === slug))
    .filter((v): v is (typeof VEHICLES)[number] => Boolean(v));

  return (
    <>
      <PageHero
        eyebrow="Saved"
        title={
          <>
            Your shortlist,{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              kept close.
            </span>
          </>
        }
        description="Vehicles you have hearted. Nothing is reserved in the demo — contact the dealer to hold a unit."
      />

      <section className="container-x py-12 md:py-16">
        {vehicles.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-[24px] border border-dashed border-line bg-white px-6 py-14 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-paper-2 text-ink/40">
              <Heart className="size-5" strokeWidth={1.9} />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink">
              No saved vehicles
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink/50">
              Tap the heart on any listing to keep it here while you decide.
            </p>
            <ButtonLink href="/vehicles" className="mt-5" size="md">
              Browse vehicles
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[12.5px] text-ink/50">
                <span className="font-semibold text-ink">{vehicles.length}</span>{" "}
                {vehicles.length === 1 ? "vehicle" : "vehicles"} saved
              </p>
              <Button variant="ghost" size="sm" onClick={clearFavorites}>
                Clear shortlist
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {vehicles.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} priority={i < 3} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
