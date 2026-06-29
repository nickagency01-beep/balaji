"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/auth";

interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const EMPTY_FORM = {
  label: "Home",
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "IN",
};

export default function AddressesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (user === null) {
      router.replace("/auth/login");
      return;
    }
    fetch("/api/addresses")
      .then((r) => r.json())
      .then((d) => setAddresses(d.addresses ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!user) return null;

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAddresses((prev) => [data.address, ...prev]);
      setShowForm(false);
      setForm(EMPTY_FORM);
    } catch {
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/addresses/${id}`, { method: "DELETE" });
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="pt-28 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-2xl mx-auto px-4">
        <Link
          href="/account"
          className="flex items-center gap-2 text-sm mb-8"
          style={{ color: "var(--slate)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to account
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "var(--emerald-fog)" }}
            >
              <MapPin className="w-5 h-5" style={{ color: "var(--emerald)" }} />
            </div>
            <div>
              <p className="section-eyebrow mb-0.5">My Account</p>
              <h1 className="font-serif text-2xl font-medium" style={{ color: "var(--emerald-deep)" }}>
                Saved Addresses
              </h1>
            </div>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          )}
        </div>

        {showForm && (
          <form
            onSubmit={handleAdd}
            className="rounded-sm p-6 mb-6 space-y-4"
            style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
          >
            <h2 className="font-medium text-sm" style={{ color: "var(--ink)" }}>
              New Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {([
                { key: "fullName", label: "Full Name", type: "text", span: false, required: true },
                { key: "phone", label: "Phone", type: "tel", span: false, required: true },
                { key: "line1", label: "Address Line 1", type: "text", span: true, required: true },
                { key: "line2", label: "Address Line 2", type: "text", span: true, required: false },
                { key: "city", label: "City", type: "text", span: false, required: true },
                { key: "state", label: "State", type: "text", span: false, required: true },
                { key: "postalCode", label: "Postal Code", type: "text", span: false, required: true },
              ] as const).map(({ key, label, type, span, required }) => (
                <div key={key} className={span ? "col-span-2" : ""}>
                  <label
                    className="block text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "var(--slate)" }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    required={required}
                    value={(form as Record<string, string>)[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-sm text-sm focus:outline-none"
                    style={{
                      background: "var(--pearl)",
                      border: "1px solid var(--pearl-dark)",
                      color: "var(--ink)",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1">
                {saving ? "Saving…" : "Save Address"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
                className="flex-1 py-2.5 text-sm rounded-sm"
                style={{
                  background: "var(--pearl)",
                  color: "var(--ink)",
                  border: "1px solid var(--pearl-dark)",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="skeleton h-28 rounded" />
            ))}
          </div>
        ) : addresses.length === 0 ? (
          <div
            className="rounded-sm p-12 text-center"
            style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
          >
            <MapPin className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--pearl-dark)" }} />
            <p className="text-sm" style={{ color: "var(--slate)" }}>No saved addresses yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary inline-block mt-4"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="rounded-sm p-5 flex justify-between items-start"
                style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
              >
                <div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-sm mb-2 inline-block"
                    style={{ background: "var(--emerald-fog)", color: "var(--emerald)" }}
                  >
                    {addr.label}
                  </span>
                  <p className="font-medium text-sm" style={{ color: "var(--ink)" }}>
                    {addr.fullName}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "var(--slate)" }}>
                    {addr.line1}
                    {addr.line2 ? `, ${addr.line2}` : ""}
                  </p>
                  <p className="text-sm" style={{ color: "var(--slate)" }}>
                    {addr.city}, {addr.state} {addr.postalCode}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "var(--slate-light)" }}>
                    {addr.phone}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="p-1.5 rounded-sm hover:bg-red-50 transition-colors"
                  style={{ color: "var(--slate-light)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--slate-light)")}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
