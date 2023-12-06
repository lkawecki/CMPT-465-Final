import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock axios to prevent actual API requests
import { SearchBar } from '../components/SearchBar'; // Adjust the import path based on your project structure

jest.mock('axios'); // Mock axios to prevent actual API requests

describe('SearchBar component', () => {
  it('renders SearchBar component correctly', async () => {
    const updateBookDataMock = jest.fn(); // Mock the updateBookData function

    // Render the SearchBar component
    const { getByPlaceholderText } = render(
      <SearchBar updateBookData={updateBookDataMock} />
    );

    // Simulate user input by changing the input value
    const searchInput = getByPlaceholderText('Type to search...');
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } });

    // Wait for the API call to be made (mocked axios)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('Harry Potter'));
    });

    // Simulate empty input
    fireEvent.change(searchInput, { target: { value: '' } });

    // Ensure that updateBookData was called with an empty array when input is empty
    expect(updateBookDataMock).toHaveBeenCalledWith([]);

    // You can add more test cases as needed to test component functionality
  });
});
