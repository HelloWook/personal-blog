import { render, screen } from '@testing-library/react';

import SocialLink from './SocialLink';
import socialLinks from '@/datas/socialLinks';

describe('SocialLink', () => {
  it('정상적으로 렌더링된다', () => {
    render(<SocialLink />);

    socialLinks.forEach((link) => {
      const linkElement = screen.getByTitle(link.name);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link.url);
    });
  });
});
