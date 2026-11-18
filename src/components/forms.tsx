"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Mail,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui";
import { inputCls, labelCls } from "@/components/ui";

function Success({
  title,
  copy,
  children,
}: {
  title: string;
  copy: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-jade/25 bg-jade-soft px-5 py-7">
      <span className="grid size-10 place-items-center rounded-full bg-jade text-white">
        <Check className="size-5" strokeWidth={2.6} />
      </span>
      <p className="mt-4 font-display text-lg font-semibold text-ink">{title}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60">{copy}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}

export function SignInForm() {
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);

  if (done) {
    return (
      <Success
        title="You're signed in."
        copy="This is a demo session — no account was created and nothing was stored. Continue to the dashboard to explore the dealer or admin experience."
      >
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/dealer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-[13px] font-medium text-white transition hover:bg-ink-3"
          >
            Dealer dashboard
            <ArrowRight className="size-3.5" />
          </Link>
          <Link
            href="/admin"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-5 text-[13px] font-medium text-ink transition hover:border-ink/30"
          >
            Admin console
          </Link>
        </div>
      </Success>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="si-email" className={labelCls}>
          Work email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/30" />
          <input
            id="si-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@dealership.com"
            className={`${inputCls} pl-10`}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="si-password" className={labelCls}>
            Password
          </label>
          <Link
            href="/contact"
            className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-signal hover:underline"
          >
            Forgot?
          </Link>
        </div>
        <div className="relative">
          <input
            id="si-password"
            name="password"
            type={show ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className={`${inputCls} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center text-ink/35 transition hover:text-ink"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 pt-1 text-[13px] text-ink/60">
        <input
          type="checkbox"
          name="remember"
          className="size-4 rounded border-line accent-signal"
        />
        Keep me signed in on this device
      </label>

      <Button type="submit" size="lg" className="mt-2 w-full">
        Sign in to OPTICS
        <ArrowRight className="size-4" />
      </Button>

      <p className="pt-1 text-center text-[12px] leading-relaxed text-ink/40">
        Demo build — use any email and password. No credentials are stored.
      </p>
    </form>
  );
}

const topics = [
  "Buying a vehicle",
  "Selling or listing",
  "Dealer onboarding",
  "Escrow & payments",
  "Press & partnerships",
  "Something else",
];

export function ContactForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Success
        title="Message received."
        copy="Our team replies within one business day, Monday to Saturday. For anything urgent, the WhatsApp line is fastest."
      >
        <button
          type="button"
          onClick={() => setDone(false)}
          className="text-[12px] font-semibold uppercase tracking-[0.1em] text-jade underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </Success>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className={labelCls}>
            Full name
          </label>
          <input
            id="ct-name"
            name="name"
            required
            placeholder="Ada Obi"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="ct-email" className={labelCls}>
            Email
          </label>
          <input
            id="ct-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-phone" className={labelCls}>
            Phone
          </label>
          <input
            id="ct-phone"
            name="phone"
            type="tel"
            placeholder="+234 800 000 0000"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="ct-topic" className={labelCls}>
            Topic
          </label>
          <select id="ct-topic" name="topic" className={inputCls}>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="ct-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="ct-message"
          name="message"
          rows={5}
          required
          placeholder="Tell us what you need — the more detail, the faster we can help."
          className="w-full resize-none rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink/35"
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Send message
        <ArrowRight className="size-4" />
      </Button>
      <p className="text-center text-[11px] leading-relaxed text-ink/40">
        We never share your details with third parties.
      </p>
    </form>
  );
}

export function ValuationForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Success
        title="Valuation request in."
        copy="A specialist will review your vehicle details and come back with a realistic price range and next steps within 24 hours."
      >
        <button
          type="button"
          onClick={() => setDone(false)}
          className="text-[12px] font-semibold uppercase tracking-[0.1em] text-jade underline-offset-4 hover:underline"
        >
          Submit another vehicle
        </button>
      </Success>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sv-make" className={labelCls}>
            Make
          </label>
          <input
            id="sv-make"
            name="make"
            required
            placeholder="Toyota"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="sv-model" className={labelCls}>
            Model & trim
          </label>
          <input
            id="sv-model"
            name="model"
            required
            placeholder="Land Cruiser 300"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="sv-year" className={labelCls}>
            Year
          </label>
          <input
            id="sv-year"
            name="year"
            inputMode="numeric"
            required
            placeholder="2023"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="sv-mileage" className={labelCls}>
            Mileage (km)
          </label>
          <input
            id="sv-mileage"
            name="mileage"
            inputMode="numeric"
            required
            placeholder="42,000"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="sv-condition" className={labelCls}>
            Condition
          </label>
          <select id="sv-condition" name="condition" className={inputCls}>
            <option>Used — excellent</option>
            <option>Used — good</option>
            <option>Needs work</option>
            <option>Brand new</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sv-city" className={labelCls}>
            Location
          </label>
          <input
            id="sv-city"
            name="city"
            required
            placeholder="Lagos"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="sv-phone" className={labelCls}>
            Phone
          </label>
          <input
            id="sv-phone"
            name="phone"
            type="tel"
            required
            placeholder="+234 800 000 0000"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="sv-notes" className={labelCls}>
          Anything we should know?
        </label>
        <textarea
          id="sv-notes"
          name="notes"
          rows={3}
          placeholder="Service history, modifications, documents available…"
          className="w-full resize-none rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink/35"
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Request a valuation
        <ArrowRight className="size-4" />
      </Button>
      <p className="text-center text-[11px] leading-relaxed text-ink/40">
        No obligation. We&apos;ll never list your vehicle without written approval.
      </p>
    </form>
  );
}

const applicationSteps = [
  { label: "Business", icon: Building2 },
  { label: "Inventory", icon: Truck },
  { label: "Verification", icon: ShieldCheck },
];

export function DealerApplicationForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const progress = ((step + 1) / applicationSteps.length) * 100;

  if (done) {
    return (
      <Success
        title="Application received."
        copy="Our dealer team reviews new applications within three business days. We'll schedule a short call and a premises visit, then help you publish your first listings."
      >
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/dealer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-[13px] font-medium text-white transition hover:bg-ink-3"
          >
            Preview the dashboard
            <ArrowRight className="size-3.5" />
          </Link>
          <Link
            href="/vehicles"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-5 text-[13px] font-medium text-ink transition hover:border-ink/30"
          >
            Browse the marketplace
          </Link>
        </div>
      </Success>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        {applicationSteps.map((item, i) => {
          const active = i === step;
          const complete = i < step;
          return (
            <div key={item.label} className="flex flex-1 items-center gap-2">
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition ${
                  active
                    ? "bg-signal text-white"
                    : complete
                      ? "bg-jade text-white"
                      : "bg-paper-2 text-ink/35 ring-1 ring-line"
                }`}
              >
                {complete ? <Check className="size-4" /> : i + 1}
              </div>
              <span
                className={`hidden text-[11px] font-semibold uppercase tracking-[0.1em] sm:block ${
                  active ? "text-ink" : "text-ink/35"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-paper-2">
        <div
          className="h-full rounded-full bg-signal transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < applicationSteps.length - 1) {
            setStep((s) => s + 1);
          } else {
            setDone(true);
          }
        }}
        className="mt-6 space-y-4"
      >
        {step === 0 ? (
          <>
            <div>
              <label htmlFor="da-business" className={labelCls}>
                Dealership name
              </label>
              <input
                id="da-business"
                name="business"
                required
                placeholder="Auto Haven Ltd."
                className={inputCls}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="da-contact" className={labelCls}>
                  Contact name
                </label>
                <input
                  id="da-contact"
                  name="contact"
                  required
                  placeholder="Emeka Nwosu"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="da-email" className={labelCls}>
                  Work email
                </label>
                <input
                  id="da-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@dealership.com"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="da-phone" className={labelCls}>
                  Phone
                </label>
                <input
                  id="da-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="da-city" className={labelCls}>
                  City
                </label>
                <input
                  id="da-city"
                  name="city"
                  required
                  placeholder="Lagos"
                  className={inputCls}
                />
              </div>
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="da-size" className={labelCls}>
                  Current stock
                </label>
                <select id="da-size" name="size" className={inputCls}>
                  <option>1 – 10 vehicles</option>
                  <option>11 – 30 vehicles</option>
                  <option>31 – 75 vehicles</option>
                  <option>75+ vehicles</option>
                </select>
              </div>
              <div>
                <label htmlFor="da-years" className={labelCls}>
                  Years in business
                </label>
                <select id="da-years" name="years" className={inputCls}>
                  <option>Less than 1</option>
                  <option>1 – 3</option>
                  <option>3 – 7</option>
                  <option>7+</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="da-specialties" className={labelCls}>
                Primary categories
              </label>
              <select id="da-specialties" name="specialties" className={inputCls}>
                <option>Cars & SUVs</option>
                <option>Commercial & trucks</option>
                <option>Buses & vans</option>
                <option>Machinery & agriculture</option>
                <option>Motorcycles</option>
                <option>Mixed inventory</option>
              </select>
            </div>
            <div>
              <label htmlFor="da-premises" className={labelCls}>
                Showroom address
              </label>
              <textarea
                id="da-premises"
                name="premises"
                rows={3}
                required
                placeholder="Street, area, state"
                className="w-full resize-none rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink/35"
              />
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <div>
              <label htmlFor="da-reg" className={labelCls}>
                CAC registration number
              </label>
              <input
                id="da-reg"
                name="registration"
                required
                placeholder="RC 1234567"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="da-id" className={labelCls}>
                Director ID type
              </label>
              <select id="da-id" name="id" className={inputCls}>
                <option>National ID (NIN)</option>
                <option>International passport</option>
                <option>Driver&apos;s licence</option>
              </select>
            </div>
            <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-line bg-paper-2/60 p-3.5 text-[12px] leading-relaxed text-ink/55">
              <input
                type="checkbox"
                required
                className="mt-0.5 size-4 shrink-0 rounded border-line accent-signal"
              />
              I confirm the business is registered in Nigeria and I can provide
              ownership documents and inspection access for listed vehicles.
            </label>
          </>
        ) : null}

        <div className="flex gap-2.5 pt-1">
          {step > 0 ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setStep((s) => s - 1)}
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
          ) : null}
          <Button type="submit" size="lg" className="flex-1">
            {step < applicationSteps.length - 1 ? "Continue" : "Submit application"}
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <p className="text-center text-[11px] leading-relaxed text-ink/40">
          Application is free. We only earn when you sell.
        </p>
      </form>
    </div>
  );
}
