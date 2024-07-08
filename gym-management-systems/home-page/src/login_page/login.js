import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [active, setActive] = useState(false);

  const handleRegisterClick = () => {
    setActive(true);
  };

  const handleLoginClick = () => {
    setActive(false);
  };

  return (
    <div className={`container ${active ? 'active' : ''}`} id="container">
      <nav className="nav">
        <div className="nav-logo">
          <p></p>
        </div>
        <div className="nav-menu">
          <ul>
            <li><a href="#" className="link active"></a></li>
            <li><a href="#" className="link active"></a></li>
          </ul>
        </div>
        <div className="nav-button"></div>
      </nav>
      <div className="form-container sign-up">
        <form>
          <h1>HELLO THERE!</h1>
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="First Name" />
          <input type="number" placeholder="Age" />
          <input type="text" placeholder="Gender" />
          <input type="date" placeholder="Birthdate" />
          <input type="tel" placeholder="Contact Number" />
          <input type="email" placeholder="Enter email" />
          <input type="password" placeholder="Enter Password" />
          <input type="password" placeholder="Confirm Password" />
          <button type="button" className="submit">CREATE ACCOUNT</button>
        </form>
      </div>
      <div className="form-container log-in">
        <form>
          <h1>SIGN IN</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fab fa-google"></i></a>
            <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
          </div>
          <span>-OR USE ONE OF YOUR EXISTING ACCOUNTS-</span>
          <input type="email" placeholder="Enter email" />
          <input type="password" placeholder="Enter Password" />
          <button type="button">SIGN IN</button>
          <a href="#">Forgot Your Password?</a>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>I THINK WE'RE ALL SET!</h1>
            <p>LFG</p>
            <button type="button" className="hidden" id="login" onClick={handleLoginClick}>SIGN IN</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>BE ONE OF US NOW!</h1>
            <h3>SIGN UP HERE</h3>
            <button type="button" className="hidden" id="register" onClick={handleRegisterClick}>SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
