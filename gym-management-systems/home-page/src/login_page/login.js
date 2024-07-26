import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import './login.css';

const Login = () => {
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    age: '',
    gender: '', // Default value
    birthdate: '',
    contactNumber: '',
    address: '', // Added address field
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const membersRef = collection(db, 'members');
      const snapshot = await getDocs(membersRef);
      const ids = snapshot.docs.map(doc => parseInt(doc.id));
      const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

      // Add user to users collection
      await setDoc(doc(db, "users", nextId.toString()), {
        id: nextId,
        lastName: formData.lastName,
        firstName: formData.firstName,
        age: formData.age,
        gender: formData.gender,
        birthdate: formData.birthdate,
        contactNumber: formData.contactNumber,
        address: formData.address, // Added address field
        email: formData.email,
        password: formData.password,
      });

      // Add user to members collection with additional fields
      await setDoc(doc(db, "members", nextId.toString()), {
        id: nextId,
        username: formData.email.split('@')[0], // Using email as username
        fullName: `${formData.firstName} ${formData.lastName}`,
        lastName: formData.lastName,
        firstName: formData.firstName,
        age: formData.age,
        gender: formData.gender,
        birthdate: formData.birthdate,
        contactNumber: formData.contactNumber,
        address: formData.address, // Added address field
        email: formData.email,
        membershipPlan: "", // Empty field to be filled later
        duration: "", // Empty field to be filled later
        startDate: "", // Empty field to be filled later
        endDate: "", // Empty field to be filled later
        trainer: "", // Empty field to be filled later
        sessions: 0, // Default value
        membershipPlansHistory: [], // Empty array to be filled later
        trainerHistory: [], // Empty array to be filled later
        registrationDate: new Date().toISOString(),
      });

      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating user: ", error);
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      if (formData.email === "admin@gmail.com" && formData.password === "password") {
        alert("Admin login successful!");
        navigate('/admin');
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Login successful!");
        navigate('/user');
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
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
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
              <input type="number" name="age" placeholder="Age" onChange={handleChange} />
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="" disabled selected>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="date" name="birthdate" placeholder="Birthdate" onChange={handleChange} />
              <input type="tel" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
              <input type="text" name="address" placeholder="Address" onChange={handleChange} />
              <input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
              <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
              <button type="button" className="submit" onClick={handleRegister}>CREATE ACCOUNT</button>
            </form>
          </div>

        <div className="form-container log-in">
          <form>
            <h1>LOG IN</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fab fa-google"></i></a>
              <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
            </div>
            <span>-OR USE ONE OF YOUR EXISTING ACCOUNTS-</span>
            <input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} />
            <button type="button" onClick={handleLogin}>SUBMIT</button>
            <a href="#">Forgot Your Password?</a>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>I THINK WE'RE ALL SET!</h1>
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
    </div>
  );
};

export default Login;
