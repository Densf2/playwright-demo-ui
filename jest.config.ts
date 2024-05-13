/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  coverageProvider: "v8",

  preset: "ts-jest",

  testEnvironment: "node",
  reporters: ["default", "jest-html-reporters"],
};

export default config;
