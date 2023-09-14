import { GetServerSidePropsContext } from "next";
import { fetchUploads } from "@/lib/queries";
import FramesControls from "@/components/FramesControls";
import Layout from "@/components/pagesLayout";
import { Container, Image, Card, Text, AspectRatio } from "@mantine/core";
import { useState, useEffect } from "react";
import { sql } from "@vercel/postgres";
import { useRouter } from "next/router";
import { SwingProps } from "@/lib/types";
import { fetchBookmarks, getMimeType } from "@/lib/queries";
import { getFrameUrls } from "@/lib/frame";

const RAW_VIDEOS_BUCKET = "https://bogeybot-videos.s3.us-west-1.amazonaws.com";

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
  const urls = getFrameUrls(maxFrames, swingId);

  return {
    props: {
      swingFrames: urls,
      frames: maxFrames,
      swingId,
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
      {isReady ? (
        <>
          <Image
            fit="scale-down"
            mih={400}
            height={500}
            radius="md"
            src={swingFrames[frame]}
            alt={`golf swing ${frame}`}
          />
          <FramesControls
            frame={frame}
            setFrame={setFrame}
            maxFrame={frames}
            share={true}
            bookmarks={bookmarks}
            enableBookmark={true}
          />
          <div className="mt-10 flex justify-end text-gray-500 underline">
            <a href={`${RAW_VIDEOS_BUCKET}/${swingId}`}>Source</a>
          </div>
        </>
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
    </Layout>
  );
}
