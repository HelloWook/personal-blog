export interface Activity {
  date: string;
  title: string;
  description: string;
}

export const Activities: Activity[] = [
  { date: '2019-03-01', title: '동의대학교 컴퓨터 공학과 입학', description: '' },
  {
    date: '2020-08-04',
    title: '입대',
    description: '작전병으로 복무하며 한글 및 엑셀을 활용한 행정 업무 수행',
  },
  { date: '2022-02-03', title: '전역', description: '병장 만기 전역' },
  {
    date: '2024-11-01',
    title: '오픈 소스 컨트리뷰터 수료',
    description: 'Ant 디자인 시스템 번역 작업 참여',
  },
  {
    date: '2024-12-11',
    title: '프로그래머스 데브코스 프론트엔드(전공 과정) 수료',
    description: '',
  },
  {
    date: '2025-02-01',
    title: '동의대학교 컴퓨터 공학과 졸업',
    description: '',
  },
  {
    date: '2025-08-13',
    title: '코드잇 단기 심화 과정 수료',
    description: '',
  },
];
