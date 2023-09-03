import type { VercelRequest, VercelResponse } from "@vercel/node";
import Replicate from "replicate";
import { sql } from "@vercel/postgres";

if (typeof process.env.REPLICATE_API_TOKEN !== "string") {
  throw new Error("must have api token replicate");
}

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  console.log("received webhook...");
  console.log(request);
  response.status(200).send("ok");
}
