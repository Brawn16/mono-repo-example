module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  },
  preset: "ts-jest",
  setupFiles: ["./jest.setup"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["node_modules"]
};
