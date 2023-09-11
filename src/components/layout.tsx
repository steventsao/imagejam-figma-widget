import { AppShell } from "@mantine/core";
import Navbar from "@/components/Navbar";

// Duplicated from /app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell navbar={<Navbar />}>{children}</AppShell>;
}
