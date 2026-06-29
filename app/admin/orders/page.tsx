"use client";

import { useEffect, useState } from "react";
import { Search, RefreshCw, Package, Truck, X } from "lucide-react";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  trackingNumber?: string | null;
  user: { name: string; email: string };
  items: { productName: string; quantity: number }[];
}

const STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  PENDING:    { bg: "#fef3c7", color: "#92400e" },
  CONFIRMED:  { bg: "#d1fae5", color: "#065f46" },
  PROCESSING: { bg: "#dbeafe", color: "#1e40af" },
  SHIPPED:    { bg: "#ede9fe", color: "#4c1d95" },
  DELIVERED:  { bg: "#dcfce7", color: "#14532d" },
  CANCELLED:  { bg: "#fee2e2", color: "#991b1b" },
};

interface StatusModal {
  orderId: string;
  currentStatus: string;
  trackingNumber: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<StatusModal | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadOrders(); }, [page, statusFilter]);

  async function loadOrders() {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    setOrders(data.orders ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }

  function openModal(order: Order) {
    setModal({
      orderId: order.id,
      currentStatus: order.status,
      trackingNumber: order.trackingNumber ?? "",
    });
  }

  async function saveStatus() {
    if (!modal) return;
    setSaving(true);
    try {
      const body: Record<string, string> = { orderId: modal.orderId, status: modal.currentStatus };
      if (modal.trackingNumber) body.trackingNumber = modal.trackingNumber;
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Update failed");
      setOrders((prev) =>
        prev.map((o) =>
          o.id === modal.orderId
            ? { ...o, status: modal.currentStatus, trackingNumber: modal.trackingNumber || o.trackingNumber }
            : o
        )
      );
      toast.success("Order updated");
      setModal(null);
    } catch {
      toast.error("Failed to update order");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-medium" style={{ color: "var(--emerald-deep)" }}>
            Orders
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>{total} total orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div
          className="flex items-center gap-2 border rounded-sm px-3 py-2"
          style={{ borderColor: "var(--pearl-dark)", background: "var(--white)" }}
        >
          <Search className="w-4 h-4" style={{ color: "var(--slate)" }} />
          <input
            type="text"
            placeholder="Search by order #…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadOrders()}
            className="text-sm outline-none bg-transparent w-48"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="border rounded-sm px-3 py-2 text-sm outline-none"
          style={{ borderColor: "var(--pearl-dark)", background: "var(--white)", color: "var(--ink)" }}
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={loadOrders}
          className="p-2 border rounded-sm hover:bg-pearl-mid transition-colors"
          style={{ borderColor: "var(--pearl-dark)" }}
        >
          <RefreshCw className="w-4 h-4" style={{ color: "var(--slate)" }} />
        </button>
      </div>

      {/* Table */}
      <div className="rounded-sm overflow-hidden" style={{ border: "1px solid var(--pearl-dark)" }}>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--pearl-mid)" }}>
            <tr>
              {["Order", "Customer", "Items", "Total", "Status", "Date", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--slate)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--pearl-dark)" }}>
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((__, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="skeleton h-4 rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              : orders.map((order) => {
                  const style = STATUS_STYLES[order.status] ?? { bg: "#f3f4f6", color: "#374151" };
                  return (
                    <tr key={order.id} style={{ background: "var(--white)" }}>
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--emerald-deep)" }}>
                        #{order.orderNumber}
                      </td>
                      <td className="px-4 py-3">
                        <p style={{ color: "var(--ink)" }}>{order.user.name}</p>
                        <p className="text-xs" style={{ color: "var(--slate)" }}>{order.user.email}</p>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--slate)" }}>
                        {order.items.map((i) => `${i.productName} ×${i.quantity}`).join(", ").slice(0, 40)}…
                      </td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "var(--emerald-deep)" }}>
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <span
                            className="px-2.5 py-1 rounded-sm text-xs font-semibold"
                            style={{ background: style.bg, color: style.color }}
                          >
                            {order.status}
                          </span>
                          {order.trackingNumber && (
                            <p className="text-[10px] mt-1 flex items-center gap-1" style={{ color: "var(--slate)" }}>
                              <Truck className="w-3 h-3" /> {order.trackingNumber}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--slate)" }}>
                        {new Date(order.createdAt).toLocaleDateString("en", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openModal(order)}
                          className="text-xs px-2.5 py-1.5 rounded-sm border transition-colors hover:bg-emerald-fog"
                          style={{ borderColor: "var(--pearl-dark)", color: "var(--emerald)" }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>

        {!loading && orders.length === 0 && (
          <div className="py-16 text-center">
            <Package className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--pearl-dark)" }} />
            <p style={{ color: "var(--slate)" }}>No orders found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {Math.ceil(total / 20) > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(total / 20) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className="w-8 h-8 rounded-sm text-xs font-medium"
              style={{
                background: page === i + 1 ? "var(--emerald)" : "var(--white)",
                color: page === i + 1 ? "var(--pearl)" : "var(--ink)",
                border: "1px solid var(--pearl-dark)",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Status update modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div
            className="w-full max-w-sm rounded-sm p-6 space-y-5"
            style={{ background: "var(--white)", border: "1px solid var(--pearl-dark)" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm" style={{ color: "var(--ink)" }}>Update Order Status</h2>
              <button onClick={() => setModal(null)} style={{ color: "var(--slate)" }}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--slate)" }}>
                Status
              </label>
              <select
                value={modal.currentStatus}
                onChange={(e) => setModal((m) => m ? { ...m, currentStatus: e.target.value } : m)}
                className="w-full border rounded-sm px-3 py-2.5 text-sm outline-none"
                style={{ borderColor: "var(--pearl-dark)", color: "var(--ink)", background: "var(--pearl)" }}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {modal.currentStatus === "SHIPPED" && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--slate)" }}>
                  Tracking Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. DTDC1234567890"
                  value={modal.trackingNumber}
                  onChange={(e) => setModal((m) => m ? { ...m, trackingNumber: e.target.value } : m)}
                  className="w-full border rounded-sm px-3 py-2.5 text-sm outline-none"
                  style={{ borderColor: "var(--pearl-dark)", color: "var(--ink)", background: "var(--pearl)" }}
                />
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <button onClick={saveStatus} disabled={saving} className="btn-primary flex-1">
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button
                onClick={() => setModal(null)}
                className="flex-1 py-2.5 text-sm rounded-sm border"
                style={{ borderColor: "var(--pearl-dark)", color: "var(--ink)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
