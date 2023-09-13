import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BUCKET_NAME = "bogeybot-videos";
// Create a s3
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
        // TODO wrong because this actually goes to the `bogeybot-videos` bucket. This will break the `Explore` page
        url: `https://${BUCKET_NAME}.s3-us-west-1.amazonaws.com/${uuid}`,
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
