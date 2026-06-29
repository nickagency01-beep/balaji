import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug")
      .order("name");
    if (error) throw error;
    return Response.json({ categories: data ?? [] });
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
