import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    // 각 테스트 전에 DOM을 클리어
    jest.clearAllMocks();
  });

  it('풋터가 정상적으로 렌더링된다', () => {
    render(<Footer />);
    expect(screen.getByText(/Copyright ©/)).toBeInTheDocument();
    expect(screen.getByText('HelloWook')).toBeInTheDocument();
  });

  it('링크가 올바르게 설정되어 있다', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'HelloWook' })).toHaveAttribute('href', 'https://github.com/HelloWook');
  });
});
