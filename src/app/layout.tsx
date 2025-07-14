import suite from './fonts/suite';
import './globals.css';
import Header from '@/components/Header/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' data-theme='pastel' className={suite.className}>
      <head>
        <title>HelloWook 블로그</title>
      </head>
      <body className='max-w-screen-md m-auto font-suite'>
        <Header />
        {children}
      </body>
    </html>
  );
}
