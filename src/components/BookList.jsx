import React, { useState, useEffect, useContext } from 'react';
import BookCard from './BookCard'; // Import the BookCard component
import axios from 'axios'; // Import Axios for API requests
import { AuthContext } from '../AuthContext';

function BookList({ list }) {
  const [books, setBooks] = useState([]);

  const { userID } = useContext(AuthContext);

  useEffect(() => {
    fetchBooksForList();
  }, []);

  const fetchBooksForList = async () => {
    try {
      // Fetch book data for the current list using the listID
      const response = await axios.get(`http://localhost:5000/show_list/${list.listID}`, {
      params: { userID: userID }, 
    });
    const bookIds = response.data;

    const privKey = 'AIzaSyDHJnNFQKfEVqZ_SjouQea8EoN_OPeZfZE';

      // Fetch book details for each bookID in the list
      if (Array.isArray(bookIds) && bookIds.length > 0) {
        const bookData = await Promise.all(
          bookIds.map(async (bookId) => {
            const bookResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${privKey}`);
            return bookResponse.data;
          })
        );
        setBooks(bookData);
      } else {
        console.log('List is empty');
      }
    } catch (error) {
      console.error('Error fetching books for list:', error);
    }
  };

  return (
    <div>
      <h2>{list.listName}</h2>
      <div className="book-grid">
        <li className="nav-search">
          <Link to="/search">Search</Link>
        </li>
        {books.length > 0 ? (
          books.map((book, index) => <BookCard key={index} book={book} />)
        ) : (
          <p>List is empty</p>
        )}
      </div>
    </div>
  );
}

export default BookList;