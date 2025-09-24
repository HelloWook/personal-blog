import { render, screen } from '@testing-library/react';
import Header from './Header';

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

describe('Header', () => {
  beforeEach(() => {
    // 각 테스트 전에 DOM을 클리어
    jest.clearAllMocks();
  });

  it('헤더가 정상적으로 렌더링된다', () => {
    render(<Header />);
    expect(screen.getByText('HelloWook.life')).toBeInTheDocument();
    expect(screen.getByTestId('draw-button')).toBeInTheDocument();
    expect(screen.getByTestId('theme-container')).toBeInTheDocument();
  });

  it('내비게이션 링크들이 올바르게 렌더링된다', () => {
    render(<Header />);

    // Posts 링크 확인
    const postsLink = screen.getByText('Posts');
    expect(postsLink).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Posts' })).toHaveAttribute('href', '/posts');

    // Abouts 링크 확인
    const aboutsLink = screen.getByText('Abouts');
    expect(aboutsLink).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Abouts' })).toHaveAttribute('href', '/abouts');

    // Projects 링크 확인
    const projectsLink = screen.getByText('Projects');
    expect(projectsLink).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  });

  it('메인 로고가 홈으로 연결된다', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'HelloWook.life' })).toHaveAttribute('href', '/');
  });
});
