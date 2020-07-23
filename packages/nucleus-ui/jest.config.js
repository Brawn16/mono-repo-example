module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"
  },
  preset: "ts-jest",
  testPathIgnorePatterns: ["node_modules"]
};
