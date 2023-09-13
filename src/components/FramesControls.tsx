import {
  Stack,
  Group,
  Button,
  Text,
  Slider,
  ActionIcon,
  CopyButton,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Bookmark } from "@/lib/types";
import { useState, useEffect } from "react";
// import "@/styles/globals.css";

type FramesControlsProps = {
  frame: number;
  setFrame: (frame: number) => void;
  maxFrame: number;
  share: boolean;
  bookmarks?: Bookmark[];
};

export default function FramesControls({
  frame,
  setFrame,
  maxFrame,
  share = false,
  bookmarks = [],
}: FramesControlsProps) {
  const router = useRouter();
  const shareUrl = `https://bogeybot.io/${router.asPath}`;

  // TODO local bookmark state is fucking shit up
  console.log("bookmarks", bookmarks);
  // Reflect edit right away, but post separately
  const [optimisticBookmarks, setOptimisticBookmarks] = useState([
    ...bookmarks,
  ]);
  const setFrameQuery = (frame: number) => {
    setFrame(frame);
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, frame },
      },
      undefined,
      { shallow: true }
    );
  };

  // useEffect(() => {
  //   fetch("/api/bookmarks", {
  //     method: "POST",
  //     body: JSON.stringify({ bookmarks, swingId: router.query.swingId }),
  //   });
  // }, [bookmarks]);
  return (
    <Stack>
      <Group position="apart" mt="md" mb="xs">
        <Button
          // secondary
          // className="text-black-500"
          compact={true}
          variant="outline"
          onClick={() => {
            setFrameQuery(frame - 10);
          }}
        >
          {"<<"} 10 frames
        </Button>
        <Button
          compact={true}
          variant="outline"
          onClick={() => {
            setFrameQuery(frame - 1);
          }}
        >
          {"<"} 1 frame
        </Button>
        <Button
          compact={true}
          variant="outline"
          onClick={() => {
            setFrameQuery(frame + 1);
          }}
        >
          1 frame {">"}
        </Button>
        <Button
          compact={true}
          variant="outline"
          onClick={() => {
            setFrameQuery(frame + 10);
          }}
        >
          10 frames {">>"}
        </Button>
      </Group>
      {share ? (
        <Group position="apart">
          <CopyButton value={shareUrl} timeout={2000}>
            {({ copied, copy }) => (
              <Group className="hover:cursor-pointer" onClick={copy}>
                <ActionIcon color={copied ? "teal" : "gray"}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
                <Text className="ml">
                  Share frame {frame} of {maxFrame}
                </Text>
              </Group>
            )}
          </CopyButton>
          <Button
            variant="outline"
            onClick={async () => {
              // Optimistic update alongside hard refresh? https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
              setOptimisticBookmarks((b) => [
                ...b,
                { value: frame, label: "impact" },
              ]);

              const result = await fetch("/api/bookmarks", {
                method: "POST",
                body: JSON.stringify({
                  // Destructure to avoid sending the same thing back
                  bookmarks: [{ value: frame, label: "impact" }],
                  swingId: router.query.swingId,
                }),
              }).then((success) => {
                // REFRESH?
                // I want to localize the changes instead of the whole page
                // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
                router.replace(router.asPath);
              });
              console.log("POSTED bookmarks:", result);
            }}
          >
            Bookmark frame {frame} as impact frame
          </Button>
        </Group>
      ) : (
        <Text>
          Frame {frame} of {maxFrame}
        </Text>
      )}

      <Slider
        min={1}
        max={maxFrame}
        value={frame}
        onChange={(frame: number) => {
          setFrameQuery(frame);
          // const currentPercent = Math.floor((frame / maxFrame) * 100);
        }}
        step={5}
        // TODO why does optimistics updates fuck up on transition such that it leaves the last swing bookmark present?
        marks={bookmarks}
      />
    </Stack>
  );
}
