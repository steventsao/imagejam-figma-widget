import type { VercelRequest, VercelResponse } from "@vercel/node";
import Replicate from "replicate";
import aws from "aws-sdk";
import crypto from "crypto";
import { Buffer } from "buffer";
import { NextApiRequest, NextApiResponse } from "next";

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

// Why does '137' translate to '0x89'?
// Dealing with octet-stream is something new for me
// Usually I would parse or `await` the `body`
export default async function (
  request: NextApiRequest,
  response: NextApiResponse
) {
  await runMiddleware(request, response, cors);

  // image/octet-stream
  const requestType = request.headers["content-type"];
  const base64 = request.body;
  console.log(base64);
  //   Doesn't make sense it's base64
  //   GPT says raw binary can be directly piped to s3
  const action = s3.putObject({
    Bucket: "bogeybot",
    Key: "test-" + crypto.randomUUID(),
    Body: base64,
    ContentType: "image/png",
  });

  //   console.log(data)

  //   console.log(image);
  //   https://replicate.com/philz1337/controlnet-deliberate/api
  try {
    // const prediction = await replicate.predictions.create({
    //   version:
    //     "57d86bd78018d138449fda45bfcafb8b10888379a600034cc2c7186faab98c66",
    //   input: {
    //     image: base64,
    //     // TODO remove this model so it's only pose later
    //     prompt: "just pose detection",
    //   },
    //   // TODO fix later
    //   webhook: "https://bogeybot.com/api/pose-webhook",
    //   webhook_events_filter: ["completed"],
    // });

    const output = await replicate.run(
      "rmokady/clip_prefix_caption:9a34a6339872a03f45236f114321fb51fc7aa8269d38ae0ce5334969981e4cd8",
      {
        input: {
          image: base64,
          // TODO remove this model so it's only pose later
        },
      }
    );
    response.setHeader("Access-Control-Allow-Origin", "*");
    const saved = await action.promise();
    console.log(output);
    response.send({ message: "ok", output });
  } catch (e) {
    console.error(e);
    response.status(500).send({ message: "error" });
  }
}

// {
//     host: 'www.bogeybot.io',
//     'x-real-ip': '104.244.27.142',
//     'sec-ch-ua-mobile': '?0',
//     'sec-fetch-site': 'cross-site',
//     'sec-fetch-dest': 'empty',
//     'x-vercel-forwarded-for': '104.244.27.142',
//     'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114"',
//     'x-vercel-sc-headers': '{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBsb3ltZW50SWQiOiJkcGxfOHBFNm1LSnZjamhqMjdUdHJhNHRBcWlTRW9UbiIsInVubGltaXRlZCI6ZmFsc2UsInBsYW4iOiJwcm8iLCJkb21haW4iOiJ3d3cuYm9nZXlib3QuaW8iLCJibG9jayI6ZmFsc2UsImlhdCI6MTY5NDk4MzA3NiwicHJvamVjdElkIjoicHJqX2NxYTk3bldTcllKMTh1NGdWTFRNWHc5c0xabnYiLCJleHAiOjE2OTQ5ODM5OTYsIm93bmVySWQiOiJ0ZWFtX0ZJeWI2QjdJS2dTNjVOUFBKalJ5YldLaCIsInJlcXVlc3RJZCI6ImxrYjQ1LTE2OTQ5ODMwNzY5MTUtYzk4ZTk5MDU5OTNlIiwiZW52IjoicHJvZHVjdGlvbiJ9.ed4YPrPKJjI94Cm06SYHB_hKviN_BfZzcyajyTrd4Ts"}',
//     'sec-ch-ua-platform': '"macOS"',
//     'x-forwarded-host': 'www.bogeybot.io',
//     accept: '*/*',
//     'x-vercel-ip-timezone': 'America/Los_Angeles',
//     'x-forwarded-for': '104.244.27.142',
//     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Figma/116.13.2 Chrome/114.0.5735.134 Electron/25.2.0 Safari/537.36',
//     'x-vercel-proxied-for': '104.244.27.142',
//     'x-vercel-ip-latitude': '37.7825',
//     forwarded: 'for=104.244.27.142;host=www.bogeybot.io;proto=https;sig=0QmVhcmVyIGUzOTRlODU0NjQ1YzY5ZDIxMTQwNDcyNjY0N2EzNDExOGM5M2VmN2ZhMjY2NTM0MTZiNWEyYzhmZTAyNzhiNDk=;exp=1694983376',
//     'x-vercel-sc-basepath': '',
//     'x-vercel-id': 'sfo1::lkb45-1694983076915-c98e9905993e',
//     'sec-fetch-mode': 'cors',
//     'x-matched-path': '/api/test-aws',
//     'x-vercel-ip-longitude': '-122.435',
//     'x-vercel-ip-country-region': 'CA',
//     'x-vercel-proxy-signature': 'Bearer e394e854645c69d211404726647a34118c93ef7fa26653416b5a2c8fe0278b49',
//     'x-vercel-proxy-signature-ts': '1694983376',
//     'x-vercel-ip-country': 'US',
//     'x-forwarded-proto': 'https',
//     'content-length': '87961',
//     'accept-encoding': 'gzip, deflate, br',
//     'x-vercel-sc-host': 'iad1.suspense-cache.vercel-infra.com',
//     'accept-language': 'en-US',
//     'x-vercel-ip-city': 'San%20Francisco',
//     origin: 'null',
//     'x-vercel-deployment-url': 'bogeybot-fpr81gf0g-steventsao-pro.vercel.app',
//     connection: 'close'
//   }
