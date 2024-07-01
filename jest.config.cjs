/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.svg$': 'jest-transform-stub',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
};

module.exports = config;