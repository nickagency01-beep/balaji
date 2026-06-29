import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ring Sizing Guide",
  description: "Find your perfect ring size with BALAJI's ring sizing guide — Indian, US, UK, and EU size charts.",
};

const SIZES = [
  { india: "8", us: "4", uk: "H", eu: "46.5", mm: "14.8" },
  { india: "10", us: "5", uk: "J½", eu: "49", mm: "15.7" },
  { india: "12", us: "6", uk: "L½", eu: "51.9", mm: "16.5" },
  { india: "13", us: "6½", uk: "M½", eu: "53.1", mm: "16.9" },
  { india: "14", us: "7", uk: "N", eu: "54.4", mm: "17.3" },
  { india: "15", us: "7½", uk: "O", eu: "55.7", mm: "17.7" },
  { india: "16", us: "8", uk: "P", eu: "57", mm: "18.2" },
  { india: "17", us: "8½", uk: "Q", eu: "58.3", mm: "18.6" },
  { india: "18", us: "9", uk: "R", eu: "59.5", mm: "18.9" },
  { india: "20", us: "10", uk: "T", eu: "62.1", mm: "19.8" },
];

export default function SizingGuidePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="section-eyebrow mb-3">Services</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium mb-4" style={{ color: "var(--emerald-deep)" }}>
          Ring Sizing Guide
        </h1>
        <div className="divider-gold mb-6" />
        <p className="text-base max-w-2xl mb-12" style={{ color: "var(--ink-light)" }}>
          Getting the size right the first time is important — resizing is possible but better avoided.
          Use this guide to measure accurately at home.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          <div
            className="rounded-sm p-6"
            style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
          >
            <h2 className="font-medium mb-3" style={{ color: "var(--ink)" }}>Method 1: Use a string</h2>
            <ol className="space-y-2 text-sm" style={{ color: "var(--slate)" }}>
              <li>1. Wrap a thin strip of paper or string around the base of your finger.</li>
              <li>2. Mark where the ends meet.</li>
              <li>3. Lay it flat and measure the length in millimetres.</li>
              <li>4. Look up your measurement in the table below.</li>
            </ol>
          </div>
          <div
            className="rounded-sm p-6"
            style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
          >
            <h2 className="font-medium mb-3" style={{ color: "var(--ink)" }}>Method 2: Measure an existing ring</h2>
            <ol className="space-y-2 text-sm" style={{ color: "var(--slate)" }}>
              <li>1. Take a ring that already fits the intended finger.</li>
              <li>2. Measure the internal diameter in millimetres.</li>
              <li>3. Look up the diameter in the mm column below.</li>
            </ol>
            <p className="text-sm mt-4 font-medium" style={{ color: "var(--gold-deep)" }}>
              Tip: measure in the evening when fingers are slightly larger.
            </p>
          </div>
        </div>

        <div
          className="rounded-sm overflow-hidden"
          style={{ border: "1px solid var(--pearl-dark)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--emerald-deep)", color: "var(--pearl)" }}>
                {["India", "US / Canada", "UK / Australia", "EU", "Diameter (mm)"].map((h) => (
                  <th key={h} className="py-3 px-4 text-left font-medium text-xs tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZES.map((row, i) => (
                <tr
                  key={row.india}
                  style={{
                    background: i % 2 === 0 ? "var(--white)" : "var(--pearl)",
                    color: "var(--ink)",
                  }}
                >
                  <td className="py-3 px-4 font-medium">{row.india}</td>
                  <td className="py-3 px-4">{row.us}</td>
                  <td className="py-3 px-4">{row.uk}</td>
                  <td className="py-3 px-4">{row.eu}</td>
                  <td className="py-3 px-4">{row.mm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs mt-4 text-center" style={{ color: "var(--slate)" }}>
          Not sure? We offer complimentary resizing within 30 days of purchase.
        </p>
      </div>
    </div>
  );
}
