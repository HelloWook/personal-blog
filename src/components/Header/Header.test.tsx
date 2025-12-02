import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Header from './Header';
import messages from '../../../messages/ko.json';

// 클라이언트 컴포넌트들을 모킹
jest.mock('../Drawer/DrawButton', () => {
  return function MockDrawButton() {
    return <div data-testid='draw-button'>DrawButton</div>;
  };
});

jest.mock('../ThemeToggle/ThemeContainer', () => {
  return function MockThemeContainer() {
    return <div data-testid='theme-container'>ThemeContainer</div>;
  };
});

jest.mock('../LanguageSelector/LanguageSelector', () => {
  return function MockLanguageSelector() {
    return <div data-testid='language-selector'>LanguageSelector</div>;
  };
});

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(async () => {
    return (key: string) => {
      const keys: Record<string, string> = {
        'posts': '포스트',
        'abouts': '소개',
        'projects': '프로젝트',
      };
      return keys[key] || key;
    };
  }),
}));

describe('Header', () => {
  beforeEach(() => {
    // 각 테스트 전에 DOM을 클리어
    jest.clearAllMocks();
  });

  it('헤더가 정상적으로 렌더링된다', async () => {
    render(
      <NextIntlClientProvider locale='ko' messages={messages}>
        {await Header()}
      </NextIntlClientProvider>
    );
    expect(screen.getByText('HelloWook.life')).toBeInTheDocument();
    expect(screen.getByTestId('draw-button')).toBeInTheDocument();
    expect(screen.getByTestId('theme-container')).toBeInTheDocument();
  });

  it('내비게이션 링크들이 올바르게 렌더링된다', async () => {
    render(
      <NextIntlClientProvider locale='ko' messages={messages}>
        {await Header()}
      </NextIntlClientProvider>
    );

    // Posts 링크 확인
    const postsLink = screen.getByText('포스트');
    expect(postsLink).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '포스트' })).toHaveAttribute('href', '/ko/posts');

    // Abouts 링크 확인
    const aboutsLink = screen.getByText('소개');
    expect(aboutsLink).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '소개' })).toHaveAttribute('href', '/ko/abouts');

    // Projects 링크 확인
    const projectsLink = screen.getByText('프로젝트');
    expect(projectsLink).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '프로젝트' })).toHaveAttribute('href', '/ko/projects');
  });

  it('메인 로고가 홈으로 연결된다', async () => {
    render(
      <NextIntlClientProvider locale='ko' messages={messages}>
        {await Header()}
      </NextIntlClientProvider>
    );
    expect(screen.getByRole('link', { name: 'HelloWook.life' })).toHaveAttribute('href', '/ko');
  });
});
