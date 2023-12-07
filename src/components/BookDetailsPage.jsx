import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import defaultImage from '../assets/image-not-found.jpg'
import Rating from '@mui/material/Rating';
import '../assets/styles/BookDetailsPage.css';
import AddToListModal from './AddToListModal';
import { AuthContext } from '../AuthContext';
import Navbar from './Navbar';



const BookDetailsPage = () => {

  const { userID } = useContext(AuthContext);

  const removeHtmlTags = (htmlString) => {
    const divElement = document.createElement('div');
    divElement.innerHTML = htmlString;
    return divElement.textContent || divElement.innerText || '';
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);

  const toggleModal = () => setShowModal(!showModal);

  const handleListSelect = (listId) => {
    setSelectedListId(listId);
  };
  const handleAddToList = async () => {
    try {
      // Proceed to add the book to the list
      try {
        // Make a POST request to add the book to the list
        console.log("Hi")
         axios.post('http://localhost:5000/add_to_list', {
          userId: userID,
          listId: selectedListId,
          bookId: bookId, 
        });
        // Display success message or update UI as needed
      } catch (error) {
        console.error('Error adding book to list:', error);
        // Handle error or display a message to the user
      }
  
      // Display success message or update UI as needed
      try {
        // Make a POST request to add the book to the library
          axios.post('http://localhost:5000/add_to_library', {
          userId: userID, 
          bookId: bookId, 
        });
        // Display success message or update UI as needed
      } catch (error) {
        console.error('Error adding book to library:', error);
        // Handle error or display a message to the user
      }
    } catch (error) {
      console.error('Error adding book to list:', error);
      // Handle error or display a message to the user
    }  
    console.log("Successfully added to list")
  };

  const handleAddToLibrary = async () => {
    try {
      // Make a POST request to add the book to the library
       axios.post('http://localhost:5000/add_to_library', {
        userId: userID, 

        bookId: bookId, 
      });
      // Display success message or update UI as needed
    } catch (error) {
      console.error('Error adding book to library:', error);
      // Handle error or display a message to the user
    }
  };

  const [value, setValue] = React.useState(2);

  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  useEffect(() => {
    const privKey ='AIzaSyANI2SknKsUiusuOufzjIAdP966ZzSj8Fw';

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
      <Navbar />
      <div className="book-details">
        <div className="left-section">
          <div className="thumbnail-container">
            <img className="thumbnail"
            src={imageLinks?.thumbnail || defaultImage} alt={title} />
          </div>
          {/* Modal for adding to a list */}
        {showModal && (
          <AddToListModal
            onClose={toggleModal}
            onListSelect={handleListSelect}
            onConfirm={handleAddToList}
          />
        )}
          <div className="book-actions-container">
          <div className="add-buttons-container"></div>
            <button className="add-to-list-button"
              onClick={toggleModal}
              >Add to list</button>
            <button className="add-to-library-button"
              onClick={handleAddToLibrary}
              >Add to library</button>
          </div>
          <Rating

            className="star-rating"
            name="half-rating"
            defaultValue={NaN}
            precision={0.5}
            
            onChange={(event, newValue) => {
              setValue(newValue);
              console.log("You've rated this book %d stars", newValue);
            }}
          />
          <p>
            Rate this book
          </p>
          </div>
          
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
        
        
      
    </>
  );
};


export default BookDetailsPage;
