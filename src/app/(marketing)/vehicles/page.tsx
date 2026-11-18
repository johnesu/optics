import type { Metadata } from "next";
import { VehicleBrowser } from "@/components/vehicle-browser";
import { PageHero } from "@/components/page-hero";
import { VEHICLES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse verified vehicles",
  description:
    "Search inspected cars, SUVs, trucks, buses and machinery from verified dealers across Nigeria.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function pick(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Marketplace"
        title={
          <>
            The full lot,{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              inspected.
            </span>
          </>
        }
        description={`${VEHICLES.length} live listings from verified dealers. Every vehicle passes a 148-point inspection before it reaches this page.`}
      />

      <section className="container-x py-12 md:py-16">
        <VehicleBrowser
          initial={{
            q: pick(sp.q),
            category: pick(sp.category),
            powertrain: pick(sp.powertrain),
            max: pick(sp.max),
          }}
        />
      </section>
    </>
  );
}
