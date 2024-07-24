import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './home_page/homepage';
import Login from './login_page/login';
import Admin from './admin_page/admin';
import User from './user_page/user';

const App = ({ location }) => {
  return (
    <div>
      {/* Conditionally load login CSS */}
      {location.pathname === '/' || location.pathname === '/login' ? <link rel="stylesheet" href="/login_page/login.css" /> : null}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/user/*" element={<User />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => {
  const location = useLocation();
  
  return (
    <App location={location} />
  );
};

const Root = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default Root;
