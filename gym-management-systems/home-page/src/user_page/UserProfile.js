import React, { useState } from 'react';
import './UserProfile.css'; // Import the CSS file

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="userProfile__modalOverlay">
      <div className="userProfile__modalContent">
        {children}
        <button className="userProfile__closeButton" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="userProfile__container">
      <button className="userProfile__editButton" onClick={toggleModal}>Edit</button>
      <div className="userProfile__profile">
        <div className="userProfile__header">
          <div className="userProfile__avatar">
            <div className="userProfile__avatarPlaceholder">
              <span>JD</span>
            </div>
          </div>
          <div className="userProfile__name">
            <h2 className="userProfile__nameText">John Doe</h2>
          </div>
        </div>
      </div>
      <div className="userProfile__inputFieldsContainer">
        <input type="text" placeholder="Username" className="userProfile__inputField" />
        <input type="text" placeholder="Full name" className="userProfile__inputField" />
        <input type="text" placeholder="Gender" className="userProfile__inputField" />
        <input type="number" placeholder="Age" className="userProfile__inputField" />
        <input type="email" placeholder="Email" className="userProfile__inputField" />
        <input type="tel" placeholder="Contact info" className="userProfile__inputField" />
        <input type="text" placeholder="Address" className="userProfile__inputField" />
      </div>
      <div className="userProfile__historyContainer">
        <div className="userProfile__membershipHistory">
          <h3>Membership Plan History</h3>
          <table>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows of data here */}
            </tbody>
          </table>
        </div>
        <div className="userProfile__trainerHistory">
          <h3>Trainer History</h3>
          <table>
            <thead>
              <tr>
                <th>Trainer Name</th>
                <th>Specialty</th>
                <th>Rate</th>
                <th>Sessions</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows of data here */}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="userProfile__modalHeader">
          <h2>Edit Profile</h2>
        </div>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Full name" />
        <input type="text" placeholder="Gender" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Contact info" />
        <input type="text" placeholder="Address" />
        <button className="userProfile__saveButton">Save</button>
      </Modal>
    </div>
  );
}

export default UserProfile;
