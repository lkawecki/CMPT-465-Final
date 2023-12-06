import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = (userId) => {
    // Logic to set userId and isLoggedIn to true upon successful login
    setUserId(userId);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Logic to clear userId and set isLoggedIn to false upon logout
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
