"use client";
import { AppShell, Header, Text, Badge } from "@mantine/core";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

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
  console.log(items);
  return (
    <>
      <AppShell
        navbar={<Navbar items={items} onRefresh={onRefresh || noop} />}
        header={
          <Header height={60} p="md">
            <Text>
              <Link href="/" className="no-underline">
                bogeybot
              </Link>{" "}
              <Badge>beta</Badge>
              <a
                className="text-red-500 underline"
                href="https://docs.google.com/document/d/1LJvrmXdLpJSufbX-nzulfnKQEHDlqJ8o_E3qnYZ44Bk/edit"
              >
                BUGS 4 DAYZ
              </a>
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
