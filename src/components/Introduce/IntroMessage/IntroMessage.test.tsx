import { render, screen, waitFor } from '@testing-library/react';
import IntroMessage from './IntroMessage';
describe('IntroMessage', () => {
  it('기본 문구가 잘 렌더링된다.', async () => {
    render(<IntroMessage />);

    expect(screen.getByText('안녕하세요!')).toBeInTheDocument();
    expect(screen.getByText('를 좋아하는')).toBeInTheDocument();
    expect(screen.getByText('개발자')).toBeInTheDocument();
    expect(screen.getByText('입니다.')).toBeInTheDocument();
  });

  it('ReactTyped 컴포넌트가 올바르게 렌더링된다.', async () => {
    render(<IntroMessage />);

    await waitFor(() => {
      expect(screen.getByText(/FrontEnd|Typescript|Hamster|남정욱|HelloWook/)).toBeInTheDocument();
    });
  });
});
