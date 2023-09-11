"use client";
import { Navbar, Stack, Button, Text, Title, FileButton } from "@mantine/core";
import { useState } from "react";
export default function MyNavbar() {
  const [opened, setOpened] = useState(false);
  const [file, setFile] = useState<File | null>(null); // TODO: use this

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Stack
        // h={300}
        sx={(theme) => ({
          //   backgroundColor:
          //     theme.colorScheme === "dark"
          //       ? theme.colors.dark[8]
          //       : theme.colors.gray[0],
        })}
      >
        <FileButton accept="video/mp4,video/x-m4v,video/*" onChange={setFile}>
          {(props) => <Button {...props}>Upload</Button>}
        </FileButton>
        {/* <Text>Swings</Text> */}
      </Stack>
    </Navbar>
  );
}
