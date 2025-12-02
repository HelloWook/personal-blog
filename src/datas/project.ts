export type Release = '개발 중' | '운영 중' | '운영 종료';

export interface Project {
  title: string;
  descriptionKey: string;
  thumbnail: string;
  url: string;
  skill: string[];
  type: Release;
  roleKeys: string[];
}

export const projects: Project[] = [
  {
    title: 'Blog',
    descriptionKey: 'project.0.description',
    thumbnail: '/project/blog.png',
    url: 'https://github.com/HelloWook/personal-blog',
    skill: ['Next'],
    type: '운영 중',
    roleKeys: ['role.frontend'],
  },
  {
    title: 'Bottler',
    descriptionKey: 'project.1.description',
    thumbnail: '/project/bottler.png',
    url: 'https://github.com/prgrms-web-devcourse-final-project/WEB1_1_Postman_FE',
    skill: ['React'],
    type: '운영 종료',
    roleKeys: ['role.frontend'],
  },
  {
    title: 'Moodi',
    descriptionKey: 'project.2.description',
    thumbnail: '/project/moodi.png',
    url: 'https://github.com/prgrms-fe-devcourse/NFE1-1-3-MOODI',
    skill: ['React', 'Lambda', 'Api Gateway'],
    type: '운영 종료',
    roleKeys: ['role.fullStack'],
  },
  {
    title: 'MoneyWise',
    descriptionKey: 'project.3.description',
    thumbnail: '/project/moneyWise.png',
    url: 'https://github.com/NLL-MoneyWise/MoneyWise',
    skill: ['Next'],
    type: '운영 종료',
    roleKeys: ['role.frontend'],
  },
  {
    title: 'TalkTodo',
    descriptionKey: 'project.4.description',
    thumbnail: '/project/talktodo.png',
    url: 'https://github.com/talktodo-v2/talktodo-client',
    skill: ['Next', 'Nest'],
    type: '개발 중',
    roleKeys: ['role.fullStack'],
  },
];
