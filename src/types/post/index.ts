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

export interface PostWithBlur extends Post {
  blurDataURL: string;
}
