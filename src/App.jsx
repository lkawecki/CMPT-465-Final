import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage.jsx';
import BookDetailsPage from './components/BookDetailsPage.jsx';
import Navbar from './components/Navbar.jsx';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<SearchPage />} />
        <Route path="/books/:bookId" element={<BookDetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  )
}

export default App;