import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gemstone Guide",
  description: "Learn about diamonds, emeralds, rubies, sapphires, and pearls — the gemstones at the heart of BALAJI Fine Jewelry.",
};

const GEMS = [
  {
    name: "Diamond",
    hardness: "10 / 10 Mohs",
    origin: "India, South Africa, Canada",
    meaning: "Clarity, eternal love",
    note: "We grade by the 4Cs (cut, colour, clarity, carat). All diamonds are GIA or IGI certified.",
  },
  {
    name: "Emerald",
    hardness: "7.5–8 / 10 Mohs",
    origin: "Zambia, Colombia",
    meaning: "Growth, prosperity, wisdom",
    note: "Most emeralds have natural inclusions (called 'jardin'). This is expected and does not diminish value.",
  },
  {
    name: "Ruby",
    hardness: "9 / 10 Mohs",
    origin: "Myanmar, Mozambique, Sri Lanka",
    meaning: "Passion, protection, vitality",
    note: "The finest rubies show a 'pigeon's blood' red with a slight blue overtone. We source only heat-treated or unheated stones with full disclosure.",
  },
  {
    name: "Blue Sapphire",
    hardness: "9 / 10 Mohs",
    origin: "Sri Lanka, Kashmir, Madagascar",
    meaning: "Loyalty, truth, nobility",
    note: "Sapphires come in every colour except red (which is ruby). Kashmir sapphires command the highest premiums.",
  },
  {
    name: "Pearl",
    hardness: "2.5–4 / 10 Mohs",
    origin: "Hyderabad (South Sea), Akoya (Japan)",
    meaning: "Purity, feminine grace",
    note: "We use cultured South Sea and Akoya pearls exclusively. Avoid chemicals, perfume, and prolonged water exposure.",
  },
];

export default function GemstoneGuidePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Services</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Gemstone Guide
        </h1>
        <div className="divider-gold mb-6" />
        <p className="text-base max-w-2xl mb-12" style={{ color: "var(--ink-light)" }}>
          Precious stones carry centuries of meaning. Here is what you need to know about
          the gemstones in our collection.
        </p>

        <div className="space-y-5">
          {GEMS.map(({ name, hardness, origin, meaning, note }) => (
            <div
              key={name}
              className="rounded-sm p-6"
              style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
            >
              <h2 className="font-serif text-xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>{name}</h2>
              <div className="grid sm:grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--slate)" }}>Hardness</p>
                  <p style={{ color: "var(--ink)" }}>{hardness}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--slate)" }}>Origin</p>
                  <p style={{ color: "var(--ink)" }}>{origin}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--slate)" }}>Symbolism</p>
                  <p style={{ color: "var(--ink)" }}>{meaning}</p>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed rounded p-3"
                style={{ background: "var(--emerald-fog)", color: "var(--emerald-deep)" }}
              >
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
