import React, { useState } from 'react';
import './UserProfile.css'; // Ensure this import matches the CSS file name

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
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    gender: 'Male',
    age: '30',
    email: 'john.doe@example.com',
    contactInfo: '+123456789',
    address: '123 Main St, Anytown, USA'
  });

  const [editData, setEditData] = useState({...profileData});

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfileData(editData);
    toggleModal();
  };

  const membershipPlans = [
    { plan: 'Basic', startDate: '2024-01-01', status: 'Active' },
    { plan: 'Standard', startDate: '2024-02-15', status: 'Inactive' },
    { plan: 'Premium', startDate: '2024-03-10', status: 'Active' },
  ];

  const trainerHistory = [
    { trainer: 'Alice Smith', sessions: 15, status: 'Active' },
    { trainer: 'Bob Johnson', sessions: 20, status: 'Inactive' },
    { trainer: 'Carol Williams', sessions: 30, status: 'Active' },
  ];

  return (
    <div className="userProfile__container">
      <button className="userProfile__editButton" onClick={toggleModal}>Edit</button>
      <div className="userProfile__profile">
        <div className="userProfile__header">
          <div className="userProfile__avatar">
            <div className="userProfile__avatarPlaceholder">
              <span>{profileData.fullName.charAt(0)}</span>
            </div>
          </div>
          <div className="userProfile__name">
            <h2 className="userProfile__nameText">{profileData.fullName}</h2>
          </div>
        </div>
      </div>
      <div className="userProfile__inputFieldsContainer">
        <input type="text" value={profileData.fullName} className="userProfile__inputField" readOnly />
        <input type="text" value={profileData.gender} className="userProfile__inputField" readOnly />
        <input type="number" value={profileData.age} className="userProfile__inputField" readOnly />
        <input type="email" value={profileData.email} className="userProfile__inputField" readOnly />
        <input type="tel" value={profileData.contactInfo} className="userProfile__inputField" readOnly />
        <input type="text" value={profileData.address} className="userProfile__inputField" readOnly />
      </div>
      <div className="userProfile__historyContainer">
        <div className="userProfile__membershipHistory">
          <h3>Membership Plan History</h3>
          <div className="userProfile__tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Start Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {membershipPlans.map((item, index) => (
                  <tr key={index}>
                    <td>{item.plan}</td>
                    <td>{item.startDate}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="userProfile__trainerHistory">
          <h3>Trainer History</h3>
          <div className="userProfile__tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>Trainer</th>
                  <th>Sessions</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {trainerHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.trainer}</td>
                    <td>{item.sessions}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2 className="userProfile__modalHeader">Edit Personal Information</h2>
        <input
          type="text"
          name="fullName"
          value={editData.fullName}
          onChange={handleInputChange}
          className="userProfile__inputField"
        />
        <input
          type="text"
          name="gender"
          value={editData.gender}
          onChange={handleInputChange}
          className="userProfile__inputField"
        />
        <input
          type="number"
          name="age"
          value={editData.age}
          onChange={handleInputChange}
          className="userProfile__inputField"
        />
        <input
          type="email"
          name="email"
          value={editData.email}
          onChange={handleInputChange}
          className="userProfile__inputField"
        />
        <input
          type="tel"
          name="contactInfo"
          value={editData.contactInfo}
          onChange={handleInputChange}
          className="userProfile__inputField"
        />
        <input
          type="text"
          name="address"
          value={editData.address}
          onChange={handleInputChange}
          className="userProfile__inputField"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="userProfile__inputField"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="userProfile__inputField"
        />
        <button className="userProfile__saveButton" onClick={handleSave}>Save</button>
      </Modal>
    </div>
  );
}

export default UserProfile;
