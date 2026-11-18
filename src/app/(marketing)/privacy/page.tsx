import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How OPTICS collects, uses and protects your data across the marketplace, dealer workspace and admin console.",
};

const sections = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "OPTICS is a dealer-only vehicle marketplace. This policy explains what we collect when you browse listings, contact a dealer, apply to sell or sign in to a workspace, and how we handle it.",
      "This is a demo build. Submitting a form here does not create an account or transmit your details to a live system. The sections below describe how the production service is designed to operate.",
    ],
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: [
      "Account details: name, work email, phone number, dealership name and role. Dealer applicants also provide business registration, identity documents and premises information used for verification.",
      "Activity data: pages viewed, listings saved, comparisons started and search filters applied. This helps us rank inventory and surface relevant stock.",
      "Enquiry content: the messages you send to dealers, including any vehicle reference, budget range or contact preference you include.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: [
      "To operate the marketplace: publish listings, route enquiries to the right dealer, maintain comparison and saved-vehicle lists, and process orders.",
      "To verify dealers: review submitted documents, confirm business details and monitor listings for accuracy and policy compliance.",
      "To improve the product: understand which filters, categories and listing formats help buyers decide, using aggregated and de-identified data.",
      "To communicate: send transactional messages about your account and, where you opt in, the Friday edit newsletter. You can unsubscribe at any time.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing and disclosure",
    body: [
      "When you send an enquiry, the relevant dealer receives your name, contact details and message so they can respond. We do not sell personal data to third parties.",
      "We use service providers for hosting, email delivery, payments and analytics. They process data only on our instructions and under written agreements.",
      "We may disclose information where required by law, to enforce our terms, or to protect the safety and rights of buyers, dealers and OPTICS.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "Data is encrypted in transit and at rest. Access to dealer and admin workspaces is role-based, logged and reviewed. Payment details are handled by our payment partners and never stored on OPTICS servers.",
      "No system is perfectly secure. If we become aware of a breach affecting your data, we will notify affected users and the relevant regulator as required.",
    ],
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: [
      "You can request a copy of your data, correct inaccurate details, or ask us to delete your account and associated records. Dealers can export their listing and enquiry history from the workspace.",
      "Where processing relies on consent, you can withdraw it at any time. Withdrawal does not affect processing that already took place.",
      "To exercise any of these rights, contact privacy@optics.ng. We respond within 30 days.",
    ],
  },
  {
    id: "retention",
    title: "Retention",
    body: [
      "Account and listing records are retained while your account is active and for a reasonable period afterwards to meet legal, tax and dispute-resolution obligations.",
      "Enquiry records are kept for 24 months so buyers and dealers can refer back to a conversation. Analytics data is aggregated or deleted on a shorter cycle.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about this policy can go to privacy@optics.ng or to our Lagos office at 14 Admiralty Way, Lekki Phase 1.",
      "We may update this policy as the product evolves. Material changes will be announced in the workspace and by email before they take effect.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              policy.
            </span>
          </>
        }
        description="What we collect, why we collect it, and the control you have over it. Last updated 1 October 2026."
      />

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Eyebrow>On this page</Eyebrow>
              <nav className="mt-4 space-y-1.5 border-l border-line pl-4">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-[12.5px] leading-relaxed text-ink/50 transition-colors hover:text-ink"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="max-w-[72ch]">
            {sections.map((section, i) => (
              <div
                key={section.id}
                id={section.id}
                className={
                  i === 0
                    ? "scroll-mt-24"
                    : "mt-10 scroll-mt-24 border-t border-line pt-10"
                }
              >
                <h2 className="font-display text-[clamp(1.15rem,2vw,1.4rem)] font-semibold tracking-[-0.02em] text-ink">
                  {section.title}
                </h2>
                {section.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className="mt-3 text-[14px] leading-[1.8] text-ink/65"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            <div className="mt-12 rounded-[22px] border border-line bg-paper p-5">
              <p className="text-[13px] leading-relaxed text-ink/60">
                This is a demo environment. No data submitted on this site is
                stored or forwarded to a live service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
