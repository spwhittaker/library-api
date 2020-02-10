module.exports = {
  testEnvironment: 'node',
  setupFiles: ['./jest-setup.js'],
  setupFilesAfterEnv: ['./test-setup.js'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/user-helpers.js'],
};
