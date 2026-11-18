export type Powertrain =
  | "BEV"
  | "HEV"
  | "PHEV"
  | "MHEV"
  | "ICE_PETROL"
  | "ICE_DIESEL"
  | "FCEV"
  | "OTHER";

export type Condition = "NEW" | "USED" | "REFURBISHED";

export type ListingStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "ACTIVE"
  | "RESERVED"
  | "SOLD"
  | "REJECTED"
  | "EXPIRED"
  | "SUSPENDED";

export type CategorySlug =
  | "cars"
  | "suvs"
  | "pickups"
  | "heavy-trucks"
  | "buses"
  | "vans"
  | "motorcycles"
  | "agriculture"
  | "construction"
  | "trailers";

export interface Vehicle {
  id: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  currency: "NGN";
  mileage: number;
  condition: Condition;
  category: CategorySlug;
  powertrain: Powertrain;
  transmission: string;
  drivetrain: string;
  color: string;
  location: string;
  dealerSlug: string;
  images: string[];
  featured?: boolean;
  status: ListingStatus;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  rangeKm?: number;
  batteryKwh?: number;
  createdAt: string;
}

export interface Dealer {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  state: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  inventoryCount: number;
  since: number;
  specialties: string[];
  cover: string;
  accent: string;
  about: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  count: number;
  blurb: string;
  image: string;
}

export interface PowertrainMeta {
  key: Powertrain;
  label: string;
  short: string;
  description: string;
  tone: "signal" | "volt" | "jade" | "neutral";
}
