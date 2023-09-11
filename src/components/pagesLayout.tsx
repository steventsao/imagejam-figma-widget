import { AppShell, Header, Text } from "@mantine/core";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

// Duplicated from /app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell
        navbar={<Navbar />}
        header={
          <Header height={60} p="md">
            <Text>bogeybot</Text>
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
