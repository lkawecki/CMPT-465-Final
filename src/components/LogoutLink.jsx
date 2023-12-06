import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import your AuthContext

const LogoutLink = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Assuming logout function is available in AuthContext

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/'); // Navigate to the LoginPage after logout
  };

  return (
    <Link to="/" onClick={handleLogout}>
      Log-out
    </Link>
  );
};

export default LogoutLink;