"use client";
import { AppShell, useMantineTheme } from "@mantine/core";
import Navbar from "@/components/Navbar";
// import "@/styles/globals.css";

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
  return (
    <AppShell
      styles={{
        main: {
          // background: theme.colors.gray[8],
        },
      }}
      navbar={<Navbar />}
    >
      {children}
    </AppShell>
  );
}
