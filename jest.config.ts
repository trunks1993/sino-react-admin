/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true, // 输出测试覆盖率报告
  'setupFiles': ['jest-localstorage-mock']
};
