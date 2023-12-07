import React, { useState, useEffect, useContext } from 'react';
import BookCard from './BookCard';
import Navbar from './Navbar';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

function LibraryPage({ }) {
  const [bookIds, setBookIds] = useState([]);
  const [books, setBooks] = useState([]);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    // Fetch book IDs associated with the user from your backend
    try {
      // Make a GET request to retrieve the book IDs associated with userId
      console.log({userId});
      axios.get(`http://localhost:5000/get_library/${userId}`)
        .then(response => {
          setBookIds(response.data);
        })
        .catch(error => {
          console.error('Error getting bookIds from library:', error);
          // Handle error or display a message to the user
        });
    } catch (error) {
      console.error('Error in fetching bookIds from library:', error);
      // Handle error or display a message to the user
    }
  }, [userId]);

  useEffect(() => {
    // Fetch books based on bookIds
    const fetchBookData = async () => {
      try {
        if (Array.isArray(bookIds) && bookIds.length > 0) {
          const bookData = await Promise.all(
            bookIds.map(async bookId => {
              const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${privKey}`);
              return response.data;
            })
          );
          setBooks(bookData);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookIds]);

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
      </div>
    </>
  );
}

export default LibraryPage;
