export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.js"], 
  verbose: true,
  forceExit: true,    
  clearMocks: true,
  transform: {},                             // no babel needed if pure ESM
};
