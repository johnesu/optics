"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button, inputCls } from "@/components/ui";
import { cn } from "@/lib/utils";

const templates = [
  "Yes, it is still available. When would you like to arrange an inspection?",
  "I can share the full service history and inspection report today.",
  "Happy to discuss a trade-in — what are you currently driving?",
];

export function LeadReply({ name }: { name: string }) {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-xl border border-jade/25 bg-jade-soft p-4">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-jade">
          <span className="grid size-6 place-items-center rounded-full bg-jade text-white">
            <Check className="size-3.5" />
          </span>
          Reply sent to {name}
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-jade/80">
          They will be notified by email and SMS. Follow up if you do not hear
          back within 24 hours.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 border-jade/30 bg-white text-jade hover:bg-white"
          onClick={() => {
            setSent(false);
            setValue("");
          }}
        >
          Write another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!value.trim()) return;
        setSent(true);
      }}
    >
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={`Reply to ${name.split(" ")[0]}…`}
        className={cn(
          inputCls,
          "h-28 resize-none py-3 text-[13px] leading-relaxed",
        )}
      />

      <div className="mt-2 flex flex-wrap gap-1.5">
        {templates.map((template) => (
          <button
            key={template}
            type="button"
            onClick={() => setValue(template)}
            className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-ink/55 transition-colors hover:bg-paper-2 hover:text-ink"
          >
            {template.length > 46 ? `${template.slice(0, 46)}…` : template}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] text-ink/35">
          Average dealer reply time is 42 minutes.
        </p>
        <Button type="submit" size="sm" disabled={!value.trim()}>
          <Send className="size-3.5" />
          Send reply
        </Button>
      </div>
    </form>
  );
}
