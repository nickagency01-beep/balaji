import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certification & Authenticity",
  description: "BALAJI's hallmarking, gemstone certification, and authenticity guarantees explained.",
};

const CERTS = [
  {
    badge: "BIS",
    title: "BIS Hallmark (Bureau of Indian Standards)",
    body: "Every gold piece carries a mandatory BIS hallmark confirming purity. The mark includes the BIS logo, the purity grade (22K / 18K / 14K), the assay centre code, and the year of marking. This is the government-backed gold standard in India.",
  },
  {
    badge: "GIA",
    title: "GIA Certificate (Gemological Institute of America)",
    body: "Diamonds above 0.30 ct come with a GIA grading report. The report covers cut, colour, clarity, and carat weight independently verified by the world's foremost gemological laboratory.",
  },
  {
    badge: "IGI",
    title: "IGI Certificate (International Gemological Institute)",
    body: "Smaller diamond pieces and coloured gemstone jewellery carry an IGI certificate — a widely accepted lab grading report with full stone specifications.",
  },
  {
    badge: "KP",
    title: "Kimberley Process Compliance",
    body: "All diamonds we purchase are sourced through Kimberley Process Certified channels. This UN-backed scheme prevents conflict diamonds from entering the supply chain.",
  },
];

export default function CertificationPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Services</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Certification &amp; Authenticity
        </h1>
        <div className="divider-gold mb-6" />
        <p className="text-base max-w-2xl mb-12" style={{ color: "var(--ink-light)" }}>
          Every BALAJI piece is backed by third-party certification. Here is what each mark
          means and what it guarantees.
        </p>

        <div className="space-y-5">
          {CERTS.map(({ badge, title, body }) => (
            <div
              key={badge}
              className="flex gap-5 rounded-sm p-6"
              style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
            >
              <div
                className="w-14 h-14 rounded-sm flex-shrink-0 flex items-center justify-center font-serif font-bold text-sm"
                style={{ background: "var(--emerald-deep)", color: "var(--gold)" }}
              >
                {badge}
              </div>
              <div>
                <h2 className="font-medium mb-2" style={{ color: "var(--ink)" }}>{title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate)" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 rounded-sm p-6 text-sm"
          style={{ background: "var(--emerald-fog)", border: "1px solid var(--pearl-dark)", color: "var(--emerald-deep)" }}
        >
          <strong>Lost your certificate?</strong> Contact us with your order number and we will
          re-issue a copy or connect you with the certifying laboratory for an official duplicate.
        </div>
      </div>
    </div>
  );
}
