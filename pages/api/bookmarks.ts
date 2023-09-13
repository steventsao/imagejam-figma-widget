import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";
import { sql } from "@vercel/postgres";

const prisma = new PrismaClient();

type Bookmark = {
  value: number; // frame
  label: string;
};
const BUCKET_NAME = "bogeybot-videos";
// Create a s3
export default async function Bookmarks(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    response.status(400).send("POST only");
    return;
  }
  try {
    const { bookmarks, swingId } = JSON.parse(request.body);
    console.log(bookmarks, "BOOKMARKS");
    console.log(swingId, "uploadJob");
    // response.json({ message: "hi" });

    // A bookmark model has to have an s3 key, in this case it's swingId
    // TODO only upload one bookmark until moving beyong impact frame
    const bookmark = bookmarks[0];
    const {
      rows: [{ id: s3Id }],
    } = await sql`select id from s3 where ${swingId} = key limit 1`;
    console.log(`Associating bookmark with S3 ID: ${s3Id}"`);

    if (bookmark) {
      const result = await prisma.bookmark.create({
        data: {
          frame: bookmarks[0].value,
          label: bookmarks[0].label,
          s3Id,
        },
      });
      response.json({ message: result });
    } else {
      // TODO this should not be needed clientside
      response.json({ message: "no bookmark" });
    }

    // TODO query uploadJob associated with swingId

    // const result = await prisma.bookmark.createMany({
    //   data: bookmarks.map((bookmark: Bookmark) => {
    //     return {
    //       frame: bookmark.value,
    //       label: bookmark.label,
    //       uploadJobId: swingId,
    //     };
    //   }),
    // });

    // console.log("UUID:", uuid);
    // const s3instance = await prisma.s3.create({
    //   data: {
    //     key: uuid,
    //     // TODO wrong because this actually goes to the `bogeybot-videos` bucket. This will break the `Explore` page
    //     url: `https://${BUCKET_NAME}.s3-us-west-1.amazonaws.com/${uuid}`,
    //   },
    // });

    // const upload = await prisma.uploadJob.create({
    //   data: {
    //     s3Id: s3instance.id,
    //     status: "complete",
    //     userId: 1,
    //   },
    // });
    // response.json({ message: result });
  } catch (e) {
    console.error(e);
    response.status(500);
  }

  //   Need double quote mixed case table names
}
