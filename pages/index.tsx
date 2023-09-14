import Layout from "@/components/pagesLayout";
import { Container, Image, List, Text, Stack } from "@mantine/core";
import { useState, Suspense } from "react";
import FramesControls from "@/components/FramesControls";
import { fetchUploads } from "@/lib/queries";
import { useRouter } from "next/router";

// import "@/styles/globals.css";

type IndexProps = {
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
  uploads: any[];
};
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

// Get swingId from path /swing/[swingId]
export const getServerSideProps = async () => {
  const uploads = await fetchUploads();
  return { props: { uploads } };
};

export default function Index({ uploads }: IndexProps) {
  const [frame, setFrame] = useState(1);

  console.log({ uploads });
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
            <List.Item>1. Upload a video</List.Item>
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
            src={getFrameUrl(frame)}
            alt={`golf swing ${frame}`}
          />
          <Suspense fallback={<div>Loading...</div>}>
            {/* HARD coding 750 */}
            <FramesControls
              frame={frame}
              setFrame={setFrame}
              maxFrame={750}
              share={false}
            />
          </Suspense>
        </Stack>
      </Container>
    </Layout>
  );
}
