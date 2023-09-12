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
import Link from "next/link";

const s3 = s3Init();
type Props = { items?: any[] };
const TARGET_BUCKET = "bogeybot-videos";
export default function MyNavbar(props: Props = { items: [] }) {
  const [visible, { open, close }] = useDisclosure(false);
  const [opened, setOpened] = useState(false);
  //   TODO handle reupload
  const handleUpload = async (e: File) => {
    console.log(e);
    if (e) {
      // TODO stream  issue #17
      const fileBuffer = await e.arrayBuffer();
      const uuid = crypto.randomUUID();
      // TODO this is gonna cause problems with other media types. Be certain to check the type
      const key = e.type === "video/mp4" ? `${uuid}.mp4` : uuid;
      const request = s3.putObject({
        Bucket: TARGET_BUCKET,
        Key: key,
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
            body: JSON.stringify({ uuid: key, etag: data.ETag }),
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
              <Button variant="filled" {...props}>
                Upload
              </Button>
            );
          }}
        </FileButton>
        {/* <Text>Swings</Text> */}
        {/* TODO implement refresh */}
        {/* https://github.com/steventsao/bogeybot/issues/18 */}
        {props.items?.map((item, i) => (
          // TODO query the swingId page and split image automatically
          //   Think about the value prop besides frame-by-frame viewing. YouTube does that better
          <Link href={`/swing/${item.key}`} key={`${i}-prop`}>
            Swing #{item.id}
          </Link>
        ))}
        {/* TODO https://vercel.com/guides/how-can-i-use-aws-s3-with-vercel */}
        {/* Try form data; maybe that would help streaming the upload */}
      </Stack>
    </Navbar>
  );
}
