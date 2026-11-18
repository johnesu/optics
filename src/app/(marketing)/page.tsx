import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CreditCard,
  FileText,
  Fuel,
  Gauge,
  Leaf,
  MapPin,
  Plug,
  Quote,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import { getDealer, getVehicle, CATEGORIES, DEALERS, POWERTRAINS, VEHICLES } from "@/lib/data";
import { POWER_SHORT, formatPrice } from "@/lib/utils";
import { Photo } from "@/components/photo";
import { Counter, Marquee, Parallax, Reveal, Tilt } from "@/components/motion";
import { SearchBar } from "@/components/search-bar";
import { VehicleCard } from "@/components/vehicle-card";
import { Badge, ButtonLink, Eyebrow, SectionHead } from "@/components/ui";

const makes = [
  "Toyota",
  "Lexus",
  "Mercedes-Benz",
  "BMW",
  "Porsche",
  "Ford",
  "Hyundai",
  "Kia",
  "BYD",
  "Tesla",
  "Range Rover",
  "Volvo",
  "Isuzu",
  "Innoson",
];

const trust = [
  {
    n: "01",
    title: "Verified dealers only",
    copy: "Every seller is vetted for registration, premises and trading history before a single listing goes live.",
    icon: ShieldCheck,
  },
  {
    n: "02",
    title: "Inspection before listing",
    copy: "Condition, mileage and documentation are checked by our team. What you read is what you get.",
    icon: Gauge,
  },
  {
    n: "03",
    title: "Transparent history",
    copy: "Accident, service and ownership records are attached to the listing — not hidden behind a phone call.",
    icon: FileText,
  },
  {
    n: "04",
    title: "Protected payments",
    copy: "Reserve with confidence. Funds are held in escrow and released only when both sides confirm handover.",
    icon: CreditCard,
  },
];

const powerCards = [
  { key: "BEV", icon: Zap },
  { key: "HEV", icon: Leaf },
  { key: "PHEV", icon: Plug },
  { key: "ICE_DIESEL", icon: Fuel },
] as const;

const steps = [
  {
    n: "01",
    title: "Browse verified stock",
    copy: "Filter by budget, body type, powertrain or state. Every listing shows the dealer, the history and the real asking price.",
  },
  {
    n: "02",
    title: "Reserve and inspect",
    copy: "Place a refundable reservation, book an independent inspection or arrange a test drive at the dealership.",
  },
  {
    n: "03",
    title: "Complete with escrow",
    copy: "Pay into escrow, collect the vehicle and documents, then release funds. Title transfer support is included.",
  },
];

export default function HomePage() {
  const hero = getVehicle("2024-bmw-ix-xdrive50")!;
  const heroDealer = getDealer(hero.dealerSlug);
  const featured = VEHICLES.filter((v) => v.featured).slice(0, 6);
  const commercial = getVehicle("2024-mercedes-benz-actros-2645")!;
  const spotlight = DEALERS.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.55]" />
        <div aria-hidden className="absolute -top-44 right-[-10%] size-[560px] rounded-full bg-signal/20 blur-[130px]" />
        <div aria-hidden className="absolute bottom-[-30%] left-[-8%] size-[520px] rounded-full bg-volt/20 blur-[140px]" />
        <div aria-hidden className="grain absolute inset-0 opacity-40" />

        <div className="container-x relative grid gap-16 pt-16 pb-20 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-12 lg:pt-24 lg:pb-28">
          <div>
            <Reveal y={22}>
              <Eyebrow tone="light">Verified marketplace · Nigeria</Eyebrow>
              <h1 className="mt-6 text-[clamp(2.7rem,5.6vw,4.7rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance">
                Every vehicle,
                <br />
                in <span className="font-serif-i font-normal text-signal">plain sight.</span>
              </h1>
            </Reveal>
            <Reveal y={22} delay={0.09}>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60 sm:text-base">
                Cars, SUVs, trucks and machinery from verified dealers across Nigeria — with
                inspected inventory, honest mileage and pricing that holds up in daylight.
              </p>
            </Reveal>

            <Reveal y={22} delay={0.17}>
              <div className="mt-9 max-w-2xl">
                <SearchBar variant="dark" />
              </div>
            </Reveal>

            <Reveal
              y={22}
              delay={0.25}
              className="mt-10 grid max-w-xl grid-cols-3 gap-6"
            >
              {[
                { to: 12400, suffix: "+", label: "Live listings" },
                { to: 128, suffix: "", label: "Verified dealers" },
                { to: 36, suffix: "", label: "States covered" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    <Counter to={stat.to} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal
            y={20}
            delay={0.12}
            className="relative mx-auto w-full max-w-[540px] lg:mx-0"
          >
            <div aria-hidden className="absolute -inset-8 rounded-[40px] bg-[radial-gradient(60%_60%_at_60%_30%,rgba(255,77,20,0.18),transparent_70%)] blur-2xl" />

            <Tilt max={7} scale={1.01} className="relative">
              <div className="overflow-hidden rounded-[26px] border border-white/10 bg-ink-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]">
                <div className="relative aspect-[4/3.1]">
                  <Photo
                    src={hero.images[0]}
                    alt={`${hero.title} at ${heroDealer?.name ?? "dealer"}`}
                    priority
                    sizes="(max-width: 1024px) 92vw, 540px"
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-[1400ms] hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.05)_20%,rgba(10,11,13,0.35)_60%,rgba(10,11,13,0.9)_100%)]" />

                  <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                    <Badge tone="signal">Featured this week</Badge>
                    <Badge tone="glass">{hero.year}</Badge>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
                        {heroDealer?.name ?? hero.dealerSlug}
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold tracking-tight">
                        {hero.title}
                      </p>
                      <p className="mt-1 text-sm text-white/65">{formatPrice(hero.price)}</p>
                    </div>
                    <Link
                      href={`/vehicles/${hero.slug}`}
                      aria-label={`View ${hero.title}`}
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink transition hover:bg-signal hover:text-white"
                    >
                      <ArrowUpRight className="size-5" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/[0.03]">
                  {[
                    { label: "Range", value: hero.rangeKm ? `${hero.rangeKm} km` : "—" },
                    { label: "Battery", value: hero.batteryKwh ? `${hero.batteryKwh} kWh` : "—" },
                    { label: "Drivetrain", value: hero.drivetrain },
                  ].map((spec) => (
                    <div key={spec.label} className="px-3.5 py-3.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                        {spec.label}
                      </p>
                      <p className="mt-1 truncate text-[13px] font-medium text-white/85">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Tilt>

            <div className="absolute -left-4 top-[27%] hidden items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-md md:flex">
              <span className="grid size-6 place-items-center rounded-full bg-jade text-white">
                <ShieldCheck className="size-3.5" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/80">
                111-point inspection
              </span>
            </div>

            <div className="absolute -right-3 bottom-[24%] hidden items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-md md:flex">
              <span className="grid size-6 place-items-center rounded-full bg-signal text-white">
                <Zap className="size-3.5" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/80">
                {hero.rangeKm} km real range
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- marquee */}
      <section className="border-b border-line bg-paper py-6">
        <Marquee slow>
          {makes.map((make) => (
            <span key={make} className="flex items-center">
              <span className="px-6 font-display text-[13px] font-semibold uppercase tracking-[0.22em] text-ink/30">
                {make}
              </span>
              <span className="size-1 rounded-full bg-signal/50" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* ---------------------------------------------------------- categories */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="Browse the lot"
              title={
                <>
                  Ten categories.
                  <br />
                  <span className="font-serif-i font-normal text-ink/55">One standard.</span>
                </>
              }
              description="Private cars to prime movers — every category is stocked by dealers we have visited and verified ourselves."
              action={
                <ButtonLink href="/vehicles" variant="outline" size="md">
                  All inventory
                  <ArrowRight className="size-4" />
                </ButtonLink>
              }
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((category, i) => (
              <Reveal key={category.slug} delay={(i % 5) * 0.05}>
                <Link
                  href={`/vehicles?category=${category.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink-2"
                >
                  <Photo
                    src={category.image}
                    alt={category.name}
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0)_30%,rgba(10,11,13,0.55)_65%,rgba(10,11,13,0.92)_100%)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                      {category.count} listings
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <h3 className="font-display text-[17px] leading-tight font-semibold text-white">
                        {category.name}
                      </h3>
                      <ArrowUpRight className="size-4 shrink-0 text-white/50 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ featured */}
      <section className="border-y border-line bg-paper-2/60 py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="Fresh arrivals"
              title="Featured inventory"
              description="Hand-picked listings from dealers with the strongest inspection records this month."
              action={
                <ButtonLink href="/vehicles" variant="dark" size="md">
                  View all vehicles
                  <ArrowRight className="size-4" />
                </ButtonLink>
              }
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((vehicle, i) => (
              <Reveal key={vehicle.id} delay={(i % 3) * 0.07} y={30}>
                <VehicleCard vehicle={vehicle} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- powertrains */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[32px] bg-ink p-7 text-white sm:p-10 lg:p-14">
              <div aria-hidden className="hero-grid absolute inset-0 opacity-40" />
              <div aria-hidden className="grain absolute inset-0 opacity-40" />
              <div aria-hidden className="absolute -top-24 right-10 size-72 rounded-full bg-volt/25 blur-[110px]" />

              <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <Eyebrow tone="light">Powertrains</Eyebrow>
                  <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
                    Pick your
                    <br />
                    <span className="font-serif-i font-normal text-signal">energy.</span>
                  </h2>
                  <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">
                    Petrol, diesel, hybrid or fully electric — compare running costs, range and
                    charging before you commit, not after.
                  </p>
                  <ButtonLink href="/compare" variant="glass" size="md" className="mt-7">
                    Compare powertrains
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {powerCards.map(({ key, icon: Icon }) => {
                    const meta = POWERTRAINS.find((p) => p.key === key);
                    if (!meta) return null;
                    return (
                      <Link
                        key={key}
                        href={`/vehicles?powertrain=${key}`}
                        className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08]"
                      >
                        <div className="flex items-start justify-between">
                          <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-signal">
                            <Icon className="size-5" strokeWidth={1.75} />
                          </span>
                          <ArrowUpRight className="size-4 text-white/30 transition group-hover:text-signal" />
                        </div>
                        <p className="mt-5 font-display text-[15px] font-semibold">{meta.label}</p>
                        <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-white/45">
                          {meta.description}
                        </p>
                        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                          {POWER_SHORT[key]}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- trust */}
      <section className="border-y border-line bg-paper py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>Why buyers trust us</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.85rem,4vw,3.1rem)] leading-[1.03] font-semibold tracking-[-0.035em]">
                A marketplace
                <br />
                that shows
                <br />
                <span className="font-serif-i font-normal text-ink/55">its work.</span>
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink/55">
                The Nigerian used-car market runs on trust and phone calls. We replaced that with
                process you can actually see.
              </p>
              <Link
                href="/about"
                className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                How verification works
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <div>
            {trust.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.05}>
                <div className="group grid grid-cols-[auto_1fr] gap-5 border-t border-line py-6 last:border-b sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <span className="font-display text-xs font-semibold tracking-[0.1em] text-ink/30">
                    {item.n}
                  </span>
                  <div className="flex items-start gap-4">
                    <span className="hidden size-10 shrink-0 place-items-center rounded-xl bg-ink text-white transition group-hover:bg-signal sm:grid">
                      <item.icon className="size-4.5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink/50">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="hidden size-4 text-ink/20 transition group-hover:text-signal sm:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ dealers */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="Verified dealers"
              title="People, not pop-up listings."
              description="Long-standing dealerships with physical premises, warranty support and a record we can check."
              action={
                <ButtonLink href="/dealerships" variant="outline" size="md">
                  Dealer directory
                  <ArrowRight className="size-4" />
                </ButtonLink>
              }
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {spotlight.map((dealer, i) => (
              <Reveal key={dealer.slug} delay={i * 0.06}>
                <Link
                  href={`/dealerships/${dealer.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative h-32">
                    <Photo
                      src={dealer.cover}
                      alt={dealer.name}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="absolute inset-0"
                      imgClassName="transition-transform duration-[900ms] group-hover:scale-105"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    <div className="absolute inset-x-4 bottom-3 flex items-center gap-2">
                      <span className="grid size-8 place-items-center rounded-full bg-white font-display text-[11px] font-bold text-ink">
                        {dealer.name
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/70">
                        {dealer.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {dealer.name}
                      </h3>
                      {dealer.verified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-jade">
                          <ShieldCheck className="size-3.5" /> Verified
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink/50">
                      {dealer.tagline}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {dealer.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} tone="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-[12px] text-ink/45">
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="size-3.5 fill-signal text-signal" />
                        <span className="font-semibold text-ink">{dealer.rating.toFixed(1)}</span>
                        <span>({dealer.reviewCount})</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="size-3.5" />
                        {dealer.inventoryCount} in stock
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- commercial */}
      <section className="relative isolate h-[560px] overflow-hidden bg-ink">
        <Parallax distance={80} className="absolute inset-0 scale-[1.16]">
          <Photo
            src={commercial.images[0]}
            alt={commercial.title}
            sizes="100vw"
            className="absolute inset-0"
          />
        </Parallax>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.55)_0%,rgba(10,11,13,0.35)_35%,rgba(10,11,13,0.95)_100%)]" />
        <div aria-hidden className="grain absolute inset-0 opacity-30" />

        <div className="container-x absolute inset-x-0 bottom-0 pb-14 text-white lg:pb-16">
          <Reveal>
            <Eyebrow tone="light">Commercial &amp; fleet</Eyebrow>
            <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.01] font-semibold tracking-[-0.035em]">
                  Built for work.
                  <br />
                  <span className="font-serif-i font-normal text-white/60">Priced for work.</span>
                </h2>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
                  Tippers, prime movers, buses and tractors from commercial specialists — with
                  service records, fleet finance and nationwide delivery.
                </p>
              </div>

              <div className="flex flex-wrap items-end gap-8">
                {[
                  { value: "400+", label: "Fleet-ready units" },
                  { value: "90+", label: "Service points" },
                  { value: "36", label: "States served" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl font-semibold tracking-tight">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/commercial" variant="primary" size="md">
                Shop commercial
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="glass" size="md">
                Fleet enquiry
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- how it works */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="How it works"
              title="Three steps. No surprises."
              description="From first search to keys in hand, every stage happens on the platform with a record you can revisit."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col bg-paper p-7 lg:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[13px] font-semibold tracking-[0.1em] text-signal">
                      {step.n}
                    </span>
                    <span className="size-2 rounded-full bg-signal/25" />
                  </div>
                  <h3 className="mt-8 font-display text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/50">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- testimonial */}
      <section className="border-y border-line bg-paper-2/60 py-20 lg:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-signal shadow-soft ring-1 ring-line">
              <Quote className="size-5" />
            </span>
            <blockquote className="mt-8 font-display text-[clamp(1.35rem,2.8vw,2.1rem)] leading-[1.32] font-medium tracking-[-0.02em] text-ink/85">
              &ldquo;The first place I&apos;ve bought a vehicle where the price on the screen was
              the price at the dealership — and the inspection report was{" "}
              <span className="font-serif-i text-ink">actually accurate.</span>&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex text-signal">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-signal" />
                ))}
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink/45">
                Ngozi A. · Fleet buyer, Lagos
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- cta */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <div className="relative isolate grid overflow-hidden rounded-[32px] bg-ink text-white lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative z-10 p-8 sm:p-12 lg:p-14">
                <Eyebrow tone="light">For dealers</Eyebrow>
                <h2 className="mt-5 max-w-md text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.04] font-semibold tracking-[-0.035em]">
                  Your inventory deserves
                  <span className="font-serif-i font-normal text-signal"> a real audience.</span>
                </h2>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
                  Join verified dealers reaching serious buyers across the country. List, manage
                  enquiries and close — with tools built for how you actually sell.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/dealer/register" variant="primary" size="lg">
                    List your inventory
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                  <ButtonLink href="/dealer" variant="glass" size="lg">
                    Dealer dashboard
                  </ButtonLink>
                </div>
                <p className="mt-6 flex items-center gap-2 text-[12px] text-white/35">
                  <MapPin className="size-3.5" />
                  Lagos · Abuja · Port Harcourt · Kano
                </p>
              </div>

              <div className="relative min-h-[260px] lg:min-h-0">
                <Photo
                  src={getVehicle("2024-porsche-911-carrera-s")!.images[0]}
                  alt="Dealer showroom vehicle"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="absolute inset-0"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,11,13,0.95)_0%,rgba(10,11,13,0.25)_55%,rgba(10,11,13,0.15)_100%)]"
                />
                <div aria-hidden className="grain absolute inset-0 opacity-30" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
