// see this section of Next.js docs for addt info: https://nextjs.org/docs/testing#jest-and-react-testing-library

const { pathsToModuleNameMapper, JestConfigWithTsJest } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/cypress/",
  ],
  testEnvironment: "jsdom",
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
    "[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$",
  ],
  verbose: true,
  setupFilesAfterEnv: ["./jest.setup.js"],
};
