import React, { useState, useEffect } from 'react';
import BookCard from './BookCard'; // Import your BookCard component
import Pagination from './Pagination'; // Import Pagination component if available
import { fetchBookIds, fetchBooksByBookIds } from '../api'; // Functions for API calls
import Navbar from './Navbar'

function LibraryPage({ userId }) {
  const [bookIds, setBookIds] = useState([]);
  const [books, setBooks] = useState([]);
  const booksPerPage = 20; // Number of books per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch book IDs associated with the user from your backend
    fetchBookIds(userId)
      .then(data => setBookIds(data)) // Update bookIds state with fetched IDs
      .catch(error => console.error('Error fetching book IDs:', error));
  }, [userId]);

  useEffect(() => {
    // Fetch books based on bookIds
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const idsForPage = bookIds.slice(startIndex, endIndex);

    fetchBooksByBookIds(idsForPage)
      .then(data => setBooks(data)) // Update books state with fetched book details
      .catch(error => console.error('Error fetching books:', error));
  }, [bookIds, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <div className="library-page">
      <h2>Your Library</h2>
      <div className="book-grid">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {bookIds.length > booksPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(bookIds.length / booksPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
    </>
    
  );
}

export default LibraryPage;
