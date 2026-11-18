"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { VehicleCard } from "@/components/vehicle-card";
import { CATEGORIES, POWERTRAINS, VEHICLES } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filters = {
  q: string;
  category: string;
  powertrain: string;
  max: string;
};

const sorts = [
  { key: "featured", label: "Featured first" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "year-desc", label: "Newest year" },
] as const;

const priceOptions = [
  { value: "", label: "Any price" },
  { value: "10000000", label: "Under ₦10m" },
  { value: "25000000", label: "Under ₦25m" },
  { value: "50000000", label: "Under ₦50m" },
  { value: "100000000", label: "Under ₦100m" },
  { value: "250000000", label: "Under ₦250m" },
];

export function VehicleBrowser({ initial }: { initial: Filters }) {
  const [q, setQ] = useState(initial.q);
  const [category, setCategory] = useState(initial.category);
  const [powertrain, setPowertrain] = useState(initial.powertrain);
  const [max, setMax] = useState(initial.max);
  const [sort, setSort] = useState<(typeof sorts)[number]["key"]>("featured");

  function sync(next: Partial<Filters>) {
    const params = new URLSearchParams();
    const merged = { q, category, powertrain, max, ...next };
    if (merged.q) params.set("q", merged.q);
    if (merged.category) params.set("category", merged.category);
    if (merged.powertrain) params.set("powertrain", merged.powertrain);
    if (merged.max) params.set("max", merged.max);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/vehicles?${qs}` : "/vehicles");
  }

  function reset() {
    setQ("");
    setCategory("");
    setPowertrain("");
    setMax("");
    sync({ q: "", category: "", powertrain: "", max: "" });
  }

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const ceiling = Number(max || 0);

    const list = VEHICLES.filter((v) => {
      if (needle) {
        const haystack = [v.title, v.make, v.model, v.trim, v.location]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      if (category && v.category !== category) return false;
      if (powertrain && v.powertrain !== powertrain) return false;
      if (ceiling && v.price > ceiling) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "year-desc") return b.year - a.year;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [q, category, powertrain, max, sort]);

  const active = Boolean(q || category || powertrain || max);

  return (
    <div className="grid gap-10 lg:grid-cols-[268px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[22px] border border-line bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <SlidersHorizontal className="size-4" strokeWidth={1.9} />
              Refine
            </p>
            {active ? (
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-signal transition-colors hover:text-[#c93a07]"
              >
                <X className="size-3" strokeWidth={2.4} />
                Clear
              </button>
            ) : null}
          </div>

          <label className="mt-5 flex h-11 items-center gap-2 rounded-xl border border-line bg-paper px-3">
            <Search className="size-4 shrink-0 text-ink/35" strokeWidth={2} />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                sync({ q: e.target.value });
              }}
              placeholder="Make, model, keyword"
              aria-label="Search vehicles"
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
            />
          </label>

          <FilterGroup label="Category">
            <FilterChip
              active={!category}
              onClick={() => {
                setCategory("");
                sync({ category: "" });
              }}
            >
              All categories
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c.slug}
                active={category === c.slug}
                onClick={() => {
                  const next = category === c.slug ? "" : c.slug;
                  setCategory(next);
                  sync({ category: next });
                }}
              >
                {c.name}
                <span className="text-ink/30">{c.count}</span>
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup label="Powertrain">
            <FilterChip
              active={!powertrain}
              onClick={() => {
                setPowertrain("");
                sync({ powertrain: "" });
              }}
            >
              Any drivetrain
            </FilterChip>
            {POWERTRAINS.map((p) => (
              <FilterChip
                key={p.key}
                active={powertrain === p.key}
                onClick={() => {
                  const next = powertrain === p.key ? "" : p.key;
                  setPowertrain(next);
                  sync({ powertrain: next });
                }}
              >
                {p.label}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup label="Budget">
            {priceOptions.map((p) => (
              <FilterChip
                key={p.value}
                active={max === p.value}
                onClick={() => {
                  setMax(p.value);
                  sync({ max: p.value });
                }}
              >
                {p.label}
              </FilterChip>
            ))}
          </FilterGroup>
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-sm text-ink/55">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "vehicle" : "vehicles"}
            {category
              ? ` in ${CATEGORIES.find((c) => c.slug === category)?.name ?? category}`
              : ""}
          </p>
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/40">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="h-9 rounded-lg border border-line bg-white px-2.5 text-[12px] font-medium normal-case tracking-normal text-ink outline-none"
            >
              {sorts.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {results.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[22px] border border-dashed border-line bg-paper px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              Nothing matches those filters yet.
            </p>
            <p className="mt-2 text-sm text-ink/50">
              Widen the budget or clear a filter to see the full inventory.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-3"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 border-t border-line pt-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all duration-200",
        active
          ? "border-ink bg-ink text-white"
          : "border-line bg-white text-ink/60 hover:border-ink/25 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
