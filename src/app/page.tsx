"use client";
// TODO convert to server component because this is slow af
import Link from "next/link";
import MyDropzone from "@/components/MyDropzone";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Container,
  Grid,
  Card,
  Image,
  Space,
  Text,
  Badge,
  Button,
  Group,
} from "@mantine/core";

import { useEffect, useState } from "react";

type SwingItem = {
  image_url: string;
};
// https://supabase.com/dashboard/project/tkbhdbhsnikrpsutyyxk/settings/api?
export default function Home() {
  const supabase = createClientComponentClient();
  const [swingImages, setSwingImages] = useState<SwingItem[]>([]);

  // TODO make realtime
  useEffect(() => {
    (async () => {
      // ref https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
      const promise = await supabase.from("swing-public").select("image_url");
      // @ts-ignore
      setSwingImages(promise.data || []);
    })();
  }, []);

  // @ts-ignore
  console.log(swingImages);

  return (
    <main className="flex flex-col dekstop:p-24">
      <section>
        {/* @ts-ignore */}
        <Container fluid>
          <Grid gutter={5}>
            {swingImages.map((item, i) => (
              // TODO use 6 for now for both desktop and mobile
              <Grid.Col span={4} xs={12} sm={12} md={4} key={i}>
                <Card shadow="sm" padding="xl" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src={item.image_url}
                      height={300}
                      alt={`golf swing ${i}`}
                    />
                  </Card.Section>
                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Norway Fjord Adventures</Text>
                    <Badge color="pink" variant="light">
                      On Sale
                    </Badge>
                  </Group>

                  <Text size="sm" color="dimmed">
                    With Fjord Tours you can explore more of the magical fjord
                    landscapes with tours and activities on and around the
                    fjords of Norway
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </section>
      <Space h="xl" />
      <MyDropzone />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="bottom-0 left-0 flex h-48 w-full items-end justify-center">
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
