import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import SearchPage from './components/SearchPage.jsx';
import BookDetailsPage from './components/BookDetailsPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import Home from './components/Home.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<LoginPage />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/books/:bookId" element={<BookDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        
      </Router>
    </AuthProvider>
      
  );
}

export default App;

