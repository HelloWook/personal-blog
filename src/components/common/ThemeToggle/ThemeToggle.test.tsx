import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  it('컴포넌트가 정상적으로 렌더링된다', () => {
    render(<ThemeToggle />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('초기 테마는 synthwave이다', async () => {
    render(<ThemeToggle />);

    const htmlElement = document.documentElement;
    const theme = htmlElement.getAttribute('data-theme');
    expect(theme).toBe('pastel');
  });

  it('테마를 변경하면 data-theme 속성이 업데이트된다', () => {
    render(<ThemeToggle />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const htmlElement = document.documentElement;
    const theme = htmlElement.getAttribute('data-theme');
    expect(theme).toBe('synthwave');
  });
});
