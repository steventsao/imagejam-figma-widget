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
    await s3.getObject(params, async (err, data) => {
      // https://stackoverflow.com/questions/71213825/how-to-call-expressjs-endpoint-from-static-html-file-in-vercel
      // s3 defaults data to streaming instead
      const html = await data.Body;

      // Set text/html so browser renders instead of download
      response.setHeader("Content-Type", "text/html");
      response.send(html);
    });
  } catch (err) {
    response.send(err);
  }
}
