import { GetServerSidePropsContext } from "next";
import { Upload, fetchUploads } from "@/lib/queries";
import FramesControls from "@/components/FramesControls";
import Layout from "@/components/pagesLayout";
import { Container, Image, Card, Text, AspectRatio } from "@mantine/core";
import { useState, useEffect } from "react";
import { sql } from "@vercel/postgres";
import { useRouter } from "next/router";
import { SwingProps } from "@/lib/types";
import { imagekit_base } from "@/lib/constants";
import { fetchBookmarks } from "@/lib/queries";

const RAW_VIDEOS_BUCKET = "https://bogeybot-videos.s3.us-west-1.amazonaws.com";

// key can be uuid + extension
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
const getMimeType = (key: string): string => {
  const extension = key.split(".")[1];

  switch (extension) {
    case "mp4":
      return "video/mp4";
    case "mov":
      return "video/quicktime";
    case "m4v":
      return "video/x-m4v";
    default:
      return "video/mp4";
  }
};

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
  const bookmarks = await fetchBookmarks(swingId);
  const isReady = !!frames.rows[0];
  const maxFrames = frames.rows[0]?.total || 0;
  const uploads = await fetchUploads();
  // console.log(maxFrames, "maxFrames");

  // TODO needs to be predictionId instead of `swingId` so it cannot be enumerated
  // const result =
  //   await sql`select "PredictionImage".url as image_url from "PredictionImage" INNER JOIN "Prediction" on "Prediction".id = "PredictionImage"."predictionId" where "PredictionImage"."predictionId" = ${swingId}`;

  // console.log(result.rows[0], "swing");
  const urls = getFrameUrls(maxFrames, swingId);
  console.log("FETCHED BOOKMARKS:", bookmarks);
  return {
    props: {
      swingFrames: urls,
      swingId,
      frames: maxFrames,
      isReady,
      uploads,
      bookmarks,
    },
  };
};

// Share raw video link
// Share current frame link
export default function Swing({
  swingFrames,
  swingId,
  frames,
  uploads,
  isReady = false,
  bookmarks,
}: SwingProps) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  useEffect(() => {
    router.replace(router.asPath);
    console.log("REFRESH DATA");
  }, [swingId]);
  const [frame, setFrame] = useState(0);

  // Using `useEffect` to keep router and frame in-sync.
  useEffect(() => {
    const clientSideFrame = router.query.frame;
    if (clientSideFrame) {
      setFrame(parseInt(clientSideFrame as string));
    } else {
      setFrame(1);
    }
  }, [router.query.frame, swingId]);

  return (
    <Layout items={uploads} onRefresh={refreshData}>
      <Container p="xs">
        {isReady ? (
          <Card shadow="sm" padding="lg" radius="md">
            <Card.Section>
              {/* <Title>Hi</Title> */}
              {/* #lesson important to keep fit scale-down when my goal is to keep everything in one screen */}
              {/* TODO use media query so it's height 400 on the phone? */}
              <Image
                fit="scale-down"
                mih={400}
                height={500}
                radius="md"
                src={swingFrames[frame]}
                alt={`golf swing ${frame}`}
              />
            </Card.Section>
            <FramesControls
              frame={frame}
              setFrame={setFrame}
              maxFrame={frames}
              share={true}
              bookmarks={bookmarks}
            />
            <div className="mt-10 flex justify-end text-gray-500 underline">
              <a href={`${RAW_VIDEOS_BUCKET}/${swingId}`}>Source</a>
            </div>
          </Card>
        ) : (
          // Render the video link from s3 instead
          <>
            <Text>Creating frames from video...</Text>
            <video controls width="70%">
              <source
                src={`${RAW_VIDEOS_BUCKET}/${swingId}`}
                type={getMimeType(swingId)}
              />
            </video>
          </>
        )}
      </Container>
    </Layout>
  );
}
