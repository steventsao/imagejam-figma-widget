import type { VercelRequest, VercelResponse } from "@vercel/node";
import Replicate from "replicate";
import aws from "aws-sdk";
import crypto from "crypto";

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
  region: "us-west-1", // e.g., 'us-west-1'
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

const s3 = new aws.S3();

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  const data = request.body;
  console.log(request.headers);
  //   console.log(data)

  const image = Buffer.from(data).toString("base64");
  //   console.log(image);
  //   https://replicate.com/philz1337/controlnet-deliberate/api
  //   const prediction = await replicate.predictions.create({
  //     version: "57d86bd78018d138449fda45bfcafb8b10888379a600034cc2c7186faab98c66",
  //     input: {
  //       image,
  //       // TODO remove this model so it's only pose later
  //       prompt: "just pose detection",
  //     },
  //     // TODO fix later
  //     webhook: "https://bogeybot.com/api/pose-webhook",
  //     webhook_events_filter: ["completed"],
  //   });

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.send({ message: "ok" });
}
