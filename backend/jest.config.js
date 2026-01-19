export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup/testDB.js"],
  testMatch: ["**/tests/**/*.test.js"],     // look for tests in tests/ folder
  clearMocks: true,
  transform: {},                             // no babel needed if pure ESM
};
