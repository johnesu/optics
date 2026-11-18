import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Car,
  Eye,
  MessageSquare,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Bars,
  Panel,
  PageTitle,
  ProgressRow,
  Spark,
  Stat,
  StatusPill,
  tableClass,
  tdClass,
  thClass,
} from "@/components/dashboard";
import { ButtonLink } from "@/components/ui";
import {
  DEALER_INVENTORY,
  ENQUIRIES,
  MONTHS,
  REVENUE_SERIES,
  VIEWS_SERIES,
  getVehicle,
} from "@/lib/data";
import { formatMileage, formatPrice, formatPriceFull } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dealer overview",
};

const thRight =
  "px-3 py-2.5 text-right text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink/35";

export default function DealerOverviewPage() {
  const active = DEALER_INVENTORY.filter((row) => row.status === "ACTIVE").length;
  const totalViews = DEALER_INVENTORY.reduce((sum, row) => sum + row.views, 0);
  const totalEnquiries = DEALER_INVENTORY.reduce(
    (sum, row) => sum + row.enquiries,
    0,
  );
  const revenue = 421_500_000;

  const topInventory = DEALER_INVENTORY.slice(0, 5);

  return (
    <div className="space-y-6">
      <PageTitle
        title="Good morning, Adaeze."
        description="Here is how AutoHaven Motors performed over the last 30 days."
        action={
          <>
            <ButtonLink href="/dealerships/auto-haven" variant="outline" size="sm">
              View storefront
            </ButtonLink>
            <ButtonLink href="/dealer/inventory" size="sm">
              <Plus className="size-4" />
              Add vehicle
            </ButtonLink>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Active listings"
          value={String(active)}
          delta="+2"
          hint="vs last month"
          icon={<Car className="size-4" />}
        />
        <Stat
          label="Enquiries"
          value={String(totalEnquiries)}
          delta="+18%"
          hint="34 unread"
          icon={<MessageSquare className="size-4" />}
        />
        <Stat
          label="Revenue released"
          value={formatPrice(revenue)}
          delta="+12%"
          hint="escrow settled"
          icon={<Wallet className="size-4" />}
        />
        <Stat
          label="Listing views"
          value={totalViews.toLocaleString("en-NG")}
          delta="+9%"
          hint="last 30 days"
          icon={<Eye className="size-4" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Panel
          title="Revenue"
          description="Escrow released to your account, in millions of naira."
          action={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-jade-soft px-2.5 py-1 text-[11px] font-semibold text-jade">
              <TrendingUp className="size-3" />
              +12.4%
            </span>
          }
        >
          <div className="h-[190px] pt-2">
            <Bars data={REVENUE_SERIES} labels={MONTHS} tone="signal" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                This month
              </p>
              <p className="mt-1 font-display text-[17px] font-semibold text-ink">
                {formatPrice(72_000_000)}
              </p>
            </div>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                Pending
              </p>
              <p className="mt-1 font-display text-[17px] font-semibold text-ink">
                {formatPrice(98_000_000)}
              </p>
            </div>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                Average order
              </p>
              <p className="mt-1 font-display text-[17px] font-semibold text-ink">
                {formatPrice(84_300_000)}
              </p>
            </div>
          </div>
        </Panel>

        <Panel
          title="Listing views"
          description="Weekly traffic across active inventory."
        >
          <div className="h-[110px]">
            <Spark data={VIEWS_SERIES} tone="volt" label="Listing views trend" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="font-display text-[26px] font-semibold tracking-[-0.03em] text-ink">
                960
              </p>
              <p className="text-[11.5px] text-ink/40">views this week</p>
            </div>
            <p className="text-[11.5px] font-medium text-jade">+14% week over week</p>
          </div>

          <div className="mt-5 space-y-4 border-t border-line pt-4">
            <ProgressRow label="Electric & hybrid interest" value={68} suffix="%" tone="volt" />
            <ProgressRow label="Enquiry conversion" value={41} suffix="%" tone="jade" />
            <ProgressRow label="Listing completeness" value={92} suffix="%" />
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <Panel
          title="Recent enquiries"
          action={
            <Link
              href="/dealer/leads"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-signal"
            >
              All leads
              <ArrowRight className="size-3.5" />
            </Link>
          }
        >
          <ul className="divide-y divide-line">
            {ENQUIRIES.slice(0, 4).map((lead) => {
              const vehicle = getVehicle(lead.vehicleSlug);
              return (
                <li key={lead.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-paper text-[10.5px] font-semibold text-ink/50">
                    {lead.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[12.5px] font-medium text-ink">
                        {lead.name}
                      </p>
                      {lead.status === "NEW" && (
                        <span className="size-1.5 shrink-0 rounded-full bg-signal" />
                      )}
                      <span className="ml-auto shrink-0 text-[10.5px] text-ink/35">
                        {lead.time}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-[11.5px] text-ink/45">
                      {vehicle?.title ?? "Vehicle removed"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel
          title="Top performing inventory"
          action={
            <Link
              href="/dealer/inventory"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-signal"
            >
              Manage
              <ArrowUpRight className="size-3.5" />
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr className="border-b border-line">
                  <th className={thClass}>Vehicle</th>
                  <th className={thClass}>Status</th>
                  <th className={thRight}>Views</th>
                  <th className={thRight}>Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {topInventory.map((row) => {
                  const vehicle = getVehicle(row.slug);
                  return (
                    <tr key={row.slug}>
                      <td className={tdClass}>
                        <p className="max-w-[190px] truncate text-[12.5px] font-medium text-ink">
                          {vehicle?.title ?? row.slug}
                        </p>
                        <p className="mt-0.5 text-[11px] text-ink/40">
                          {vehicle ? formatMileage(vehicle.mileage) : "—"}
                        </p>
                      </td>
                      <td className={tdClass}>
                        <StatusPill status={row.status} />
                      </td>
                      <td className="px-3 py-3.5 text-right text-[12.5px] tabular-nums text-ink/70">
                        {row.views.toLocaleString("en-NG")}
                      </td>
                      <td className="px-3 py-3.5 text-right text-[12.5px] font-medium tabular-nums text-ink">
                        {vehicle ? formatPrice(vehicle.price) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-ink/35">
            Portfolio value{" "}
            <span className="font-medium text-ink/60">
              {formatPriceFull(
                DEALER_INVENTORY.reduce(
                  (sum, row) => sum + (getVehicle(row.slug)?.price ?? 0),
                  0,
                ),
              )}
            </span>
          </p>
        </Panel>
      </div>
    </div>
  );
}
