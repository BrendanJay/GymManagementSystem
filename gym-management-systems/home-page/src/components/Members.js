import React, { useState, useEffect } from "react";
import "./Members.css";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const Members = () => {
  const initialMembersData = [
    {
      id: 1,
      username: "john_doe",
      fullName: "John Doe",
      gender: "Male",
      age: 25,
      email: "john.doe@example.com",
      contactInfo: "123-456-7890",
      address: "123 Street, City",
      membershipPlanHistory: [
        { id: 1, plan: "Plan A", startDate: "2023-01-01", endDate: "2023-02-01", status: "Active" },
        { id: 2, plan: "Plan B", startDate: "2023-02-01", endDate: "2023-03-01", status: "Inactive" },
      ],
      trainerHistory: [
        { id: 1, trainer: "Trainer A", sessions: 10, status: "Active" },
        { id: 2, trainer: "Trainer B", sessions: 5, status: "Inactive" },
      ]
    },
    {
      id: 2,
      username: "jane_smith",
      fullName: "Jane Smith",
      gender: "Female",
      age: 30,
      email: "jane.smith@example.com",
      contactInfo: "987-654-3210",
      address: "456 Avenue, Town",
      membershipPlanHistory: [
        { id: 1, plan: "Plan C", startDate: "2023-03-01", endDate: "2023-04-01", status: "Active" },
      ],
      trainerHistory: [
        { id: 1, trainer: "Trainer C", sessions: 8, status: "Active" },
      ]
    },
    {
      id: 3,
      username: "alice_johnson",
      fullName: "Alice Johnson",
      gender: "Female",
      age: 28,
      email: "alice.johnson@example.com",
      contactInfo: "555-123-4567",
      address: "789 Lane, Village",
      membershipPlanHistory: [
        { id: 1, plan: "Plan D", startDate: "2023-04-01", endDate: "2023-05-01", status: "Active" },
      ],
      trainerHistory: [
        { id: 1, trainer: "Trainer D", sessions: 12, status: "Active" },
      ]
    },
    {
      id: 4,
      username: "michael_brown",
      fullName: "Michael Brown",
      gender: "Male",
      age: 32,
      email: "michael.brown@example.com",
      contactInfo: "111-222-3333",
      address: "567 Road, City",
      membershipPlanHistory: [],
      trainerHistory: []
    },
    {
      id: 5,
      username: "emily_wilson",
      fullName: "Emily Wilson",
      gender: "Female",
      age: 27,
      email: "emily.wilson@example.com",
      contactInfo: "333-444-5555",
      address: "890 Boulevard, Town",
      membershipPlanHistory: [
        { id: 1, plan: "Plan E", startDate: "2023-05-01", endDate: "2023-06-01", status: "Active" },
      ],
      trainerHistory: []
    }
  ];

  const [membersData, setMembersData] = useState(initialMembersData);
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

  const [searchTerm, setSearchTerm] = useState("");

  const handleView = (id) => {
    const member = membersData.find(member => member.id === id);
    setViewMember(member);
  };

  const handleCloseView = () => {
    setViewMember(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const filteredMembers = initialMembersData.filter((member) =>
      member.username.toLowerCase().includes(searchTerm) ||
      member.fullName.toLowerCase().includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm)
    );
    setMembersData(filteredMembers);
  }, [searchTerm]);

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
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
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
                {viewMember.membershipPlanHistory.length > 0 && (
                  <div className="membership-history">
                    <h3>Membership Plan History</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Plan</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewMember.membershipPlanHistory.map((plan) => (
                          <tr key={plan.id}>
                            <td>{plan.id}</td>
                            <td>{plan.plan}</td>
                            <td>{plan.startDate}</td>
                            <td>{plan.endDate}</td>
                            <td>{plan.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {viewMember.trainerHistory.length > 0 && (
                  <div className="trainer-history">
                    <h3>Trainer History</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Trainer</th>
                          <th>Sessions</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewMember.trainerHistory.map((trainer) => (
                          <tr key={trainer.id}>
                            <td>{trainer.id}</td>
                            <td>{trainer.trainer}</td>
                            <td>{trainer.sessions}</td>
                            <td>{trainer.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {addMemberModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Member</h2>
              <button className="close-button" onClick={handleCloseAddMemberModal}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={newMember.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-field">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={newMember.fullName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={newMember.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={newMember.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={newMember.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-field">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={newMember.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>Membership Plan:</label>
                  <select
                    name="membershipPlan"
                    value={newMember.membershipPlan}
                    onChange={handleMembershipPlanChange}
                  >
                    <option value="">Select Plan</option>
                    <option value="Plan A">Plan A</option>
                    <option value="Plan B">Plan B</option>
                    <option value="Plan C">Plan C</option>
                    <option value="Plan D">Plan D</option>
                    <option value="Plan E">Plan E</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label>Duration:</label>
                  <input
                    type="text"
                    name="duration"
                    value={newMember.duration}
                    readOnly
                  />
                </div>
              </div>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={newMember.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-field">
                  <label>End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={newMember.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>Trainer:</label>
                  <input
                    type="text"
                    name="trainer"
                    value={newMember.trainer}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-field">
                  <label>Sessions:</label>
                  <input
                    type="number"
                    name="sessions"
                    value={newMember.sessions}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-buttons">
                <button className="save-button" onClick={handleSaveMember}>
                  SAVE
                </button>
                <button className="cancel-button" onClick={handleCloseAddMemberModal}>
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
