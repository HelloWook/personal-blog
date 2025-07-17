import Footer from '@/components/Footer/Footer';
import suite from '@/asset/fonts/suite';
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
      <body>
        <div className='max-w-screen-md m-auto font-suite'>
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
