import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return Response.json({ user: null }, { status: 401 });

    const { data: user } = await supabase
      .from("users")
      .select("id, email, name, role, phone")
      .eq("id", session.sub)
      .single();

    if (!user) return Response.json({ user: null }, { status: 401 });
    return Response.json({ user });
  } catch {
    return Response.json({ user: null }, { status: 500 });
  }
}

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  phone: z.string().max(20).optional(),
});

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const data = updateSchema.parse(body);

    const { data: user, error } = await supabase
      .from("users")
      .update(data)
      .eq("id", session.sub)
      .select("id, email, name, role, phone")
      .single();

    if (error) throw error;
    return Response.json({ user });
  } catch (err) {
    if (err instanceof z.ZodError) return Response.json({ error: err.issues[0].message }, { status: 422 });
    return Response.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
