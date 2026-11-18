import type { Metadata } from "next";
import Link from "next/link";
import {
  CircleDollarSign,
  CreditCard,
  RotateCcw,
  Wallet,
} from "lucide-react";
import {
  Panel,
  PageTitle,
  ProgressRow,
  Stat,
  tableClass,
  tdClass,
  thClass,
} from "@/components/dashboard";
import { Badge, ButtonLink } from "@/components/ui";
import { ORDERS, getDealer, getVehicle } from "@/lib/data";
import { cn, formatPrice, formatPriceFull } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Orders",
};

type Search = Promise<{ status?: string }>;

const FILTERS = [
  { label: "All", value: "" },
  { label: "Paid", value: "PAID" },
  { label: "Pending", value: "PENDING" },
  { label: "Refunded", value: "REFUNDED" },
];

const orderTone: Record<string, string> = {
  PAID: "bg-jade-soft text-jade",
  PENDING: "bg-amber-100 text-amber-700",
  REFUNDED: "bg-ink/5 text-ink/60",
  FAILED: "bg-red-100 text-red-700",
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { status } = await searchParams;
  const active = status ?? "";
  const rows = active
    ? ORDERS.filter((order) => order.status === active)
    : ORDERS;

  const total = ORDERS.reduce((sum, order) => sum + order.amount, 0);
  const paid = ORDERS.filter((o) => o.status === "PAID").reduce(
    (sum, o) => sum + o.amount,
    0,
  );
  const pending = ORDERS.filter((o) => o.status === "PENDING").reduce(
    (sum, o) => sum + o.amount,
    0,
  );
  const refunded = ORDERS.filter((o) => o.status === "REFUNDED").reduce(
    (sum, o) => sum + o.amount,
    0,
  );

  return (
    <div className="space-y-6">
      <PageTitle
        title="Orders"
        description="Every transaction across the marketplace, in one ledger."
        action={
          <ButtonLink href="/admin/audit" variant="outline" size="sm">
            Audit log
          </ButtonLink>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Gross value"
          value={formatPrice(total)}
          delta="+18%"
          hint="last 30 days"
          icon={<CircleDollarSign className="size-4" />}
        />
        <Stat
          label="Collected"
          value={formatPrice(paid)}
          hint={`${ORDERS.filter((o) => o.status === "PAID").length} settled`}
          icon={<Wallet className="size-4" />}
        />
        <Stat
          label="In escrow"
          value={formatPrice(pending)}
          hint="awaiting release"
          icon={<CreditCard className="size-4" />}
        />
        <Stat
          label="Refunded"
          value={formatPrice(refunded)}
          delta="-2"
          hint="this week"
          icon={<RotateCcw className="size-4" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Panel
          title="Transaction ledger"
          description="Customer orders routed through OPTICS escrow."
          action={
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((filter) => {
                const isActive = active === filter.value;
                return (
                  <Link
                    key={filter.label}
                    href={
                      filter.value
                        ? `/admin/orders?status=${filter.value}`
                        : "/admin/orders"
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
                No orders in this state
              </p>
              <p className="mt-1 text-[12px] text-ink/45">
                Try another filter to see the rest of the ledger.
              </p>
              <ButtonLink
                href="/admin/orders"
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
                    <th className={thClass}>Order</th>
                    <th className={thClass}>Customer</th>
                    <th className={thClass}>Vehicle</th>
                    <th className={thClass}>Status</th>
                    <th className={thClass}>Date</th>
                    <th className={cn(thClass, "text-right")}>Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((order) => {
                    const vehicle = getVehicle(order.vehicleSlug);
                    return (
                      <tr key={order.id}>
                        <td className={tdClass}>
                          <p className="text-[12px] font-semibold text-ink">
                            {order.id}
                          </p>
                          <p className="mt-0.5 text-[11px] text-ink/40">
                            {order.type === "FULL" ? "Full payment" : "Deposit"}
                          </p>
                        </td>
                        <td className={tdClass}>
                          <p className="text-[12.5px] text-ink/70">
                            {order.customer}
                          </p>
                        </td>
                        <td className={tdClass}>
                          <p className="max-w-[180px] truncate text-[12px] text-ink/55">
                            {vehicle?.title ?? order.vehicleSlug}
                          </p>
                          <p className="mt-0.5 text-[11px] text-ink/35">
                            {vehicle
                              ? getDealer(vehicle.dealerSlug)?.name
                              : "Unknown dealer"}
                          </p>
                        </td>
                        <td className={tdClass}>
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
                              orderTone[order.status] ?? "bg-ink/5 text-ink/60",
                            )}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className={cn(tdClass, "whitespace-nowrap")}>
                          {order.date}
                        </td>
                        <td
                          className={cn(
                            tdClass,
                            "whitespace-nowrap text-right tabular-nums text-ink",
                          )}
                        >
                          {formatPrice(order.amount)}
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
              Showing {rows.length} of {ORDERS.length} orders
            </p>
            <Badge tone="outline">Demo ledger · no live transactions</Badge>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Settlement mix" description="Share of value by state.">
            <div className="space-y-4">
              <ProgressRow
                label="Collected"
                value={Math.round((paid / total) * 100)}
                suffix="%"
                tone="jade"
              />
              <ProgressRow
                label="In escrow"
                value={Math.round((pending / total) * 100)}
                suffix="%"
                tone="volt"
              />
              <ProgressRow
                label="Refunded"
                value={Math.round((refunded / total) * 100)}
                suffix="%"
                tone="signal"
              />
            </div>
            <p className="mt-4 border-t border-line pt-4 text-[12px] leading-relaxed text-ink/50">
              You are holding{" "}
              <span className="font-medium text-ink">
                {formatPriceFull(pending)}
              </span>{" "}
              in escrow across pending orders.
            </p>
          </Panel>

          <Panel title="Payout readiness" description="Dealer settlements due.">
            <div className="space-y-3 text-[12.5px]">
              <div className="flex items-center justify-between">
                <span className="text-ink/50">Due this week</span>
                <span className="tabular-nums font-medium text-ink">
                  {formatPrice(paid)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink/50">On hold</span>
                <span className="tabular-nums font-medium text-ink">
                  {formatPrice(pending)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink/50">Refund provision</span>
                <span className="tabular-nums font-medium text-ink">
                  {formatPrice(refunded)}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-line pt-3">
                <span className="font-medium text-ink">Net position</span>
                <span className="tabular-nums font-semibold text-signal">
                  {formatPrice(paid - refunded)}
                </span>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
