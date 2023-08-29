import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient({ log: ["query"] });

// Can't use edge because of db work
// export const config = {
//   runtime: "edge",
// };

type SerpResult = {
  position: number;
  link: string;
};

// Googles "Golf Terms"
// Get links from first page
// Saves to Prisma db
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(process.env.SERP_API_KEY);
  if (!process.env.SERP_API_KEY) {
    throw new Error("Must provide api_key");
  }

  const url = new URL("https://serpapi.com/search.json");
  const base = "https://serpapi.com/search.json?";
  const params = new URLSearchParams(url.search);
  params.append("api_key", process.env.SERP_API_KEY);
  params.append("q", "golf terms");
  params.append("engine", "google");

  console.log(base + params);
  const results = await fetch(base + params);
  // return json hello
  try {
    const json = await results.json();

    // Return the first 10 websites
    const links = json["organic_results"].map(
      (result: SerpResult) => result.link
    );

    await Promise.all(
      links.map(
        async (link: string) =>
          await prisma.source.create({ data: { url: link } })
      )
    );

    res.status(200).send("ok");
  } catch (error) {
    console.error("error", error);
    res.status(500).send("error");
  }
}

// 1. Declare a schema you want
// 2. Generate a database using gpt and crawler

// 1. Search "Golf Terms" on Google
// 2. Visit all pages on the first page
// 3. Crawl their content
// 4. Find any content that resembles a golf term
// 5. Organize the result in this schema: word, definition, example, source url
