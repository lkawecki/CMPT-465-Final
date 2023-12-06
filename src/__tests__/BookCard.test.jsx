import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BookCard from '../components/BookCard';

describe('BookCard Component', () => {
  it('renders BookCard component correctly', () => {
    const book = {
      id: '1',
      thumbnail: 'image1.jpg',
      title: 'Sample Title',
      author: 'Author',
    };

    const { getByAltText, getByText } = render(<BookCard book={book} />);

    // Check if the book's thumbnail is rendered
    const thumbnail = getByAltText('Book Thumbnail');
    expect(thumbnail).toBeDefined();

    // Check if the book's title and author are rendered
    expect(getByText('Sample Title')).toBeDefined();
    expect(getByText('Author')).toBeDefined();
  });

});
