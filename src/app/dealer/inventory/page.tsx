import type { Metadata } from "next";
import Link from "next/link";
import {
  Car,
  Download,
  Eye,
  MessageSquare,
  Pencil,
  Plus,
  Wallet,
} from "lucide-react";
import {
  PageTitle,
  Panel,
  Stat,
  StatusPill,
  tableClass,
  tdClass,
  thClass,
} from "@/components/dashboard";
import { Photo } from "@/components/photo";
import { Button, ButtonLink } from "@/components/ui";
import { DEALER_INVENTORY, getVehicle } from "@/lib/data";
import { cn, formatMileage, formatPrice, formatPriceFull } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Inventory",
};

const FILTERS = [
  { value: "", label: "All" },
  { value: "ACTIVE", label: "Active" },
  { value: "RESERVED", label: "Reserved" },
  { value: "PENDING_REVIEW", label: "In review" },
  { value: "DRAFT", label: "Drafts" },
  { value: "SOLD", label: "Sold" },
];

type Search = Promise<{ status?: string }>;

export default async function DealerInventoryPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { status } = await searchParams;
  const filter = FILTERS.some((f) => f.value === status) ? status! : "";

  const rows = DEALER_INVENTORY.filter(
    (row) => !filter || row.status === filter,
  );

  const live = DEALER_INVENTORY.filter((row) => row.status === "ACTIVE").length;
  const review = DEALER_INVENTORY.filter(
    (row) => row.status === "PENDING_REVIEW",
  ).length;
  const portfolio = DEALER_INVENTORY.reduce(
    (sum, row) => sum + (getVehicle(row.slug)?.price ?? 0),
    0,
  );

  return (
    <div className="space-y-6">
      <PageTitle
        title="Inventory"
        description="Manage every listing in your AutoHaven Motors showroom."
        action={
          <>
            <Button variant="outline" size="sm">
              <Download className="size-3.5" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="size-4" />
              Add vehicle
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Total listings"
          value={String(DEALER_INVENTORY.length)}
          hint="across all states"
          icon={<Car className="size-4" />}
        />
        <Stat
          label="Live"
          value={String(live)}
          delta="+2"
          hint="vs last month"
          icon={<Eye className="size-4" />}
        />
        <Stat
          label="In review"
          value={String(review)}
          hint="awaiting approval"
          icon={<MessageSquare className="size-4" />}
        />
        <Stat
          label="Portfolio value"
          value={formatPrice(portfolio)}
          hint="listed asking price"
          icon={<Wallet className="size-4" />}
        />
      </div>

      <Panel
        title="Your listings"
        description={`${rows.length} ${rows.length === 1 ? "vehicle" : "vehicles"} shown`}
        action={
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <Link
                key={f.label}
                href={f.value ? `/dealer/inventory?status=${f.value}` : "/dealer/inventory"}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors",
                  filter === f.value
                    ? "bg-ink text-white"
                    : "bg-paper text-ink/55 hover:text-ink",
                )}
              >
                {f.label}
              </Link>
            ))}
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead>
              <tr className="border-b border-line">
                <th className={thClass}>Vehicle</th>
                <th className={thClass}>Status</th>
                <th className={thClass}>Views</th>
                <th className={thClass}>Enquiries</th>
                <th className={thClass}>Price</th>
                <th className={thClass}>Updated</th>
                <th className={thClass}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row) => {
                const vehicle = getVehicle(row.slug);
                return (
                  <tr key={row.slug}>
                    <td className={tdClass}>
                      <div className="flex items-center gap-3">
                        <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-paper-2">
                          {vehicle ? (
                            <Photo
                              src={vehicle.images[0]}
                              alt={vehicle.title}
                              imgClassName="object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="max-w-[210px] truncate text-[12.5px] font-medium text-ink">
                            {vehicle?.title ?? row.slug}
                          </p>
                          <p className="mt-0.5 text-[11px] text-ink/40">
                            {vehicle
                              ? `${formatMileage(vehicle.mileage)} · ${vehicle.year}`
                              : "Vehicle removed"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <StatusPill status={row.status} />
                    </td>
                    <td className={cn(tdClass, "tabular-nums")}>
                      {row.views.toLocaleString("en-NG")}
                    </td>
                    <td className={cn(tdClass, "tabular-nums")}>{row.enquiries}</td>
                    <td className={cn(tdClass, "tabular-nums font-medium text-ink")}>
                      {vehicle ? formatPrice(vehicle.price) : "—"}
                    </td>
                    <td className={tdClass}>
                      <span className="text-[12px] text-ink/45">{row.updated}</span>
                    </td>
                    <td className={tdClass}>
                      <div className="flex items-center justify-end gap-1.5">
                        {vehicle ? (
                          <Link
                            href={`/vehicles/${vehicle.slug}`}
                            className="grid size-8 place-items-center rounded-full text-ink/40 transition-colors hover:bg-paper hover:text-ink"
                            aria-label="View listing"
                          >
                            <Eye className="size-3.5" />
                          </Link>
                        ) : null}
                        <button
                          type="button"
                          className="grid size-8 place-items-center rounded-full text-ink/40 transition-colors hover:bg-paper hover:text-ink"
                          aria-label="Edit listing"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="rounded-xl border border-dashed border-line px-4 py-12 text-center">
            <p className="text-[13px] font-medium text-ink">No listings here yet</p>
            <p className="mt-1 text-[12.5px] text-ink/45">
              Try another filter or add a new vehicle to your showroom.
            </p>
            <ButtonLink href="/dealer/inventory" variant="outline" size="sm" className="mt-4">
              Clear filter
            </ButtonLink>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-[11.5px] text-ink/40">
            Portfolio value{" "}
            <span className="font-medium text-ink/65">
              {formatPriceFull(portfolio)}
            </span>
          </p>
          <p className="text-[11.5px] text-ink/35">Demo data · no live listings</p>
        </div>
      </Panel>
    </div>
  );
}
