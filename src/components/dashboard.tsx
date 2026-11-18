import { cn, cnStatus, statusLabel } from "@/lib/utils";
import type { ReactNode } from "react";

export function Panel({
  title,
  description,
  action,
  className,
  children,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-[22px] border border-line bg-white p-5 shadow-[0_1px_0_rgba(10,11,13,0.03)]",
        className,
      )}
    >
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && (
              <h2 className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink/50">
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({
  label,
  value,
  delta,
  hint,
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
  icon?: ReactNode;
}) {
  const positive = delta?.startsWith("+");
  return (
    <div className="rounded-[22px] border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/35">
          {label}
        </p>
        {icon && (
          <span className="grid size-8 place-items-center rounded-full bg-paper text-ink/40">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-[26px] font-semibold tracking-[-0.03em] text-ink">
        {value}
      </p>
      <div className="mt-1 flex items-center gap-2">
        {delta && (
          <span
            className={cn(
              "text-[12px] font-medium",
              positive ? "text-jade" : "text-signal",
            )}
          >
            {delta}
          </span>
        )}
        {hint && <span className="text-[12px] text-ink/40">{hint}</span>}
      </div>
    </div>
  );
}

const TONES = {
  signal: { line: "#FF4D14", fill: "rgba(255,77,20,0.12)" },
  volt: { line: "#2D6BFF", fill: "rgba(45,107,255,0.12)" },
  jade: { line: "#0F9D6E", fill: "rgba(15,157,110,0.12)" },
  ink: { line: "#0A0B0D", fill: "rgba(10,11,13,0.08)" },
} as const;

export function Spark({
  data,
  tone = "signal",
  className,
  label,
}: {
  data: number[];
  tone?: keyof typeof TONES;
  className?: string;
  label?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const step = 100 / (data.length - 1);
  const points = data.map((value, i) => {
    const x = i * step;
    const y = 34 - ((value - min) / span) * 30;
    return [x, y] as const;
  });
  const line = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `0,36 ${line} 100,36`;
  const color = TONES[tone];

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 100 36"
        preserveAspectRatio="none"
        className="h-full w-full"
        role="img"
        aria-label={label ?? "Trend"}
      >
        <polygon points={area} fill={color.fill} />
        <polyline
          points={line}
          fill="none"
          stroke={color.line}
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export function Bars({
  data,
  labels,
  tone = "signal",
  className,
}: {
  data: number[];
  labels: string[];
  tone?: "signal" | "volt" | "jade" | "ink";
  className?: string;
}) {
  const max = Math.max(...data);
  const color = {
    signal: "bg-signal",
    volt: "bg-volt",
    jade: "bg-jade",
    ink: "bg-ink",
  }[tone];

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex flex-1 items-end gap-[6px]">
        {data.map((value, i) => (
          <div key={i} className="group flex h-full flex-1 items-end">
            <div
              className={cn(
                "w-full rounded-t-[3px] opacity-80 transition-opacity duration-300 group-hover:opacity-100",
                color,
              )}
              style={{ height: `${Math.max((value / max) * 100, 4)}%` }}
            />
          </div>
        ))}
      </div>
      {labels.length > 0 && (
        <div className="mt-2 flex gap-[6px]">
          {labels.map((label, i) => (
            <span
              key={i}
              className="flex-1 text-center text-[9px] font-medium uppercase tracking-[0.08em] text-ink/30"
            >
              {i % 2 === 0 ? label : ""}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function StatusPill({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
        cnStatus(status),
        className,
      )}
    >
      {statusLabel(status)}
    </span>
  );
}

export function ProgressRow({
  label,
  value,
  suffix,
  tone = "signal",
}: {
  label: string;
  value: number;
  suffix?: string;
  tone?: "signal" | "volt" | "jade";
}) {
  const color = {
    signal: "bg-signal",
    volt: "bg-volt",
    jade: "bg-jade",
  }[tone];

  return (
    <div>
      <div className="flex items-center justify-between text-[12.5px]">
        <span className="text-ink/60">{label}</span>
        <span className="font-medium text-ink">
          {value}
          {suffix}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/5">
        <div
          className={cn("h-full rounded-full", color)}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function PageTitle({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink/50">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex flex-wrap gap-2">{action}</div>}
    </div>
  );
}

export const tableClass = "w-full text-left text-[13px]";
export const thClass =
  "whitespace-nowrap px-3 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink/35";
export const tdClass = "px-3 py-3.5 align-middle text-ink/70";
