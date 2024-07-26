import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { auth, db } from '../firebaseConfig';
import { collection, query, doc, updateDoc, where, getDocs } from 'firebase/firestore';

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
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'members'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        }
      }
    };
  
    fetchUserData();
  }, []);
  
  const toggleModal = () => {
    if (!isModalOpen) {
      setEditData({...userData});
    }
    setIsModalOpen(!isModalOpen);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'members', user.uid);
        await updateDoc(userRef, editData);
        setUserData(editData);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  
  
  return (
    <div className="userProfile__container">
      <button className="userProfile__editButton" onClick={toggleModal}>Edit</button>
      <div className="userProfile__profile">
        <div className="userProfile__header">
          <div className="userProfile__avatar">
            <div className="userProfile__avatarPlaceholder">
              <span>{userData?.fullName?.charAt(0) || 'U'}</span>
            </div>
          </div>
          <div className="userProfile__name">
            <h2 className="userProfile__nameText">{userData?.fullName || 'User'}</h2>
          </div>
        </div>
      </div>
      {userData && (
        <div className="userProfile__inputFieldsContainer">
          <input type="text" value={userData.username || ''} className="userProfile__inputField" readOnly />
          <input type="text" value={userData.fullName || ''} className="userProfile__inputField" readOnly />
          <input type="text" value={userData.gender || ''} className="userProfile__inputField" readOnly />
          <input type="number" value={userData.age || ''} className="userProfile__inputField" readOnly />
          <input type="email" value={userData.email || ''} className="userProfile__inputField" readOnly />
          <input type="tel" value={userData.contactNumber || ''} className="userProfile__inputField" readOnly />
          <input type="text" value={userData.address || ''} className="userProfile__inputField" readOnly />
        </div>
      )}
      <div className="userProfile__historyContainer">
        {userData && userData.membershipPlansHistory && (
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
                {userData.membershipPlansHistory.map((plan, index) => (
                  <tr key={index}>
                    <td>{plan.planName}</td>
                    <td>{plan.startDate}</td>
                    <td>{plan.endDate}</td>
                    <td>{plan.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {userData && userData.trainerHistory && (
          <div className="userProfile__trainerHistory">
            <h3>Trainer History</h3>
            <table>
              <thead>
                <tr>
                  <th>Trainer Name</th>
                  <th>Sessions</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.trainerHistory.map((trainer, index) => (
                  <tr key={index}>
                    <td>{trainer.trainerName}</td>
                    <td>{trainer.sessions}</td>
                    <td>{trainer.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
          value={editData.contactNumber}
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
          value={editData.password || ''}
          onChange={handleInputChange}
          className="userProfile__inputField"
          placeholder="New Password"
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          className="userProfile__inputField"
        />
        <button className="userProfile__saveButton" onClick={handleSave}>Save</button>
      </Modal>
    </div>
  );
  
}

export default UserProfile;
