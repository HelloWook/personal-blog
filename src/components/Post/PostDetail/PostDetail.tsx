import React from 'react';

import { MDXRemote } from 'next-mdx-remote/rsc';

import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import rehypeUnwrapImages from 'rehype-unwrap-images';

import Pre from '@/components/Pre/Pre';
import Image from 'next/image';
import { getBlurLocalImg } from '@/utils/blurImg';
import Comments from '@/components/Comments/Comments';

interface PostDetailProps {
  mdxContent: string;
}

const prettyCodeOptions: Options = {
  theme: {
    light: 'nord',
    dark: 'night-owl',
  },
  transformers: [],
};
const PostDetail = ({ mdxContent }: PostDetailProps) => {
  return (
    <>
      <article className='animate-fade-in-up'>
        <MDXRemote
          source={mdxContent}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeUnwrapImages, [rehypePrettyCode, prettyCodeOptions]],
            },
          }}
          components={{
            p: (props) => <p {...props} className='my-4 leading-8' />,
            h2: (props) => {
              const text = String(props.children);
              const id = text.toLowerCase().replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, '').replace(/\s+/g, '-');
              return <h2 {...props} id={id} className='mt-10 mb-3 text-2xl font-bold' />;
            },
            h3: (props) => {
              const text = String(props.children);
              const id = text.toLowerCase().replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, '').replace(/\s+/g, '-');
              return <h3 {...props} id={id} className='mt-8 mb-2 text-xl font-semibold' />;
            },
            a: (props) => <a {...props} className='text-blue-500 underline-animation' />,
            pre: Pre,
            img: async (props) => {
              const blurDataURL = await getBlurLocalImg(props.src);
              return (
                <h2 className='relative w-full my-6'>
                  <Image
                    {...props}
                    alt={props.alt ?? '커버 이미지'}
                    width={1200}
                    height={675}
                    className='contain rounded-xl'
                    blurDataURL={blurDataURL}
                    placeholder='blur'
                  />
                </h2>
              );
            },
          }}
        />
      </article>
      <Comments />
    </>
  );
};

export default PostDetail;
