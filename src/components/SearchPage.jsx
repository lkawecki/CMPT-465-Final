import React, { useState } from 'react';
import './SearchPage.css'; // Import your CSS file here
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';
import Navbar from './Navbar';

function SearchPage() {

  const [bookData, setBookData] = useState([]);
  const updateBookData = (data) => { 
    setBookData(data);
  };
  return (
    <div className="SearchPage">
      <Navbar />
      <div className="search-bar-container">
        <SearchBar updateBookData={updateBookData}/>
        <SearchResultsList bookData={bookData}/>
      </div>
    </div>
  );
}


export default SearchPage;

