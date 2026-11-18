"use client";

import { useState } from "react";
import { Photo } from "@/components/photo";
import { cn } from "@/lib/utils";

export function VehicleGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-line bg-paper-2">
        <Photo
          key={current}
          src={current}
          alt={`${title} — photo ${active + 1}`}
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
          {active + 1} / {images.length}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2.5 sm:grid-cols-5">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-pressed={active === i}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all duration-300",
              active === i
                ? "border-ink"
                : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <Photo src={src} alt="" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
