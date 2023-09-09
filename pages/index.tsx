import MainSection from "@/components/MainSection";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { sql } from "@vercel/postgres";
import aws from "aws-sdk";
import { SwingItem } from "@/lib/types";

aws.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: "us-west-1", // e.g., 'us-west-1'
});

const s3 = new aws.S3();

// get public URL of s3 objects

// https://stackoverflow.com/questions/76725399/nextjs-how-to-fix-getserversideprops-is-not-supported-in-app
export const getServerSideProps = async () => {
  // TODO Converge supabase and postgres into one payload
  const supabase = createClientComponentClient();
  const promise = await supabase.from("swing-public").select("image_url");
  // https://vercel.com/steventsao-pro/bogeybot/stores/postgres/store_21MWJgp02zT6wYOZ/data
  //   const payload =
  // await sql`select "Prediction"."url" from "Swing" inner join "Prediction" on "Prediction"."swingId" = "Swing".id where "Swing"."blobId" is not null and "Prediction"."url" is not null`;
  const payload =
    await sql`WITH swing_prediction as (select "Swing".id as swing_id, "Prediction"."url" as prediction_url from "Swing" inner join "Prediction" on "Prediction"."swingId" = "Swing".id where "Swing"."blobId" is not null and "Prediction"."url" is not null)
    select s3.url as source_url, swing_prediction.prediction_url from s3 inner join swing_prediction on s3."swingId" = swing_prediction.swing_id`;
  console.log(payload, "payload");
  return {
    props: {
      swingImages: promise.data || [],
    },
  };
};
// https://supabase.com/dashboard/project/tkbhdbhsnikrpsutyyxk/settings/api?
export default function Home({ swingImages }: { swingImages: SwingItem[] }) {
  // @ts-ignore
  return <MainSection swingImages={swingImages} />;
}
