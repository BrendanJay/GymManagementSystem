import React, {useState} from 'react';


import './UserProfile.css'; // Ensure this import matches the CSS file name

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        {children}
        <button className="closeButton" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}




function UserProfile() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
 



  return (
    <div className="userProfileContainer">
       <button className="editButton" onClick={toggleModal}>Edit</button>
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
      <div className="history-container">
  <div className="membership-history">
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
  <div className="trainer-history">
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
        {/* Add rows of data here */}
      </tbody>
    </table>
  </div>

</div>
<Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2 className="modalHeader"> Edit Profile</h2>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Full name" />
        <input type="text" placeholder="Gender" />
        <input type="number" placeholder="Age" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Contact info" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="Password" />
        <input type="text" placeholder="Confirm password" />
        
        <button className="saveButton" onClick={toggleModal}>Save</button>
      </Modal>
  
  
    </div>
  );
}

export default UserProfile;
