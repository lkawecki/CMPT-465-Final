import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserId] = useState(null);

  const login = (userID) => {
    // Logic to set userId and isLoggedIn to true upon successful login
    setUserId(userID);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Logic to clear userId and set isLoggedIn to false upon logout
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
