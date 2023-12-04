import React, { useState } from 'react';
import './search-page-style.css'; // Import your CSS file here
import { SearchBar } from './SearchBar';

function SearchPage() {
  return (
    <div className="SearchPage">
      <div className="search-bar-container">
        <SearchBar />
        <div>SearchResults</div>
      </div>
    </div>
  )
}

export default SearchPage;

