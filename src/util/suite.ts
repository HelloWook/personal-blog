import localfont from 'next/font/local';

const suite = localfont({
  src: [
    { path: '../../public/fonts/SUITE-Regular.woff2', weight: '400' },
    { path: '../../public/fonts/SUITE-Bold.woff2', weight: '700' },
  ],
  display: 'swap',
  variable: '--font-suite',
});

export default suite;
