export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta http-equiv="refresh" content="0; URL=https://steventsao.com" />
      </head>
      {children}
    </html>
  );
}
