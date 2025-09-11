import { render, screen } from '@testing-library/react';

import TimeLine from './TimeLine';
import { Activities } from '@/data/activity';

describe('TimeLine', () => {
  it('정상적으로 렌더링된다', () => {
    render(<TimeLine activities={Activities} />);

    Activities.forEach((activity) => {
      expect(screen.getByText(activity.date)).toBeInTheDocument();
      expect(screen.getByText(activity.title)).toBeInTheDocument();
      expect(screen.getByTestId(`social-link-${activity.title}`)).toBeInTheDocument();
    });
  });
});
