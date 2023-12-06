module.exports = {
  moduleNameMapper: {
    '^axios$': '<rootDir>/__mocks__/axiosMock.js',
    '^react-icons/fa$': '<rootDir>/node_modules/react-icons/fa',
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!.*\\.(css|less|scss|sass)$)"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
};

