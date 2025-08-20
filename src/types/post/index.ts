import { StaticImageData } from 'next/image';

export interface Post {
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string;
  tags?: string[];
  slug: string;
  fileName: string;
  series: string;
}
