import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './login.css';

const Login = () => {
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    age: '',
    gender: '',
    birthdate: '',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        lastName: formData.lastName,
        firstName: formData.firstName,
        age: formData.age,
        gender: formData.gender,
        birthdate: formData.birthdate,
        contactNumber: formData.contactNumber,
        email: formData.email,
        password: formData.password,
      });

      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating user: ", error);
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Login successful!");
      navigate('/admin'); // Navigate to admin page upon successful login
    } catch (error) {
      console.error("Error logging in: ", error);
      alert(error.message);
    }
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

          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
          <input type="number" name="age" placeholder="Age" onChange={handleChange} />
          <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
          <input type="date" name="birthdate" placeholder="Birthdate" onChange={handleChange} />
          <input type="tel" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
          <input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
          <input type="text" name="password" placeholder="Enter Password" onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
          <button type="button" className="submit" onClick={handleRegister}>CREATE ACCOUNT</button>

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
          <input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} />
          <button type="button" onClick={handleLogin}>SIGN IN</button>
          <a href="#">Forgot Your Password?</a>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>I THINK WE'RE ALL SET!</h1>
            <p>LFG</p>
            <button type="button" className="hidden" id="login" onClick={() => setActive(false)}>SIGN IN</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>BE ONE OF US NOW!</h1>
            <h3>SIGN UP HERE</h3>
            <button type="button" className="hidden" id="register" onClick={() => setActive(true)}>SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
