import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";
import Replicate from "replicate";
import { PrismaClient } from "@prisma/client";
import s3 from "@/lib/aws";
import { PutObjectOutput } from "aws-sdk/clients/s3";

const prisma = new PrismaClient();

if (typeof process.env.REPLICATE_API_TOKEN !== "string") {
  throw new Error("must have api token replicate");
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  const { body: file } = request;

  console.log(Object.keys(file));
  const prediction = await replicate.predictions.create({
    version: "0304f7f774ba7341ef754231f794b1ba3d129e3c46af3022241325ae0c50fb99",
    input: {
      image: file,
      // TODO remove this model so it's only pose later
      prompt: "just pose detection",
    },
    // TODO fix later
    webhook: "https://bogeybot.com/api/pose-webhook",
    webhook_events_filter: ["completed"],
  });

  const saved = await s3.putObject(
    {
      Bucket: "bogeybot",
      Key: `${prediction.id}`,
      Body: file,
    },
    (err, data: PutObjectOutput) => {
      console.log("stored at", data.ETag);
      response.send(data.ETag);
    }
  );

  // console.log(saved);
}
