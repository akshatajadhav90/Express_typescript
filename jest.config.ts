import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "js"],
};

export default config;
