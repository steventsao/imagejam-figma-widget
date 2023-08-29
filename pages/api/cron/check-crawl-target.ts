import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient({ log: ["query"] });
const scrapingbeeUrl = "https://app.scrapingbee.com/api/v1/";

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
    console.log(html);
    res.status(200).send(html.body);
  } catch (err) {
    res.status(500).send(err);
  }
}
