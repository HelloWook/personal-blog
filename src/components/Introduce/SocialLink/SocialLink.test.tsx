import { render, screen } from '@testing-library/react';

import SocialLink from './SocialLink';
import socialLinks from '@/datas/socialLinks';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../../messages/ko.json';

describe('SocialLink', () => {
  it('정상적으로 렌더링된다', () => {
    render(
      <NextIntlClientProvider locale='ko' messages={messages}>
        <SocialLink />
      </NextIntlClientProvider>
    );

    socialLinks.forEach((link) => {
      const linkElement = screen.getByTitle(link.name);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link.url);
    });
  });
});
