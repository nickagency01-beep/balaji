import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Collections — Fine Jewelry",
  description:
    "Explore BALAJI's complete jewelry collection. Filter by metal, gemstone, price, and more.",
};

interface SearchParams {
  category?: string;
  metal?: string;
  gemstone?: string;
  priceMin?: string;
  priceMax?: string;
  sort?: string;
  search?: string;
  collection?: string;
  page?: string;
}

async function getProducts(params: SearchParams) {
  const page = Math.max(1, Number(params.page ?? 1));
  const perPage = 24;

  try {
    let query = supabase
      .from("products")
      .select(`*, images:product_images(*), category:categories(id,name,slug)`, { count: "exact" })
      .eq("isActive", true);

    if (params.search) {
      query = query.or(
        `name.ilike.%${params.search}%,description.ilike.%${params.search}%,gemstone.ilike.%${params.search}%`
      );
    }
    if (params.category) query = query.eq("categories.slug", params.category);
    if (params.collection) query = query.ilike("collection", params.collection);
    if (params.gemstone) query = query.ilike("gemstone", `%${params.gemstone}%`);
    if (params.metal) query = query.eq("metalType", params.metal);
    if (params.priceMin) query = query.gte("price", Number(params.priceMin));
    if (params.priceMax) query = query.lte("price", Number(params.priceMax));

    if (params.sort === "price_asc") query = query.order("price", { ascending: true });
    else if (params.sort === "price_desc") query = query.order("price", { ascending: false });
    else if (params.sort === "newest") query = query.order("createdAt", { ascending: false });
    else query = query.order("isFeatured", { ascending: false });

    const { data: products, error, count } = await query.range(
      (page - 1) * perPage,
      page * perPage - 1
    );

    if (error) throw error;
    return { products: products ?? [], total: count ?? 0, page, perPage };
  } catch {
    return { products: [], total: 0, page: 1, perPage };
  }
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { products, total, page, perPage } = await getProducts(params);

  return (
    <div className="pt-32 pb-20">
      <CatalogClient
        initialProducts={products as never}
        total={total}
        page={page}
        perPage={perPage}
        initialSearch={params.search}
      />
    </div>
  );
}
