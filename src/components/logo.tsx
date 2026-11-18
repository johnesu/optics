import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "dark",
  className,
  compact = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="OPTICS home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "relative grid size-9 place-items-center overflow-hidden rounded-[11px] transition-transform duration-500 group-hover:rotate-[8deg]",
          tone === "light" ? "bg-white" : "bg-ink",
        )}
      >
        <svg viewBox="0 0 36 36" className="size-9" aria-hidden>
          <circle
            cx="18"
            cy="18"
            r="8.4"
            fill="none"
            stroke={tone === "light" ? "#0a0b0d" : "#ffffff"}
            strokeWidth="2.4"
          />
          <path
            d="M18 9.6v4.2M25.3 22.2l-3.6-2.1M10.7 22.2l3.6-2.1"
            stroke={tone === "light" ? "#0a0b0d" : "#ffffff"}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="18" cy="18" r="2.1" fill="#ff4d14" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[19px] font-semibold tracking-[-0.045em]",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          OPTICS
          <span className="text-signal">.</span>
        </span>
        {compact ? null : (
          <span
            className={cn(
              "mt-1 text-[8px] font-semibold uppercase tracking-[0.34em]",
              tone === "light" ? "text-white/40" : "text-ink/35",
            )}
          >
            Vehicle Market
          </span>
        )}
      </span>
    </Link>
  );
}
