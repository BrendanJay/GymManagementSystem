import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './home_page/homepage';
import Login from './login_page/login';
import AdminPage from './admin_page/admin';
import User from './user_page/user';
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Members from "./components/Members";
import MembershipPlans from "./components/MembershipPlans";
import Trainers from "./components/Trainers";
import Equipments from "./components/Equipments";
import Products from "./components/Products"; 
import Sales from "./components/Sales";
import './admin_page/admin.css';// Import the Admin.css file

const Header = () => {
  const location = useLocation();
  let headerText = '';

  switch (location.pathname) {
    case '/dashboard':
      headerText = 'Gym Management System';
      break;
    case '/members':
      headerText = 'Members';
      break;
    case '/membershipplans':
      headerText = 'Membership Plans';
      break;
    case '/trainers':
      headerText = 'Trainers';
      break;
    case '/equipments':
      headerText = 'Gym Equipments';
      break;
    case '/products':
      headerText = 'Products';
      break;
    case '/sales':
      headerText = 'Sales';
      break;
  
  }

  return <div className="header">{headerText}</div>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<MainAdminContent />} />
      </Routes>
    </Router>
  );
}

const MainAdminContent = () => {
  return (
    <div className="App">
      <Sidebar />
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/membershipplans" element={<MembershipPlans />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/equipments" element={<Equipments />} />
          <Route path="/products" element={<Products />} /> 
          <Route path="/sales" element={<Sales />} /> 
          {/* Add more routes here for other sections */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
