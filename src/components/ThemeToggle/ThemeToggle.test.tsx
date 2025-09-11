import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    // 디바운싱 기능이라 페이크 타이머 설정
    jest.useFakeTimers();
  });

  it('컴포넌트가 정상적으로 렌더링된다', () => {
    render(<ThemeToggle defaultTheme='pastel' />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('테마를 변경하면 data-theme 속성이 업데이트된다', () => {
    render(<ThemeToggle defaultTheme='pastel' />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const htmlElement = document.documentElement;
    const theme = htmlElement.getAttribute('data-theme');
    expect(theme).toBe('synthwave');

    fireEvent.click(checkbox);
    const updatedTheme = htmlElement.getAttribute('data-theme');
    expect(updatedTheme).toBe('pastel');
  });
});
