import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  eslint: {
    dirs: ['src'],
  },
  outputFileTracingIncludes: {
    '/': ['./contents/posts/**/*'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=31536000' }],
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(withNextIntl(nextConfig));
