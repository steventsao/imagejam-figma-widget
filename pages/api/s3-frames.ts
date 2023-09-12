import type { VercelRequest, VercelResponse } from "@vercel/node";
import Replicate from "replicate";
import { sql } from "@vercel/postgres";
import { PrismaClient } from "@prisma/client";
import { SupabaseClient } from "@supabase/supabase-js";
// allow amzn lambda
const allowCors =
  (fn: any) => async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", true + "");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };
const prisma = new PrismaClient();
const supabase = new SupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const handler = async (request: VercelRequest, response: VercelResponse) => {
  console.log("received webhook...");
  const data = await request.body;
  console.log("YEEEE", data, request.query);
  const key =
    typeof request.query.key === "string"
      ? request.query.key
      : request.query.key[0];
  //   const withoutExtension = key.split(".")[0];
  await prisma.frames.create({
    data: {
      total: Number(request.query.count),
      key: request.query.key as string,
      s3: {
        connect: {
          key,
        },
      },
    },
  });
  response.status(200).send("ok");
};

export default allowCors(handler);
