import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description: "How every BALAJI piece is made — from raw gold to finished heirloom, entirely by hand.",
};

const STEPS = [
  {
    step: "01",
    title: "Design & Wax Carving",
    body: "Each design begins as a hand-drawn sketch, refined over days before our artisans carve a precise wax model. This model becomes the mould for casting.",
  },
  {
    step: "02",
    title: "Lost-Wax Casting",
    body: "The wax model is invested in plaster and burned out in a kiln. Molten gold — at exactly 1,064°C — is poured in. The result is a raw casting that carries every contour of the original carving.",
  },
  {
    step: "03",
    title: "Handwork & Filing",
    body: "Skilled craftspeople spend hours filing, hammering, and finishing each piece by hand. Machine shortcuts are never taken on the details that matter.",
  },
  {
    step: "04",
    title: "Stone Setting",
    body: "Our setters place each gemstone individually using prong, bezel, or pavé techniques — securing stones so they sit perfectly flush and catch light at the right angle.",
  },
  {
    step: "05",
    title: "Polishing",
    body: "A multi-stage polish brings out the depth of the gold — from matte brushed finishes to mirror-bright high polish, depending on the design.",
  },
  {
    step: "06",
    title: "BIS Hallmarking",
    body: "Every piece is sent to a BIS-certified assay centre. The hallmark confirms the exact gold purity — 14K, 18K, or 22K — giving you a guarantee that outlasts the receipt.",
  },
];

export default function CraftsmanshipPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Craftsmanship</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Made Entirely by Hand
        </h1>
        <div className="divider-gold mb-6" />
        <p className="text-base max-w-2xl mb-14" style={{ color: "var(--ink-light)" }}>
          From the first sketch to the final hallmark, every BALAJI piece passes through at least
          twelve pairs of hands. Here is what those hands do.
        </p>

        <div className="space-y-px">
          {STEPS.map(({ step, title, body }) => (
            <div
              key={step}
              className="flex gap-6 p-6"
              style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-serif font-medium text-sm"
                style={{ background: "var(--emerald-fog)", color: "var(--emerald)" }}
              >
                {step}
              </div>
              <div>
                <h2 className="font-medium mb-1" style={{ color: "var(--ink)" }}>{title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate)" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
