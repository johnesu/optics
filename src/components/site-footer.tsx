import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import { Newsletter } from "@/components/newsletter";

const columns = [
  {
    title: "Marketplace",
    links: [
      { href: "/vehicles", label: "Browse all vehicles" },
      { href: "/vehicles?powertrain=BEV", label: "Electric vehicles" },
      { href: "/vehicles?powertrain=HEV", label: "Hybrids" },
      { href: "/commercial", label: "Commercial & fleet" },
      { href: "/compare", label: "Compare vehicles" },
    ],
  },
  {
    title: "For dealers",
    links: [
      { href: "/dealer/register", label: "List your inventory" },
      { href: "/dealer", label: "Dealer dashboard" },
      { href: "/dealerships", label: "Dealer directory" },
      { href: "/sell", label: "Sell a vehicle" },
      { href: "/sign-in", label: "Dealer sign in" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About OPTICS" },
      { href: "/journal", label: "The Journal" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

const socials = [
  { label: "IG", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "IN", href: "https://linkedin.com" },
];

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <div className="grain absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)]"
        aria-hidden
      />

      <div className="container-x relative pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.6fr]">
          <div className="max-w-md">
            <Logo tone="light" />
            <p className="mt-7 font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.1] font-medium tracking-[-0.03em]">
              The clearer way to
              <span className="font-serif-i font-normal italic text-signal"> buy, sell</span>
              <br />
              and move.
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/45">
              A dealer-only marketplace for Nigeria and West Africa. Verified
              inventory, transparent pricing, and financing that makes sense.
            </p>
            <Newsletter />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:justify-items-end">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-[13px] text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px] text-white/35">
            <span>© 2026 OPTICS Technologies Ltd.</span>
            <span className="hidden size-1 rounded-full bg-white/20 sm:block" />
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              Lagos · Abuja · Port Harcourt
            </span>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="grid size-9 place-items-center rounded-full border border-white/12 text-[10px] font-semibold tracking-wide text-white/55 transition-colors hover:border-white/30 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative select-none overflow-hidden">
        <p className="translate-y-[18%] text-center font-display text-[19vw] leading-[0.72] font-bold tracking-[-0.05em] text-white/[0.035]">
          OPTICS
        </p>
      </div>
    </footer>
  );
}
