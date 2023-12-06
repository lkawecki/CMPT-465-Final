module.exports = {
  moduleNameMapper: {
    '^axios$': '<rootDir>/__mocks__/axiosMock.js',
    '^react-icons/fa$': '<rootDir>/node_modules/react-icons/fa',
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js"
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

