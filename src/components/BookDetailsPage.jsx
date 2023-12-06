import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import defaultImage from './image-not-found.jpg'
import Rating from '@mui/material/Rating';
import '../assets/styles/BookDetailsPage.css';



const BookDetailsPage = () => {
  const removeHtmlTags = (htmlString) => {
    const divElement = document.createElement('div');
    divElement.innerHTML = htmlString;
    return divElement.textContent || divElement.innerText || '';
  };

  const [value, setValue] = React.useState(2);

  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  useEffect(() => {
    const privKey ='AIzaSyDHJnNFQKfEVqZ_SjouQea8EoN_OPeZfZE';

    const searchBook = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${privKey}`);
        console.log('API Response:', response.data);
        console.log('API Response:', response.data.volumeInfo);
        updateBookDetails(response.data.volumeInfo || null);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    searchBook();
  }, [bookId]);

  const updateBookDetails = (data) => {
    // Update bookDetails state with fetched data
    console.log('Book Details:', data);
    setBookDetails(data);
  };

  if (!bookDetails) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }
  const { title, authors, description, imageLinks, publisher } = bookDetails;

  const cleanedDescription = removeHtmlTags(description);

  return (
    <>
      <div className="book-details">
        <div className="left-section">
          <img className="thumbnail"
          src={imageLinks?.thumbnail || {defaultImage}} alt={title} />
          <button className="add-to-list-button">Add to list</button>
          <Rating
            className="star-rating"
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <p>
            Rate this book
          </p>
        </div>
        <div className="right-section">
          <h1 className="title">{title}</h1>
          <p className="authors">
            <span className="span-label">Author(s): </span>
            {authors?.join(', ') || 'N/A'}</p>
          <p className="publisher">
            <span className="span-label">Publisher: </span>{publisher || 'N/a'}</p>
          <p className="description">
            <span className="span-label">Description: </span>
            {cleanedDescription || 'N/A'}</p>
        </div>
      </div>
    </>
  );
};

export default BookDetailsPage;
