import type { Metadata } from "next";
import { Badge, Button, Field, inputCls, labelCls, selectCls } from "@/components/ui";
import { SaveButton } from "@/components/save-button";
import { PageTitle, Panel } from "@/components/dashboard";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Settings",
};

const notificationRows = [
  {
    id: "st-leads",
    title: "New enquiries",
    description: "Email me the moment a buyer sends a message.",
    checked: true,
  },
  {
    id: "st-orders",
    title: "Orders and escrow",
    description: "Payment received, released or refunded.",
    checked: true,
  },
  {
    id: "st-review",
    title: "Listing reviews",
    description: "When a listing is approved, flagged or rejected.",
    checked: true,
  },
  {
    id: "st-weekly",
    title: "Weekly performance digest",
    description: "Views, leads and conversion every Monday.",
    checked: false,
  },
];

export default function DealerSettingsPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="Settings"
        description="Your storefront, contact details and payout preferences."
        action={<Badge tone="jade">Verified dealer</Badge>}
      />

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel
          title="Dealership profile"
          description="This is what buyers see on your storefront."
        >
          <form className="space-y-4">
            <Field label="Dealership name" htmlFor="st-name">
              <input
                id="st-name"
                type="text"
                defaultValue="AutoHaven Motors"
                className={inputCls}
              />
            </Field>
            <Field label="Tagline" htmlFor="st-tagline">
              <input
                id="st-tagline"
                type="text"
                defaultValue="Certified performance and electric vehicles."
                className={inputCls}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="State" htmlFor="st-state">
                <select id="st-state" className={selectCls} defaultValue="Lagos">
                  <option>Lagos</option>
                  <option>Abuja FCT</option>
                  <option>Oyo</option>
                  <option>Rivers</option>
                  <option>Kano</option>
                  <option>Enugu</option>
                </select>
              </Field>
              <Field label="City" htmlFor="st-city">
                <input
                  id="st-city"
                  type="text"
                  defaultValue="Lekki"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field
              label="About"
              htmlFor="st-about"
              hint="Short introduction shown above your inventory."
            >
              <textarea
                id="st-about"
                rows={4}
                defaultValue="A Lagos-based performance dealership focused on verified, inspection-ready vehicles with transparent history."
                className={cn(inputCls, "h-auto resize-none py-3 leading-relaxed")}
              />
            </Field>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <p className="text-[11px] text-ink/35">
                Last updated 2 hours ago
              </p>
              <SaveButton label="Save profile" />
            </div>
          </form>
        </Panel>

        <div className="space-y-4">
          <Panel title="Contact & support" description="Where buyers reach you.">
            <form className="space-y-4">
              <Field label="Support email" htmlFor="st-email">
                <input
                  id="st-email"
                  type="email"
                  defaultValue="sales@autohaven.ng"
                  className={inputCls}
                />
              </Field>
              <Field label="Phone" htmlFor="st-phone">
                <input
                  id="st-phone"
                  type="tel"
                  defaultValue="+234 801 234 5678"
                  className={inputCls}
                />
              </Field>
              <Field label="Showroom address" htmlFor="st-address">
                <input
                  id="st-address"
                  type="text"
                  defaultValue="12 Admiralty Way, Lekki Phase 1"
                  className={inputCls}
                />
              </Field>
              <Field
                label="Opening hours"
                htmlFor="st-hours"
                hint="Shown on your dealership page."
              >
                <input
                  id="st-hours"
                  type="text"
                  defaultValue="Mon–Sat · 9:00 – 18:00"
                  className={inputCls}
                />
              </Field>
              <div className="border-t border-line pt-4">
                <SaveButton label="Save contact" />
              </div>
            </form>
          </Panel>

          <Panel title="Notifications">
            <form className="space-y-3.5">
              {notificationRows.map((row) => (
                <label
                  key={row.id}
                  htmlFor={row.id}
                  className="flex cursor-pointer items-start gap-3"
                >
                  <input
                    id={row.id}
                    type="checkbox"
                    defaultChecked={row.checked}
                    className="mt-0.5 size-4 shrink-0 accent-[#FF4D14]"
                  />
                  <span>
                    <span className="block text-[12.5px] font-medium text-ink">
                      {row.title}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-relaxed text-ink/45">
                      {row.description}
                    </span>
                  </span>
                </label>
              ))}
              <div className="border-t border-line pt-4">
                <SaveButton label="Save notifications" />
              </div>
            </form>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel
          title="Payout details"
          description="Escrow releases land in this account within 24 hours."
          action={<Badge tone="jade">Verified · Providus</Badge>}
        >
          <form className="grid gap-4 sm:grid-cols-2">
            <Field label="Bank" htmlFor="st-bank">
              <select id="st-bank" className={selectCls} defaultValue="Providus Bank">
                <option>Providus Bank</option>
                <option>GTBank</option>
                <option>Access Bank</option>
                <option>Zenith Bank</option>
                <option>First Bank</option>
              </select>
            </Field>
            <Field label="Account name" htmlFor="st-acct-name">
              <input
                id="st-acct-name"
                type="text"
                defaultValue="AutoHaven Motors Ltd"
                className={inputCls}
              />
            </Field>
            <Field label="Account number" htmlFor="st-acct-no">
              <input
                id="st-acct-no"
                type="text"
                defaultValue="0123456789"
                className={cn(inputCls, "tabular-nums")}
              />
            </Field>
            <Field label="Settlement cycle" htmlFor="st-cycle">
              <select id="st-cycle" className={selectCls} defaultValue="daily">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </Field>
            <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <p className="text-[11px] text-ink/35">
                Changes are reviewed by our payments team.
              </p>
              <SaveButton label="Update payout" />
            </div>
          </form>
        </Panel>

        <Panel
          title="Danger zone"
          className="border-red-200 bg-red-50/40"
          description="Closing your storefront hides every listing and pauses payouts."
        >
          <p className="text-[12.5px] leading-relaxed text-ink/60">
            You can reopen at any time within 90 days. Active orders and open
            disputes must be settled first.
          </p>
          <div className="mt-4">
            <Button variant="danger" size="sm" type="button">
              Close storefront
            </Button>
          </div>
          <p className="mt-3 text-[11px] text-ink/35">
            Demo control · nothing is deleted.
          </p>
        </Panel>
      </div>
    </div>
  );
}
