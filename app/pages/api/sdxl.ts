import Replicate from "replicate";
import { NextApiRequest, NextApiResponse } from "next";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

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
        },
      }
    );
    console.log(output);
    response.send({ message: "ok", output });
  } catch (e) {
    console.error(e);
    response.status(500).send({ message: "error" });
  }
}
