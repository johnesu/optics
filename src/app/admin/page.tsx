import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Car,
  CircleDollarSign,
  ClipboardCheck,
  Eye,
  FileText,
} from "lucide-react";
import {
  Bars,
  Panel,
  PageTitle,
  ProgressRow,
  Spark,
  Stat,
  tableClass,
  tdClass,
  thClass,
} from "@/components/dashboard";
import { ButtonLink } from "@/components/ui";
import {
  ADMIN_LISTINGS,
  ADMIN_VERIFICATIONS,
  AUDIT_EVENTS,
  DEALERS,
  MONTHS,
  ORDERS,
  REVENUE_SERIES,
  VIEWS_SERIES,
  getVehicle,
} from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Platform overview",
};

const thRight =
  "px-3 py-2.5 text-right text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink/35";

const verificationTone: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  REVIEW: "bg-volt-soft text-volt",
};

const levelTone: Record<string, string> = {
  info: "bg-jade",
  warn: "bg-signal",
  danger: "bg-red-500",
};

export default function AdminOverviewPage() {
  const gmv = ORDERS.reduce((sum, order) => sum + order.amount, 0);
  const pendingListings = ADMIN_LISTINGS.filter(
    (listing) => listing.status === "PENDING_REVIEW",
  ).length;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Platform overview."
        description="Marketplace health across dealerships, listings and escrowed orders."
        action={
          <>
            <ButtonLink href="/admin/audit" variant="outline" size="sm">
              Audit log
            </ButtonLink>
            <ButtonLink href="/admin/listings" size="sm">
              Review queue
              <ArrowRight className="size-4" />
            </ButtonLink>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Marketplace GMV"
          value={formatPrice(gmv)}
          delta="+22%"
          hint="last 30 days"
          icon={<CircleDollarSign className="size-4" />}
        />
        <Stat
          label="Verified dealers"
          value={String(DEALERS.length)}
          delta="+1"
          hint="3 awaiting checks"
          icon={<Building2 className="size-4" />}
        />
        <Stat
          label="Listings live"
          value="24"
          delta="+3"
          hint={`${pendingListings} in review`}
          icon={<Car className="size-4" />}
        />
        <Stat
          label="Open flags"
          value="1"
          delta="-2"
          hint="resolved this week"
          icon={<ClipboardCheck className="size-4" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Panel
          title="Gross merchandise value"
          description="Escrow volume across all dealerships, in millions of naira."
          action={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-volt-soft px-2.5 py-1 text-[11px] font-semibold text-volt">
              <ArrowUpRight className="size-3" />
              +22.1%
            </span>
          }
        >
          <div className="h-[190px] pt-2">
            <Bars data={REVENUE_SERIES} labels={MONTHS} tone="volt" />
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
                In escrow
              </p>
              <p className="mt-1 font-display text-[17px] font-semibold text-ink">
                {formatPrice(98_000_000)}
              </p>
            </div>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                Take rate
              </p>
              <p className="mt-1 font-display text-[17px] font-semibold text-ink">
                4.5%
              </p>
            </div>
          </div>
        </Panel>

        <Panel
          title="Marketplace traffic"
          description="Listing views across the last twelve weeks."
        >
          <div className="h-[110px]">
            <Spark data={VIEWS_SERIES} tone="jade" label="Marketplace views" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="font-display text-[26px] font-semibold tracking-[-0.03em] text-ink">
                960
              </p>
              <p className="text-[11.5px] text-ink/40">views this week</p>
            </div>
            <p className="text-[11.5px] font-medium text-jade">
              +14% week over week
            </p>
          </div>

          <div className="mt-5 space-y-4 border-t border-line pt-4">
            <ProgressRow label="Dealer response rate" value={87} suffix="%" tone="jade" />
            <ProgressRow label="Listing approval rate" value={74} suffix="%" tone="volt" />
            <ProgressRow label="Order completion" value={92} suffix="%" />
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Panel
          title="Verification queue"
          description="Dealerships waiting on document checks."
          action={
            <Link
              href="/admin/dealers"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-signal"
            >
              All dealers
              <ArrowRight className="size-3.5" />
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr className="border-b border-line">
                  <th className={thClass}>Dealer</th>
                  <th className={thClass}>Docs</th>
                  <th className={thClass}>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ADMIN_VERIFICATIONS.map((row) => (
                  <tr key={row.dealer}>
                    <td className={tdClass}>
                      <p className="text-[12.5px] font-medium text-ink">
                        {row.dealer}
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink/40">
                        {row.location} · {row.submitted}
                      </p>
                    </td>
                    <td className={tdClass}>
                      <span className="inline-flex items-center gap-1 text-[12px] tabular-nums text-ink/50">
                        <FileText className="size-3.5" />
                        {row.documents}
                      </span>
                    </td>
                    <td className={tdClass}>
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
                          verificationTone[row.status] ??
                            "bg-ink/5 text-ink/60",
                        )}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel
          title="Recent activity"
          description="Latest operator and system events."
          action={
            <Link
              href="/admin/audit"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-signal"
            >
              Full log
              <ArrowRight className="size-3.5" />
            </Link>
          }
        >
          <ul className="divide-y divide-line">
            {AUDIT_EVENTS.slice(0, 5).map((event, index) => (
              <li
                key={`${event.action}-${index}`}
                className="flex gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span
                  className={cn(
                    "mt-1.5 size-1.5 shrink-0 rounded-full",
                    levelTone[event.level] ?? "bg-ink/20",
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] text-ink">
                    <span className="font-medium">{event.action}</span>
                    <span className="text-ink/45"> · {event.target}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink/40">
                    {event.actor} · {event.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel
        title="Listings awaiting review"
        description="New submissions from verified dealerships."
        action={
          <Link
            href="/admin/listings"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-signal"
          >
            Open queue
            <ArrowRight className="size-3.5" />
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead>
              <tr className="border-b border-line">
                <th className={thClass}>Vehicle</th>
                <th className={thClass}>Dealer</th>
                <th className={thClass}>Submitted</th>
                <th className={thRight}>Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ADMIN_LISTINGS.slice(0, 4).map((row) => {
                const vehicle = getVehicle(row.slug);
                return (
                  <tr key={row.slug}>
                    <td className={tdClass}>
                      <p className="max-w-[260px] truncate text-[12.5px] font-medium text-ink">
                        {vehicle?.title ?? row.slug}
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink/40">
                        {vehicle?.location ?? "—"}
                      </p>
                    </td>
                    <td className={tdClass}>{row.dealer}</td>
                    <td className={tdClass}>
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-ink/50">
                        <Eye className="size-3.5" />
                        {row.submitted}
                      </span>
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
          Demo operations console · review decisions are not saved.
        </p>
      </Panel>
    </div>
  );
}
