import Layout from "@/components/pagesLayout";
import { Container, Image, List, Text, Stack } from "@mantine/core";
import { useState, Suspense } from "react";
import FramesControls from "@/components/FramesControls";
import { fetchUploads } from "@/lib/queries";
import { useRouter } from "next/router";
import { imagekit_base } from "@/lib/constants";
import { IndexProps } from "@/lib/types";

const DEFAULT_OBJECT_PATH = "slomo";
// for frame 1, return frame_0001.png, for frame 750, return frame_0750.png
const getDefaultFrameUrl = (frame: number, urlBase = imagekit_base): string => {
  let frameString = frame.toString();
  let frameLength = frameString.length;
  while (frameLength < 4) {
    frameString = "0" + frameString;
    frameLength++;
  }
  return `${urlBase}/${DEFAULT_OBJECT_PATH}/frame_${frameString}.png`;
};

const MAX_FRAME = 750;

// Get swingId from path /swing/[swingId]
export const getServerSideProps = async () => {
  const uploads = await fetchUploads();
  return { props: { uploads } };
};

export default function Index({ uploads }: IndexProps) {
  const [frame, setFrame] = useState(1);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <Layout items={uploads} onRefresh={refreshData}>
      <Container p="xs">
        <Stack spacing="sm">
          <Text fz="lg" fw={700}>
            Super slo-mo golf swing viewer:
          </Text>
          <List>
            <List.Item>
              1. Upload a video of your swing. *All videos will be public for
              now*
            </List.Item>
            <List.Item>2. View your swing by the frame</List.Item>
            <List.Item>
              3.
              <Text span fw={600}>
                *WIP*
              </Text>{" "}
              Label and overlay the target frames
            </List.Item>
            <List.Item>
              4.{" "}
              <Text span fw={600}>
                *WIP*
              </Text>{" "}
              Track your swings
            </List.Item>
          </List>
          <Image
            maw={800}
            mx="auto"
            radius="md"
            src={getDefaultFrameUrl(frame)}
            alt={`golf swing ${frame}`}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <FramesControls
              frame={frame}
              setFrame={setFrame}
              maxFrame={MAX_FRAME}
              share={false}
            />
          </Suspense>
        </Stack>
      </Container>
    </Layout>
  );
}
