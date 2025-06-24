import './globals.css';
import Header from '@/components/common/Header/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' data-theme='pastel'>
      <head>
        <title>HelloWook 블로그</title>
      </head>
      <body className='max-w-screen-md m-auto'>
        <Header />
        {children}
      </body>
    </html>
  );
}
