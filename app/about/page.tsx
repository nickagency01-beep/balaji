import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Three generations of master jewellers from Mumbai's Zaveri Bazaar — the story behind BALAJI Fine Jewelry.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Our Story</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Three Generations of Light
        </h1>
        <div className="divider-gold mb-12" />

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--ink-light)" }}>
            <p>
              BALAJI was born in 1971 in the heart of Mumbai's Zaveri Bazaar, where master goldsmith
              Ramesh Mehta set up a small workshop with a single flame and a lifelong obsession
              with precision.
            </p>
            <p>
              What began as a one-man atelier making wedding bangles for local families grew quietly
              over three decades into a name that jewellery connoisseurs across India came to trust
              without question.
            </p>
            <p>
              Today, his granddaughter Priya leads the brand into a new chapter — one that honours
              every hand-forged tradition while bringing BALAJI's heirloom aesthetic to a generation
              that wears gold with as much ease on a Monday as on a wedding day.
            </p>
          </div>
          <div
            className="rounded-sm aspect-[4/3] flex items-center justify-center"
            style={{ background: "var(--emerald-fog)", border: "1px solid var(--pearl-dark)" }}
          >
            <div className="text-center">
              <p className="font-serif text-5xl" style={{ color: "var(--emerald)" }}>1971</p>
              <p className="text-sm mt-2 tracking-widest uppercase" style={{ color: "var(--slate)" }}>Founded in Mumbai</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            { stat: "50+", label: "Years of craft" },
            { stat: "3", label: "Generations of artisans" },
            { stat: "10,000+", label: "Pieces created" },
          ].map(({ stat, label }) => (
            <div
              key={label}
              className="rounded-sm p-8 text-center"
              style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
            >
              <p className="font-serif text-4xl font-medium mb-2" style={{ color: "var(--gold-deep)" }}>{stat}</p>
              <p className="text-sm" style={{ color: "var(--slate)" }}>{label}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded-sm p-8 text-center"
          style={{ background: "var(--emerald-deep)", color: "var(--pearl)" }}
        >
          <p className="font-serif text-2xl font-medium mb-3">
            "Every piece we make is meant to outlast the moment it was made for."
          </p>
          <p className="text-sm" style={{ color: "var(--emerald-mist)" }}>— Ramesh Mehta, Founder</p>
        </div>
      </div>
    </div>
  );
}
