import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import TimeLine from './TimeLine';
import { Activities } from '@/datas/activity';
import messages from '../../../messages/ko.json';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(async () => {
    return (key: string) => {
      // activity 객체에서 키를 찾아서 반환
      const activityKeys: Record<string, string> = {
        'activity.0.title': '동의대학교 컴퓨터 공학과 입학',
        'activity.0.description': '',
        'activity.1.title': '입대',
        'activity.1.description': '작전병으로 복무하며 한글 및 엑셀을 활용한 행정 업무 수행',
        'activity.2.title': '전역',
        'activity.2.description': '병장 만기 전역',
        'activity.3.title': '오픈 소스 컨트리뷰터 수료',
        'activity.3.description': 'Ant 디자인 시스템 번역 작업 참여',
        'activity.4.title': '프로그래머스 데브코스 프론트엔드(전공 과정) 수료',
        'activity.4.description': '',
        'activity.5.title': '동의대학교 컴퓨터 공학과 졸업',
        'activity.5.description': '',
        'activity.6.title': '코드잇 단기 심화 과정 수료',
        'activity.6.description': '',
      };
      return activityKeys[key] || key;
    };
  }),
}));

describe('TimeLine', () => {
  it('정상적으로 렌더링된다', async () => {
    render(
      <NextIntlClientProvider locale='ko' messages={messages}>
        {await TimeLine({ activities: Activities })}
      </NextIntlClientProvider>
    );

    Activities.forEach((activity) => {
      expect(screen.getByText(activity.date)).toBeInTheDocument();
      expect(screen.getByTestId(`social-link-${activity.titleKey}`)).toBeInTheDocument();
    });
  });
});
