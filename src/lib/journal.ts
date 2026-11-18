import { getVehicle } from "@/lib/data";

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  read: string;
  date: string;
  image: string;
  author: string;
  role: string;
  featured?: boolean;
  body: string[];
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "ev-ownership-lagos",
    title: "The honest maths of owning an EV in Lagos",
    excerpt:
      "Charging costs, range anxiety and resale value — what the numbers actually look like after twelve months of real use.",
    category: "Electric",
    read: "8 min",
    date: "24 Oct 2026",
    image: getVehicle("2024-byd-seal-design")?.images[0] ?? "",
    author: "Ifeoma Nwachukwu",
    role: "Market analyst",
    featured: true,
    body: [
      "The first thing every EV owner in Lagos mentions is not the acceleration. It is the fuel line they stopped joining. A full charge on a mid-size electric sedan costs a fraction of a tank of petrol, and that difference compounds quickly when you drive forty kilometres a day.",
      "But the headline saving hides three other numbers. Home charging requires an inverter-grade supply and a dedicated circuit, which is a real upfront cost. Public chargers are still concentrated on the island. And insurance premiums for battery-electric vehicles remain higher than equivalent petrol models.",
      "Then there is resale. Battery health is the single biggest driver of value, and buyers are right to ask for a state-of-health report. Dealers who provide one sell faster and closer to asking price. Those who do not end up discounting to move stock.",
      "Our advice is simple: model the total cost over three years, not the sticker price. Include charging infrastructure, insurance and expected residual value. For high-mileage urban drivers, the EV usually wins. For long-distance and low-mileage owners, a hybrid is often the smarter financial call.",
    ],
  },
  {
    slug: "import-vs-local",
    title: "Import or buy locally? A dealer's checklist",
    excerpt:
      "Duty, documentation and the hidden cost of waiting. Three dealers explain how they advise first-time buyers.",
    category: "Buying",
    read: "6 min",
    date: "18 Oct 2026",
    image: getVehicle("2023-toyota-land-cruiser-300")?.images[0] ?? "",
    author: "Emeka Nwosu",
    role: "Auto Haven",
    body: [
      "Importing looks cheaper on paper until you price the whole journey. Duty, clearing, port charges, transport and the weeks of waiting all belong in the comparison — and that is before anything goes wrong.",
      "Locally sourced vehicles have one underrated advantage: you can inspect them before money changes hands. That is worth more than most buyers realise, particularly for used stock with incomplete service history.",
      "The exception is specialty or low-volume models where local supply is thin. In those cases, import makes sense — but only through a dealer who has done it repeatedly and can show you landed costs from previous units.",
      "Ask three questions before committing: what is the total landed cost, what documentation will I receive, and who is accountable if the vehicle arrives damaged or misdescribed? If the seller cannot answer all three plainly, walk away.",
    ],
  },
  {
    slug: "commercial-uptime",
    title: "Why uptime beats sticker price on commercial fleets",
    excerpt:
      "A Naira saved at purchase can cost three in downtime. How fleet buyers should model total cost of ownership.",
    category: "Commercial",
    read: "7 min",
    date: "09 Oct 2026",
    image: getVehicle("2024-mercedes-benz-actros-2645")?.images[0] ?? "",
    author: "Halima Yusuf",
    role: "Fleet specialist",
    body: [
      "A truck that spends two days a month in the workshop is not cheap, no matter what you paid for it. Fleet economics are driven by utilisation, and utilisation is driven by serviceability.",
      "That means parts availability matters more than badge prestige. Before buying, confirm the model has local parts support and a technician network within reach of your routes. A common platform with a strong parts chain will outperform a discounted exotic every time.",
      "Financing terms also change the maths. Longer tenors lower monthly pressure but increase total interest. Match the loan to the asset's realistic working life, not the maximum the lender will offer.",
      "Finally, track cost per kilometre by unit. Most fleets discover one or two vehicles quietly consuming the margin of the entire operation. You cannot fix what you do not measure.",
    ],
  },
  {
    slug: "inspection-standard",
    title: "Inside the 42-point inspection",
    excerpt:
      "What our inspectors check, what fails most often, and the documentation every listing must carry.",
    category: "Standards",
    read: "5 min",
    date: "02 Oct 2026",
    image: getVehicle("2022-range-rover-sport-hst")?.images[0] ?? "",
    author: "OPTICS Standards",
    role: "Editorial",
    body: [
      "The inspection exists to answer one question: would we let a family member buy this vehicle with the information provided? Everything else follows from that.",
      "Structural integrity, odometer consistency and ownership documentation account for most failures. Cosmetic wear is expected and disclosed; hidden accident repair is not.",
      "Each listing carries a condition grade, a photo set covering all four corners plus the interior, and any noted defects. Dealers who disclose honestly see fewer disputes and faster completions.",
      "The standard is published so buyers can compare like with like, and so dealers know exactly what is expected before a listing goes live.",
    ],
  },
  {
    slug: "hybrid-resale",
    title: "Hybrids are holding value better than expected",
    excerpt:
      "Residual values for hybrid SUVs have firmed up across the last two quarters. Here's what's driving it.",
    category: "Market",
    read: "6 min",
    date: "26 Sep 2026",
    image: getVehicle("2023-lexus-rx-450h")?.images[0] ?? "",
    author: "Ifeoma Nwachukwu",
    role: "Market analyst",
    body: [
      "Hybrid residuals have outperformed our forecasts for two consecutive quarters. The driver is not fashion; it is fuel volatility. Buyers want a hedge they can drive.",
      "The effect is strongest in mid-size SUVs and executive sedans, where running costs matter and buyers are comfortable with the technology. Entry-level hybrids have been slower to gain traction.",
      "Battery health remains the key variable. Hybrid packs degrade more slowly than full EV batteries in typical use, which supports resale — provided the history is documented.",
      "For dealers, this is a sourcing signal. Clean hybrid stock with full service history is worth paying up for right now.",
    ],
  },
  {
    slug: "dealer-profile-northstar",
    title: "Dealer profile: how Northstar rebuilt trust",
    excerpt:
      "After a rough 2024, Northstar Autos changed how it documents every car. Enquiries doubled within a quarter.",
    category: "Dealers",
    read: "9 min",
    date: "19 Sep 2026",
    image: getVehicle("2024-bmw-ix-xdrive50")?.images[0] ?? "",
    author: "OPTICS Editorial",
    role: "Dealer stories",
    body: [
      "Northstar Autos had a credibility problem. Two disputed listings in 2024 cost them more in reputation than the vehicles were worth.",
      "The fix was unglamorous: photograph everything, document every defect, and publish the inspection report before a buyer asks. It slowed listings down by a day and doubled enquiry quality.",
      "Within a quarter, their response rate and completion rate both improved. Buyers arrived already informed, which shortened conversations and reduced haggling.",
      "The lesson is not unique to Northstar. Verification is a sales tool, not a compliance cost.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return JOURNAL_POSTS.find((post) => post.slug === slug);
}
