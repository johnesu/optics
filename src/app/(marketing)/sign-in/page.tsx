import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Star } from "lucide-react";
import { Photo } from "@/components/photo";
import { SignInForm } from "@/components/forms";
import { Badge, Eyebrow } from "@/components/ui";
import { getDealer } from "@/lib/data";
import { initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to the OPTICS dealer workspace or admin console. Demo build — any email and password works.",
};

const trust = [
  "Escrow-protected payments on every transaction",
  "42-point inspection and published condition reports",
  "Verified dealers only — identity and documents checked",
];

export default function SignInPage() {
  const dealer = getDealer("northstar-autos");
  const cover = dealer?.cover ?? "";

  return (
    <section className="container-x py-12 md:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink/50 transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-3.5" strokeWidth={2} />
        Back to OPTICS
      </Link>

      <div className="mt-6 grid overflow-hidden rounded-[28px] border border-line bg-white shadow-soft lg:grid-cols-2">
        <div className="p-6 sm:p-10 md:p-12">
          <Eyebrow>Account</Eyebrow>
          <h1 className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-ink">
            Welcome back.
          </h1>
          <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-ink/55">
            Sign in to manage inventory, respond to enquiries and track orders.
            Dealers and administrators share one door.
          </p>

          <div className="mt-8">
            <SignInForm />
          </div>

          <div className="mt-8 border-t border-line pt-5 text-[12.5px] text-ink/50">
            New to OPTICS?{" "}
            <Link
              href="/dealer/register"
              className="font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-signal"
            >
              Apply to become a dealer
            </Link>
          </div>
        </div>

        <div className="relative hidden overflow-hidden bg-ink lg:block">
          <Photo src={cover} alt="Dealership showroom" sizes="50vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />

          <div className="relative flex h-full flex-col justify-between p-10">
            <div className="flex items-center gap-2">
              <Badge tone="glass">
                <ShieldCheck className="size-3" strokeWidth={2.4} />
                Verified network
              </Badge>
            </div>

            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-signal text-signal"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="mt-4 font-serif-i text-[clamp(1.3rem,2.4vw,1.75rem)] leading-snug text-white italic">
                &ldquo;The workspace cut our response time in half. Buyers arrive
                already holding the inspection report.&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-white/10 text-[12px] font-bold text-white ring-1 ring-white/15">
                  {dealer ? initials(dealer.name) : "NA"}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-white">
                    {dealer?.name ?? "Northstar Autos"}
                  </p>
                  <p className="text-[11.5px] text-white/45">
                    Dealer partner since 2023
                  </p>
                </div>
              </div>

              <ul className="mt-8 space-y-2.5 border-t border-white/10 pt-6">
                {trust.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-white/60"
                  >
                    <ShieldCheck
                      className="mt-0.5 size-3.5 shrink-0 text-jade"
                      strokeWidth={2.2}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
