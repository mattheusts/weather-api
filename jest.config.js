/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const { resolve } = require('path');
// eslint-disable-next-line no-undef
const root = resolve(__dirname);
// eslint-disable-next-line no-undef
module.exports = {
  rootDir: root,
  displayName: 'root-tests',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};