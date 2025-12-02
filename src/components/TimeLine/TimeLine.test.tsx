import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import TimeLine from './TimeLine';
import { Activities } from '@/datas/activity';
import messages from '@/messages/ko.json';

describe('TimeLine', () => {
  it('정상적으로 렌더링된다', async () => {
    const TimeLineComponent = await TimeLine({ activities: Activities });
    render(
      <NextIntlClientProvider locale='ko' messages={messages}>
        {TimeLineComponent}
      </NextIntlClientProvider>
    );

    Activities.forEach((activity) => {
      expect(screen.getByText(activity.date)).toBeInTheDocument();
      expect(screen.getByTestId(`social-link-${activity.titleKey}`)).toBeInTheDocument();
    });
  });
});
