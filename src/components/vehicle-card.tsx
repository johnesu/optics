import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Photo } from "@/components/photo";
import { FavoriteButton, CompareButton } from "@/components/shop-buttons";
import { Badge } from "@/components/ui";
import { getDealer } from "@/lib/data";
import type { Vehicle } from "@/lib/types";
import { cn, formatMileage, formatPrice, POWER_SHORT } from "@/lib/utils";

const conditionLabel = {
  NEW: "New",
  USED: "Used",
  REFURBISHED: "Refurbished",
} as const;

export function VehicleCard({
  vehicle,
  priority,
  className,
}: {
  vehicle: Vehicle;
  priority?: boolean;
  className?: string;
}) {
  const dealer = getDealer(vehicle.dealerSlug);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[22px] border border-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link
          href={`/vehicles/${vehicle.slug}`}
          aria-label={`View ${vehicle.title}`}
          className="absolute inset-0 z-10"
        />
        <Photo
          src={vehicle.images[0]}
          alt={vehicle.title}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
        />

        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-2 p-3">
          <div className="flex flex-wrap gap-1.5">
            <Badge tone="glass">{POWER_SHORT[vehicle.powertrain]}</Badge>
            {vehicle.condition !== "USED" ? (
              <Badge tone="glass">{conditionLabel[vehicle.condition]}</Badge>
            ) : null}
          </div>
          <div className="flex shrink-0 gap-1.5">
            <CompareButton slug={vehicle.slug} />
            <FavoriteButton slug={vehicle.slug} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex items-end justify-between bg-[linear-gradient(to_top,rgba(8,9,11,0.72),rgba(8,9,11,0.12)_55%,transparent)] p-3.5 pt-12">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
            <MapPin className="size-3" strokeWidth={2} />
            {vehicle.location}
          </span>
          {dealer?.verified ? (
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">
              Verified
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink/35">
          {vehicle.year} · {vehicle.category.replace("-", " ")}
        </p>
        <h3 className="mt-1.5 line-clamp-1 font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
          <Link href={`/vehicles/${vehicle.slug}`}>{vehicle.title}</Link>
        </h3>
        <p className="mt-1 line-clamp-1 text-[12.5px] text-ink/45">
          {dealer?.name ?? vehicle.dealerSlug}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-ink/50">
          <span>{formatMileage(vehicle.mileage)}</span>
          <span className="size-1 rounded-full bg-ink/20" />
          <span>{vehicle.transmission}</span>
          <span className="size-1 rounded-full bg-ink/20" />
          <span>{vehicle.drivetrain}</span>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-line pt-3.5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
              Asking price
            </p>
            <p className="mt-0.5 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
              {formatPrice(vehicle.price)}
            </p>
          </div>
          <span className="grid size-9 place-items-center rounded-full border border-line text-ink/60 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="size-4" strokeWidth={1.9} />
          </span>
        </div>
      </div>
    </article>
  );
}
