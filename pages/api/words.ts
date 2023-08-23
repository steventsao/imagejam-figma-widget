// add a route
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  const { searchParams } = request.nextUrl;
  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "My default title";

  return res.status(500).send(title);
}
