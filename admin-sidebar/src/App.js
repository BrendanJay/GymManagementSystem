import './App.css';
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import Members from "./Components/Members";
import MembershipPlans from "./Components/MembershipPlans";
import Trainers from "./Components/Trainers";
import Equipments from "./Components/Equipments";
import Products from "./Components/Products"; 
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

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
    default:
      headerText = 'Gym Management System';
      break;
  }

  return <div className="header">{headerText}</div>;
};

function App() {
  return (
    <Router>
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
            {/* Add more routes here for other sections */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
