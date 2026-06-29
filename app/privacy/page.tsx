import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How BALAJI Fine Jewelry collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Legal</p>
        <h1 className="font-serif text-4xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Privacy Policy
        </h1>
        <div className="divider-gold mb-4" />
        <p className="text-xs mb-10" style={{ color: "var(--slate)" }}>Last updated: June 2026</p>

        <div className="prose-legal space-y-8" style={{ color: "var(--ink-light)" }}>
          {[
            {
              heading: "1. Information We Collect",
              body: "When you create an account or place an order, we collect your name, email address, phone number, and delivery address. We also collect payment information, though card details are processed by Razorpay and never stored on our servers. We collect browsing data (pages visited, products viewed) to improve your experience.",
            },
            {
              heading: "2. How We Use Your Information",
              body: "We use your information to process and ship your orders, send order confirmations and shipping updates, respond to your enquiries, and improve our website. With your consent, we may send you information about new collections and promotions. We never sell your data to third parties.",
            },
            {
              heading: "3. Data Sharing",
              body: "We share data only with service providers necessary to operate our business: Razorpay (payments), our logistics partner (shipping), Supabase (database hosting), and Vercel (website hosting). Each is contractually bound to protect your data and use it only to provide their service.",
            },
            {
              heading: "4. Cookies",
              body: "We use essential cookies to keep you logged in and maintain your shopping cart. We use analytics cookies to understand how visitors use our site. You can disable non-essential cookies in your browser settings at any time.",
            },
            {
              heading: "5. Your Rights",
              body: "Under applicable law, you have the right to access, correct, or delete your personal data. You may also withdraw marketing consent at any time. To exercise these rights, email us at hello@balajijewels.com with the subject line 'Privacy Request'.",
            },
            {
              heading: "6. Data Security",
              body: "All data is transmitted over HTTPS. Passwords are hashed and never stored in plain text. We conduct regular security reviews and store data on servers located within India where possible.",
            },
            {
              heading: "7. Changes to This Policy",
              body: "We may update this policy from time to time. Material changes will be notified by email or a prominent notice on this page. Continued use of our site after changes constitutes acceptance.",
            },
            {
              heading: "8. Contact",
              body: "For privacy-related enquiries: BALAJI Fine Jewelry, Zaveri Bazaar, Mumbai — hello@balajijewels.com.",
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
