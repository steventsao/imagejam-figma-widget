"use client";
import {
  Navbar,
  Stack,
  Button,
  Text,
  Title,
  FileButton,
  LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import s3Init from "@/lib/aws";
import fs from "fs";

const s3 = s3Init();
export default function MyNavbar() {
  const [visible, { open, close, toggle }] = useDisclosure(false);
  const [opened, setOpened] = useState(false);
  const [file, setFile] = useState<PromiseConstructor | null>(null); // TODO: use this
  const handleUpload = async (e: File) => {
    console.log(e);
    if (e) {
      // TODO stream  issue #17
      const fileBuffer = await e.arrayBuffer();
      const uuid = crypto.randomUUID();
      console.log("file changed, ", e);
      const request = s3.putObject({
        Bucket: "bogeybot",
        Key: uuid,
        Body: Buffer.from(fileBuffer),
        ContentType: e.type,
      });
      open();
      const done = await request.promise().then((data) => {
        console.log(data, "promise");
        close();
      });
    }
  };
  console.log("visible", visible);

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
        <FileButton
          accept="video/mp4,video/x-m4v,video/*"
          onChange={handleUpload}
        >
          {(props) => {
            return visible ? (
              <LoadingOverlay visible={visible} overlayBlur={2} />
            ) : (
              <Button {...props}>Upload</Button>
            );
          }}
        </FileButton>
        {/* <Text>Swings</Text> */}
      </Stack>
    </Navbar>
  );
}
