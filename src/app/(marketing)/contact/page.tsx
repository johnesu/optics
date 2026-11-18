import type { Metadata } from "next";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/forms";
import { Reveal } from "@/components/motion";
import { Badge, ButtonLink, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the OPTICS team about buying, selling, dealer onboarding or anything else. We answer every message.",
};

const channels = [
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+234 800 OPTICS",
    detail: "Fastest for stock questions · 9:00–18:00",
    href: "https://wa.me/2348000000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@optics.ng",
    detail: "Replies within one business day",
    href: "mailto:hello@optics.ng",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 800 000 0000",
    detail: "Mon–Sat · 9:00–18:00 WAT",
    href: "tel:+2348000000000",
  },
];

const offices = [
  {
    city: "Lagos",
    address: "14 Admiralty Way, Lekki Phase 1",
    note: "Buying, inspections and escrow support",
  },
  {
    city: "Abuja",
    address: "Plot 123, Ahmadu Bello Way, Wuse II",
    note: "Dealer onboarding and fleet enquiries",
  },
  {
    city: "Kaduna",
    address: "3 Constitution Road, Kaduna North",
    note: "Commercial and agriculture stock",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              actual people.
            </span>
          </>
        }
        description="Buying, selling, dealer onboarding or a question about a listing — send it over. We answer every message."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#message" size="lg">
            Send a message
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </ButtonLink>
          <ButtonLink href="/vehicles" variant="glass" size="lg">
            Browse inventory
          </ButtonLink>
        </div>
      </PageHero>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-3 sm:grid-cols-3">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 0.05}>
              <a
                href={channel.href}
                className="group flex h-full flex-col rounded-[22px] border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-lift"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-paper-2 text-ink transition-colors group-hover:bg-signal group-hover:text-white">
                  <channel.icon className="size-[18px]" strokeWidth={1.9} />
                </span>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                  {channel.label}
                </p>
                <p className="mt-1 font-display text-[15px] font-semibold text-ink">
                  {channel.value}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-ink/45">
                  {channel.detail}
                </p>
              </a>
            </Reveal>
          ))}
        </div>

        <div id="message" className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <Eyebrow>Send a message</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-ink">
                Tell us what you need.
              </h2>
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-ink/55">
                Include the vehicle or dealership name if there is one. If it is
                about a live listing, mention the stock reference so we can pull
                the file before replying.
              </p>

              <div className="mt-6 rounded-[22px] border border-line bg-paper p-5">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-ink/40" strokeWidth={1.9} />
                  <p className="text-[12.5px] font-semibold text-ink">
                    Response times
                  </p>
                </div>
                <ul className="mt-3 space-y-2 text-[12.5px] text-ink/55">
                  <li className="flex items-center justify-between gap-4">
                    <span>WhatsApp</span>
                    <span className="font-medium text-ink">Within 1 hour</span>
                  </li>
                  <li className="flex items-center justify-between gap-4">
                    <span>Email</span>
                    <span className="font-medium text-ink">One business day</span>
                  </li>
                  <li className="flex items-center justify-between gap-4">
                    <span>Dealer onboarding</span>
                    <span className="font-medium text-ink">2–3 days</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge tone="jade">Verified listings only</Badge>
                <Badge tone="neutral">Escrow protected</Badge>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[26px] border border-line bg-white p-6 shadow-soft md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2/50 py-14 md:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Where we are</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold tracking-[-0.03em] text-ink">
                Three cities, one standard.
              </h2>
            </div>
            <ButtonLink href="/about" variant="outline" size="sm">
              About OPTICS
            </ButtonLink>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {offices.map((office, i) => (
              <Reveal key={office.city} delay={i * 0.05}>
                <div className="h-full rounded-[22px] border border-line bg-white p-5">
                  <div className="flex items-center gap-2 text-ink">
                    <MapPin className="size-4 text-signal" strokeWidth={2} />
                    <p className="font-display text-[15px] font-semibold">
                      {office.city}
                    </p>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
                    {office.address}
                  </p>
                  <p className="mt-2 text-[12px] text-ink/40">{office.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
