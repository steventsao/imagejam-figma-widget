import Replicate from "replicate";
import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

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
  request: NextApiRequest,
  response: NextApiResponse
) {
  // image/octet-stream
  const text = request.body;

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:af1a68a271597604546c09c64aabcd7782c114a63539a4a8d14d1eeda5630c33",
      {
        input: {
          prompt: text,
          // TODO remove this model so it's only pose later
        },
      }
    );
    response.setHeader("Access-Control-Allow-Origin", "*");
    console.log(output);
    response.send({ message: "ok", output });
  } catch (e) {
    console.error(e);
    response.status(500).send({ message: "error" });
  }
}
