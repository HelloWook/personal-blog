import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/link', () => ({
  __esModule: true,
  default: React.forwardRef(({ children, ...props }, ref) => (
    <a {...props} ref={ref}>
      {children}
    </a>
  )),
}));
