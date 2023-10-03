import Replicate from "replicate";
import { NextApiRequest, NextApiResponse } from "next";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export default async function (
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { url, text } = JSON.parse(request.body);

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:af1a68a271597604546c09c64aabcd7782c114a63539a4a8d14d1eeda5630c33",
      {
        input: {
          image: url,
          prompt: text,
        },
      }
    );
    response.send({ message: "ok", output });
  } catch (e) {
    console.error(e);
    response.status(500).send({ message: "error" });
  }
}
