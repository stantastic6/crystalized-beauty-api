module.exports = {
  // preset: '@shelf/jest-mongodb',
  clearMocks: true,
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['<rootDir>/src/**/__tests__/*.test.js'],
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
}
