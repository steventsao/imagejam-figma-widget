import MainSection from "@/components/MainSection";
import { sql } from "@vercel/postgres";
import { Container } from "@mantine/core";
import aws from "aws-sdk";
import { SwingItem } from "@/lib/types";
import Layout from "@/components/pagesLayout";

// TODO https://github.com/steventsao/bogeybot/issues/8
// use supabase realtime database later

const IMAGEKIT_URL = "https://ik.imagekit.io/cirnjtkq1/";
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
  // https://vercel.com/steventsao-pro/bogeybot/stores/postgres/store_21MWJgp02zT6wYOZ/data
  //   const payload =
  // await sql`select "Prediction"."url" from "Swing" inner join "Prediction" on "Prediction"."swingId" = "Swing".id where "Swing"."blobId" is not null and "Prediction"."url" is not null`;
  const payload =
    await sql`WITH swing_prediction as (select "Swing".id as swing_id, "Prediction"."url" as prediction_url from "Swing" inner join "Prediction" on "Prediction"."swingId" = "Swing".id where "Swing"."blobId" is not null and "Prediction"."url" is not null)
    select s3.key as s3_key, swing_prediction.prediction_url as prediction_image_url from s3 inner join swing_prediction on s3."swingId" = swing_prediction.swing_id order by s3."createdAt" desc`;
  console.log(payload.rows, "payload");
  const swingImages = payload.rows.map((item) => {
    const imageUrl = IMAGEKIT_URL + item.s3_key;
    return { image_url: imageUrl, ...item };
  });
  return {
    props: {
      swingImages: swingImages || [],
    },
  };
};
// https://supabase.com/dashboard/project/tkbhdbhsnikrpsutyyxk/settings/api?
export default function Explore({ swingImages }: { swingImages: SwingItem[] }) {
  // @ts-ignore
  return (
    <Layout>
      <Container p="xs">
        <MainSection swingImages={swingImages} />;
      </Container>
    </Layout>
  );
}