"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/auth";

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user === null) {
      router.replace("/auth/login");
      return;
    }
    setName(user.name ?? "");
    setPhone(user.phone ?? "");
  }, [user, router]);

  if (!user) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");
      setUser(data.user);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="pt-28 pb-20 min-h-screen" style={{ background: "var(--pearl)" }}>
      <div className="max-w-xl mx-auto px-4">
        <Link
          href="/account"
          className="flex items-center gap-2 text-sm mb-8"
          style={{ color: "var(--slate)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to account
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "var(--emerald-fog)" }}
          >
            <User className="w-5 h-5" style={{ color: "var(--emerald)" }} />
          </div>
          <div>
            <p className="section-eyebrow mb-0.5">My Account</p>
            <h1 className="font-serif text-2xl font-medium" style={{ color: "var(--emerald-deep)" }}>
              Profile
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-sm p-6 space-y-5"
          style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
        >
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--slate)" }}
            >
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3 py-2.5 rounded-sm text-sm opacity-60 cursor-not-allowed"
              style={{
                background: "var(--pearl)",
                border: "1px solid var(--pearl-dark)",
                color: "var(--ink)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--slate)" }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-sm text-sm focus:outline-none"
              style={{
                background: "var(--pearl)",
                border: "1px solid var(--pearl-dark)",
                color: "var(--ink)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--slate)" }}
            >
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3 py-2.5 rounded-sm text-sm focus:outline-none"
              style={{
                background: "var(--pearl)",
                border: "1px solid var(--pearl-dark)",
                color: "var(--ink)",
              }}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && (
            <p className="text-sm" style={{ color: "var(--emerald)" }}>
              Profile updated successfully.
            </p>
          )}

          <button type="submit" disabled={saving} className="btn-primary w-full">
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
