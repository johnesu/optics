import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, POWERTRAINS } from "@/lib/data";
import { cn, POWER_SHORT } from "@/lib/utils";

const priceOptions = [
  { value: "", label: "Any price" },
  { value: "10000000", label: "Under ₦10m" },
  { value: "25000000", label: "Under ₦25m" },
  { value: "50000000", label: "Under ₦50m" },
  { value: "100000000", label: "Under ₦100m" },
  { value: "250000000", label: "Under ₦250m" },
];

export function SearchBar({
  variant = "light",
  className,
  defaults,
}: {
  variant?: "light" | "dark";
  className?: string;
  defaults?: { q?: string; category?: string; powertrain?: string; max?: string };
}) {
  const dark = variant === "dark";

  return (
    <form
      action="/vehicles"
      method="get"
      className={cn(
        "grid gap-2 rounded-[18px] p-2 md:grid-cols-[1.7fr_1fr_1fr_1fr_auto]",
        dark
          ? "border border-white/12 bg-white/[0.06] backdrop-blur-xl"
          : "border border-line bg-white shadow-soft",
        className,
      )}
    >
      <label
        className={cn(
          "flex h-12 items-center gap-2.5 rounded-xl px-3.5",
          dark ? "bg-white/[0.06]" : "bg-paper",
        )}
      >
        <Search className={cn("size-4 shrink-0", dark ? "text-white/40" : "text-ink/35")} />
        <span className="sr-only">Search keyword</span>
        <input
          type="search"
          name="q"
          defaultValue={defaults?.q}
          placeholder="Make, model or keyword"
          className={cn(
            "w-full bg-transparent text-sm outline-none",
            dark
              ? "text-white placeholder:text-white/35"
              : "text-ink placeholder:text-ink/35",
          )}
        />
      </label>

      <SelectField dark={dark} name="category" defaultValue={defaults?.category}>
        <option value="">All categories</option>
        {CATEGORIES.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </SelectField>

      <SelectField dark={dark} name="powertrain" defaultValue={defaults?.powertrain}>
        <option value="">Any powertrain</option>
        {POWERTRAINS.map((powertrain) => (
          <option key={powertrain.key} value={powertrain.key}>
            {POWER_SHORT[powertrain.key]}
          </option>
        ))}
      </SelectField>

      <SelectField dark={dark} name="max" defaultValue={defaults?.max}>
        {priceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-signal px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#eb3f08] active:scale-[0.98]"
      >
        <SlidersHorizontal className="size-4 md:hidden" />
        <span className="hidden md:inline">Search</span>
        <span className="md:hidden">Find vehicles</span>
      </button>
    </form>
  );
}

function SelectField({
  dark,
  name,
  defaultValue,
  children,
}: {
  dark: boolean;
  name: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue={defaultValue}
        className={cn(
          "h-12 w-full cursor-pointer appearance-none rounded-xl border border-transparent px-3.5 pr-9 text-sm outline-none transition-colors",
          dark
            ? "bg-white/[0.06] text-white/80 [&>option]:text-ink"
            : "bg-paper text-ink/70",
        )}
      >
        {children}
      </select>
      <ChevronDown
        className={cn(
          "pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2",
          dark ? "text-white/35" : "text-ink/35",
        )}
      />
    </div>
  );
}
