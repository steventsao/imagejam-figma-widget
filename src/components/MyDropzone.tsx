"use client";
import { FileButton, Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { PutObjectOutput } from "aws-sdk/clients/s3";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

function getFormData(file: File): FormData {
  const data = new FormData();

  data.append("file", file);
  return data;
}

const postFile = async (files: File[]) => {
  // TODO need to accept jpeg too
  const file = files[0];
  if (!file) {
    throw new Error("Must attach file");
  }

  console.log("uploading file", file);
  const base64File = await fileToBase64(file);
  const promise = await fetch("/api/pose", {
    method: "POST",
    body: base64File,
    headers: {
      "Content-Type": "application/text", // since we are sending a base64 string
    },
  });
  const data = await promise.body;
  console.log(data, promise);
  return data;
};
export default function MyDropzone(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      className="m-4"
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
