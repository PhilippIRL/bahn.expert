module.exports = {
  globals: {
    PROD: true,
    TEST: true,
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(scss|css)$': 'identity-obj-proxy',
  },
  globalSetup: '<rootDir>/test/setTZ.ts',
  setupFilesAfterEnv: ['<rootDir>/test/server/config.ts'],
  testPathIgnorePatterns: [
    '/src/app/',
    '/test/client/',
    '/cypress/',
    '/dist/',
    '/testDist',
  ],
  rootDir: '../..',
};
