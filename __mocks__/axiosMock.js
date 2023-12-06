// __mocks__/axiosMock.js

const axiosMock = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  // Add other axios methods you use in your codebase
};

export default axiosMock;
