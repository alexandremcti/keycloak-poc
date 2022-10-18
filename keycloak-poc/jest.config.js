/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [],
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
};