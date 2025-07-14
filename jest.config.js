const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
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
