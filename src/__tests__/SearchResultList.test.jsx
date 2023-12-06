import React from 'react';
import { render } from '@testing-library/react';
import { SearchResultsList } from '../components/SearchResultsList';

describe('SearchResultsList Component', () => {
  it('renders BookCards based on bookData', () => {
    const bookData = [
      // Sample book data, replace this with your actual data for testing
      {
        volumeInfo: {
          imageLinks: {
            smallThumbnail: 'image1.jpg',
          },
          title: 'Sample Title 1',
          authors: ['Author 1'],
        },
        id: '1',
      },
      {
        volumeInfo: {
          imageLinks: {
            smallThumbnail: 'image2.jpg',
          },
          title: 'Sample Title 2',
          authors: ['Author 2'],
        },
        id: '2',
      },
      // Add more sample book data as needed
    ];

    const { getAllByAltText, getAllByText } = render(
      <SearchResultsList bookData={bookData} />
    );

    // Check if images with alt text "Book Thumbnail" are present
    const thumbnails = getAllByAltText('Book Thumbnail');
    expect(thumbnails).toHaveLength(bookData.length);

    // Check if titles and authors are present
    bookData.forEach((book) => {
      expect(getAllByText(book.volumeInfo.title)).toHaveLength(1);
      expect(getAllByText(book.volumeInfo.authors[0])).toHaveLength(1);
    });

    // You can add more assertions based on your component's rendered output
  });
});
