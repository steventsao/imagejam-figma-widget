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
  const requestType = request.headers["content-type"];
  const url = request.body;
  console.log(url);

  try {
    const output = await replicate.run(
      "rmokady/clip_prefix_caption:9a34a6339872a03f45236f114321fb51fc7aa8269d38ae0ce5334969981e4cd8",
      {
        input: {
          image: url,
          // TODO remove this model so it's only pose later
        },
      }
    );
    response.setHeader("Access-Control-Allow-Origin", "*");
    // const saved = await action.promise();
    console.log(output);
    response.send({ message: "ok", output });
  } catch (e) {
    console.error(e);
    response.status(500).send({ message: "error" });
  }
}
