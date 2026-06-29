import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", id)
    .eq("userId", session.sub);

  if (error) return Response.json({ error: "Failed to delete address" }, { status: 500 });
  return Response.json({ ok: true });
}
