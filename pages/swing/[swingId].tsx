import { GetServerSidePropsContext } from "next";
import Layout from "@/components/pagesLayout";
import {
  Container,
  Group,
  Image,
  Card,
  Button,
  Text,
  Slider,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { sql } from "@vercel/postgres";
import { useRouter } from "next/router";

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
  swingId: string;
  frames: number;
};
const aws_base = "https://bogeybot.s3.us-west-1.amazonaws.com";
const imagekit_base = "https://ik.imagekit.io/cirnjtkq1/tr:q-25";
// https://ik.imagekit.io/cirnjtkq1/steven-test-swing/frame_0700.png
const getFrameUrl = (
  frame: number,
  key: string,
  urlBase = imagekit_base
): string => {
  // for frame 1, return frame_0001.png, for frame 750, return frame_0750.png
  let frameString = frame.toString();
  let frameLength = frameString.length;
  while (frameLength < 4) {
    frameString = "0" + frameString;
    frameLength++;
  }
  return `${urlBase}/${key}/frame_${frameString}.png`;
};
const getFrameUrls = (maxFrame: number, key: string): string[] => {
  let currentFrame = 1;
  const urls: string[] = [];
  while (currentFrame <= maxFrame) {
    urls.push(getFrameUrl(currentFrame, key));
    currentFrame++;
  }
  return urls;
};
// Get swingId from path /swing/[swingId]
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const swingId =
    (Array.isArray(context.params?.swingId)
      ? context.params?.swingId[0]
      : context.params?.swingId) || "";
  console.log(swingId, "swingId");
  const frames =
    await sql`select total from "Frames" where key = ${swingId} limit 1`;
  console.log("FRAMES: ", frames);
  const maxFrames = frames.rows[0].total;
  console.log(maxFrames, "maxFrames");

  // TODO needs to be predictionId instead of `swingId` so it cannot be enumerated
  // const result =
  //   await sql`select "PredictionImage".url as image_url from "PredictionImage" INNER JOIN "Prediction" on "Prediction".id = "PredictionImage"."predictionId" where "PredictionImage"."predictionId" = ${swingId}`;

  // console.log(result.rows[0], "swing");
  const urls = getFrameUrls(maxFrames, swingId);
  return { props: { swingFrames: urls, swingId, frames: maxFrames } };
};

// Share raw video link
// Share current frame link
export default function Swing({ swingFrames, swingId, frames }: SwingProps) {
  const router = useRouter();
  const clientSideFrame = router.query.frame;

  console.log(frames, "MAX");
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (clientSideFrame) {
      setFrame(parseInt(clientSideFrame as string));
    }
  }, [router.query.frame]);

  // console.log(swingFrames);
  return (
    <Layout>
      <Container p="xs">
        <Card shadow="sm" padding="lg" radius="md">
          <Card.Section>
            <Image
              maw={600}
              // mah={600}
              mx="auto"
              radius="md"
              src={swingFrames[frame]}
              alt={`golf swing ${frame}`}
            />
          </Card.Section>
          <Group position="apart" mt="md" mb="xs">
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
          </Group>
          <Text>
            Frame {frame} of {frames}
          </Text>
          <Slider
            value={Math.floor((frame / frames) * 100)}
            onChange={(currentPercent: number) => {
              const frame = Math.floor(frames * (currentPercent / 100));
              setFrame(frame);
              // const currentPercent = Math.floor((frame / max_frame) * 100);
            }}
            marks={[
              { value: 20, label: "20%" },
              { value: 50, label: "50%" },
              { value: 80, label: "80%" },
            ]}
          />
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
      </Container>
    </Layout>
  );
}
