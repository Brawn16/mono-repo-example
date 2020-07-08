const config = require("./jest.config");

module.exports = {
  ...config,
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  testPathIgnorePatterns: ["node_modules"],
};
