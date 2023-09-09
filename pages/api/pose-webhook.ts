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
  const imageUrl = request.body.output[0];
  // TODO shitty querying pattern, should update all in one go
  const targetPrediction = await prisma.prediction.findFirst({
    where: { replicate_prediction_id: request.body.id },
  });
  if (imageUrl && targetPrediction) {
    const predictionImage = await prisma.predictionImage.create({
      data: {
        url: imageUrl,
        predictionId: targetPrediction.id,
      },
    });
  }

  const { error } = await supabase
    .from("swing-public")
    .insert({ image_url: imageUrl });

  response.status(200).send("ok");
}
