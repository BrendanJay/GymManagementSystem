import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './User.module.css';

function TopBar() {
  return (
    <div className={styles.topbar}>
      <div className={styles['nav-links']}>
        <NavLink
          to="/user/planselection"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Membership Plans
        </NavLink>
        <NavLink
          to="/user/trainerselection"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          Trainers
        </NavLink>
      </div>
      <div className={styles['profile-icon']}>
        <NavLink to="/user/profile">
          <div className={styles['profile-circle']}></div>
        </NavLink>
      </div>
    </div>
  );
}

export default TopBar;
