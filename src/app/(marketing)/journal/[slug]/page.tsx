import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, Quote } from "lucide-react";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion";
import { Badge, ButtonLink, SectionHead } from "@/components/ui";
import { JOURNAL_POSTS, getJournalPost } from "@/lib/journal";
import { initials } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function JournalArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const related = JOURNAL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden bg-ink">
          <div className="absolute inset-0">
            <Photo src={post.image} alt={post.title} priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/55" />
          </div>
          <div className="container-x relative py-16 md:py-24">
            <Link
              href="/journal"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-3.5" strokeWidth={2} />
              All articles
            </Link>

            <div className="mt-6 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="glass">{post.category}</Badge>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                  <Clock className="size-3" strokeWidth={2} />
                  {post.read} read
                </span>
              </div>
              <h1 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-white">
                {post.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/60 md:text-[15px]">
                {post.excerpt}
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-white/10 text-[12px] font-bold text-white ring-1 ring-white/15">
                  {initials(post.author)}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-white">{post.author}</p>
                  <p className="text-[11.5px] text-white/45">{post.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="container-x py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            <div className="mx-auto w-full max-w-[68ch]">
              {post.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <p
                    className={
                      i === 0
                        ? "text-[17px] leading-[1.75] text-ink/75 md:text-[18px]"
                        : "mt-6 text-[15px] leading-[1.8] text-ink/65"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal>
                <figure className="mt-10 rounded-[22px] border border-line bg-paper-2/60 p-6 md:p-8">
                  <Quote className="size-6 text-signal" strokeWidth={2} />
                  <blockquote className="mt-3 font-serif-i text-[clamp(1.25rem,2.4vw,1.6rem)] leading-snug text-ink italic">
                    &ldquo;Model the total cost over three years, not the sticker
                    price.&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                    {post.author} · {post.role}
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge tone="neutral">{post.category}</Badge>
                    <Badge tone="neutral">OPTICS Journal</Badge>
                  </div>
                  <ButtonLink href="/vehicles" variant="outline" size="sm">
                    Browse inventory
                    <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[22px] border border-line bg-white p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                  Written by
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-[12px] font-bold text-white">
                    {initials(post.author)}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-semibold text-ink">{post.author}</p>
                    <p className="text-[11.5px] text-ink/45">{post.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-[12.5px] leading-relaxed text-ink/55">
                  Part of the OPTICS editorial desk — notes from people who spend
                  their days in the trade.
                </p>
              </div>

              <div className="rounded-[22px] bg-ink p-5 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  The Friday edit
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/65">
                  New stock, price movement and one buying lesson — every Friday.
                </p>
                <ButtonLink href="/journal" variant="glass" size="sm" className="mt-4 w-full">
                  More articles
                </ButtonLink>
              </div>
            </aside>
          </div>
        </section>
      </article>

      <section className="border-t border-line bg-paper-2/50 py-14 md:py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="Keep reading"
            title="More from the journal"
            action={
              <ButtonLink href="/journal" variant="outline" size="sm">
                View all
              </ButtonLink>
            }
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.05}>
                <Link
                  href={`/journal/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/15 hover:shadow-lift"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                    <Photo
                      src={item.image}
                      alt={item.title}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge tone="glass">{item.category}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                      <span>{item.date}</span>
                      <span className="size-1 rounded-full bg-ink/20" />
                      <span>{item.read}</span>
                    </div>
                    <h3 className="mt-3 font-display text-[15.5px] leading-[1.25] font-semibold text-ink">
                      {item.title}
                    </h3>
                    <span className="mt-auto flex items-center gap-1.5 pt-4 text-[11.5px] font-semibold text-ink/60 transition-colors group-hover:text-signal">
                      Read
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
