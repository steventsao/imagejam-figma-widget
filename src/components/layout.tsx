import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  AppShell,
  Navbar,
  Container,
  Group,
  Image,
  Card,
  Button,
  Text,
  Slider,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "bogeybot",
//   description: "free stuff for golfers",
// };

// Duplicated from /app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppShell
          styles={{
            main: {
              // background: theme.colors.gray[8],
            },
          }}
          navbar={
            <Navbar
              p="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              <Text>bogeybot</Text>
            </Navbar>
          }
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
