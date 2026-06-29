import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing use of BALAJI Fine Jewelry's website and purchase of our products.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Legal</p>
        <h1 className="font-serif text-4xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Terms of Service
        </h1>
        <div className="divider-gold mb-4" />
        <p className="text-xs mb-10" style={{ color: "var(--slate)" }}>Last updated: June 2026</p>

        <div className="space-y-8" style={{ color: "var(--ink-light)" }}>
          {[
            {
              heading: "1. Acceptance of Terms",
              body: "By accessing or using the BALAJI Fine Jewelry website (balajijewels.com) or placing an order, you agree to these Terms of Service. If you do not agree, please do not use the site.",
            },
            {
              heading: "2. Products and Pricing",
              body: "All prices are listed in Indian Rupees (INR) inclusive of applicable taxes. We reserve the right to change prices at any time without notice. Product photography is representative — minor variations in colour may occur due to screen calibration. All jewellery is sold subject to availability.",
            },
            {
              heading: "3. Orders and Payment",
              body: "Placing an order constitutes an offer to purchase. We accept the offer only upon dispatching the goods. Payment is processed securely through Razorpay. We reserve the right to cancel any order at our discretion with a full refund.",
            },
            {
              heading: "4. Delivery",
              body: "We dispatch within 2 business days for in-stock items. Delivery estimates are indicative and not guaranteed. Risk of loss passes to you upon delivery to the carrier. We are not responsible for delays caused by the courier.",
            },
            {
              heading: "5. Returns and Exchanges",
              body: "Our return policy allows returns within 15 days of delivery for unworn pieces in original condition. Custom and personalised pieces are final sale. Full details are in our Returns & Exchanges page.",
            },
            {
              heading: "6. Intellectual Property",
              body: "All content on this website — photographs, text, design, and the BALAJI name and logo — is the property of BALAJI Fine Jewelry and protected by Indian copyright law. You may not reproduce, copy, or distribute any content without our prior written consent.",
            },
            {
              heading: "7. Limitation of Liability",
              body: "To the fullest extent permitted by law, BALAJI Fine Jewelry is not liable for indirect, incidental, or consequential damages arising from your use of this website or products purchased here. Our liability is limited to the value of the goods purchased.",
            },
            {
              heading: "8. Governing Law",
              body: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.",
            },
            {
              heading: "9. Contact",
              body: "For questions about these terms: BALAJI Fine Jewelry, Zaveri Bazaar, Mumbai — hello@balajijewels.com.",
            },
          ].map(({ heading, body }) => (
            <div key={heading}>
              <h2 className="font-medium text-base mb-2" style={{ color: "var(--ink)" }}>{heading}</h2>
              <p className="text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
