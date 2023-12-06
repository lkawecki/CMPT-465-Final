import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import SearchPage from './components/SearchPage.jsx';
//import BookDetailsPage from './components/BookDetailsPage.jsx';
import Navbar from './components/Navbar.jsx';
import LoginPage from './components/LoginPage.jsx';

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
          <Route path="/*">
          {({ location }) => location.pathname !== '/' && <Navbar />}
          </Route>
          <Route path="/books/:bookId" element={<BookDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        
      </Router>
    </AuthProvider>
      
  );
}

export default App;

