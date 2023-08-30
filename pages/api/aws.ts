import type { VercelRequest, VercelResponse } from "@vercel/node";
import aws from "aws-sdk";
import crypto from "crypto";

aws.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: "us-west-1", // e.g., 'us-west-1'
});

const s3 = new aws.S3();

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  const params = {
    Bucket: "bogeybot",
    Key: crypto.randomUUID(),
    Body: request.body,
  };
  try {
    await s3.putObject(params, (err, data) => {
      console.log(data);
      response.send(data);
    });
  } catch (err) {
    response.send(err);
  }
}
