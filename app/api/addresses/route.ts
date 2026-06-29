import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const addressSchema = z.object({
  label: z.string().default("Home"),
  fullName: z.string().min(1),
  phone: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().default("IN"),
});

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("userId", session.sub)
    .order("createdAt", { ascending: false });

  return Response.json({ addresses: addresses ?? [] });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = addressSchema.parse(body);

    const { data: address, error } = await supabase
      .from("addresses")
      .insert({ id: `addr_${Date.now()}`, userId: session.sub, ...data })
      .select()
      .single();

    if (error) throw error;
    return Response.json({ address }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return Response.json({ error: err.issues[0].message }, { status: 422 });
    return Response.json({ error: "Failed to save address" }, { status: 500 });
  }
}
