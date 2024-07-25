import React, { useState, useEffect } from "react";
import "./Members.css";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { db } from "../firebaseConfig";
import {
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const Members = () => {
  const getNextId = async () => {
    const membersRef = collection(db, "members");
    const snapshot = await getDocs(membersRef);
    const ids = snapshot.docs.map((doc) => {
      const id = parseInt(doc.id);
      return isNaN(id) ? 0 : id;
    });
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  };

  const [membersData, setMembersData] = useState([]);
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

  const [membershipPlanModal, setMembershipPlanModal] = useState(false);
  const [trainerHistoryModal, setTrainerHistoryModal] = useState(false);
  const [newMembershipPlan, setNewMembershipPlan] = useState({
    planName: "",
    startDate: "",
    endDate: "",
  });
  const [newTrainerHistory, setNewTrainerHistory] = useState({
    trainerName: "",
    sessions: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleView = (id) => {
    const member = membersData.find((member) => member.id === id);
    setViewMember(member);
  };

  const handleCloseView = () => {
    setViewMember(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const membersRef = collection(db, "members");
      const q = query(
        membersRef,
        where("username", ">=", searchTerm),
        where("username", "<=", searchTerm + "\uf8ff")
      );
      const snapshot = await getDocs(q);
      const membersArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembersData(membersArray);
    };

    if (searchTerm) {
      fetchMembers();
    } else {
      // Fetch all members if search term is empty
      const fetchAllMembers = async () => {
        const membersRef = collection(db, "members");
        const snapshot = await getDocs(membersRef);
        const membersArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembersData(membersArray);
      };
      fetchAllMembers();
    }
  }, [searchTerm]);

  const handleAddMember = () => {
    setAddMemberModal(true);
  };

  const handleCloseAddMemberModal = () => {
    setAddMemberModal(false);
  };

  const handleAddMembershipPlan = () => {
    setMembershipPlanModal(true);
  };

  const handleAddTrainerHistory = () => {
    setTrainerHistoryModal(true);
  };

  const handleSaveMembershipPlan = async () => {
    const updatedMember = {
      ...viewMember,
      membershipPlansHistory: [
        ...viewMember.membershipPlansHistory,
        {
          id: viewMember.membershipPlansHistory.length + 1,
          ...newMembershipPlan,
          status: "Active",
        },
      ],
    };
    await setDoc(doc(db, "members", viewMember.id.toString()), updatedMember);
    setViewMember(updatedMember);
    setMembersData(
      membersData.map((member) =>
        member.id === viewMember.id ? updatedMember : member
      )
    );
    setMembershipPlanModal(false);
  };

  const handleSaveTrainerHistory = async () => {
    const updatedMember = {
      ...viewMember,
      trainerHistory: [
        ...viewMember.trainerHistory,
        {
          id: viewMember.trainerHistory.length + 1,
          ...newTrainerHistory,
          status: "Active",
        },
      ],
    };
    await setDoc(doc(db, "members", viewMember.id.toString()), updatedMember);
    setViewMember(updatedMember);
    setMembersData(
      membersData.map((member) =>
        member.id === viewMember.id ? updatedMember : member
      )
    );
    setTrainerHistoryModal(false);
  };

  const handleSaveMember = async () => {
    const membersRef = collection(db, "members");
    const salesRef = collection(db, "sales");
    const plansRef = collection(db, "membershipPlans");

    if (newMember.id) {
      // Editing existing member
      await setDoc(doc(membersRef, newMember.id.toString()), newMember);
      setMembersData(
        membersData.map((member) =>
          member.id === newMember.id ? newMember : member
        )
      );
    } else {
      const nextId = await getNextId();
      const memberData = {
        ...newMember,
        membershipPlansHistory: [
          {
            id: 1,
            planName: newMember.membershipPlan,
            startDate: newMember.startDate,
            endDate: newMember.endDate,
            status: "Active",
          },
        ],
        trainerHistory: [
          {
            id: 1,
            trainerName: newMember.trainer,
            sessions: newMember.sessions,
            status: "Active",
          },
        ],
      };
      await setDoc(doc(membersRef, nextId.toString()), memberData);
      const newMemberWithId = { id: nextId, ...memberData };
      setMembersData([...membersData, newMemberWithId]);
    }

    const planSnapshot = await getDocs(
      query(plansRef, where("planName", "==", newMember.membershipPlan))
    );
    let planPrice = 0;
    if (!planSnapshot.empty) {
      planPrice = planSnapshot.docs[0].data().price;
    }

    // Create sales record
    const salesSnapshot = await getDocs(salesRef);
    const salesIds = salesSnapshot.docs.map((doc) => parseInt(doc.id));
    const nextSalesId = salesIds.length > 0 ? Math.max(...salesIds) + 1 : 1;

    await setDoc(doc(salesRef, nextSalesId.toString()), {
      id: nextSalesId,
      memberName: newMember.fullName,
      plan: newMember.membershipPlan,
      sessions: parseInt(newMember.sessions),
      totalPrice: 0, // You may want to calculate this based on the plan
      purchaseDate: new Date().toISOString().split("T")[0],
    });

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

  useEffect(() => {
    const fetchMembers = async () => {
      const membersRef = collection(db, "members");
      const snapshot = await getDocs(membersRef);
      const membersArray = snapshot.docs.map((doc) => {
        const data = doc.data();
        const currentDate = new Date();

        if (data.membershipPlansHistory) {
          data.membershipPlansHistory = data.membershipPlansHistory.map(
            (plan) => ({
              ...plan,
              status:
                currentDate >= new Date(plan.startDate) &&
                currentDate <= new Date(plan.endDate)
                  ? "Active"
                  : "Inactive",
            })
          );
        } else {
          data.membershipPlansHistory = [];
        }

        if (data.trainerHistory) {
          data.trainerHistory = data.trainerHistory.map((trainer) => ({
            ...trainer,
            status:
              currentDate >= new Date(data.startDate) &&
              currentDate <= new Date(data.endDate)
                ? "Active"
                : "Inactive",
          }));
        } else {
          data.trainerHistory = [];
        }

        return { id: doc.id, ...data };
      });
      setMembersData(membersArray);
    };

    fetchMembers();
  }, []);

  const handleDeleteMember = async (id) => {
    try {
      await deleteDoc(doc(db, "members", id.toString()));
      setMembersData(membersData.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Error deleting member: ", error);
    }
  };

  const [editMemberModal, setEditMemberModal] = useState(false);

  const handleEdit = (member) => {
    setNewMember({
      id: member.id,
      username: member.username,
      fullName: member.fullName,
      gender: member.gender,
      age: member.age,
      email: member.email,
      contactNumber: member.contactNumber,
      address: member.address,
    });
    setEditMemberModal(true);
  };

  const handleSaveEditMember = async () => {
    const membersRef = collection(db, "members");
    await setDoc(doc(membersRef, newMember.id.toString()), newMember, {
      merge: true,
    });
    setMembersData(
      membersData.map((member) =>
        member.id === newMember.id ? newMember : member
      )
    );
    setEditMemberModal(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const [membershipPlans, setMembershipPlans] = useState([]);

  useEffect(() => {
    const fetchMembershipPlans = async () => {
      const plansRef = collection(db, "membershipPlans");
      const snapshot = await getDocs(plansRef);
      const plansArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        planName: doc.data().planName,
        duration: doc.data().duration,
      }));
      setMembershipPlans(plansArray);
    };

    fetchMembershipPlans();
  }, []);

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      const trainersRef = collection(db, "trainers");
      const snapshot = await getDocs(trainersRef);
      const trainersArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        fullName: doc.data().fullName,
      }));
      setTrainers(trainersArray);
    };

    fetchTrainers();
  }, []);

  const handleMembershipPlanChange = (e) => {
    const selectedPlan = e.target.value;
    const selectedPlanData = membershipPlans.find(
      (plan) => plan.planName === selectedPlan
    );

    setNewMember((prevMember) => ({
      ...prevMember,
      membershipPlan: selectedPlan,
      duration: selectedPlanData ? selectedPlanData.duration : "",
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
              <td>{member.contactNumber}</td>
              <td>
                <button
                  className="view-button"
                  onClick={() => handleView(member.id)}
                >
                  <PersonIcon className="icon" />
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(member)}
                >
                  <EditIcon className="icon" />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteMember(member.id)}
                >
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
                    <strong>Contact Info:</strong> {viewMember.contactNumber}
                  </div>
                  <div>
                    <strong>Address:</strong> {viewMember.address}
                  </div>
                </div>
                {viewMember && viewMember.membershipPlansHistory && (
                  <div className="membership-history">
                    <div className="history-header">
                      <div className="view-member-modal">
                        <h3>Membership Plan History</h3>
                        <button
                          className="add-historyplan-button"
                          onClick={handleAddMembershipPlan}
                        >
                          <AddCircleIcon className="icon" /> Add New Plan
                        </button>
                        <table>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Plan Name</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {viewMember.membershipPlansHistory.map((plan) => (
                              <tr key={plan.id}>
                                <td>{plan.id}</td>
                                <td>{plan.planName}</td>
                                <td>{plan.startDate}</td>
                                <td>{plan.endDate}</td>
                                <td>{plan.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {viewMember && viewMember.trainerHistory && (
                  <div className="trainer-history">
                    <div className="historyplan-header">
                      <h3>Trainer History</h3>
                      <button
                        className="add-historyplan-button"
                        onClick={handleAddTrainerHistory}
                      >
                        <AddCircleIcon className="icon" /> Add New Trainer
                      </button>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Trainer Name</th>
                          <th>Sessions</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewMember.trainerHistory.map((trainer) => (
                          <tr key={trainer.id}>
                            <td>{trainer.id}</td>
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
            </div>
          </div>
        </div>
      )}

      {membershipPlanModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Membership Plan</h2>
            <select
              value={newMembershipPlan.planName}
              onChange={(e) =>
                setNewMembershipPlan({
                  ...newMembershipPlan,
                  planName: e.target.value,
                })
              }
            >
              <option value="">Select Plan</option>
              {membershipPlans.map((plan) => (
                <option key={plan.id} value={plan.planName}>
                  {plan.planName}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={newMembershipPlan.startDate}
              onChange={(e) =>
                setNewMembershipPlan({
                  ...newMembershipPlan,
                  startDate: e.target.value,
                })
              }
            />
            <input
              type="date"
              value={newMembershipPlan.endDate}
              onChange={(e) =>
                setNewMembershipPlan({
                  ...newMembershipPlan,
                  endDate: e.target.value,
                })
              }
            />
            <button onClick={handleSaveMembershipPlan}>Save</button>
            <button onClick={() => setMembershipPlanModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {trainerHistoryModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Trainer History</h2>
            <select
              value={newTrainerHistory.trainerName}
              onChange={(e) =>
                setNewTrainerHistory({
                  ...newTrainerHistory,
                  trainerName: e.target.value,
                })
              }
            >
              <option value="">Select Trainer</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.fullName}>
                  {trainer.fullName}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Sessions"
              value={newTrainerHistory.sessions}
              onChange={(e) =>
                setNewTrainerHistory({
                  ...newTrainerHistory,
                  sessions: parseInt(e.target.value),
                })
              }
            />
            <button onClick={handleSaveTrainerHistory}>Save</button>
            <button onClick={() => setTrainerHistoryModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {addMemberModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Member</h2>
              <button
                className="close-button"
                onClick={handleCloseAddMemberModal}
              >
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
                  <label>Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={newMember.age}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={newMember.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-field">
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={newMember.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={newMember.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-field">
                  <label>Membership Plan:</label>
                  <select
                    name="membershipPlan"
                    value={newMember.membershipPlan}
                    onChange={handleMembershipPlanChange}
                  >
                    <option value="">Select Plan</option>
                    {membershipPlans.map((plan) => (
                      <option key={plan.id} value={plan.planName}>
                        {plan.planName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>Duration:</label>
                  <input
                    type="text"
                    name="duration"
                    value={newMember.duration}
                    readOnly
                  />
                </div>
                <div className="modal-field">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={newMember.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={newMember.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-field">
                  <select
                    name="trainer"
                    value={newMember.trainer}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Trainer</option>
                    {trainers.map((trainer) => (
                      <option key={trainer.id} value={trainer.fullName}>
                        {trainer.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-field-row">
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
                <button
                  className="cancel-button"
                  onClick={handleCloseAddMemberModal}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editMemberModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Member</h2>
              <button
                className="close-button"
                onClick={() => setEditMemberModal(false)}
              >
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
                  <label>Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={newMember.age}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-field-row">
                <div className="modal-field">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={newMember.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-field">
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={newMember.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-field-row">
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
            </div>
            <div className="modal-footer">
              <div className="modal-footer-buttons">
                <button className="save-button" onClick={handleSaveEditMember}>
                  SAVE
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditMemberModal(false)}
                >
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
