import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink text-white",
        className,
      )}
    >
      <div className="hero-grid absolute inset-0 opacity-[0.55]" />
      <div className="grain absolute inset-0 opacity-[0.5]" />
      <div className="pointer-events-none absolute -left-24 top-0 size-[420px] rounded-full bg-signal/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-[380px] rounded-full bg-volt/15 blur-[130px]" />

      <div className="container-x relative py-16 md:py-24">
        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow tone="light">{eyebrow}</Eyebrow> : null}
          <h1 className="mt-5 text-[clamp(2.2rem,5.4vw,4.1rem)] leading-[0.98] font-semibold tracking-[-0.03em]">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60 md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
