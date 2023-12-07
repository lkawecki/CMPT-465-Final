import React, { useState, useEffect, useContext } from 'react';
import BookList from './BookList'; // Import the BookList component
import Navbar from './Navbar';
import axios from 'axios'; // Import Axios for API requests
import CreateListButton from './CreateListButton'; 
import { AuthContext } from '../AuthContext';
import '../assets/styles/BookListsPage.css'

function BookListsPage() {
  const [userLists, setUserLists] = useState([]);

  const { userID } = useContext(AuthContext);

 

  useEffect(() => {
    try {
      // Replace 'userId' with the actual ID of the logged-in user
      const userId = userID; 
      axios.get(`http://localhost:5000/show_user_lists/${userID}`)
        .then(response => {
          setUserLists(response.data);
        })
        .catch(error => {
          console.error('Error getting lists from Lists:', error);
          // Handle error or display a message to the user
        });
    } catch (error) {
      console.error('Error getting lists from Lists:', error);
      // Handle error or display a message to the user
    }
  }, [userID]);

  return (
    <>
      <Navbar />
      <div className="book-lists-page-container">
        <h1>Book Lists</h1>
        <CreateListButton 
        className="create-list-button"
        userID={userID} />
        <div className="list-container">
          {userLists.length === 0 ? (
            <p>You have no lists.</p>
          ) : (
            
            userLists.map((list) => 
            <BookList key={list.listID} list={list} />)
          )}
        </div>
      </div>
    </>
  );
}

export default BookListsPage;