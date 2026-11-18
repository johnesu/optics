"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeftRight,
  ArrowUpRight,
  ChevronRight,
  Heart,
  Menu,
  Search,
  X,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui";
import { useShop } from "@/components/providers";
import { cn } from "@/lib/utils";

const links = [
  { href: "/vehicles", label: "Browse" },
  { href: "/vehicles?powertrain=BEV", label: "Electric" },
  { href: "/vehicles?powertrain=HEV", label: "Hybrid" },
  { href: "/commercial", label: "Commercial" },
  { href: "/dealerships", label: "Dealerships" },
];

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 grid min-w-[17px] place-items-center rounded-full bg-signal px-1 text-[9px] font-bold leading-[17px] text-white">
      {count}
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { favorites, compare, ready } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    if (base === "/vehicles") {
      return pathname === "/vehicles" || pathname.startsWith("/vehicles/");
    }
    return pathname === base;
  };

  return (
    <header className="sticky top-0 z-[80]">
      <div className="hidden bg-ink text-white/55 md:block">
        <div className="container-x flex h-8 items-center justify-between text-[11px] tracking-wide">
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-jade" />
            <span className="text-white/80">2,418 verified listings</span>
            <span className="text-white/25">/</span>
            120+ inspected dealers across 36 states
          </p>
          <div className="flex items-center gap-5">
            <Link href="/dealer/register" className="transition-colors hover:text-white">
              Become a dealer
            </Link>
            <Link href="/sell" className="transition-colors hover:text-white">
              Sell a vehicle
            </Link>
            <span className="flex items-center gap-1.5 text-white/80">
              <span className="text-[10px]">₦</span> NGN
            </span>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-500",
          scrolled
            ? "border-line/80 bg-paper/90 shadow-[0_8px_30px_-24px_rgba(10,11,13,0.5)] backdrop-blur-xl"
            : "border-line/50 bg-paper",
        )}
      >
        <div className="container-x flex h-[70px] items-center justify-between gap-3">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors",
                  isActive(link.href)
                    ? "text-ink"
                    : "text-ink/55 hover:text-ink",
                )}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-signal" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <Link
              href="/vehicles"
              aria-label="Search vehicles"
              className="hidden size-10 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink sm:grid"
            >
              <Search className="size-[18px]" strokeWidth={1.8} />
            </Link>
            <Link
              href="/saved"
              aria-label="Saved vehicles"
              className="relative grid size-10 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <Heart className="size-[18px]" strokeWidth={1.8} />
              {ready && favorites.length > 0 ? <CountBadge count={favorites.length} /> : null}
            </Link>
            <Link
              href="/compare"
              aria-label="Compare vehicles"
              className="relative grid size-10 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <ArrowLeftRight className="size-[18px]" strokeWidth={1.8} />
              {ready && compare.length > 0 ? <CountBadge count={compare.length} /> : null}
            </Link>

            <span className="mx-2 hidden h-5 w-px bg-line sm:block" />

            <Link
              href="/sign-in"
              className="hidden px-2 text-[13px] font-medium text-ink/60 transition-colors hover:text-ink sm:block"
            >
              Sign in
            </Link>
            <ButtonLink href="/sell" size="sm" className="ml-2 hidden md:inline-flex">
              Sell a vehicle
              <ArrowUpRight className="size-4" />
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="ml-1 grid size-10 place-items-center rounded-full text-ink lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] overflow-y-auto bg-ink text-white lg:hidden"
          >
            <div className="container-x flex h-[70px] items-center justify-between">
              <Logo tone="light" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="container-x pb-12 pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">
                Marketplace
              </p>
              <nav className="mt-3 flex flex-col">
                {links.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl tracking-tight"
                    >
                      {link.label}
                      <ChevronRight className="size-5 text-white/30" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 grid gap-3">
                <ButtonLink href="/saved" variant="glass" size="lg">
                  <Heart className="size-4" />
                  Saved vehicles
                  {ready && favorites.length > 0 ? (
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px]">
                      {favorites.length}
                    </span>
                  ) : null}
                </ButtonLink>
                <ButtonLink href="/compare" variant="glass" size="lg">
                  <ArrowLeftRight className="size-4" />
                  Compare
                  {ready && compare.length > 0 ? (
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px]">
                      {compare.length}
                    </span>
                  ) : null}
                </ButtonLink>
                <ButtonLink href="/sell" size="lg">
                  Sell a vehicle
                  <ArrowUpRight className="size-4" />
                </ButtonLink>
                <Link
                  href="/sign-in"
                  className="py-2 text-center text-sm text-white/55"
                >
                  Dealer sign in
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
