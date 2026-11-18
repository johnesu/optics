import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Powertrain } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "NGN") {
  const symbol = currency === "NGN" ? "₦" : currency;
  if (price >= 1_000_000) {
    const millions = price / 1_000_000;
    const formatted = millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1);
    return `${symbol}${formatted}m`;
  }
  if (price >= 1_000) {
    return `${symbol}${(price / 1_000).toFixed(0)}k`;
  }
  return `${symbol}${price.toLocaleString()}`;
}

export function formatPriceFull(price: number, currency = "NGN") {
  const symbol = currency === "NGN" ? "₦" : currency;
  return `${symbol}${price.toLocaleString("en-NG")}`;
}

export function formatMileage(km: number) {
  if (km === 0) return "0 km";
  if (km >= 1000) return `${(km / 1000).toLocaleString("en-NG", { maximumFractionDigits: 1 })}k km`;
  return `${km.toLocaleString()} km`;
}

export const POWER_LABEL: Record<Powertrain, string> = {
  BEV: "Electric",
  HEV: "Hybrid",
  PHEV: "Plug-in Hybrid",
  MHEV: "Mild Hybrid",
  ICE_PETROL: "Petrol",
  ICE_DIESEL: "Diesel",
  FCEV: "Hydrogen",
  OTHER: "Other",
};

export const POWER_SHORT: Record<Powertrain, string> = {
  BEV: "EV",
  HEV: "HEV",
  PHEV: "PHEV",
  MHEV: "MHEV",
  ICE_PETROL: "Petrol",
  ICE_DIESEL: "Diesel",
  FCEV: "FCEV",
  OTHER: "Other",
};

export function powerTone(p: Powertrain) {
  switch (p) {
    case "BEV":
    case "FCEV":
      return "bg-volt/10 text-volt ring-volt/20";
    case "HEV":
    case "PHEV":
    case "MHEV":
      return "bg-jade/10 text-jade ring-jade/20";
    default:
      return "bg-ink/5 text-ink/70 ring-ink/10";
  }
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function cnStatus(status: string) {
  const map: Record<string, string> = {
    ACTIVE: "bg-jade-soft text-jade",
    PENDING_REVIEW: "bg-amber-100 text-amber-700",
    DRAFT: "bg-ink/5 text-ink/60",
    RESERVED: "bg-volt-soft text-volt",
    SOLD: "bg-ink text-white",
    REJECTED: "bg-red-100 text-red-700",
    EXPIRED: "bg-ink/5 text-ink/50",
    SUSPENDED: "bg-red-100 text-red-700",
    PAID: "bg-jade-soft text-jade",
    PENDING: "bg-amber-100 text-amber-700",
    FAILED: "bg-red-100 text-red-700",
    REFUNDED: "bg-ink/5 text-ink/60",
  };
  return map[status] ?? "bg-ink/5 text-ink/60";
}

export function statusLabel(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
