export type Release = '개발 중' | '운영 중' | '운영 종료';

export interface Project {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  skill: string[];
  type: Release;
  role: string[];
}

export const projects: Project[] = [
  {
    title: 'Blog',
    description: '나의 성장 기록',
    thumbnail: '/project/blog.png',
    url: 'https://github.com/HelloWook/personal-blog',
    skill: ['Next'],
    type: '운영 중',
    role: ['프론트'],
  },
  {
    title: 'Bottler',
    description: '바다에 뛰우는 익명 편지',
    thumbnail: '/project/bottler.png',
    url: 'https://github.com/prgrms-web-devcourse-final-project/WEB1_1_Postman_FE',
    skill: ['React'],
    type: '운영 종료',
    role: ['프론트'],
  },
  {
    title: 'Moodi',
    description: '감정을 기록하는 일기장',
    thumbnail: '/project/moodi.png',
    url: 'https://github.com/prgrms-fe-devcourse/NFE1-1-3-MOODI',
    skill: ['React', 'Lambda', 'Api Gateway'],
    type: '운영 종료',
    role: ['풀스택'],
  },
  {
    title: 'MoneyWise',
    description: '똑똑한 일정 관리',
    thumbnail: '/project/moneyWise.png',
    url: 'https://github.com/NLL-MoneyWise/MoneyWise',
    skill: ['Next'],
    type: '운영 종료',
    role: ['프론트'],
  },
  {
    title: 'TalkTodo',
    description: '대화형 할 일 목록',
    thumbnail: '/project/talktodo.png',
    url: 'https://github.com/talktodo-v2/talktodo-client',
    skill: ['Next', 'Nest'],
    type: '개발 중',
    role: ['풀스택'],
  },
];
