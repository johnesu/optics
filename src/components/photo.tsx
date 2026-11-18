"use client";

import { useState } from "react";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

export function Photo({
  src,
  alt,
  className,
  imgClassName,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative isolate h-full w-full overflow-hidden bg-paper-2",
        className,
      )}
    >
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#e9e5da_0%,#dcd7c9_45%,#cfc9b8_100%)]">
          <Car className="size-8 text-ink/15" strokeWidth={1.5} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
      {!loaded && !failed ? (
        <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,#eceae3_0%,#f6f4ee_50%,#eceae3_100%)]" />
      ) : null}
    </div>
  );
}
