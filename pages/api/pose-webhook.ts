import type { VercelRequest, VercelResponse } from "@vercel/node";
import Replicate from "replicate";
import { sql } from "@vercel/postgres";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

if (typeof process.env.REPLICATE_API_TOKEN !== "string") {
  throw new Error("must have api token replicate");
}

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  console.log("received webhook...");
  // console.log(Object.keys(request));
  console.log(request.body.output);
  const savedPayload = await prisma.replicateWebhook.create({
    data: {
      payload: request.body,
    },
  });

  response.status(200).send("ok");
}
