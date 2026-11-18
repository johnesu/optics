import type { Metadata } from "next";
import Link from "next/link";
import {
  Car,
  Check,
  Clock,
  FileText,
  Plus,
  TrendingUp,
} from "lucide-react";
import {
  Panel,
  PageTitle,
  Stat,
  tableClass,
  tdClass,
  thClass,
} from "@/components/dashboard";
import { Badge, ButtonLink } from "@/components/ui";
import { ADMIN_LISTINGS, getVehicle } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Listings",
};

type Search = Promise<{ status?: string }>;

const FILTERS = [
  { label: "All", value: "" },
  { label: "Pending review", value: "PENDING_REVIEW" },
  { label: "Flagged", value: "FLAGGED" },
];

const listingTone: Record<string, string> = {
  PENDING_REVIEW: "bg-amber-100 text-amber-700",
  FLAGGED: "bg-red-100 text-red-700",
  ACTIVE: "bg-jade-soft text-jade",
  APPROVED: "bg-jade-soft text-jade",
  REJECTED: "bg-ink/5 text-ink/60",
};

const label = (status: string) =>
  status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default async function AdminListingsPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { status } = await searchParams;
  const active = status ?? "";
  const rows = active
    ? ADMIN_LISTINGS.filter((row) => row.status === active)
    : ADMIN_LISTINGS;

  const pending = ADMIN_LISTINGS.filter(
    (row) => row.status === "PENDING_REVIEW",
  ).length;
  const flagged = ADMIN_LISTINGS.filter(
    (row) => row.status === "FLAGGED",
  ).length;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Listing moderation"
        description="Approve, flag and monitor every vehicle submitted to the marketplace."
        action={
          <>
            <ButtonLink href="/admin/dealers" variant="outline" size="sm">
              Dealers
            </ButtonLink>
            <ButtonLink href="/admin/listings" size="sm">
              <Plus className="size-4" />
              New policy
            </ButtonLink>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="In queue"
          value={String(ADMIN_LISTINGS.length)}
          delta="+4"
          hint="since yesterday"
          icon={<FileText className="size-4" />}
        />
        <Stat
          label="Pending review"
          value={String(pending)}
          hint="awaiting checks"
          icon={<Clock className="size-4" />}
        />
        <Stat
          label="Flagged"
          value={String(flagged)}
          hint="needs attention"
          icon={<Car className="size-4" />}
        />
        <Stat
          label="Approved this week"
          value="12"
          delta="+5"
          hint="avg 4h to review"
          icon={<TrendingUp className="size-4" />}
        />
      </div>

      <Panel
        title="Submission queue"
        description="Vehicles from verified dealerships, newest first."
        action={
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((filter) => {
              const isActive = active === filter.value;
              return (
                <Link
                  key={filter.label}
                  href={
                    filter.value
                      ? `/admin/listings?status=${filter.value}`
                      : "/admin/listings"
                  }
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors",
                    isActive
                      ? "bg-ink text-white"
                      : "bg-paper text-ink/55 hover:text-ink",
                  )}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>
        }
      >
        {rows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line px-4 py-12 text-center">
            <p className="text-[13px] font-medium text-ink">
              Nothing in this queue
            </p>
            <p className="mt-1 text-[12px] text-ink/45">
              Every listing in this state has been handled.
            </p>
            <ButtonLink
              href="/admin/listings"
              variant="outline"
              size="sm"
              className="mt-4"
            >
              Clear filter
            </ButtonLink>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr className="border-b border-line">
                  <th className={thClass}>Vehicle</th>
                  <th className={thClass}>Dealer</th>
                  <th className={thClass}>Submitted</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Checks</th>
                  <th className={thClass}>Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((row) => {
                  const vehicle = getVehicle(row.slug);
                  return (
                    <tr key={row.slug}>
                      <td className={tdClass}>
                        <p className="max-w-[240px] truncate text-[12.5px] font-medium text-ink">
                          {vehicle?.title ?? row.slug}
                        </p>
                        <p className="mt-0.5 text-[11px] text-ink/40">
                          {vehicle
                            ? `${vehicle.year} · ${vehicle.location}`
                            : "Vehicle removed"}
                        </p>
                      </td>
                      <td className={tdClass}>
                        <Link
                          href={`/dealerships/${vehicle?.dealerSlug ?? ""}`}
                          className="text-[12px] text-ink/55 underline-offset-2 hover:text-ink hover:underline"
                        >
                          {row.dealer}
                        </Link>
                      </td>
                      <td className={cn(tdClass, "whitespace-nowrap")}>
                        {row.submitted}
                      </td>
                      <td className={tdClass}>
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
                            listingTone[row.status] ?? "bg-ink/5 text-ink/60",
                          )}
                        >
                          {label(row.status)}
                        </span>
                      </td>
                      <td className={tdClass}>
                        <span className="inline-flex items-center gap-1 text-[11.5px] text-jade">
                          <Check className="size-3.5" />
                          5 of 6
                        </span>
                      </td>
                      <td className={cn(tdClass, "tabular-nums")}>
                        {vehicle ? formatPrice(vehicle.price) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-[11.5px] text-ink/45">
            Showing {rows.length} of {ADMIN_LISTINGS.length} submissions
          </p>
          <Badge tone="outline">Demo moderation · decisions are not saved</Badge>
        </div>
      </Panel>
    </div>
  );
}
