import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metal Guide",
  description: "Everything you need to know about gold purity, platinum, and silver — choosing the right metal for your BALAJI piece.",
};

const METALS = [
  {
    name: "22K Yellow Gold",
    purity: "91.6% pure gold",
    color: "#c9a84c",
    pros: ["Richest gold colour", "Traditional Indian jewellery standard", "High resale value"],
    cons: ["Softer — not ideal for daily wear", "Scratches more easily"],
    best: "Bridal jewellery, investment pieces, occasion bangles",
  },
  {
    name: "18K Yellow Gold",
    purity: "75% pure gold",
    color: "#b8952a",
    pros: ["Excellent durability", "Holds settings securely", "Still rich in colour"],
    cons: ["Slightly less yellow than 22K"],
    best: "Rings, bracelets, everyday fine jewellery",
  },
  {
    name: "18K White Gold",
    purity: "75% pure gold (with white alloys)",
    color: "#e0e0e0",
    pros: ["Cool, platinum-like look", "Pairs well with diamonds", "Durable"],
    cons: ["Rhodium plating needs renewal every 1–2 years"],
    best: "Diamond rings, modern minimalist pieces",
  },
  {
    name: "18K Rose Gold",
    purity: "75% pure gold (with copper alloys)",
    color: "#e8a598",
    pros: ["Romantic, warm tone", "Extremely durable (copper strengthens it)", "Very on-trend"],
    cons: ["Cannot be alloyed to white or yellow tones"],
    best: "Stacking rings, modern jewellery, pendants",
  },
  {
    name: "Platinum 950",
    purity: "95% pure platinum",
    color: "#d8d8e8",
    pros: ["Extremely durable — never wears away", "Naturally white — no replating needed", "Hypoallergenic"],
    cons: ["Heavier than gold", "Higher price point"],
    best: "Engagement rings, solitaire settings, heirloom pieces",
  },
];

export default function MetalGuidePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Services</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Metal Guide
        </h1>
        <div className="divider-gold mb-6" />
        <p className="text-base max-w-2xl mb-12" style={{ color: "var(--ink-light)" }}>
          The metal you choose shapes how a piece looks, feels, and lasts. Here is everything
          you need to make an informed choice.
        </p>

        <div className="space-y-5">
          {METALS.map(({ name, purity, color, pros, cons, best }) => (
            <div
              key={name}
              className="rounded-sm p-6"
              style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  style={{ background: color, border: "1px solid rgba(0,0,0,0.08)" }}
                />
                <div>
                  <h2 className="font-medium" style={{ color: "var(--ink)" }}>{name}</h2>
                  <p className="text-xs" style={{ color: "var(--slate)" }}>{purity}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--emerald)" }}>Advantages</p>
                  <ul className="space-y-1" style={{ color: "var(--slate)" }}>
                    {pros.map((p) => <li key={p}>+ {p}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--gold-deep)" }}>Considerations</p>
                  <ul className="space-y-1" style={{ color: "var(--slate)" }}>
                    {cons.map((c) => <li key={c}>− {c}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--slate)" }}>Best for</p>
                  <p style={{ color: "var(--ink-light)" }}>{best}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
