import React, { useState } from 'react';
import "../assets/styles/SearchPage.css"; // Import your CSS file here
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';

function SearchPage() {

  const [bookData, setBookData] = useState([]);
  const updateBookData = (data) => { 
    setBookData(data);
  };
  return (
    <div className="SearchPage">
      <div className="search-bar-container">
        <SearchBar updateBookData={updateBookData}/>
        <SearchResultsList bookData={bookData}/>
      </div>
    </div>
  );
}


export default SearchPage;

