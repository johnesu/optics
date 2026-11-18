import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { Newsletter } from "@/components/newsletter";
import { Reveal } from "@/components/motion";
import { Badge, ButtonLink, Eyebrow, SectionHead } from "@/components/ui";
import { JOURNAL_POSTS } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Buying guides, market notes and dealer stories from the OPTICS team.",
};

export default function JournalPage() {
  const [featured, ...rest] = JOURNAL_POSTS;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={
          <>
            Notes from the{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              trading floor.
            </span>
          </>
        }
        description="Buying guides, market movement and the occasional strong opinion. Written by people who spend their days in the trade."
      />

      <section className="container-x py-14 md:py-20">
        <Reveal>
          <Link
            href={`/journal/${featured.slug}`}
            className="group grid overflow-hidden rounded-[26px] border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lift lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <Photo
                src={featured.image}
                alt={featured.title}
                sizes="(max-width: 1024px) 100vw, 55vw"
                imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute left-4 top-4">
                <Badge tone="glass">Featured</Badge>
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 md:p-9">
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                <span className="text-signal">{featured.category}</span>
                <span className="size-1 rounded-full bg-ink/20" />
                <span>{featured.read} read</span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-ink">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-ink/55">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                <span className="flex items-center gap-1.5 text-[12px] text-ink/40">
                  <Clock className="size-3.5" />
                  {featured.date}
                </span>
                <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink transition-colors group-hover:text-signal">
                  Read article
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="container-x pb-14 md:pb-20">
        <SectionHead
          eyebrow="All articles"
          title="Recent writing"
          action={
            <ButtonLink href="/vehicles" variant="outline" size="sm">
              Browse inventory
            </ButtonLink>
          }
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/journal/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                  <Photo
                    src={post.image}
                    alt={post.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge tone="glass">{post.category}</Badge>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    <span>{post.date}</span>
                    <span className="size-1 rounded-full bg-ink/20" />
                    <span>{post.read}</span>
                  </div>
                  <h3 className="mt-3 font-display text-[15.5px] leading-[1.25] font-semibold text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-ink/50">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-[11.5px] font-semibold text-ink/60 transition-colors group-hover:text-signal">
                    Read
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-2/50 py-14 md:py-20">
        <div className="container-x grid items-center gap-8 md:grid-cols-[1fr_0.9fr]">
          <div>
            <Eyebrow>The Friday edit</Eyebrow>
            <h2 className="mt-3 text-[clamp(1.5rem,2.8vw,2rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-ink">
              One email. Five things worth knowing.
            </h2>
            <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-ink/55">
              New stock, price movement and one buying lesson — every Friday.
              Unsubscribe with a single click.
            </p>
          </div>
          <Newsletter variant="light" />
        </div>
      </section>
    </>
  );
}
