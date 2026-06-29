import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const search = searchParams.get("search");
    const perPage = 20;

    let query = supabase
      .from("products")
      .select("*, images:product_images(*), category:categories(id,name,slug)", { count: "exact" })
      .order("createdAt", { ascending: false })
      .range((page - 1) * perPage, page * perPage - 1);

    if (search) query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);

    const { data: products, count, error } = await query;
    if (error) throw error;

    return Response.json({ products: products ?? [], total: count ?? 0, page, perPage });
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const id = `prod_${Date.now()}`;
    const slug = (body.slug?.trim() || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    const { data: product, error } = await supabase
      .from("products")
      .insert({
        id,
        slug,
        name: body.name,
        sku: body.sku,
        description: body.description,
        price: Number(body.price),
        stock: Number(body.stock ?? 0),
        categoryId: body.categoryId,
        metalType: body.metalType,
        gemstone: body.gemstone || null,
        weight: body.weight ? Number(body.weight) : null,
        collection: body.collection || null,
        isFeatured: body.isFeatured ?? false,
        isActive: body.isActive ?? true,
        metaTitle: body.metaTitle || null,
        metaDesc: body.metaDesc || null,
      })
      .select("*, images:product_images(*), category:categories(id,name,slug)")
      .single();
    if (error) throw error;
    return Response.json({ product }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
    const { productId, ...data } = await req.json();
    const { data: product, error } = await supabase.from("products").update(data).eq("id", productId).select().single();
    if (error) throw error;
    return Response.json({ product });
  } catch {
    return Response.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");
    if (!productId) return Response.json({ error: "ID required" }, { status: 400 });
    await supabase.from("products").update({ isActive: false }).eq("id", productId);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
