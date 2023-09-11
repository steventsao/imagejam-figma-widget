import { GetServerSidePropsContext } from "next";
import { Image, Card, Button, Text } from "@mantine/core";
import { sql } from "@vercel/postgres";
import { useState } from "react";

type SwingProps = {
  swing?: {
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
  swingFrames: string[];
};
const max_frame = 750;
// https://ik.imagekit.io/cirnjtkq1/steven-test-swing/frame_0700.png
const getFrameUrl = (frame: number): string => {
  // for frame 1, return frame_0001.png, for frame 750, return frame_0750.png
  let frameString = frame.toString();
  let frameLength = frameString.length;
  while (frameLength < 4) {
    frameString = "0" + frameString;
    frameLength++;
  }
  console.log(frameString);
  return `https://ik.imagekit.io/cirnjtkq1/tr:q-25,w-300,h-500/steven-test-swing/frame_${frameString}.png`;
};
const getFrameUrls = (maxFrame: number): string[] => {
  let currentFrame = 1;
  const urls: string[] = [];
  while (currentFrame <= maxFrame) {
    urls.push(getFrameUrl(currentFrame));
    currentFrame++;
  }
  return urls;
};
// Get swingId from path /swing/[swingId]
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const swingId = Array.isArray(context.params?.swingId)
    ? context.params?.swingId[0]
    : context.params?.swingId;
  // TODO needs to be predictionId instead of `swingId` so it cannot be enumerated
  // const result =
  //   await sql`select "PredictionImage".url as image_url from "PredictionImage" INNER JOIN "Prediction" on "Prediction".id = "PredictionImage"."predictionId" where "PredictionImage"."predictionId" = ${swingId}`;

  // console.log(result.rows[0], "swing");
  const urls = getFrameUrls(max_frame);
  console.log(urls);
  return { props: { swingFrames: urls } };
};

export default function Swing({ swingFrames }: SwingProps) {
  const [frame, setFrame] = useState(1);
  return (
    <>
      <Text>
        Frame {frame} of {max_frame}
      </Text>
      <Card>
        <Card.Section>
          <Image
            height={500}
            width={300}
            src={getFrameUrl(frame)}
            alt={`golf swing ${frame}`}
          />
        </Card.Section>
        <Card.Section>
          <Button
            onClick={() => {
              setFrame(frame - 10);
            }}
          >
            Back 10
          </Button>
          <Button
            onClick={() => {
              setFrame(frame - 1);
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              setFrame(frame + 1);
            }}
          >
            Next
          </Button>
          <Button
            onClick={() => {
              setFrame(frame + 10);
            }}
          >
            Next 10
          </Button>
        </Card.Section>
      </Card>
      {/* <Card>
        <Card.Section>
          <Image
            src={swing.image_url}
            width={300}
            alt={`golf swing ${swing.id}`}
          />
        </Card.Section>
      </Card> */}
    </>
  );
}
