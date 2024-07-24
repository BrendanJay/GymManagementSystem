import React from 'react';
import './UserProfile.css'; // Ensure this import matches the CSS file name

function UserProfile() {
  return (
    <div className="userProfileContainer">
       <button className="editButton">Edit</button>
      <div className="userProfile">
        <div className="profileHeader">
          <div className="profileAvatar">
            <div className="avatarPlaceholder">
              <span>JD</span>
            </div>
          </div>
          <div className="profileName">
            <h2 className="profileNameText">John Doe</h2>
          </div>
        </div>
      </div>
      <div className="inputFieldsContainer">
        <input type="text" placeholder="Username" className="inputField" />
        <input type="text" placeholder="Full name" className="inputField" />
        <input type="text" placeholder="Gender" className="inputField" />
        <input type="number" placeholder="Age" className="inputField" />
        <input type="email" placeholder="Email" className="inputField" />
        <input type="tel" placeholder="Contact info" className="inputField" />
        <input type="text" placeholder="Address" className="inputField" />
      </div>
      <div className="historyContainer">
        <div className="membershipHistory">
          <h3>Membership Plan History</h3>
        </div>
        <div className="trainerHistory">
          <h3>Trainer History</h3>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
