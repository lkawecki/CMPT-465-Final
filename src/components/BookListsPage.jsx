import React, { useState, useEffect, useContext } from 'react';
import BookList from './BookList'; // Import the BookList component
import Navbar from './Navbar';
import axios from 'axios'; // Import Axios for API requests
import CreateListButton from './CreateListButton'; 
import { AuthContext } from '../AuthContext';

function BookListsPage() {
  const [userLists, setUserLists] = useState([]);

  const { userID } = useContext(AuthContext);

  useEffect(() => {
    fetchUserLists();
  }, []);

  const fetchUserLists = async () => {
    try {
      // Replace 'userId' with the actual ID of the logged-in user
      const userId = userID; 

      // Make an API request to fetch user lists
      const response = await axios.get(`http://localhost:5000/show_user_lists/${userId}`);
      setUserLists(response.data);
    } catch (error) {
      console.error('Error fetching user lists:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Book Lists</h1>
        <CreateListButton userID={userID} />
        {userLists.length === 0 ? (
          <p>You have no lists.</p>
        ) : (
          userLists.map((list) => <BookList key={list.listID} list={list} />)
        )}
      </div>
    </>
  );
}

export default BookListsPage;