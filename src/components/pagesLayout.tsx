"use client";
import {
  AppShell,
  Header,
  Text,
  Badge,
  MediaQuery,
  Burger,
} from "@mantine/core";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { useState } from "react";

// Duplicated from /app/layout.tsx
export default function RootLayout({
  items = [],
  children,
  onRefresh,
}: {
  items?: any[];
  onRefresh?: () => void;
  children: React.ReactNode;
}) {
  const noop = () => {};
  const [opened, setOpened] = useState(false);
  console.log(`Rendering ${items.length} items in Navbar`);

  return (
    <>
      <AppShell
        navbar={
          <Navbar
            items={items}
            onRefresh={onRefresh || noop}
            setOpened={setOpened}
            opened={opened}
          />
        }
        header={
          <Header height={60} p="md">
            <div className="justify-between flex">
              <Text>
                <Link href="/" className="no-underline">
                  bogeybot
                </Link>{" "}
                <a
                  className="text-red-500 underline"
                  href="https://docs.google.com/document/d/1LJvrmXdLpJSufbX-nzulfnKQEHDlqJ8o_E3qnYZ44Bk/edit"
                >
                  <Badge color="red">alpha</Badge>
                </a>
                <Link href="https://twitter.com/_steventsao>">
                  @_steventsao
                </Link>
              </Text>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  mr="xl"
                />
              </MediaQuery>
            </div>
          </Header>
        }
      >
        {children}
      </AppShell>
      <Analytics />
    </>
  );
}
