import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
  return (
    <div className="topbar">
      <div className="nav-links">
        <NavLink to="/user/planselection" activeClassName="selected">Membership Plans</NavLink>
        <NavLink to="/user/trainerselection" activeClassName="selected">Trainers</NavLink>
      </div>
      <div className="profile-icon">
        <NavLink to="/user/profile">
          <div className="profile-circle"></div>
        </NavLink>
      </div>
    </div>
  );
}

export default TopBar;
