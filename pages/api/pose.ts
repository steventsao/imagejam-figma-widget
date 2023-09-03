import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";
import Replicate from "replicate";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
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
  const s3key = crypto.randomUUID();
  console.log("Saving to key ");
  const s3request = await s3.putObject(
    {
      Bucket: "bogeybot",
      Key: s3key,
      Body: file,
    },
    (err, data: PutObjectOutput) => {
      if (err) {
        response.send(err);
      }
      console.log("stored at", data.ETag);
      const etag = data.ETag || "";
      return Promise.resolve(etag);
    }
  );
  const s3data = await s3request.promise().then((data) => {
    return data;
  });
  console.log(s3data.ETag, s3key, "tag and key");
  const savedImage = await prisma.swing.create({
    data: {
      blobId: s3data.ETag,
    },
  });
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
  response.send({ savedImage, prediction });
  const replicatePrediction = await prisma.prediction.create({
    data: {
      url: prediction.urls.get,
      swingId: savedImage.id,
    },
  });
  console.log("Prediction saved: " + replicatePrediction.id);

  // response.send(prediction);
  // const savedPrecition = await prisma.prediction.create({
  //   data: {
  //     url:
  // response.send(data.ETag);
  // const entity = await prisma.swing.create({
  //   data: {
  //     imageUrl: `https://bogeybot.com/api/aws?key=${etag}`,
  //     replicateId: prediction.id,

  // console.log(saved);
}
