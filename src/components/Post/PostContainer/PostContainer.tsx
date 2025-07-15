import React from 'react';
import PostList from '../PostList/PostList';

// 목 데이터
const mockPosts = [
  {
    id: '1',
    title: 'Next.js 13으로 개인 블로그 만들기',
    excerpt:
      'App Router와 Server Components를 활용해서 모던한 개인 블로그를 구축하는 방법을 단계별로 알아보겠습니다. TypeScript와 Tailwind CSS도 함께 사용합니다.',
    date: '2024-01-15',
    readTime: '8분',
    thumbnail: '/images/nextjs-blog.jpg',
    tags: ['Next.js', 'TypeScript', 'React'],
    slug: 'nextjs-personal-blog',
  },
  {
    id: '2',
    title: 'React Hook 완벽 가이드',
    excerpt:
      'useState, useEffect부터 커스텀 훅까지, React Hook의 모든 것을 예제와 함께 상세히 설명합니다. 함수형 컴포넌트의 강력함을 경험해보세요.',
    date: '2024-01-10',
    readTime: '12분',
    thumbnail: '/images/react-hooks.jpg',
    tags: ['React', 'Hooks', 'JavaScript'],
    slug: 'complete-react-hooks-guide',
  },
  {
    id: '3',
    title: 'TypeScript 실전 활용법',
    excerpt:
      '실제 프로젝트에서 TypeScript를 효과적으로 사용하는 방법과 팁들을 공유합니다. 타입 안정성을 높이고 개발 생산성을 향상시켜보세요.',
    date: '2024-01-05',
    readTime: '10분',
    thumbnail: '/images/typescript-tips.jpg',
    tags: ['TypeScript', 'JavaScript', 'Web'],
    slug: 'typescript-practical-tips',
  },
  {
    id: '4',
    title: 'Tailwind CSS로 반응형 디자인 마스터하기',
    excerpt:
      'Utility-first CSS 프레임워크인 Tailwind CSS를 사용해서 아름답고 반응형인 웹 디자인을 만드는 노하우를 전수합니다.',
    date: '2023-12-28',
    readTime: '6분',
    tags: ['CSS', 'Tailwind', 'Design'],
    slug: 'tailwind-responsive-design',
  },
  {
    id: '5',
    title: 'Git 브랜치 전략과 협업 워크플로우',
    excerpt:
      '팀 프로젝트에서 효과적인 Git 브랜치 전략을 수립하고, 원활한 협업을 위한 워크플로우를 구축하는 방법을 알아봅니다.',
    date: '2023-12-20',
    readTime: '7분',
    thumbnail: '/images/git-workflow.jpg',
    tags: ['Git', 'Collaboration', 'DevOps'],
    slug: 'git-branch-strategy-workflow',
  },
];

const PostContainer = () => {
  return (
    <div className='mt-8'>
      <div className='mb-6'>
        <h2 className='mb-2 text-2xl font-bold text-gray-900 dark:text-white'>최근 포스트</h2>
        <p className='text-gray-600 dark:text-gray-400'>개발과 관련된 다양한 주제들을 다룹니다</p>
      </div>
      <PostList posts={mockPosts} />
    </div>
  );
};

export default PostContainer;
