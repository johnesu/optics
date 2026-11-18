import type { Metadata } from "next";
import Link from "next/link";
import {
  CircleDollarSign,
  CreditCard,
  Handshake,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui";
import {
  PageTitle,
  Panel,
  Stat,
  StatusPill,
  tableClass,
  tdClass,
  thClass,
} from "@/components/dashboard";
import { ORDERS, getVehicle } from "@/lib/data";
import { cn, formatPriceFull } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Orders",
};

type Search = Promise<{ status?: string }>;

const FILTERS = [
  { value: "", label: "All orders" },
  { value: "PAID", label: "Paid" },
  { value: "PENDING", label: "Pending" },
  { value: "REFUNDED", label: "Refunded" },
];

const typeTone: Record<string, string> = {
  FULL: "bg-ink text-white",
  DEPOSIT: "bg-volt-soft text-volt",
};

export default async function DealerOrdersPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { status } = await searchParams;
  const active = status ?? "";
  const rows = active
    ? ORDERS.filter((order) => order.status === active)
    : ORDERS;

  const gmv = ORDERS.reduce((total, order) => total + order.amount, 0);
  const paid = ORDERS.filter((order) => order.status === "PAID").reduce(
    (total, order) => total + order.amount,
    0,
  );
  const escrow = ORDERS.filter((order) => order.status === "PENDING").reduce(
    (total, order) => total + order.amount,
    0,
  );
  const refunded = ORDERS.filter((order) => order.status === "REFUNDED").reduce(
    (total, order) => total + order.amount,
    0,
  );

  return (
    <div className="space-y-6">
      <PageTitle
        title="Orders"
        description="Payments, deposits and escrow releases for your storefront."
        action={<Badge tone="jade">Escrow protected</Badge>}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Gross GMV"
          value={formatPriceFull(gmv)}
          delta="+18%"
          hint="vs last month"
          icon={<CircleDollarSign className="size-4" />}
        />
        <Stat
          label="Paid out"
          value={formatPriceFull(paid)}
          hint="settled to your bank"
          icon={<Wallet className="size-4" />}
        />
        <Stat
          label="In escrow"
          value={formatPriceFull(escrow)}
          hint="releases on delivery"
          icon={<Handshake className="size-4" />}
        />
        <Stat
          label="Refunded"
          value={formatPriceFull(refunded)}
          hint="1 buyer protection case"
          icon={<CreditCard className="size-4" />}
        />
      </div>

      <Panel
        title="Order ledger"
        description="Demo transactions in Naira. No live payments."
        action={
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((filter) => (
              <Link
                key={filter.value}
                href={
                  filter.value
                    ? `/dealer/orders?status=${filter.value}`
                    : "/dealer/orders"
                }
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors",
                  active === filter.value
                    ? "bg-ink text-white"
                    : "bg-paper text-ink/55 hover:text-ink",
                )}
              >
                {filter.label}
              </Link>
            ))}
          </div>
        }
      >
        <div className="-mx-1 overflow-x-auto">
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>Order</th>
                <th className={thClass}>Customer</th>
                <th className={cn(thClass, "hidden md:table-cell")}>Vehicle</th>
                <th className={thClass}>Type</th>
                <th className={thClass}>Status</th>
                <th className={cn(thClass, "hidden sm:table-cell")}>Date</th>
                <th className={cn(thClass, "text-right")}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((order) => {
                const vehicle = getVehicle(order.vehicleSlug);
                return (
                  <tr key={order.id} className="border-t border-line">
                    <td className={cn(tdClass, "font-medium text-ink")}>
                      {order.id}
                    </td>
                    <td className={tdClass}>{order.customer}</td>
                    <td className={cn(tdClass, "hidden max-w-[220px] md:table-cell")}>
                      {vehicle ? (
                        <Link
                          href={`/vehicles/${vehicle.slug}`}
                          className="link-underline block truncate text-ink/70"
                        >
                          {vehicle.title}
                        </Link>
                      ) : (
                        <span className="text-ink/35">Removed listing</span>
                      )}
                    </td>
                    <td className={tdClass}>
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em]",
                          typeTone[order.type] ?? "bg-ink/5 text-ink/55",
                        )}
                      >
                        {order.type === "FULL" ? "Full payment" : "Deposit"}
                      </span>
                    </td>
                    <td className={tdClass}>
                      <StatusPill status={order.status} />
                    </td>
                    <td className={cn(tdClass, "hidden whitespace-nowrap sm:table-cell")}>
                      {order.date}
                    </td>
                    <td
                      className={cn(
                        tdClass,
                        "text-right font-medium tabular-nums text-ink",
                      )}
                    >
                      {formatPriceFull(order.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="mt-3 rounded-xl border border-dashed border-line px-4 py-12 text-center">
            <p className="text-[13px] font-medium text-ink">No orders here</p>
            <p className="mt-1 text-[12px] text-ink/45">
              Nothing matches this status yet.
            </p>
            <Link
              href="/dealer/orders"
              className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-85"
            >
              Clear filter
            </Link>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-[12px] text-ink/45">
            {rows.length} of {ORDERS.length} orders ·{" "}
            <span className="font-medium text-ink">
              {formatPriceFull(
                rows.reduce((total, order) => total + order.amount, 0),
              )}
            </span>{" "}
            filtered value
          </p>
          <p className="text-[11px] text-ink/30">
            Demo data · no live transactions
          </p>
        </div>
      </Panel>
    </div>
  );
}
