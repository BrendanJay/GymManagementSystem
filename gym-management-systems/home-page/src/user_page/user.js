import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import UserProfile from './UserProfile';
import PlanSelection from './PlanSelection';
import TrainerSelection from './TrainerSelection';


function User() {
  return (
    <div className="user-app">
      <TopBar />
      <div className="main-content">
        <Routes>
          <Route path="profile" element={<UserProfile />} />
          <Route path="planselection" element={<PlanSelection />} />
          <Route path="trainerselection" element={<TrainerSelection />} />
        </Routes>
      </div>
    </div>
  );
}

export default User;
