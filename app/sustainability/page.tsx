import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "BALAJI's commitment to ethical sourcing, conflict-free stones, and responsible craftsmanship.",
};

const PILLARS = [
  {
    icon: "⛏",
    title: "Responsibly Sourced Gold",
    body: "We source gold exclusively from LBMA-certified refiners who meet international standards for responsible mining. No gold from conflict zones, ever.",
  },
  {
    icon: "💎",
    title: "Conflict-Free Gemstones",
    body: "Every diamond we use is certified under the Kimberley Process. Our coloured stones are sourced directly from miners we know by name in India, Sri Lanka, and Zambia.",
  },
  {
    icon: "♻️",
    title: "Recycled Metals",
    body: "A portion of the gold in every piece comes from recycled sources — recovered from old jewellery and electronics — reducing the demand for newly mined material.",
  },
  {
    icon: "📦",
    title: "Plastic-Free Packaging",
    body: "Our boxes are made from FSC-certified paper and recycled card. The velvet pouches are cotton. There is not a gram of single-use plastic in anything we ship.",
  },
  {
    icon: "🏭",
    title: "Zero-Waste Workshop",
    body: "Gold filings, polishing dust, and metal offcuts are collected, weighed, and returned to the refinery. Nothing leaves our workshop wasted.",
  },
  {
    icon: "🤝",
    title: "Artisan Wages",
    body: "Every craftsperson in our workshop earns above the industry average. We publish our wage policy annually and have never used contract labour.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Sustainability</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Beautiful. Responsibly.
        </h1>
        <div className="divider-gold mb-6" />
        <p className="text-base max-w-2xl mb-14" style={{ color: "var(--ink-light)" }}>
          Luxury should not come at the cost of the people or the planet that makes it possible.
          These are the commitments we hold ourselves to — not as marketing, but as policy.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {PILLARS.map(({ icon, title, body }) => (
            <div
              key={title}
              className="rounded-sm p-6"
              style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
            >
              <div className="text-3xl mb-4">{icon}</div>
              <h2 className="font-medium mb-2" style={{ color: "var(--ink)" }}>{title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--slate)" }}>{body}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-12 rounded-sm p-8 text-center"
          style={{ background: "var(--emerald-deep)", color: "var(--pearl)" }}
        >
          <p className="font-serif text-xl mb-2">Our 2026 goal</p>
          <p className="text-sm" style={{ color: "var(--emerald-mist)" }}>
            100% recycled metal across all product lines by December 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
