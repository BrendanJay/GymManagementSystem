// D:\GMS_Github\GymManagementSystem\gym-management-systems\home-page\src\Router.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Adminpage from './admin_page/admin';
import './admin_page/admin.css';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Adminpage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
