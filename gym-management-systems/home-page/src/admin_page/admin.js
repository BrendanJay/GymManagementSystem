// D:\GMS_Github\GymManagementSystem\gym-management-systems\home-page\src\admin_page\Adminpage.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import './admin.css';

function Adminpage() {
  return (
    <div className="admin-page">
      <Sidebar />
      <div className="main-content">
        <Dashboard />
      </div>
    </div>
  );
}

export default Adminpage;
