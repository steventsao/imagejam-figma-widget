import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";
import Replicate from "replicate";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { PutObjectOutput } from "aws-sdk/clients/s3";
import aws from "aws-sdk";
import fs from "fs";

// TODO need another config clientside

// TODO need to not expose this key
aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
  region: "us-west-1", // e.g., 'us-west-1'
});

const prisma = new PrismaClient();
const s3 = new aws.S3();

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
  // add type of file
  const { body: file }: { body: string } = request;
  // const pipe = fs.createReadStream(file).pipe(fs.createWriteStream('image.png'));
  // pipe.on
  let s3key = crypto.randomUUID();
  console.log(typeof file);
  console.log("Saving to key ");
  const s3request = await s3.putObject(
    {
      Bucket: "bogeybot",
      Key: s3key,
      Body: Buffer.from(file, 'base64'),
      // TODO hard
      ContentType: "image/png",
    },
    (err, data: PutObjectOutput) => {
      if (err) {
        response.send(err);
        return;
      }
      console.log("ETag generated");
      const etag = data.ETag || "";
      return Promise.resolve(etag);
    }
  );
  const s3data = await s3request
    .promise()
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
  if (!s3data) {
    response.status(500);
    return;
  }
  console.log("S3 data and etag present");
  const savedImage = await prisma.swing.create({
    data: {
      blobId: s3data.ETag,
    },
  });
  // assuming file is already base64
  const image = "data:image/png;base64," + file;
  // console.log("IMAGE::::", image);
  const prediction = await replicate.predictions.create({
    version: "0304f7f774ba7341ef754231f794b1ba3d129e3c46af3022241325ae0c50fb99",
    input: {
      image,
      // TODO remove this model so it's only pose later
      prompt: "just pose detection",
    },
    // TODO fix later
    webhook: "https://bogeybot.com/api/pose-webhook",
    webhook_events_filter: ["completed"],
  });
  response.send({ image, prediction });
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
