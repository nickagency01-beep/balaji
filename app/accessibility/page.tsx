import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "BALAJI Fine Jewelry's commitment to making our website accessible to all users.",
};

export default function AccessibilityPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Legal</p>
        <h1 className="font-serif text-4xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Accessibility Statement
        </h1>
        <div className="divider-gold mb-4" />
        <p className="text-xs mb-10" style={{ color: "var(--slate)" }}>Last updated: June 2026</p>

        <div className="space-y-8" style={{ color: "var(--ink-light)" }}>
          <div>
            <h2 className="font-medium text-base mb-2" style={{ color: "var(--ink)" }}>Our Commitment</h2>
            <p className="text-sm leading-relaxed">
              BALAJI Fine Jewelry is committed to ensuring our website is accessible to people
              with disabilities. We strive to conform to the Web Content Accessibility Guidelines
              (WCAG) 2.1 at Level AA.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-base mb-3" style={{ color: "var(--ink)" }}>Current Measures</h2>
            <ul className="space-y-2 text-sm" style={{ color: "var(--slate)" }}>
              {[
                "Semantic HTML throughout the site for screen reader compatibility",
                "All images include descriptive alt text",
                "Sufficient colour contrast ratios across all text elements",
                "Keyboard-navigable menus and interactive elements",
                "Focus indicators visible on all interactive components",
                "Form fields linked to descriptive labels",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span style={{ color: "var(--emerald)" }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-medium text-base mb-2" style={{ color: "var(--ink)" }}>Known Limitations</h2>
            <p className="text-sm leading-relaxed">
              Some product images may have limited alt-text detail. We are actively working to
              improve descriptions across our full catalogue. Some third-party tools (payment
              processors, chat widgets) may have their own accessibility limitations outside our
              direct control.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-base mb-2" style={{ color: "var(--ink)" }}>Feedback and Contact</h2>
            <p className="text-sm leading-relaxed mb-4">
              If you experience an accessibility barrier on our website, please let us know.
              We will do our best to provide the information or service through an alternative
              means, and address the issue as quickly as possible.
            </p>
            <Link href="/contact" className="btn-primary inline-block">Report an Issue</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
