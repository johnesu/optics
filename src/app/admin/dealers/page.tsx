import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  FileText,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import {
  Panel,
  PageTitle,
  Stat,
  tableClass,
  tdClass,
  thClass,
} from "@/components/dashboard";
import { Avatar, Badge, ButtonLink } from "@/components/ui";
import {
  ADMIN_VERIFICATIONS,
  DEALERS,
  getDealerVehicles,
} from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dealers",
};

const verificationTone: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  REVIEW: "bg-volt-soft text-volt",
};

export default function AdminDealersPage() {
  const pending = ADMIN_VERIFICATIONS.filter(
    (row) => row.status === "PENDING",
  ).length;
  const review = ADMIN_VERIFICATIONS.filter(
    (row) => row.status === "REVIEW",
  ).length;

  const totalInventory = DEALERS.reduce(
    (sum, dealer) => sum + getDealerVehicles(dealer.slug).length,
    0,
  );

  return (
    <div className="space-y-6">
      <PageTitle
        title="Dealers"
        description="Verify dealerships, audit storefronts and keep the network healthy."
        action={
          <ButtonLink href="/admin/listings" variant="outline" size="sm">
            Listing queue
          </ButtonLink>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Verified dealers"
          value={String(DEALERS.length)}
          delta="+1"
          hint="this month"
          icon={<Building2 className="size-4" />}
        />
        <Stat
          label="Awaiting documents"
          value={String(pending)}
          delta="+2"
          hint="needs review"
          icon={<FileText className="size-4" />}
        />
        <Stat
          label="In review"
          value={String(review)}
          hint="assigned to you"
          icon={<ClipboardCheck className="size-4" />}
        />
        <Stat
          label="Total inventory"
          value={String(totalInventory)}
          delta="+3"
          hint="live listings"
          icon={<Users className="size-4" />}
        />
      </div>

      <Panel
        title="Verification queue"
        description="Dealerships waiting on document and identity checks."
        action={
          <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">
            {ADMIN_VERIFICATIONS.length} applications
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead>
              <tr className="border-b border-line">
                <th className={thClass}>Dealer</th>
                <th className={thClass}>Location</th>
                <th className={thClass}>Documents</th>
                <th className={thClass}>Submitted</th>
                <th className={thClass}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ADMIN_VERIFICATIONS.map((row) => (
                <tr key={row.dealer}>
                  <td className={tdClass}>
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper text-[10.5px] font-semibold text-ink/50">
                        {row.dealer
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <p className="text-[12.5px] font-medium text-ink">
                        {row.dealer}
                      </p>
                    </div>
                  </td>
                  <td className={tdClass}>
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-ink/50">
                      <MapPin className="size-3.5 text-ink/30" />
                      {row.location}
                    </span>
                  </td>
                  <td className={tdClass}>
                    <span className="inline-flex items-center gap-1.5 text-[12px] tabular-nums text-ink/50">
                      <FileText className="size-3.5 text-ink/30" />
                      {row.documents} files
                    </span>
                  </td>
                  <td className={cn(tdClass, "whitespace-nowrap")}>
                    {row.submitted}
                  </td>
                  <td className={tdClass}>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
                        verificationTone[row.status] ?? "bg-ink/5 text-ink/60",
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
        <p className="mt-3 text-[11px] text-ink/35">
          Review decisions are not saved in this demo console.
        </p>
      </Panel>

      <Panel
        title="Dealer directory"
        description="Every storefront currently live on the marketplace."
      >
        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead>
              <tr className="border-b border-line">
                <th className={thClass}>Dealer</th>
                <th className={thClass}>Location</th>
                <th className={thClass}>Inventory</th>
                <th className={thClass}>Rating</th>
                <th className={thClass}>Status</th>
                <th className={thClass} />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {DEALERS.map((dealer) => {
                const inventory = getDealerVehicles(dealer.slug);
                const value = inventory.reduce(
                  (sum, vehicle) => sum + vehicle.price,
                  0,
                );
                return (
                  <tr key={dealer.slug}>
                    <td className={tdClass}>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={dealer.name} />
                        <div className="min-w-0">
                          <p className="truncate text-[12.5px] font-medium text-ink">
                            {dealer.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-ink/40">
                            Since {dealer.since}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <p className="text-[12px] text-ink/55">
                        {dealer.location}
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink/35">
                        {formatPrice(value)} listed
                      </p>
                    </td>
                    <td className={cn(tdClass, "tabular-nums")}>
                      {inventory.length}
                    </td>
                    <td className={tdClass}>
                      <span className="inline-flex items-center gap-1 text-[12px] tabular-nums text-ink/60">
                        <Star className="size-3.5 text-signal" />
                        {dealer.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className={tdClass}>
                      <Badge tone={dealer.verified ? "jade" : "neutral"}>
                        {dealer.verified ? "Verified" : "Pending"}
                      </Badge>
                    </td>
                    <td className={cn(tdClass, "text-right")}>
                      <Link
                        href={`/dealerships/${dealer.slug}`}
                        className="inline-flex items-center gap-1 text-[12px] font-medium text-signal"
                      >
                        Storefront
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-ink/35">
          {DEALERS.length} verified dealerships · {totalInventory} live listings.
        </p>
      </Panel>
    </div>
  );
}
