import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' data-theme='synthwave'>
      <head>
        <title>HelloWook 블로그</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
