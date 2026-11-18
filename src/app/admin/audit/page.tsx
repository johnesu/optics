import type { Metadata } from "next";
import {
  Activity,
  ClipboardCheck,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import {
  Panel,
  PageTitle,
  ProgressRow,
  Stat,
} from "@/components/dashboard";
import { Badge, ButtonLink } from "@/components/ui";
import { AUDIT_EVENTS } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Audit log",
};

const levelTone: Record<string, string> = {
  info: "bg-jade",
  warn: "bg-signal",
  danger: "bg-red-500",
};

const levelBadge: Record<string, string> = {
  info: "bg-jade-soft text-jade",
  warn: "bg-signal-soft text-signal",
  danger: "bg-red-100 text-red-700",
};

export default function AdminAuditPage() {
  const info = AUDIT_EVENTS.filter((event) => event.level === "info").length;
  const warn = AUDIT_EVENTS.filter((event) => event.level === "warn").length;
  const danger = AUDIT_EVENTS.filter(
    (event) => event.level === "danger",
  ).length;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Audit log"
        description="Every operator, dealer and system event, captured in order."
        action={
          <ButtonLink href="/admin/orders" variant="outline" size="sm">
            View orders
          </ButtonLink>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Events logged"
          value={String(AUDIT_EVENTS.length)}
          delta="+6"
          hint="today"
          icon={<Activity className="size-4" />}
        />
        <Stat
          label="Informational"
          value={String(info)}
          hint="routine activity"
          icon={<ShieldCheck className="size-4" />}
        />
        <Stat
          label="Warnings"
          value={String(warn)}
          hint="needs a look"
          icon={<ShieldAlert className="size-4" />}
        />
        <Stat
          label="Critical"
          value={String(danger)}
          hint="resolved this week"
          icon={<ClipboardCheck className="size-4" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Panel
          title="Activity trail"
          description="Newest events first, across all accounts."
          action={
            <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/45">
              Live
            </span>
          }
        >
          <ol className="relative space-y-1">
            <span
              aria-hidden
              className="absolute left-[5px] top-2 bottom-2 w-px bg-line"
            />
            {AUDIT_EVENTS.map((event, index) => (
              <li
                key={`${event.action}-${index}`}
                className="relative flex gap-3.5 rounded-xl px-1 py-2.5"
              >
                <span
                  className={cn(
                    "relative z-10 mt-1.5 size-[11px] shrink-0 rounded-full ring-4 ring-white",
                    levelTone[event.level] ?? "bg-ink/25",
                  )}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[12.5px] font-medium text-ink">
                      {event.action}
                    </p>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.1em]",
                        levelBadge[event.level] ?? "bg-ink/5 text-ink/60",
                      )}
                    >
                      {event.level}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[12px] text-ink/50">
                    {event.target}
                  </p>
                  <p className="mt-1 text-[11px] text-ink/35">
                    {event.actor} · {event.time}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-3 border-t border-line pt-4 text-[11px] text-ink/35">
            Demo operations console · events are illustrative and not persisted.
          </p>
        </Panel>

        <div className="space-y-4">
          <Panel title="Event mix" description="Share by severity.">
            <div className="space-y-4">
              <ProgressRow
                label="Informational"
                value={Math.round((info / AUDIT_EVENTS.length) * 100)}
                suffix="%"
                tone="jade"
              />
              <ProgressRow
                label="Warnings"
                value={Math.round((warn / AUDIT_EVENTS.length) * 100)}
                suffix="%"
                tone="signal"
              />
              <ProgressRow
                label="Critical"
                value={Math.round((danger / AUDIT_EVENTS.length) * 100)}
                suffix="%"
                tone="signal"
              />
            </div>
          </Panel>

          <Panel
            title="Retention"
            description="How long records are kept on this console."
          >
            <div className="space-y-3 text-[12.5px]">
              <div className="flex items-center justify-between">
                <span className="text-ink/50">Operational events</span>
                <span className="font-medium text-ink">24 months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink/50">Dealer decisions</span>
                <span className="font-medium text-ink">7 years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink/50">Payment records</span>
                <span className="font-medium text-ink">7 years</span>
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-line pt-3">
                <span className="font-medium text-ink">Export status</span>
                <Badge tone="outline">On request</Badge>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
