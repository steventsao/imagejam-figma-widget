"use client";
// TODO convert to server component because this is slow af
import Link from "next/link";
import MyDropzone from "@/components/MyDropzone";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, Image, Space, Text, Badge, Button, Group } from "@mantine/core";
import { useEffect, useState } from "react";

// https://supabase.com/dashboard/project/tkbhdbhsnikrpsutyyxk/settings/api?
export default function Home() {
  const supabase = createClientComponentClient();
  const [swingImages, setSwingImages] = useState<string[]>([]);

  // TODO make realtime
  useEffect(() => {
    (async () => {
      // ref https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
      const promise = await supabase.from("swing-public").select("image_url");
      // @ts-ignore
      const images = promise.data.map((target) => target.image_url) || [];
      setSwingImages(images);
    })();
  }, []);

  // @ts-ignore
  console.log(swingImages);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MyDropzone />
      <Space h="xl" />
      {/* @ts-ignore */}
      {swingImages.map((url, i) => (
        <Card shadow="sm" padding="xl" key={i}>
          <Image src={url} height={300} alt={`golf swing ${i}`} />
        </Card>
      ))}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            bogeybot
          </a>
        </div>
      </div>
    </main>
  );
}
