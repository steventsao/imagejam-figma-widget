import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import aws from "aws-sdk";
import crypto from "crypto";

const prisma = new PrismaClient({ log: ["query"] });
const scrapingbeeUrl = "https://app.scrapingbee.com/api/v1/";

aws.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: "us-west-1", // e.g., 'us-west-1'
});

const s3 = new aws.S3();
// Can't use edge because of db work
// export const config = {
//   runtime: "edge",
// };

// Check for uncrawled target
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const target = await prisma.source.findFirst({
    where: { lastCrawledAt: null },
  });
  if (!target) {
    res.status(200).send("no links available");
    return;
  }
  console.log("Crawling: " + target.url);
  const scrapeUrl = `${scrapingbeeUrl}?api_key=${process.env.SCRAPINGBEE_API_KEY}&url=${target.url}&json_response=True`;
  try {
    const result = await fetch(scrapeUrl);

    console.log(result);
    const html = await result.json();

    // TODO this is not saved yet. Should look for a JSON storage
    const key = crypto.randomUUID();
    const params = {
      Bucket: "bogeybot",
      Key: key,
      Body: html.body,
    };
    try {
      // TODO add s3 object ID to prisma
      await s3.putObject(params, (err, data) => {
        console.log(data);
        res.status(200).json({ key });
      });
      await prisma.source.update({
        where: { id: target.id },
        data: { lastCrawledAt: new Date(), objectId: key },
      });
    } catch (err) {
      res.status(500).send(err);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
