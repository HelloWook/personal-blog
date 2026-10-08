const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@messages/(.*)$': '<rootDir>/messages/$1',
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  // 레포 안에 중첩된 git worktree(.cmux)는 같은 테스트의 사본이라 제외한다
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/.cmux/'],
};

const jestConfig = async () => {
  const configFn = createJestConfig(customJestConfig);
  const config = await configFn();

  return {
    ...config,
    transformIgnorePatterns: ['/node_modules/?!(query-string)/', '^.+\\.module\\.(css|sass|scss)$'],
  };
};

module.exports = jestConfig;
