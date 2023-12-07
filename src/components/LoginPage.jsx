import React, { useState, useContext, useEffect } from 'react';
import '../assets/styles/LoginPage.css';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


function LoginPage() {
  const [open, setOpen] = React.useState(true);
  const parseEmail = (emailString) => {
    return emailString.substring(0, emailString.indexOf('@')) || "";
  }

  const navigate = useNavigate(); 
  
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
    regPassword: '',
  });

  const handleRegistrationChange = (e) => {
    const { id, value } = e.target;
    setRegistrationInputValues({ ...registrationInputValues, [id]: value });
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();

    const userID = parseEmail(registrationInputValues.regEmail);

    const updatedRegistrationInputValues = {
      ...registrationInputValues,
      userID: userID
    };

    //checking the variables stored in json
    Object.keys(updatedRegistrationInputValues).forEach(key => {
     console.log(`${key}:`, updatedRegistrationInputValues[key], 'Type:', typeof updatedRegistrationInputValues[key]);
    });

    console.log('Sign Up button clicked. Values:', updatedRegistrationInputValues);

    //demo send POST request to flask server
    fetch('http://localhost:5000/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRegistrationInputValues),
    })
      .then(response => response.json())
      .then(data => console.log('Sign Up Response:', data))
      .catch(error => console.error('Error:', error));
      
    // Call the login function from AuthContext with the userId
    login(userID);

    navigate('/home');
  };

  useEffect(() => {
    // Add the ID to the body element
    document.body.id = 'login-body';

    // Clean up: remove the ID when the component is unmounted
    return () => {
      document.body.id = '';
    };
  }, []);

  // State variables and handlers for login
  const [loginInputValues, setLoginInputValues] = useState({
    logEmail: '',
    logPassword: ''
  });

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginInputValues({ ...loginInputValues, [id]: value });
  };

  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  
  const handleSignInClick = (e) => {
    e.preventDefault();

    const userID = parseEmail(loginInputValues.logEmail); 

    const updatedLoginInputValues = {
      ...loginInputValues,
      userID: userID
    };
    
    console.log('Sign In button clicked. Values:', updatedLoginInputValues);

    //demo POST request to Flask server
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLoginInputValues),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Sign In Response:', data);
        if (data.status == 'error') {
          setWarningMessage(data.message);
          setShowWarning(true);
        } else {
          login(userID);
          navigate('/home');
        }
    })
      .catch((error) => {
        console.error('Error:', error);
        setWarningMessage('An error occurred during login.');
        setShowWarning(true);
      });
  };

  return (
    <div className="background-container">
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
    <div className="background-container">

      {/* Popup Warning */}
      {showWarning && (
          <Alert 
          onClose={() => {
            setShowWarning(false)
          }}
          severity="warning">
            <AlertTitle>Warning</AlertTitle>
            {warningMessage}
          </Alert>
      )}
    </div>



    </div>
    
  );
}

export default LoginPage;