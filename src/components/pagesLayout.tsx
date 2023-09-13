"use client";
import { AppShell, Header, Text, Badge } from "@mantine/core";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

// Duplicated from /app/layout.tsx
export default function RootLayout({
  items = [],
  children,
}: {
  items?: any[];
  children: React.ReactNode;
}) {
  console.log(items);
  return (
    <>
      <AppShell
        navbar={<Navbar items={items} />}
        header={
          <Header height={60} p="md">
            <Text>
              <Link href="/" className="no-underline">
                bogeybot
              </Link>{" "}
              <Badge>beta</Badge>
            </Text>
            {/* Header content */}
          </Header>
        }
      >
        {children}
      </AppShell>
      <Analytics />
    </>
  );
}
