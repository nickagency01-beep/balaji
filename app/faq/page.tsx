"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is all your gold BIS hallmarked?",
    a: "Yes. Every gold piece we sell carries a mandatory BIS hallmark confirming the purity grade — 22K, 18K, or 14K. You will find the hallmark stamped on the piece itself and noted on your certificate.",
  },
  {
    q: "Do you ship across India?",
    a: "We ship to all pin codes across India via insured courier. Delivery is 3–5 business days for most locations. For remote areas, it may take up to 7 business days. International shipping is currently unavailable.",
  },
  {
    q: "Can I return a piece I don't like?",
    a: "Yes, within 15 days of delivery for unworn, unaltered pieces in their original packaging with all certificates. Custom and personalised pieces are non-returnable. See our Returns & Exchanges page for the full process.",
  },
  {
    q: "How do I know my ring size?",
    a: "Use our Ring Sizing Guide — it covers Indian, US, UK, and EU sizes with two at-home measurement methods. If you are between sizes, we recommend ordering the larger size. We offer complimentary resizing within 30 days of purchase.",
  },
  {
    q: "Can I customise a piece?",
    a: "Yes. Our 'Design Your Own' service lets you choose the metal, stone, setting style, and engraving. Custom orders take 15–20 business days. Visit the Designer page to get started or contact us with a reference image.",
  },
  {
    q: "Are your diamonds certified?",
    a: "Diamonds above 0.30 ct come with a GIA grading report. Smaller stones carry an IGI certificate. All diamonds are conflict-free under the Kimberley Process. Certificates are included with your order.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, all major credit and debit cards, net banking, and EMI options via Razorpay. Payments are processed securely — we never store your card details.",
  },
  {
    q: "How do I care for my jewellery?",
    a: "Clean with warm soapy water and a soft brush. Store each piece separately in its BALAJI pouch. Avoid chemicals, perfume contact, and chlorinated water. See our full Care Instructions page for gemstone-specific guidance.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "All BALAJI orders ship in our signature jewellery box with a velvet pouch, tissue paper, and a ribbon. Gift messaging can be added at checkout at no extra charge.",
  },
  {
    q: "Is my package insured during shipping?",
    a: "Yes. All shipments are fully insured for the purchase value. In the event of loss or damage in transit, we will replace or refund your order at no cost to you.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid var(--pearl-dark)", background: "var(--white)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium text-sm pr-4" style={{ color: "var(--ink)" }}>{q}</span>
        <span
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-lg transition-transform"
          style={{
            color: "var(--gold-deep)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--slate)" }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Support</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Frequently Asked Questions
        </h1>
        <div className="divider-gold mb-12" />

        <div className="space-y-px">
          {FAQS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
        </div>

        <div
          className="mt-12 rounded-sm p-6 text-center"
          style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
        >
          <p className="font-medium mb-2" style={{ color: "var(--ink)" }}>Still have a question?</p>
          <p className="text-sm mb-4" style={{ color: "var(--slate)" }}>
            Our team responds within one business day.
          </p>
          <a href="/contact" className="btn-primary inline-block">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
