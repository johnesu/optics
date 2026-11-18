"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  Building2,
  Car,
  ClipboardCheck,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  Package,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/dealers", label: "Dealers", icon: Building2, count: "3" },
  { href: "/admin/listings", label: "Listings", icon: Car, count: "4" },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/audit", label: "Audit log", icon: Activity },
];

function Item({
  href,
  label,
  icon: Icon,
  count,
}: {
  href: string;
  label: string;
  icon: typeof Car;
  count?: string;
}) {
  const pathname = usePathname();
  const active =
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
        active
          ? "bg-white/10 text-white"
          : "text-white/45 hover:bg-white/5 hover:text-white/80",
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0 transition-colors",
          active ? "text-signal" : "text-white/30 group-hover:text-white/60",
        )}
      />
      <span className="flex-1">{label}</span>
      {count && (
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
            active ? "bg-signal text-white" : "bg-white/10 text-white/50",
          )}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col bg-ink px-4 py-6 lg:flex">
        <div className="px-2">
          <Logo tone="light" />
        </div>

        <div className="mt-7 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-signal text-[11px] font-semibold text-white">
            IA
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium text-white">
              Ifeoma A.
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-white/40">
              <span className="size-1.5 rounded-full bg-volt" />
              Platform operator
            </p>
          </div>
        </div>

        <nav className="mt-5 flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <Item key={item.href} {...item} />
          ))}
        </nav>

        <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
          <Link
            href="/vehicles"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12.5px] text-white/45 transition-colors hover:text-white/80"
          >
            <ArrowUpRight className="size-4 text-white/30" />
            View marketplace
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12.5px] text-white/45 transition-colors hover:text-white/80"
          >
            <LifeBuoy className="size-4 text-white/30" />
            Operator support
          </Link>
          <Link
            href="/sign-in"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12.5px] text-white/45 transition-colors hover:text-white/80"
          >
            <LogOut className="size-4 text-white/30" />
            Sign out
          </Link>
        </div>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
            <div className="lg:hidden">
              <Logo compact />
            </div>
            <div className="hidden items-center gap-2 text-[12px] text-ink/40 lg:flex">
              <span>Operations console</span>
              <span className="text-ink/20">/</span>
              <span className="font-medium text-ink/60">OPTICS Admin</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Badge tone="jade">Platform healthy</Badge>
              <span className="grid size-8 place-items-center rounded-full bg-ink text-[11px] font-semibold text-white">
                IA
              </span>
            </div>
          </div>

          <nav className="no-scrollbar flex gap-1 overflow-x-auto px-4 pb-2.5 lg:hidden">
            {nav.map((item) => (
              <Item key={item.href} {...item} />
            ))}
          </nav>
        </header>

        <main className="px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-[1180px]">{children}</div>
        </main>

        <footer className="px-4 pb-8 md:px-8">
          <p className="mx-auto flex max-w-[1180px] items-center gap-2 text-[11px] text-ink/35">
            <ClipboardCheck className="size-3.5" />
            Demo operations console with sample accounts and events. No live data.
          </p>
        </footer>
      </div>
    </div>
  );
}
