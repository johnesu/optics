import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-45 whitespace-nowrap";

const variants = {
  primary:
    "bg-signal text-white shadow-[0_10px_30px_-12px_rgba(255,77,20,0.65)] hover:bg-[#eb3f08] hover:shadow-[0_14px_38px_-12px_rgba(255,77,20,0.75)] active:scale-[0.98]",
  dark: "bg-ink text-white hover:bg-ink-3 active:scale-[0.98]",
  light: "bg-white text-ink shadow-soft hover:shadow-lift hover:-translate-y-0.5",
  outline:
    "border border-line bg-transparent text-ink hover:border-ink/30 hover:bg-white/60",
  ghost: "text-ink hover:bg-ink/5",
  glass:
    "glass border border-white/15 text-white hover:bg-white/12 hover:border-white/25",
  danger:
    "bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100",
} as const;

const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
  icon: "size-10",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonCls({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button className={buttonCls({ variant, size, className })} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <Link className={buttonCls({ variant, size, className })} {...props} />;
}

const badgeTones = {
  neutral: "bg-paper-2 text-ink/70 ring-1 ring-inset ring-line",
  dark: "bg-ink text-white",
  signal: "bg-signal-soft text-[#b93407] ring-1 ring-inset ring-signal/15",
  volt: "bg-volt-soft text-[#1849b8] ring-1 ring-inset ring-volt/15",
  jade: "bg-jade-soft text-[#076b4b] ring-1 ring-inset ring-jade/15",
  outline: "bg-white/50 text-ink/70 ring-1 ring-inset ring-line",
  glass: "glass text-white ring-1 ring-inset ring-white/20",
} as const;

export function Badge({
  tone = "neutral",
  className,
  children,
  ...props
}: ComponentProps<"span"> & { tone?: keyof typeof badgeTones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.09em]",
        badgeTones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em]",
        tone === "light" ? "text-white/55" : "text-ink/45",
        className,
      )}
    >
      <span className="h-px w-7 bg-signal" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  description,
  action,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <Eyebrow tone={tone} className={cn(align === "center" && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h2
          className={cn(
            "mt-4 text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.02] font-semibold",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 text-[15px] leading-relaxed",
              tone === "light" ? "text-white/60" : "text-ink/55",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export const inputCls =
  "h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink placeholder:text-ink/35 transition-colors focus:border-ink/35 focus:outline-none focus-visible:outline-none";

export const selectCls = cn(inputCls, "appearance-none pr-9 bg-no-repeat");

export const labelCls =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45";

export function Field({
  label,
  hint,
  htmlFor,
  children,
  className,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-ink/40">{hint}</p> : null}
    </div>
  );
}

export function Avatar({
  name,
  className,
  tone = "dark",
}: {
  name: string;
  className?: string;
  tone?: "dark" | "signal" | "jade" | "volt";
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  const tones = {
    dark: "bg-ink text-white",
    signal: "bg-signal-soft text-[#b93407]",
    jade: "bg-jade-soft text-[#076b4b]",
    volt: "bg-volt-soft text-[#1849b8]",
  };
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-bold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {initials || "OP"}
    </span>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-line", className)} />;
}
