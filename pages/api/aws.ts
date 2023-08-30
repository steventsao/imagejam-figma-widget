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
  if (typeof request.query.key !== "string") {
    response.send({ message: "key must be a string" });
    return;
  }
  const params = {
    Bucket: "bogeybot",
    Key: request.query.key,
  };
  try {
    await s3.getObject(params, (err, data) => {
      response.send(data);
    });
  } catch (err) {
    response.send(err);
  }
}
