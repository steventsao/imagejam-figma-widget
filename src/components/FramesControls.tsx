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
// import "@/styles/globals.css";

type FramesControlsProps = {
  frame: number;
  setFrame: (frame: number) => void;
  maxFrame: number;
  share: boolean;
};

export default function Home({
  frame,
  setFrame,
  maxFrame,
  share = false,
}: FramesControlsProps) {
  const router = useRouter();
  const shareUrl = `https://bogeybot.io/${router.asPath}`;
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
        <>
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
        </>
      ) : (
        <Text>
          Frame {frame} of {maxFrame}
        </Text>
      )}

      <Slider
        min={1}
        max={maxFrame}
        onChange={(frame: number) => {
          setFrameQuery(frame);
          // const currentPercent = Math.floor((frame / maxFrame) * 100);
        }}
        step={5}
        marks={[
          {
            value: Math.round(maxFrame / 2),
            label: Math.round(maxFrame / 2) + "",
          },
        ]}
      />
    </Stack>
  );
}
