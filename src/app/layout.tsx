import Footer from '@/components/Footer/Footer';
import suite from '../util/suite';
import '../styles/global.css';
import Header from '@/components/Header/Header';
import Drawer from '@/components/Drawer/Drawer';

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
        <Drawer />
        <div className='max-w-[900px] w-[90%] min-h-screen m-auto '>
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
