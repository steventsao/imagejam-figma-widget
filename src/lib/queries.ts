import { sql } from "@vercel/postgres";

export type Upload = {
  key: string;
  id: number;
  status: string;
  url: string;
};

export const fetchUploads = async (): Promise<Upload[]> => {
  const uploadsSql =
    await sql`select "UploadJob".id as uploadjob_id, s3.key, s3.id, "UploadJob".status as status, s3.url as url from "UploadJob" inner join s3 on "UploadJob"."s3Id" = s3.id order by s3."createdAt" desc limit 10`;
  return uploadsSql.rows.map((u) => {
    return { key: u.key, id: u.id, status: u.status, url: u.url };
  });
};

export const fetchBookmarks = async (swingId: string) => {
  const { rows: bookmarks } =
    await sql`select "Bookmark".label as label, "Bookmark".frame as value from "Bookmark" inner join s3 on "Bookmark"."s3Id" = s3.id where s3.key = ${swingId} limit 1`;
  return bookmarks;
};
