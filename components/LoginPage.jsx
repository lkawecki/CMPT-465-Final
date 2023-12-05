import React, { useState } from 'react';
import SQLite from 'react-native-sqlite-storage'
import './login-style.css'; // Import your CSS file here

function LoginPage() {
  const [isActive, setIsActive] = useState(false);

  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    console.log('Sign Up button clicked. Valued:', inputValues);

  }
  const handleSignInClick = (e) => {
    e.preventDefault();
    console.log('Sign In button clicked. Valued:', inputValues);

  }

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <span>Use your MC email for registration</span>
          <input
            type="text"
            id="name"
            placeholder="Name"
            onChange={handleChange}
            value={inputValues.name}
          />
          <input
            type="email"
            id="email"
            placeholder="Manhattan College Email"
            onChange={handleChange}
            value={inputValues.email}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={inputValues.password}
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
            id="email"
            placeholder="Manhattan College Email"
            onChange={handleChange}
            value={inputValues.email}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={inputValues.password}
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
