"use client";
import { Group, Text, useMantineTheme, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

function fileToDataURI(file, callback) {
    const reader = new FileReader();

    reader.onload = function(event) {
        callback(event.target.result);
    };

    reader.onerror = function(error) {
        console.error('Error reading file:', error);
    };

    reader.readAsDataURL(file);

}
const postFile = async (files) => {
	// TODO need to accept jpeg too
	const file = files[0]

	if (!file) {
		throw new Error("Must attach file");
	}
	console.log('uploading file', file)
	// TODO nested bS
	await fileToDataURI(file, async (result) => {
		console.log(result);
			const promise = await fetch("/api/pose", {method:'POST', headers:{"Content-Type":"image/png"}, body:result})
	const data = await promise.body;
	console.log(data, promise);
	return data;
	})



}
export default function MyDropzone(props:Partial<DropzoneProps>) {

	return (<Dropzone
      onDrop={postFile}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={4}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={4}
          />
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
    </Dropzone>)
}