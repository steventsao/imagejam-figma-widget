import Replicate from "replicate";
import { NextApiRequest, NextApiResponse } from "next";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export default async function Caption(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    response.status(400).send("POST only");
    return;
  }
  // image/octet-stream
  const url = request.body;

  try {
    // Cool learning from https://github.com/lucataco/cog-sdxl-clip-interrogator
    const output = await replicate.run(
      "lucataco/sdxl-clip-interrogator:d90ed1292165dbad1fc3fc8ce26c3a695d6a211de00e2bb5f5fec4815ea30e4c",
      {
        input: {
          image: url,
          mode: "fast",
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
