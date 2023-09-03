import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  console.log('received webhook...')
  console.log(request.query)
  response.status(200).send('ok');
};


