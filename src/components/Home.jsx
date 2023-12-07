import React, { useState, useEffect, useContext } from 'react';
import BookCard from './BookCard';
import BookList from './BookList';
import Navbar from './Navbar';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import defaultImage from '../assets/image-not-found.jpg';
import '../assets/styles/Home.css'; // Import your Home page styles
import { Link } from 'react-router-dom';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [userLists, setUserLists] = useState([]);

  const { userID } = useContext(AuthContext);

  // Fetch 10 books from the library
  useEffect(() => {
    const fetchLibraryBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get_library/${userID}`);
        const bookIds = response.data.slice(0, 6); // Get the first 10 book IDs
        const privKey = 'AIzaSyANI2SknKsUiusuOufzjIAdP966ZzSj8Fw';
        const delay = 1000;

        const bookData = await Promise.all(
          bookIds.map(async (bookId) => {
            const bookResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${privKey}`);
            return bookResponse.data;
          })
        );

        setTimeout(() => {
            setBooks(bookData);
          }, delay);
      } catch (error) {
        console.error('Error fetching library books:', error);
      }
    };

    fetchLibraryBooks();
  }, [userID]);

  // Fetch user lists
  useEffect(() => {
    try {
      axios.get(`http://localhost:5000/show_user_lists/${userID}`)
        .then(response => {
          setUserLists(response.data);
        })
        .catch(error => {
          console.error('Error getting lists from Lists:', error);
        });
    } catch (error) {
      console.error('Error getting lists from Lists:', error);
    }
  }, [userID]);

  return (
    <>
      <Navbar />
      <div className="home-page">
        <div className="library-preview">
          <Link to="/library">
            <h1>View Library</h1>
          </Link>
          <div className="book-grid">
            {books.map((item, id) => {
              let thumbnail = defaultImage;
              if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail) {
                thumbnail = item.volumeInfo.imageLinks.smallThumbnail;
              }
              let title = item.volumeInfo.title;
              let author = item.volumeInfo.authors;
              let bookId = item.id;

              const book = {
                id: bookId,
                thumbnail: thumbnail,
                title: title,
                author: author,
              };
              return <BookCard key={id} book={book} />;
            })}
          </div> 
        </div>
        <div className="first-list-preview">
          <Link to="/lists">
            <h2>View Lists</h2>
          </Link>
           {userLists.length > 0 ? (
            <BookList key={userLists[0].listID} list={userLists[0]} />
          ) : (
            <p>No lists available</p>
          )} 
        </div>
      </div>
    </>
  );
}

export default HomePage;
