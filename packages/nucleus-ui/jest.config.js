module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  },
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/css.ts"
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["node_modules"]
};
