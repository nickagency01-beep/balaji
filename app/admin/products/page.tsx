"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Search, Plus, Pencil, Trash2, Package, X } from "lucide-react";
import toast from "react-hot-toast";
import { formatPrice, METAL_LABELS } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  sku: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  metalType: string;
  gemstone?: string | null;
  weight?: number | null;
  collection?: string | null;
  categoryId: string;
  category: { id: string; name: string };
  images: { url: string }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductForm {
  name: string;
  sku: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
  metalType: string;
  gemstone: string;
  weight: string;
  collection: string;
  isFeatured: boolean;
  isActive: boolean;
}

const EMPTY_FORM: ProductForm = {
  name: "", sku: "", slug: "", description: "",
  price: "", stock: "0", categoryId: "", metalType: "YELLOW_GOLD_18K",
  gemstone: "", weight: "", collection: "", isFeatured: false, isActive: true,
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function productToForm(p: Product): ProductForm {
  return {
    name: p.name, sku: p.sku, slug: p.slug,
    description: p.description, price: String(p.price), stock: String(p.stock),
    categoryId: p.categoryId, metalType: p.metalType,
    gemstone: p.gemstone ?? "", weight: p.weight != null ? String(p.weight) : "",
    collection: p.collection ?? "", isFeatured: p.isFeatured, isActive: p.isActive,
  };
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const [panel, setPanel] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [slugManual, setSlugManual] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/products?${params}`);
    const data = await res.json();
    setProducts(data.products ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories ?? []))
      .catch(() => {});
  }, []);

  function openAdd() {
    setForm(EMPTY_FORM);
    setSlugManual(false);
    setEditingId(null);
    setPanel("add");
  }

  function openEdit(product: Product) {
    setForm(productToForm(product));
    setSlugManual(true);
    setEditingId(product.id);
    setPanel("edit");
  }

  function closePanel() {
    setPanel(null);
    setEditingId(null);
  }

  function handleNameChange(name: string) {
    setForm((f) => ({
      ...f,
      name,
      ...(slugManual ? {} : { slug: slugify(name) }),
    }));
  }

  async function saveProduct() {
    if (!form.name || !form.price || !form.categoryId || !form.sku) {
      toast.error("Name, SKU, price, and category are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: panel === "add" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(panel === "edit" && editingId ? { productId: editingId } : {}),
          ...form,
          price: Number(form.price),
          stock: Number(form.stock || 0),
          weight: form.weight ? Number(form.weight) : null,
          gemstone: form.gemstone || null,
          collection: form.collection || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");

      if (panel === "add") {
        setProducts((prev) => [data.product, ...prev]);
        setTotal((t) => t + 1);
        toast.success("Product created");
      } else {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...data.product } : p))
        );
        toast.success("Product updated");
      }
      closePanel();
    } catch (err) {
      toast.error((err as Error).message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(productId: string, current: boolean) {
    const res = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, isActive: !current }),
    });
    if (res.ok) {
      setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isActive: !current } : p)));
      toast.success(current ? "Product hidden" : "Product published");
    }
  }

  async function deleteProduct(productId: string) {
    if (!confirm("Hide this product from the storefront?")) return;
    await fetch(`/api/admin/products?id=${productId}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    toast.success("Product hidden");
  }

  const field = (key: keyof ProductForm, label: string, opts?: {
    type?: string; placeholder?: string; required?: boolean; span?: boolean;
  }) => (
    <div className={opts?.span ? "col-span-2" : ""}>
      <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--slate)" }}>
        {label}{opts?.required && " *"}
      </label>
      <input
        type={opts?.type ?? "text"}
        placeholder={opts?.placeholder}
        value={String(form[key])}
        onChange={(e) => {
          const val = e.target.value;
          if (key === "name") { handleNameChange(val); return; }
          if (key === "slug") { setSlugManual(true); }
          setForm((f) => ({ ...f, [key]: val }));
        }}
        className="w-full px-3 py-2 rounded-sm text-sm focus:outline-none"
        style={{ background: "var(--pearl)", border: "1px solid var(--pearl-dark)", color: "var(--ink)" }}
      />
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium" style={{ color: "var(--emerald-deep)" }}>Products</h1>
          <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>{total} products</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-2 border rounded-sm px-3 py-2 mb-6 max-w-xs"
        style={{ borderColor: "var(--pearl-dark)", background: "var(--white)" }}
      >
        <Search className="w-4 h-4" style={{ color: "var(--slate)" }} />
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && loadProducts()}
          className="text-sm outline-none bg-transparent flex-1"
        />
      </div>

      {/* Table */}
      <div className="rounded-sm overflow-hidden" style={{ border: "1px solid var(--pearl-dark)" }}>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--pearl-mid)" }}>
            <tr>
              {["Product", "SKU", "Metal", "Price", "Stock", "Status", "Actions"].map((h) => (
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
                      <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded" /></td>
                    ))}
                  </tr>
                ))
              : products.map((p) => (
                  <tr key={p.id} style={{ background: "var(--white)" }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.images[0] ? (
                          <Image
                            src={p.images[0].url} alt={p.name}
                            width={40} height={40}
                            className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
                            style={{ background: "var(--pearl-mid)" }}
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                            style={{ background: "var(--emerald-fog)" }}
                          >
                            <Package className="w-5 h-5" style={{ color: "var(--emerald-light)" }} />
                          </div>
                        )}
                        <div>
                          <p className="font-medium" style={{ color: "var(--ink)" }}>{p.name}</p>
                          <p className="text-xs" style={{ color: "var(--slate)" }}>{p.category?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "var(--slate)" }}>{p.sku}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--slate)" }}>
                      {METAL_LABELS[p.metalType] ?? p.metalType}
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--emerald-deep)" }}>
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-sm"
                        style={{
                          background: p.stock < 5 ? "#fee2e2" : "var(--emerald-fog)",
                          color: p.stock < 5 ? "#991b1b" : "var(--emerald)",
                        }}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(p.id, p.isActive)}
                        className="text-xs font-semibold px-2 py-0.5 rounded-sm"
                        style={{
                          background: p.isActive ? "#dcfce7" : "#f3f4f6",
                          color: p.isActive ? "#14532d" : "#6b7280",
                        }}
                      >
                        {p.isActive ? "Published" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded transition-colors hover:bg-pearl-mid"
                          style={{ color: "var(--slate)" }}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded transition-colors hover:bg-red-50"
                          style={{ color: "#b91c1c" }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!loading && products.length === 0 && (
          <div className="py-16 text-center">
            <Package className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--pearl-dark)" }} />
            <p style={{ color: "var(--slate)" }}>No products found</p>
          </div>
        )}
      </div>

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

      {/* Add / Edit slide-over panel */}
      {panel && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.3)" }}
            onClick={closePanel}
          />
          <div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg overflow-y-auto shadow-2xl flex flex-col"
            style={{ background: "var(--white)" }}
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
              style={{ borderColor: "var(--pearl-dark)" }}
            >
              <h2 className="font-serif text-lg font-medium" style={{ color: "var(--emerald-deep)" }}>
                {panel === "add" ? "Add Product" : "Edit Product"}
              </h2>
              <button onClick={closePanel} style={{ color: "var(--slate)" }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 p-6 space-y-5">
              {/* Basic info */}
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--gold-deep)" }}>
                Basic Info
              </p>
              <div className="grid grid-cols-2 gap-4">
                {field("name", "Name", { required: true, span: true })}
                {field("sku", "SKU", { required: true, placeholder: "BLJ-001" })}
                {field("slug", "Slug", { placeholder: "auto-generated" })}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--slate)" }}>
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full px-3 py-2 rounded-sm text-sm focus:outline-none resize-none"
                  style={{ background: "var(--pearl)", border: "1px solid var(--pearl-dark)", color: "var(--ink)" }}
                />
              </div>

              {/* Pricing */}
              <p className="text-xs font-semibold uppercase tracking-wider pt-2" style={{ color: "var(--gold-deep)" }}>
                Pricing & Stock
              </p>
              <div className="grid grid-cols-2 gap-4">
                {field("price", "Price (₹)", { type: "number", required: true, placeholder: "0" })}
                {field("stock", "Stock", { type: "number", placeholder: "0" })}
              </div>

              {/* Details */}
              <p className="text-xs font-semibold uppercase tracking-wider pt-2" style={{ color: "var(--gold-deep)" }}>
                Details
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--slate)" }}>
                    Category *
                  </label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                    className="w-full px-3 py-2 rounded-sm text-sm focus:outline-none"
                    style={{ background: "var(--pearl)", border: "1px solid var(--pearl-dark)", color: "var(--ink)" }}
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--slate)" }}>
                    Metal Type
                  </label>
                  <select
                    value={form.metalType}
                    onChange={(e) => setForm((f) => ({ ...f, metalType: e.target.value }))}
                    className="w-full px-3 py-2 rounded-sm text-sm focus:outline-none"
                    style={{ background: "var(--pearl)", border: "1px solid var(--pearl-dark)", color: "var(--ink)" }}
                  >
                    {Object.entries(METAL_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>

                {field("gemstone", "Gemstone", { placeholder: "Diamond, Ruby…" })}
                {field("weight", "Weight (g)", { type: "number", placeholder: "5.2" })}
                {field("collection", "Collection", { placeholder: "Bridal, Everyday…", span: true })}
              </div>

              {/* Toggles */}
              <p className="text-xs font-semibold uppercase tracking-wider pt-2" style={{ color: "var(--gold-deep)" }}>
                Visibility
              </p>
              <div className="space-y-3">
                {([
                  { key: "isActive" as const, label: "Published (visible in store)" },
                  { key: "isFeatured" as const, label: "Featured (show on homepage)" },
                ] as const).map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setForm((f) => ({ ...f, [key]: !f[key] }))}
                      className="w-10 h-5 rounded-full relative transition-colors cursor-pointer"
                      style={{ background: form[key] ? "var(--emerald)" : "var(--pearl-dark)" }}
                    >
                      <div
                        className="absolute top-0.5 w-4 h-4 rounded-full transition-transform"
                        style={{
                          background: "white",
                          transform: form[key] ? "translateX(20px)" : "translateX(2px)",
                        }}
                      />
                    </div>
                    <span className="text-sm" style={{ color: "var(--ink)" }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Panel footer */}
            <div
              className="flex gap-3 px-6 py-4 border-t flex-shrink-0"
              style={{ borderColor: "var(--pearl-dark)" }}
            >
              <button onClick={saveProduct} disabled={saving} className="btn-primary flex-1">
                {saving ? "Saving…" : panel === "add" ? "Create Product" : "Save Changes"}
              </button>
              <button
                onClick={closePanel}
                className="px-4 py-2.5 text-sm rounded-sm border"
                style={{ borderColor: "var(--pearl-dark)", color: "var(--ink)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
