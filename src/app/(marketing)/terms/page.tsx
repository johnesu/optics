import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The rules that govern buying, selling and listing vehicles on the OPTICS marketplace.",
};

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: [
      "By browsing OPTICS, creating an account or listing inventory, you agree to these terms. If you are using the marketplace on behalf of a dealership, you confirm you have authority to bind that business.",
      "This is a demo build. Nothing here creates a live contract, processes a real payment or transfers ownership of a vehicle. The terms describe how the production service is designed to operate.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts and access",
    body: [
      "Buyers may browse without an account but need one to save vehicles, start comparisons and send enquiries. Dealer accounts are created only after business verification.",
      "You are responsible for the accuracy of your details and for keeping your credentials secure. Notify us immediately if you suspect unauthorised access to your workspace.",
      "We may suspend or restrict an account that breaches these terms, misrepresents inventory or undermines the integrity of the marketplace.",
    ],
  },
  {
    id: "listings",
    title: "Listings and content",
    body: [
      "Dealers must own or be authorised to sell every vehicle they list, and must provide accurate specifications, mileage, condition and history. Stock that has been sold, reserved or withdrawn should be updated promptly.",
      "Photographs must show the actual vehicle. Stock images, misleading angles or edited damage are not permitted. Listings are reviewed before publication and may be flagged or removed after publication.",
      "By uploading content you grant OPTICS a non-exclusive licence to display, resize and promote it on the marketplace and in related marketing, for as long as the listing is live.",
    ],
  },
  {
    id: "payments-escrow",
    title: "Payments and escrow",
    body: [
      "Full payments and reservation deposits are collected by our payment partners and held in escrow. Funds are released to the dealer once the buyer confirms collection or the agreed delivery window closes without a dispute.",
      "Prices are displayed in Naira and must include all mandatory fees. Dealers may not request off-platform payments for a vehicle listed on OPTICS.",
      "Refunds are handled under our buyer protection process. Where a vehicle materially differs from its listing, the buyer may be entitled to a full refund of the escrowed amount.",
    ],
  },
  {
    id: "prohibited-use",
    title: "Prohibited use",
    body: [
      "You may not use OPTICS to list stolen vehicles, misstate mileage, evade taxes, launder money or circumvent dealer verification.",
      "Automated scraping, bulk copying of listings, attempts to bypass access controls and interference with the platform's normal operation are prohibited.",
      "We may remove content, withhold payouts and report activity to the relevant authorities where we believe the law has been broken.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: [
      "The OPTICS name, interface, design system and underlying software belong to OPTICS. You may not copy, resell or create derivative works from them without written permission.",
      "Dealer names, logos and listing content remain the property of the respective dealership, subject to the licence described above.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    body: [
      "OPTICS provides the marketplace as a venue. We do not own the vehicles listed and do not guarantee that a listing is accurate beyond our review process. Buyers should inspect before completing a purchase.",
      "To the extent permitted by law, OPTICS is not liable for indirect or consequential loss, including loss of profit or opportunity, arising from use of the marketplace.",
      "Nothing in these terms limits liability for fraud, death or personal injury caused by negligence, or any other liability that cannot lawfully be excluded.",
    ],
  },
  {
    id: "termination",
    title: "Suspension and termination",
    body: [
      "You can close your account at any time. Active orders, open disputes and outstanding fees must be settled first.",
      "We may suspend a workspace immediately where verification fails, a listing is reported as fraudulent or a payment is reversed. Where possible we will explain the reason and the steps to resolve it.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: [
      "These terms are governed by the laws of the Federal Republic of Nigeria. Disputes are subject to the exclusive jurisdiction of the courts of Lagos State, unless a mandatory consumer protection rule says otherwise.",
      "If any provision is found unenforceable, the remaining provisions continue in full force.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about these terms can go to legal@optics.ng or to our Lagos office at 14 Admiralty Way, Lekki Phase 1.",
      "We may update these terms as the product evolves. Material changes will be announced in the workspace and by email before they take effect.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms of{" "}
            <span className="font-serif-i font-normal italic text-white/70">
              use.
            </span>
          </>
        }
        description="The rules for buying, selling and listing on OPTICS. Last updated 1 October 2026."
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
                This is a demo environment. No order, payment or verification
                described here is processed by a live service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
