import Replicate from "replicate";
import aws from "aws-sdk";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

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
  await runMiddleware(request, response, cors);
  // image/octet-stream
  const requestType = request.headers["content-type"];
  const url = request.body;
  console.log(url);
  //   Doesn't make sense it's base64
  //   GPT says raw binary can be directly piped to s3
  //   const action = s3.putObject({
  //     Bucket: "bogeybot",
  //     Key: "test-" + crypto.randomUUID(),
  //     Body: base64,
  //     ContentType: "image/png",
  //   });

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
