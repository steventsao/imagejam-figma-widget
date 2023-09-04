"use client";
import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import s3 from "@/lib/aws";
import { PutObjectOutput } from "aws-sdk/clients/s3";

function fileToDataURI(file: File, callback: Function) {
  const reader = new FileReader();

  reader.onload = function (event) {
    if (!event.target) {
      throw new Error("No target");
    }
    callback(event.target.result);
  };

  reader.onerror = function (error) {
    console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);
}
// @ts-ignore
const postFile = async (files) => {
  // TODO need to accept jpeg too
  const file = files[0];

  if (!file) {
    throw new Error("Must attach file");
  }

  const s3key = crypto.randomUUID();
  const s3request = await s3.putObject(
    {
      Bucket: "bogeybot",
      Key: s3key,
      Body: file,
    },
    (err, data: PutObjectOutput) => {
      if (err) {
        throw err;
      }
      console.log("stored at", data.ETag);
      const etag = data.ETag || "";
      return Promise.resolve(etag);
    }
  );
  const s3data = await s3request
    .promise()
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err, "error"));
  console.log(s3data, "upload stsao");

  // console.log("uploading file", file);
  // TODO nested bS
  // @ts-ignore
  await fileToDataURI(file, async (result) => {
    // console.log(result);
    const promise = await fetch("/api/pose", {
      method: "POST",
      headers: { "Content-Type": "image/png" },
      body: result,
    });
    const data = await promise.body;
    console.log(data, promise);
    return data;
  });
};
export default function MyDropzone(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      onDrop={postFile}
      onReject={(files) => console.log("rejected files", files)}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: rem(220), pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload size="3.2rem" stroke={1.5} color="4" />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size="3.2rem" stroke={1.5} color="4" />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="black" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
