import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function Upload(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    response.status(400).send("POST only");
    return;
  }
  try {
    const { uuid } = JSON.parse(request.body);
    console.log("UUID:", uuid);
    const s3instance = await prisma.s3.create({
      data: {
        key: uuid,
        url: `https://bogeybot.s3-us-west-1.amazonaws.com/${uuid}`,
      },
    });

    const upload = await prisma.uploadJob.create({
      data: {
        s3Id: s3instance.id,
        status: "complete",
        userId: 1,
      },
    });
    response.json({ uploadId: upload.id, s3: s3instance.id });
  } catch (e) {
    console.error(e);
    response.status(500);
  }

  //   Need double quote mixed case table names
}
