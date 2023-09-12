import type { VercelRequest, VercelResponse } from "@vercel/node";
import Replicate from "replicate";
import { sql } from "@vercel/postgres";
import { PrismaClient } from "@prisma/client";
import { SupabaseClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();
const supabase = new SupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  console.log("received webhook...");
  const data = await request.body;
  console.log("YEEEE", data, request.query);
  response.status(200).send("ok");
}
