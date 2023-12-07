import React, { useState, useEffect, useContext } from 'react';
import BookCard from './BookCard'; // Import the BookCard component
import axios from 'axios'; // Import Axios for API requests
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/image-not-found.jpg';
import '../assets/styles/BookList.css'

function BookList({ list }) {
  const [books, setBooks] = useState([]);

  const { userID } = useContext(AuthContext);

  useEffect(() => {
    fetchBooksForList();
  }, []);

  const fetchBooksForList = async () => {
    console.log(list)
    try {
      // Fetch book data for the current list using the listID
      const listId = list[0]
      console.log(list[0])
      const response = await axios.get(`http://localhost:5000/show_list/${userID}/${listId}`);
      const bookIds = response.data;
      console.log(bookIds)
      const privKey = 'AIzaSyANI2SknKsUiusuOufzjIAdP966ZzSj8Fw';
    
      // Fetch book details for each bookID in the list
      if (Array.isArray(bookIds) && bookIds.length > 0) {
        const bookData = await Promise.all(
          bookIds.map(async (bookId) => {
            const bookResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId[2]}?key=${privKey}`);
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
    <div className="book-list-container">
      <h2 className="list-title">{list[2]}</h2>
      <div className="book-grid">
        <div className="book-list">
          {books.length > 0 ? ( 
          books.map((item,id) => {
            let thumbnail = defaultImage;
            if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail) {
              thumbnail = item.volumeInfo.imageLinks.smallThumbnail;
            }
            let title=item.volumeInfo.title;
            let author=item.volumeInfo.authors;
            let bookId=item.id;

            const book = {
              id: bookId,
              thumbnail: thumbnail,
              title: title,
              author: author
            };
          return <BookCard key={id} book={book} />;
        })
          ) : ( 
            <p>List is empty</p>
          )}
          </div>
        
      </div>
    </div>
  );
}

export default BookList;