import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";

// Store about 1000 words with definitions
// Since they're small, try inmemory storage
// Maybe a vector store to offer similarity search
export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  const { name = "World" } = request.query;
  const { rows, fields } = await sql`SELECT * from words`;
  response.json({ rows, fields });
}
