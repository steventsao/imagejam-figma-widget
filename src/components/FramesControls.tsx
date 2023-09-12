import { Group, Button, Text, Slider } from "@mantine/core";
// import "@/styles/globals.css";

type FramesControlsProps = {
  frame: number;
  setFrame: (frame: number) => void;
};

const max_frame = 750;
export default function Home({ frame, setFrame }: FramesControlsProps) {
  return (
    <>
      <Group position="apart" mt="md" mb="xs">
        <Button
          // secondary
          compact={true}
          variant="outline"
          onClick={() => {
            setFrame(frame - 10);
          }}
        >
          Back 10
        </Button>
        <Button
          compact={true}
          variant="outline"
          onClick={() => {
            setFrame(frame - 1);
          }}
        >
          Back
        </Button>
        <Button
          compact={true}
          variant="outline"
          onClick={() => {
            setFrame(frame + 1);
          }}
        >
          Next
        </Button>
        <Button
          compact={true}
          variant="outline"
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
    </>
  );
}
