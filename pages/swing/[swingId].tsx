import { GetServerSidePropsContext } from "next";
import { Image, Card } from "@mantine/core";
import { sql } from "@vercel/postgres";

type SwingProps = {
  swing: {
    id: number;
    createdAt: Date;
    image_url?: string;
    blobId?: string;
    userId?: number;
    // The types for `user`, `s3`, and `predictions` would depend on their respective structures.
    // Replace `any` with the appropriate types.
    user?: any;
    s3?: any;
    predictions?: any[];
  };
};
// Get swingId from path /swing/[swingId]
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const swingId = Array.isArray(context.params?.swingId)
    ? context.params?.swingId[0]
    : context.params?.swingId;
  // TODO needs to be predictionId instead of `swingId` so it cannot be enumerated
  const result =
    await sql`select "PredictionImage".url as image_url from "PredictionImage" INNER JOIN "Prediction" on "Prediction".id = "PredictionImage"."predictionId" where "PredictionImage"."predictionId" = ${swingId}`;

  console.log(result.rows[0], "swing");
  return { props: { swing: result.rows[0] } };
};

export default function Swing({ swing }: SwingProps) {
  return (
    <>
      <Card>
        <Card.Section>
          <Image
            src={swing.image_url}
            width={300}
            alt={`golf swing ${swing.id}`}
          />
        </Card.Section>
      </Card>
    </>
  );
}
