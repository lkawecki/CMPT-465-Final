import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  const login = (userID) => {
    // Logic to set userID and isLoggedIn to true upon successful login
    setUserID(userID);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Logic to clear userID and set isLoggedIn to false upon logout
    setUserID(null);
    setIsLoggedIn(false);
    console.log("Sign out succesful");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
