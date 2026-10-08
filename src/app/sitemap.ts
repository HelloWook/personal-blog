import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/utils/seo';

type SitemapRoute = {
  path: string;
  lastModified: Date;
  changeFrequency: 'daily' | 'monthly';
  priority: number;
};

// 같은 문서의 로케일별 URL — 사이트맵에 hreflang 으로 들어간다
const localeUrls = (routePath: string) =>
  Object.fromEntries(routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${routePath}`]));

export default function sitemap(): MetadataRoute.Sitemap {
  const postsDirectory = path.join(process.cwd(), 'contents', 'posts');

  const posts = fs.readdirSync(postsDirectory).map((directory) => {
    const { data } = matter(fs.readFileSync(path.join(postsDirectory, directory, 'index.mdx'), 'utf8'));
    return { directory, lastModified: new Date(data.date) };
  });

  // 정적 페이지는 빌드 시각 대신 최신 글 날짜를 쓴다 — 빌드마다 수정됐다는 신호를 보내지 않도록
  const latestPostDate = posts.reduce(
    (latest, post) => (post.lastModified > latest ? post.lastModified : latest),
    new Date(0)
  );

  const routes: SitemapRoute[] = [
    { path: '', lastModified: latestPostDate, changeFrequency: 'daily', priority: 1 },
    { path: '/posts', lastModified: latestPostDate, changeFrequency: 'daily', priority: 0.8 },
    { path: '/abouts', lastModified: latestPostDate, changeFrequency: 'monthly', priority: 0.6 },
    { path: '/projects', lastModified: latestPostDate, changeFrequency: 'monthly', priority: 0.6 },
    ...posts.map((post) => ({
      path: `/posts/${post.directory}`,
      lastModified: post.lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  // 로케일 접두사가 붙은 실제 경로를 싣는다 (`/posts/...` 는 미들웨어가 리다이렉트하는 경로다)
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: localeUrls(route.path) },
    }))
  );
}
