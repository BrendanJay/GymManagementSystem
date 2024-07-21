// D:\GMS_Github\GymManagementSystem\gym-management-systems\home-page\src\admin_page\Admin.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Members from '../components/Members';
import MembershipPlans from '../components/MembershipPlans';
import Trainers from '../components/Trainers';
import Equipments from '../components/Equipments';
import Products from '../components/Products'; 
import Sales from '../components/Sales';
import './admin.css';

const Header = () => {
  const location = useLocation();
  let headerText = '';

  switch (location.pathname) {
    case '/admin/dashboard':
      headerText = 'Gym Management System';
      break;
    case '/admin/members':
      headerText = 'Members';
      break;
    case '/admin/membershipplans':
      headerText = 'Membership Plans';
      break;
    case '/admin/trainers':
      headerText = 'Trainers';
      break;
    case '/admin/equipments':
      headerText = 'Gym Equipments';
      break;
    case '/admin/products':
      headerText = 'Products';
      break;
    case '/admin/sales':
      headerText = 'Sales';
      break;
    default:
      headerText = 'Admin Page';
  }

  return <div className="header">{headerText}</div>;
};

function Admin() {
  return (
    <div className="App">
      <Sidebar />
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="membershipplans" element={<MembershipPlans />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="equipments" element={<Equipments />} />
          <Route path="products" element={<Products />} /> 
          <Route path="sales" element={<Sales />} /> 
          {/* Add more routes here for other sections */}
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
