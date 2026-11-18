import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Clock,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { Badge, buttonCls } from "@/components/ui";
import { LeadReply } from "@/components/lead-reply";
import { Panel, PageTitle, Stat } from "@/components/dashboard";
import { Photo } from "@/components/photo";
import { ENQUIRIES, getVehicle } from "@/lib/data";
import { cn, formatPrice, statusLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Leads",
};

type Search = Promise<{ id?: string }>;

const leadTone: Record<string, string> = {
  NEW: "bg-signal-soft text-[#b93407]",
  REPLIED: "bg-jade-soft text-jade",
  CLOSED: "bg-ink/5 text-ink/55",
};

export default async function DealerLeadsPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { id } = await searchParams;
  const leads = ENQUIRIES;
  const selected = leads.find((lead) => lead.id === id) ?? leads[0];
  const vehicle = getVehicle(selected.vehicleSlug);

  const newCount = leads.filter((lead) => lead.status === "NEW").length;
  const replied = leads.filter((lead) => lead.status === "REPLIED").length;
  const closed = leads.filter((lead) => lead.status === "CLOSED").length;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Leads"
        description="Every enquiry across your live inventory, in one inbox."
        action={
          <Badge tone="signal">{newCount} need a reply</Badge>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="New enquiries"
          value={String(newCount)}
          delta="+3"
          hint="since yesterday"
          icon={<MessageSquare className="size-4" />}
        />
        <Stat
          label="Awaiting reply"
          value={String(newCount)}
          hint="SLA target: 1 hour"
          icon={<Clock className="size-4" />}
        />
        <Stat
          label="Replied"
          value={String(replied)}
          delta="+12%"
          hint="7 day response rate"
          icon={<Send className="size-4" />}
        />
        <Stat
          label="Closed"
          value={String(closed)}
          hint="deals handed to sales"
          icon={<BadgeCheck className="size-4" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[330px_1fr]">
        <Panel title="Inbox" description={`${leads.length} conversations`}>
          <ul className="-mx-1 space-y-1">
            {leads.map((lead) => {
              const active = lead.id === selected.id;
              const leadVehicle = getVehicle(lead.vehicleSlug);
              return (
                <li key={lead.id}>
                  <Link
                    href={`/dealer/leads?id=${lead.id}`}
                    className={cn(
                      "flex gap-3 rounded-xl px-3 py-3 transition-colors",
                      active ? "bg-paper" : "hover:bg-paper/70",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full text-[10.5px] font-semibold",
                        active
                          ? "bg-ink text-white"
                          : "bg-paper-2 text-ink/50",
                      )}
                    >
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
                        {lead.unread > 0 && (
                          <span className="ml-auto shrink-0 rounded-full bg-signal px-1.5 py-0.5 text-[9.5px] font-semibold text-white">
                            {lead.unread}
                          </span>
                        )}
                        {lead.unread === 0 && (
                          <span className="ml-auto shrink-0 text-[10px] text-ink/35">
                            {lead.time}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-[11.5px] text-ink/45">
                        {leadVehicle?.title ?? "Vehicle removed"}
                      </p>
                      <span
                        className={cn(
                          "mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em]",
                          leadTone[lead.status] ?? leadTone.CLOSED,
                        )}
                      >
                        {statusLabel(lead.status)}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Panel>

        <div className="space-y-4">
          <Panel
            title={selected.name}
            description={`${selected.id} · ${selected.time}`}
            action={
              <a
                href={`mailto:${selected.email}`}
                className={buttonCls({ variant: "outline", size: "sm" })}
              >
                <Mail className="size-3.5" />
                Email
              </a>
            }
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.09em]",
                  leadTone[selected.status] ?? leadTone.CLOSED,
                )}
              >
                {statusLabel(selected.status)}
              </span>
              <span className="text-[11.5px] text-ink/40">{selected.email}</span>
            </div>

            <blockquote className="mt-4 rounded-xl border-l-2 border-signal bg-paper p-4 text-[13px] leading-relaxed text-ink/70">
              {selected.message}
            </blockquote>

            {vehicle && (
              <Link
                href={`/vehicles/${vehicle.slug}`}
                className="group mt-3 flex items-center gap-3 rounded-xl border border-line p-2.5 transition-colors hover:border-ink/20"
              >
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-paper-2">
                  <Photo
                    src={vehicle.images[0]}
                    alt={vehicle.title}
                    className="absolute inset-0"
                    imgClassName="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium text-ink">
                    {vehicle.title}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-ink/45">
                    {vehicle.year} · {formatPrice(vehicle.price)}
                  </p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-ink/30 transition-colors group-hover:text-ink" />
              </Link>
            )}

            <div className="mt-5 border-t border-line pt-4">
              <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                Reply
              </p>
              <LeadReply name={selected.name} />
            </div>
          </Panel>

          <Panel title="Deal notes">
            <ul className="space-y-3 text-[12.5px] leading-relaxed text-ink/60">
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal" />
                Enquiry received from the vehicle detail page.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                Buyer viewed the listing 4 times in the last 48 hours.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-jade" />
                Inspection slot available at your Lekki showroom.
              </li>
            </ul>
            <p className="mt-4 text-[11px] text-ink/35">
              Demo conversation · no messages are actually sent.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
