import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press",
  description: "BALAJI in the media — press coverage, awards, and media contact information.",
};

const COVERAGE = [
  { outlet: "Vogue India", headline: "The Indian Fine Jewelry Brands Worth Knowing", year: "2025" },
  { outlet: "Harper's Bazaar India", headline: "Heirloom Pieces for the Modern Woman", year: "2025" },
  { outlet: "Architectural Digest India", headline: "Where Craft Meets Luxury", year: "2024" },
  { outlet: "Financial Times", headline: "India's Quiet Luxury Revolution", year: "2024" },
  { outlet: "Condé Nast Traveller India", headline: "The Jewellers Redefining Mumbai", year: "2023" },
];

export default function PressPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Press</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          BALAJI in the Media
        </h1>
        <div className="divider-gold mb-12" />

        <div className="space-y-px mb-16">
          {COVERAGE.map(({ outlet, headline, year }) => (
            <div
              key={headline}
              className="flex items-center justify-between p-5"
              style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
            >
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--gold-deep)" }}>{outlet}</p>
                <p className="font-medium" style={{ color: "var(--ink)" }}>{headline}</p>
              </div>
              <p className="text-sm ml-6 flex-shrink-0" style={{ color: "var(--slate)" }}>{year}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded-sm p-8"
          style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
        >
          <h2 className="font-serif text-2xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
            Media Enquiries
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--slate)" }}>
            For press samples, photography, interview requests, or brand information, please
            reach out to our communications team.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-block"
          >
            Contact Press Team
          </Link>
        </div>
      </div>
    </div>
  );
}
