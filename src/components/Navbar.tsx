"use client";
import {
  Navbar,
  Stack,
  Button,
  FileButton,
  LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import s3Init from "@/lib/aws";

const s3 = s3Init();
type Props = { items: any[] };
export default function MyNavbar(props: Props) {
  const [visible, { open, close }] = useDisclosure(false);
  const [opened, setOpened] = useState(false);
  //   TODO handle reupload
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
      await request
        .promise()
        .then((data) => {
          console.log(data, "promise");
          return fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({ uuid, etag: data.ETag }),
          });
        })
        .then((res) => {
          close();
        });
    }
  };
  console.log("visible", visible);
  console.log(props.items, "items");

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
        {/* TODO implement refresh */}
        {/* https://github.com/steventsao/bogeybot/issues/18 */}
        {props.items.map((item, i) => (
          <a target="_blank" key={`${i}-prop`} href={item.url}>
            {item.url}
          </a>
        ))}
      </Stack>
    </Navbar>
  );
}
