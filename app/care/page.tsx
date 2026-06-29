import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care Instructions",
  description: "How to clean, store, and maintain your BALAJI jewellery to keep it looking its best for generations.",
};

const SECTIONS = [
  {
    title: "Daily Wear",
    icon: "✦",
    tips: [
      "Put jewellery on after applying perfume, hairspray, or lotion — chemicals dull gold and damage porous stones.",
      "Remove jewellery before swimming. Chlorine corrodes gold alloys and can loosen stone settings.",
      "Take rings off before using your hands for vigorous tasks — gardening, gym, cooking with acidic ingredients.",
      "Gold is soft. Avoid knocking pieces against hard surfaces.",
    ],
  },
  {
    title: "Cleaning at Home",
    icon: "✦",
    tips: [
      "Soak in warm water with a drop of mild dish soap for 5 minutes. Gently scrub with a soft baby toothbrush.",
      "Rinse under lukewarm running water. Pat dry with a soft lint-free cloth.",
      "Do not use toothpaste — it is abrasive and will scratch polished surfaces.",
      "For pearls: wipe with a barely damp cloth only. Never soak.",
      "For emeralds and opals: no ultrasonic cleaners — they fracture inclusions and coatings.",
    ],
  },
  {
    title: "Storage",
    icon: "✦",
    tips: [
      "Store each piece separately in its BALAJI pouch or box to prevent scratching.",
      "Keep pearls away from airtight containers — they need a little humidity to stay lustrous.",
      "Store silver pieces in anti-tarnish bags or with a chalk block to absorb moisture.",
      "Avoid leaving jewellery in direct sunlight for extended periods — some gemstone colours can fade.",
    ],
  },
  {
    title: "Professional Servicing",
    icon: "✦",
    tips: [
      "Bring diamond and gemstone jewellery for a professional clean and stone check once a year.",
      "White gold rhodium plating should be renewed every 12–24 months depending on wear.",
      "We offer complimentary cleaning and inspection at any time — just contact us.",
    ],
  },
];

export default function CarePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Support</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Care Instructions
        </h1>
        <div className="divider-gold mb-6" />
        <p className="text-base max-w-2xl mb-12" style={{ color: "var(--ink-light)" }}>
          Jewellery that is cared for correctly will look exactly as beautiful in fifty years as
          the day it was made. Here is how.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {SECTIONS.map(({ title, icon, tips }) => (
            <div
              key={title}
              className="rounded-sm p-6"
              style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: "var(--gold-deep)" }}>{icon}</span>
                <h2 className="font-medium" style={{ color: "var(--ink)" }}>{title}</h2>
              </div>
              <ul className="space-y-3">
                {tips.map((tip) => (
                  <li key={tip} className="text-sm leading-relaxed flex gap-2" style={{ color: "var(--slate)" }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: "var(--emerald)" }}>—</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
