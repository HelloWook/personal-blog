import { render, screen } from '@testing-library/react';
import Profile from './Profile';

jest.mock('@/util/getPlaiceholder', () => ({
  __esModule: true,
  default: async () => 'data:image/png;base64,MOCKED',
}));

describe('Profile', () => {
  it('컴포넌트가 정상적으로 렌더링된다.', async () => {
    render(<Profile />);
    const img = await screen.findByAltText('알밤');
    expect(img).toBeInTheDocument();
  });
});
