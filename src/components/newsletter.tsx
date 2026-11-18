"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Newsletter({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [done, setDone] = useState(false);
  const dark = variant === "dark";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
      className="mt-5"
    >
      {done ? (
        <p
          className={cn(
            "flex items-center gap-2 rounded-xl border px-4 py-3 text-[13px]",
            dark
              ? "border-jade/25 bg-jade/10 text-jade-soft"
              : "border-jade/20 bg-jade-soft text-[#076b4b]",
          )}
        >
          <Check className="size-4" strokeWidth={2.5} />
          You&apos;re on the list. Look out for the Friday edit.
        </p>
      ) : (
        <div
          className={cn(
            "flex items-center gap-1 rounded-xl border p-1",
            dark ? "border-white/12 bg-white/[0.04]" : "border-line bg-white",
          )}
        >
          <input
            type="email"
            required
            name="email"
            placeholder="you@company.com"
            className={cn(
              "h-10 min-w-0 flex-1 bg-transparent px-3 text-[13px] outline-none",
              dark
                ? "text-white placeholder:text-white/30"
                : "text-ink placeholder:text-ink/30",
            )}
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-lg transition-colors",
              dark
                ? "bg-white text-ink hover:bg-signal hover:text-white"
                : "bg-ink text-white hover:bg-signal",
            )}
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}
      <p
        className={cn(
          "mt-2.5 text-[11px] leading-relaxed",
          dark ? "text-white/30" : "text-ink/35",
        )}
      >
        New arrivals, price moves and buying guides. No noise, unsubscribe anytime.
      </p>
    </form>
  );
}
