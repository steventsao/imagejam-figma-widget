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
          Back 10
        </Button>
        <Button
          compact={true}
          variant="outline"
          onClick={() => {
            setFrameQuery(frame - 1);
          }}
        >
          Back
        </Button>
        <Button
          compact={true}
          variant="outline"
          onClick={() => {
            setFrameQuery(frame + 1);
          }}
        >
          Next
        </Button>
        <Button
          compact={true}
          variant="outline"
          onClick={() => {
            setFrameQuery(frame + 10);
          }}
        >
          Next 10
        </Button>
      </Group>
      {share ? (
        <CopyButton value={shareUrl} timeout={2000}>
          {({ copied, copy }) => (
            <Group className="hover:cursor-pointer" onClick={copy}>
              <ActionIcon color={copied ? "teal" : "gray"}>
                {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
              <Text className="ml">
                Share frame {frame} of {maxFrame}
              </Text>
            </Group>
          )}
        </CopyButton>
      ) : (
        <Text>
          Frame {frame} of {maxFrame}
        </Text>
      )}

      <Slider
        value={Math.floor((frame / maxFrame) * 100)}
        onChange={(currentPercent: number) => {
          const frame = Math.floor(maxFrame * (currentPercent / 100));
          setFrameQuery(frame);
          // const currentPercent = Math.floor((frame / maxFrame) * 100);
        }}
        marks={[
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          { value: 80, label: "80%" },
        ]}
      />
    </Stack>
  );
}
