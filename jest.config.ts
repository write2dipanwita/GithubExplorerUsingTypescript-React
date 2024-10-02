import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Specify files for coverage collection
    '!src/**/*.d.ts', // Exclude TypeScript definition files
  ],
  coverageDirectory: '<rootDir>/coverage', // Directory to save coverage reports
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Report formats
};

export default config;
