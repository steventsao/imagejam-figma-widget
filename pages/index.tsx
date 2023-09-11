import { GetServerSidePropsContext } from "next";
import Layout from "@/components/appShellLayout";
import { Container, Group, Image, Button, Text, Slider } from "@mantine/core";
import { useState } from "react";
// useRouter import

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
const aws_base = "https://bogeybot.s3.us-west-1.amazonaws.com";
const imagekit_base = "https://ik.imagekit.io/cirnjtkq1/tr:q-25";
// https://ik.imagekit.io/cirnjtkq1/steven-test-swing/frame_0700.png
const getFrameUrl = (frame: number, urlBase = imagekit_base): string => {
  // for frame 1, return frame_0001.png, for frame 750, return frame_0750.png
  let frameString = frame.toString();
  let frameLength = frameString.length;
  while (frameLength < 4) {
    frameString = "0" + frameString;
    frameLength++;
  }
  return `${urlBase}/slomo/frame_${frameString}.png`;
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
  const urls = getFrameUrls(max_frame);
  return { props: { swingFrames: urls } };
};

export default function Home({ swingFrames }: SwingProps) {
  const [frame, setFrame] = useState(1);

  return (
    <Layout>
      <Container p="xs">
        <Image
          maw={800}
          mx="auto"
          radius="md"
          src={getFrameUrl(frame)}
          alt={`golf swing ${frame}`}
        />
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
          Frame {frame} of {max_frame}
        </Text>
        <Slider
          value={Math.floor((frame / max_frame) * 100)}
          onChange={(currentPercent: number) => {
            const frame = Math.floor(max_frame * (currentPercent / 100));
            setFrame(frame);
            // const currentPercent = Math.floor((frame / max_frame) * 100);
          }}
          marks={[
            { value: 20, label: "20%" },
            { value: 50, label: "50%" },
            { value: 80, label: "80%" },
          ]}
        />
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
