import Replicate from "replicate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Caption(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log(process.env.REPLICATE_API_TOKEN);
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN as string,
  });
  if (request.method !== "POST") {
    response.status(400).send("POST only");
    return;
  }
  // image/octet-stream
  const url = request.body;

  try {
    const output = await replicate.run(
      "pharmapsychotic/clip-interrogator:8151e1c9f47e696fa316146a2e35812ccf79cfc9eba05b11c7f450155102af70",
      {
        input: {
          image: url,
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
