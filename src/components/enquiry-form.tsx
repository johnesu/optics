"use client";

import { useState } from "react";
import { Check, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui";
import { inputCls, labelCls } from "@/components/ui";

export function EnquiryForm({
  vehicleTitle,
  dealerName,
}: {
  vehicleTitle: string;
  dealerName: string;
}) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-2xl border border-jade/25 bg-jade-soft px-5 py-6">
        <span className="grid size-9 place-items-center rounded-full bg-jade text-white">
          <Check className="size-4.5" strokeWidth={2.6} />
        </span>
        <p className="mt-4 text-sm font-semibold text-ink">
          Enquiry sent to {dealerName}.
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">
          Most verified dealers reply within two hours. We&apos;ll email you the
          moment they respond.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-jade underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="space-y-3.5"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
        Ask about {vehicleTitle}
      </p>
      <div>
        <label htmlFor="enq-name" className={labelCls}>
          Full name
        </label>
        <input
          id="enq-name"
          name="name"
          required
          placeholder="Ada Obi"
          className={inputCls}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-email" className={labelCls}>
            Email
          </label>
          <input
            id="enq-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="enq-phone" className={labelCls}>
            Phone
          </label>
          <input
            id="enq-phone"
            name="phone"
            type="tel"
            placeholder="+234 800 000 0000"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label htmlFor="enq-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="enq-message"
          name="message"
          rows={3}
          required
          defaultValue={`Hello ${dealerName}, is this ${vehicleTitle} still available for inspection?`}
          className="w-full resize-none rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink/35"
        />
      </div>
      <Button type="submit" className="w-full">
        <MessageSquare className="size-4" strokeWidth={2} />
        Send enquiry
      </Button>
      <p className="text-center text-[11px] leading-relaxed text-ink/40">
        Your details go only to this verified dealer.
      </p>
    </form>
  );
}
