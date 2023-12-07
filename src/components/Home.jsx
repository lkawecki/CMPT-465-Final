import React, { useState, useEffect } from 'react';
//import Library from './Library';
//import BookList from './BookList'; // Assuming you have a BookList component
import '../assets/styles/Home.css'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Navbar />
      <div className="homePage">
        <h1>Welcome to home</h1>
        <li className="nav-library">
                <Link to="/library">Library</Link>
        </li>
      </div>
    </>
  )
  // const [partialLibrary, setPartialLibrary] = useState([]);
  // const [bookLists, setBookLists] = useState([]);

  // useEffect(() => {
  //   // Fetch part of the Library data
  //   // Example: Fetching the first 5 books from the Library
  //   const fetchPartialLibrary = async () => {
  //     // Perform an API call or fetch data as needed
  //     // For example:
  //     // const response = await fetch('API_ENDPOINT_FOR_LIBRARY_DATA');
  //     // const data = await response.json();

  //     // Mock data for demonstration purposes
  //     const mockPartialLibrary = [
  //       // Sample books for partial library display
  //       { id: 1, title: 'Book 1' },
  //       { id: 2, title: 'Book 2' },
  //       { id: 3, title: 'Book 3' },
  //       { id: 4, title: 'Book 4' },
  //       { id: 5, title: 'Book 5' },
  //     ];
      
  //     setPartialLibrary(mockPartialLibrary);
  //   };

  //   // Fetch BookLists
  //   // Replace this with your actual logic to fetch book lists
  //   const fetchBookLists = async () => {
  //     // Perform an API call or fetch data as needed
  //     // For example:
  //     // const response = await fetch('API_ENDPOINT_FOR_BOOK_LISTS');
  //     // const data = await response.json();

  //     // Mock data for demonstration purposes
  //     const mockBookLists = [
  //       { id: 1, name: 'Fiction' },
  //       { id: 2, name: 'Science Fiction' },
  //       { id: 3, name: 'Mystery' },
  //     ];

  //     setBookLists(mockBookLists);
  //   };

  //   fetchPartialLibrary();
  //   fetchBookLists();
  // }, []);

  // return (
  //   <div>
  //     <h2>Partial Library Display</h2>
  //     <Library books={partialLibrary} /> {/* Pass the partial library data to Library component */}
      
  //     <h2>Book Lists</h2>
  //     <ul>
  //       {bookLists.map((list) => (
  //         <li key={list.id}>
  //           <BookList name={list.name} /> {/* Pass individual BookList data to BookList component */}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default Home;