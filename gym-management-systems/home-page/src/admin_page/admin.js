import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Members from '../components/Members';
import MembershipPlans from '../components/MembershipPlans';
import Trainers from '../components/Trainers';
import Equipments from '../components/Equipments';
import Products from '../components/Products'; 
import Sales from '../components/Sales';
import './admin.css';
import { getAuth, signOut } from "firebase/auth";

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
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="App">
      <Sidebar handleLogout={handleLogout} />
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
