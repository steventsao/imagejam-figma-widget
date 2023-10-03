// Duplicated from /app/layout.tsx
export default function RootLayout({
  items = [],
  children,
}: {
  items?: any[];
  children: React.ReactNode;
}) {
  console.log(items);
  const noop = () => {};
  return (
    <html>
      <head>
        <meta http-equiv="refresh" content="0; URL=https://steventsao.com" />
      </head>
      {children}
    </html>
  );
}
