import React from 'react';
import './UserProfile.css';

function UserProfile() {
  return (
    <div className="user-profile-container">
       <button className="edit-button">Edit</button>
      <div className="user-profile">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              <span>JD</span>
            </div>
          </div>
          <div className="profile-name">
            <h2>John Doe</h2>
          </div>
        </div>
      </div>
      <div className="input-fields-container">
        <input type="text" placeholder="Username" className="input-field" />
        <input type="text" placeholder="Full name" className="input-field" />
        <input type="text" placeholder="Gender" className="input-field" />
        <input type="number" placeholder="Age" className="input-field" />
        <input type="email" placeholder="Email" className="input-field" />
        <input type="tel" placeholder="Contact info" className="input-field" />
        <input type="text" placeholder="Address" className="input-field" />
      </div>
      <div className="history-container">
        <div className="membership-history">
          <h3>Membership Plan History</h3>
        </div>
        <div className="trainer-history">
          <h3>Trainer History</h3>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;