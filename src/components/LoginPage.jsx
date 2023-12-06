import React, { useState, useContext } from 'react';
import '../assets/styles/LoginPage.css';
import { AuthContext } from '../AuthContext';


function LoginPage() {
  const parseEmail = (emailString) => {
    return emailString.substring(0, emailString.indexOf('@')) || "";
  }
  
  const { login } = useContext(AuthContext); // Access the login function from AuthContext

  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  // State variables and handlers for registration
  const [registrationInputValues, setRegistrationInputValues] = useState({
    regName: '',
    regEmail: '',
    regPassword: ''
  });

  const handleRegistrationChange = (e) => {
    const { id, value } = e.target;
    setRegistrationInputValues({ ...registrationInputValues, [id]: value });
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    console.log('Sign Up button clicked. Values:', registrationInputValues);

    //demo send POST request to flask server
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationInputValues),
    })
      .then(response => response.json())
      .then(data => console.log('Sign Up Response:', data))
      .catch(error => console.error('Error:', error));
    
      
    const userId = parseEmail(registrationInputValues.regEmail);
    console.log("User ID: " + userId);

    // Call the login function from AuthContext with the userId
    login(userId);
  };

  // State variables and handlers for login
  const [loginInputValues, setLoginInputValues] = useState({
    logEmail: '',
    logPassword: ''
  });

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginInputValues({ ...loginInputValues, [id]: value });
  };
  
  const handleSignInClick = (e) => {
    e.preventDefault();
    console.log('Sign In button clicked. Valued:', loginInputValues);

    //demo POST request to Flask server
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInputValues),
    })
      .then(response => response.json())
      .then(data => console.log('Sign In Response:', data))
      .catch(error => console.error('Error:', error));

    
    const userId = parseEmail(loginInputValues.logEmail); 
    console.log("User ID: " + userId);

    // Call the login function from AuthContext with the userId
    login(userId);
    
  }

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <span>Use your MC email for registration</span>
          <input
            type="text"
            id="regName"
            placeholder="Name"
            onChange={handleRegistrationChange}
            value={registrationInputValues.name}
          />
          <input
            type="email"
            id="regEmail"
            placeholder="Manhattan College Email"
            onChange={handleRegistrationChange}
            value={registrationInputValues.email}
          />
          <input
            type="password"
            id="regPassword"
            placeholder="Password"
            onChange={handleRegistrationChange}
            value={registrationInputValues.password}
          />
          <button onClick={handleSignUpClick}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <span>Use your MC email password</span>
          <input
            type="email"
            id="logEmail"
            placeholder="Manhattan College Email"
            onChange={handleLoginChange}
            value={loginInputValues.email}
          />
          <input
            type="password"
            id="logPassword"
            placeholder="Password"
            onChange={handleLoginChange}
            value={loginInputValues.password}
          />
          <a href="#">Forget Your Password?</a>
          <button onClick={handleSignInClick}>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className={`toggle-panel toggle-left ${isActive ? 'active' : ''}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>
              Sign In
            </button>
          </div>
          <div className={`toggle-panel toggle-right ${isActive ? '' : 'active'}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" id="register" onClick={handleRegisterClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
