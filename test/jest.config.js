/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const { resolve } = require('path');
// eslint-disable-next-line no-undef
const root = resolve(__dirname, '..');
// eslint-disable-next-line no-undef
const rootConfig = require(`${root}/jest.config.js`);

// eslint-disable-next-line no-undef
module.exports = {...rootConfig, ...{
  rootDir: root,
  displayName: 'end2end-tests',
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
  testMatch: ['<rootDir>/test/**/*.test.ts'],
}};