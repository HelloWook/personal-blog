import { render, screen } from '@testing-library/react';

import SubTitle from './SubTitle';

describe('SubTitle', () => {
  it('제목과 설명이 정상적으로 렌더링된다', () => {
    const title = '테스트 제목';
    const description = '테스트 설명입니다.';
    render(<SubTitle title={title} description={description} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
