import React, { useState } from "react";
import "./Members.css";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const Members = () => {
  const [membersData, setMembersData] = useState([
    {
      id: 1,
      username: "user1",
      fullName: "John Doe",
      gender: "Male",
      age: 25,
      email: "john.doe@example.com",
      contactInfo: "123-456-7890",
      address: "123 Street, City",
      membershipPlanHistory: [
        { id: 1, plan: "Plan A", startDate: "2023-01-01", endDate: "2023-02-01" },
        { id: 2, plan: "Plan B", startDate: "2023-02-01", endDate: "2023-03-01" },
      ],
      trainerHistory: [
        { id: 1, trainer: "Trainer A", sessions: 10, status: "Active" },
        { id: 2, trainer: "Trainer B", sessions: 5, status: "Inactive" },
      ]
    },
    {
      id: 2,
      username: "user2",
      fullName: "Jane Smith",
      gender: "Female",
      age: 30,
      email: "jane.smith@example.com",
      contactInfo: "987-654-3210",
      address: "456 Road, Town",
      membershipPlanHistory: [
        { id: 1, plan: "Plan C", startDate: "2023-03-01", endDate: "2023-04-01" },
      ],
      trainerHistory: [
        { id: 1, trainer: "Trainer C", sessions: 8, status: "Active" },
      ]
    },
  ]);

  const [viewMember, setViewMember] = useState(null);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [newMember, setNewMember] = useState({
    username: "",
    fullName: "",
    gender: "",
    age: "",
    email: "",
    contactNumber: "",
    address: "",
    membershipPlan: "",
    duration: "",
    startDate: "",
    endDate: "",
    trainer: "",
    sessions: 0,
  });

  const handleView = (id) => {
    const member = membersData.find(member => member.id === id);
    setViewMember(member);
  };

  const handleCloseView = () => {
    setViewMember(null);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredMembers = membersData.filter((member) => 
      member.username.toLowerCase().includes(searchTerm) ||
      member.fullName.toLowerCase().includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm)
    );
    setMembersData(filteredMembers);
  };

  const handleAddMember = () => {
    setAddMemberModal(true);
  };

  const handleCloseAddMemberModal = () => {
    setAddMemberModal(false);
  };

  const handleSaveMember = () => {
    const id = membersData.length + 1;
    const newMemberWithId = { id, ...newMember };
    setMembersData([...membersData, newMemberWithId]);
    setNewMember({
      username: "",
      fullName: "",
      gender: "",
      age: "",
      email: "",
      contactNumber: "",
      address: "",
      membershipPlan: "",
      duration: "",
      startDate: "",
      endDate: "",
      trainer: "",
      sessions: 0,
    });
    setAddMemberModal(false);
  };

  const handleDeleteMember = (id) => {
    const updatedMembers = membersData.filter(member => member.id !== id);
    setMembersData(updatedMembers);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleMembershipPlanChange = (e) => {
    const selectedPlan = e.target.value;
    let duration;
    switch (selectedPlan) {
      case "Plan A":
        duration = "1 month";
        break;
      case "Plan B":
        duration = "2 months";
        break;
      case "Plan C":
        duration = "3 months";
        break;
      default:
        duration = "";
        break;
    }
    setNewMember((prevMember) => ({
      ...prevMember,
      membershipPlan: selectedPlan,
      duration: duration,
    }));
  };

  return (
    <div className="members">
      <div className="table-header">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input type="text" placeholder="Search..." onChange={handleSearch} className="search-input" />
        </div>
        <div className="add-new-button" onClick={handleAddMember}>
          ADD NEW
          <AddCircleIcon className="icon" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Email</th>
            <th>Contact Info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {membersData.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.username}</td>
              <td>{member.fullName}</td>
              <td>{member.gender}</td>
              <td>{member.age}</td>
              <td>{member.email}</td>
              <td>{member.contactInfo}</td>
              <td>
                <button className="view-button" onClick={() => handleView(member.id)}>
                  <PersonIcon className="icon" />
                </button>
                <button className="delete-button" onClick={() => handleDeleteMember(member.id)}>
                  <DeleteIcon className="icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewMember && (
        <div className="view-member-modal">
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>View Member Information</h2>
                <button className="close-button" onClick={handleCloseView}>
                  <CloseIcon />
                </button>
              </div>
              <div className="modal-content">
                <div className="member-info">
                  <div>
                    <strong>Username:</strong> {viewMember.username}
                  </div>
                  <div>
                    <strong>Full Name:</strong> {viewMember.fullName}
                  </div>
                  <div>
                    <strong>Gender:</strong> {viewMember.gender}
                  </div>
                  <div>
                    <strong>Age:</strong> {viewMember.age}
                  </div>
                  <div>
                    <strong>Email:</strong> {viewMember.email}
                  </div>
                  <div>
                    <strong>Contact Info:</strong> {viewMember.contactInfo}
                  </div>
                  <div>
                    <strong>Address:</strong> {viewMember.address}
                  </div>
                </div>
                <div className="membership-plan-history">
                  <h3>Membership Plan History</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Plan</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewMember.membershipPlanHistory.map((plan) => (
                        <tr key={plan.id}>
                          <td>{plan.plan}</td>
                          <td>{plan.startDate}</td>
                          <td>{plan.endDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="trainer-history">
                  <h3>Trainer History</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Trainer</th>
                        <th>Sessions</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewMember.trainerHistory.map((trainer) => (
                        <tr key={trainer.id}>
                          <td>{trainer.trainer}</td>
                          <td>{trainer.sessions}</td>
                          <td>{trainer.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {addMemberModal && (
        <div className="add-member-modal">
          <div className="modal-overlay">
            <div className="modal add-member-modal-content">
              <div className="modal-header">
                <h2>Add New Member</h2>
                <button className="close-button" onClick={handleCloseAddMemberModal}>
                  <CloseIcon />
                </button>
              </div>
              <div className="modal-content">
                <div className="modal-field-row">
                  <label className="modal-field">
                    Username:
                    <input
                      type="text"
                      name="username"
                      value={newMember.username}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="modal-field">
                    Full Name:
                    <input
                      type="text"
                      name="fullName"
                      value={newMember.fullName}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="modal-field-row">
                  <label className="modal-field">
                    Gender:
                    <select
                      name="gender"
                      value={newMember.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <label className="modal-field">
                    Age:
                    <input
                      type="number"
                      name="age"
                      value={newMember.age}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="modal-field-row">
                  <label className="modal-field">
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={newMember.email}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="modal-field">
                    Contact Number:
                    <input
                      type="text"
                      name="contactNumber"
                      value={newMember.contactNumber}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="modal-field-row">
                  <label className="modal-field">
                    Address:
                    <input
                      type="text"
                      name="address"
                      value={newMember.address}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="modal-field">
                    Membership Plan:
                    <select
                      name="membershipPlan"
                      value={newMember.membershipPlan}
                      onChange={handleMembershipPlanChange}
                    >
                      <option value="">Select</option>
                      <option value="Plan A">Plan A</option>
                      <option value="Plan B">Plan B</option>
                      <option value="Plan C">Plan C</option>
                    </select>
                  </label>
                </div>
                <div className="modal-field-row">
                  <label className="modal-field">
                    Duration:
                    <input
                      type="text"
                      name="duration"
                      value={newMember.duration}
                      onChange={handleInputChange}
                      disabled
                    />
                  </label>
                  <label className="modal-field">
                    Start Date:
                    <input
                      type="date"
                      name="startDate"
                      value={newMember.startDate}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="modal-field-row">
                  <label className="modal-field">
                    End Date:
                    <input
                      type="date"
                      name="endDate"
                      value={newMember.endDate}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="modal-field">
                    Trainer:
                    <input
                      type="text"
                      name="trainer"
                      value={newMember.trainer}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="modal-field-row">
                  <label className="modal-field">
                    Sessions:
                    <input
                      type="number"
                      name="sessions"
                      value={newMember.sessions}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="save-button" onClick={handleSaveMember}>Save</button>
                <button className="cancel-button" onClick={handleCloseAddMemberModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
