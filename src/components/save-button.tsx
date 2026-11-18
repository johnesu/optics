"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui";

export function SaveButton({
  label = "Save changes",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <Button
      type="button"
      size="sm"
      className={className}
      onClick={() => {
        setSaved(true);
        window.setTimeout(() => setSaved(false), 2200);
      }}
    >
      {saved && <Check className="size-3.5" />}
      {saved ? "Saved" : label}
    </Button>
  );
}
