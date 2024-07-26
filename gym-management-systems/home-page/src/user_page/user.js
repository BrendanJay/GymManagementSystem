import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import UserProfile from './UserProfile';
import PlanSelection from './PlanSelection';
import TrainerSelection from './TrainerSelection';
import styles from './User.module.css';

function User() {
  return (
    <div className={styles['user-app']}>
      <TopBar />
      <div className={styles['main-content']}>
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
