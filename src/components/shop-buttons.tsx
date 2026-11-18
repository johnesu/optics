"use client";

import { ArrowLeftRight, Check, Heart } from "lucide-react";
import { useShop } from "@/components/providers";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  slug,
  tone = "glass",
  className,
}: {
  slug: string;
  tone?: "glass" | "plain";
  className?: string;
}) {
  const { isFavorite, toggleFavorite, ready, notify } = useShop();
  const active = ready && isFavorite(slug);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from saved" : "Save this vehicle"}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!ready) return notify("Loading your garage, try again", "warn");
        toggleFavorite(slug);
      }}
      className={cn(
        "grid size-9 place-items-center rounded-full transition-all duration-300",
        tone === "glass"
          ? "glass text-white ring-1 ring-inset ring-white/25 hover:bg-white/20"
          : "border border-line bg-white text-ink/50 hover:text-signal",
        active && "text-signal",
        className,
      )}
    >
      <Heart
        className={cn("size-[15px] transition-transform", active && "scale-110 fill-signal text-signal")}
        strokeWidth={2}
      />
    </button>
  );
}

export function CompareButton({
  slug,
  tone = "glass",
  withLabel = false,
  className,
}: {
  slug: string;
  tone?: "glass" | "plain";
  withLabel?: boolean;
  className?: string;
}) {
  const { isComparing, toggleCompare, ready, notify } = useShop();
  const active = ready && isComparing(slug);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from comparison" : "Add to comparison"}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!ready) return notify("Loading comparison, try again", "warn");
        toggleCompare(slug);
      }}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 transition-all duration-300",
        withLabel
          ? "h-9 rounded-full px-3 text-[12px] font-medium"
          : "size-9 rounded-full",
        tone === "glass"
          ? "glass text-white ring-1 ring-inset ring-white/25 hover:bg-white/20"
          : "border border-line bg-white text-ink/55 hover:text-ink",
        active && "bg-ink text-white ring-ink hover:bg-ink-3",
        className,
      )}
    >
      {active ? (
        <Check className="size-[15px]" strokeWidth={2.4} />
      ) : (
        <ArrowLeftRight className="size-[15px]" strokeWidth={2} />
      )}
      {withLabel ? (active ? "Comparing" : "Compare") : null}
    </button>
  );
}
