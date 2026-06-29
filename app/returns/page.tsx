import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: "BALAJI's 15-day return policy, exchange process, and conditions for unworn jewellery.",
};

const STEPS = [
  { step: "01", title: "Initiate within 15 days", body: "Email us at hello@balajijewels.com or use the contact form. Include your order number and the reason for the return." },
  { step: "02", title: "We confirm and send a label", body: "We will email you a prepaid return shipping label within 1 business day. Do not ship without it — we cannot track unlabelled parcels." },
  { step: "03", title: "Pack securely", body: "Return the piece in its original BALAJI box with all certificates, cards, and packaging intact. Items returned without original packaging are not eligible for a refund." },
  { step: "04", title: "We inspect on receipt", body: "Once we receive and inspect the piece (typically 2–3 business days), we will confirm eligibility and process the refund or exchange." },
  { step: "05", title: "Refund to original payment method", body: "Refunds are processed within 5–7 business days to your original payment method. Custom-made and personalised pieces cannot be returned." },
];

export default function ReturnsPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Support</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Returns &amp; Exchanges
        </h1>
        <div className="divider-gold mb-6" />

        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {[
            { label: "Return window", value: "15 days" },
            { label: "Condition required", value: "Unworn, unaltered" },
            { label: "Refund timeline", value: "5–7 business days" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-sm p-5 text-center"
              style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
            >
              <p className="font-serif text-2xl font-medium mb-1" style={{ color: "var(--gold-deep)" }}>{value}</p>
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--slate)" }}>{label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-medium mb-6" style={{ color: "var(--emerald-deep)" }}>
          How to Return
        </h2>
        <div className="space-y-px mb-12">
          {STEPS.map(({ step, title, body }) => (
            <div
              key={step}
              className="flex gap-5 p-5"
              style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                style={{ background: "var(--emerald-fog)", color: "var(--emerald)" }}
              >
                {step}
              </div>
              <div>
                <p className="font-medium text-sm mb-1" style={{ color: "var(--ink)" }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate)" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-sm p-6 text-sm space-y-2"
          style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
        >
          <h3 className="font-medium mb-3" style={{ color: "var(--ink)" }}>Not eligible for return</h3>
          {["Custom-made or personalised pieces", "Items showing signs of wear, alteration, or damage", "Items returned without original packaging or certificates", "Orders placed during sale events (marked clearly at checkout)"].map((item) => (
            <p key={item} className="flex gap-2" style={{ color: "var(--slate)" }}>
              <span style={{ color: "var(--gold-deep)" }}>—</span> {item}
            </p>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/contact" className="btn-primary inline-block">Start a Return</Link>
        </div>
      </div>
    </div>
  );
}
