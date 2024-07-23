import React, { useState, useEffect } from "react";
import "./Trainers.css";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { collection, setDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Trainers = () => {
  const [trainersData, setTrainersData] = useState([
    
  ]);

  const getNextId = async () => {
    const trainersRef = collection(db, 'trainers');
    const snapshot = await getDocs(trainersRef);
    const ids = snapshot.docs.map(doc => parseInt(doc.id)).filter(id => !isNaN(id));
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  };
  
  const [searchTerm, setSearchTerm] = useState("");
  const [viewTrainer, setViewTrainer] = useState(null);
  const [addTrainerModal, setAddTrainerModal] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    fullName: "",
    gender: "",
    age: "",
    email: "",
    contactNumber: "",
    address: "",
    specialty: "",
    ratePerSession: 0,
    memberHistory: [],
  });

  const handleView = async (id) => {
    const trainer = trainersData.find(trainer => trainer.id === id);
    const membersRef = collection(db, 'members');
    const membersSnapshot = await getDocs(membersRef);
    const memberHistory = membersSnapshot.docs
      .filter(doc => doc.data().trainerHistory.some(th => th.trainerName === trainer.fullName))
      .map(doc => {
        const memberData = doc.data();
        const trainerHistory = memberData.trainerHistory.find(th => th.trainerName === trainer.fullName);
        const currentDate = new Date();
        const status = currentDate >= new Date(memberData.startDate) && currentDate <= new Date(memberData.endDate) ? 'Active' : 'Inactive';
        return {
          member: memberData.fullName,
          sessions: trainerHistory.sessions,
          status: status
        };
      });
    setViewTrainer({ ...trainer, memberHistory });
  };

  const handleCloseView = () => {
    setViewTrainer(null);
  };

  const handleAddTrainer = () => {
    setAddTrainerModal(true);
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = (trainer) => {
    setNewTrainer(trainer);
    setIsEditMode(true);
    setAddTrainerModal(true);
  };
  
  const handleCloseAddTrainerModal = () => {
    setAddTrainerModal(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSaveTrainer = async () => {
    if (isEditMode) {
      await setDoc(doc(db, 'trainers', newTrainer.id.toString()), newTrainer);
      setTrainersData(trainersData.map(trainer => trainer.id === newTrainer.id ? newTrainer : trainer));
    } else {
      const nextId = await getNextId();
      await setDoc(doc(db, 'trainers', nextId.toString()), newTrainer);
      setTrainersData([...trainersData, { id: nextId, ...newTrainer }]);
    }
    setNewTrainer({
      fullName: "",
      gender: "",
      age: "",
      email: "",
      contactNumber: "",
      address: "",
      specialty: "",
      ratePerSession: 0,
      memberHistory: [],
    });
    setIsEditMode(false);
    setAddTrainerModal(false);
  };
  
  
  useEffect(() => {
    const fetchTrainers = async () => {
      const trainersRef = collection(db, 'trainers');
      const q = query(trainersRef, 
        where('fullName', '>=', searchTerm),
        where('fullName', '<=', searchTerm + '\uf8ff')
      );
      const snapshot = await getDocs(q);
      const trainersArray = snapshot.docs.map(doc => ({ id: parseInt(doc.id), ...doc.data() }));
      setTrainersData(trainersArray);
    };
  
    fetchTrainers();
  }, [searchTerm]);

  const handleDeleteTrainer = async (id) => {
    await deleteDoc(doc(db, 'trainers', id));
    setTrainersData(trainersData.filter(trainer => trainer.id !== id));
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer((prevTrainer) => ({
      ...prevTrainer,
      [name]: value,
    }));
  };

  return (
    <div className="trainers">
      <div className="table-header">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input type="text" placeholder="Search..." onChange={handleSearch} className="search-input" />
        </div>
        <div className="add-new-button" onClick={handleAddTrainer}>
          ADD NEW
          <AddCircleIcon className="icon" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainersData.map((trainer) => (
            <tr key={trainer.id}>
              <td>{trainer.id}</td>
              <td>{trainer.fullName}</td>
              <td>{trainer.gender}</td>
              <td>{trainer.age}</td>
              <td>{trainer.email}</td>
              <td>{trainer.contactNumber}</td>
              <td>
                <button className="view-button" onClick={() => handleView(trainer.id)}>
                  <PersonIcon className="icon" />
                </button>
                <button className="edit-button" onClick={() => handleEdit(trainer)}>
                  <EditIcon className="icon" />
                </button>
                <button className="delete-button" onClick={() => handleDeleteTrainer(trainer.id)}>
                  <DeleteIcon className="icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewTrainer && (
        <div className="view-trainer-modal">
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>View Trainer Information</h2>
                <button className="close-button" onClick={handleCloseView}>
                  <CloseIcon />
                </button>
              </div>
              <div className="modal-content">
                <div className="trainer-info">
                  <div>
                    <strong>Full Name:</strong> {viewTrainer.fullName}
                  </div>
                  <div>
                    <strong>Gender:</strong> {viewTrainer.gender}
                  </div>
                  <div>
                    <strong>Age:</strong> {viewTrainer.age}
                  </div>
                  <div>
                    <strong>Email:</strong> {viewTrainer.email}
                  </div>
                  <div>
                    <strong>Contact Number:</strong> {viewTrainer.contactNumber}
                  </div>
                  <div>
                    <strong>Address:</strong> {viewTrainer.address}
                  </div>
                  <div>
                    <strong>Specialty:</strong> {viewTrainer.specialty}
                  </div>
                  <div>
                    <strong>Rate per Session:</strong> ${viewTrainer.ratePerSession}
                  </div>
                </div>
                <div className="member-history">
                  <h3>Member History</h3>
                  <table className="mini-table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Sessions</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewTrainer.memberHistory.map((member, index) => (
                        <tr key={index}>
                          <td>{member.member}</td>
                          <td>{member.sessions}</td>
                          <td>{member.status}</td>
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

      {addTrainerModal && (
        <div className="add-trainer-modal">
          <div className="modal-overlay">
            <div className="modal add-trainer-modal-content">
              <div className="modal-header">
                <h2>Add New Trainer</h2>
              </div>
              <div className="modal-content">
                <form>
                  <label>Full Name:</label>
                  <input type="text" name="fullName" value={newTrainer.fullName} onChange={handleInputChange} />

                  <label>Gender:</label>
                  <select name="gender" value={newTrainer.gender} onChange={handleInputChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  <label>Age:</label>
                  <input type="number" name="age" value={newTrainer.age} onChange={handleInputChange} />

                  <label>Email:</label>
                  <input type="email" name="email" value={newTrainer.email} onChange={handleInputChange} />

                  <label>Contact Number:</label>
                  <input type="text" name="contactNumber" value={newTrainer.contactNumber} onChange={handleInputChange} />

                  <label>Address:</label>
                  <input type="text" name="address" value={newTrainer.address} onChange={handleInputChange} />

                  <label>Specialty:</label>
                  <input type="text" name="specialty" value={newTrainer.specialty} onChange={handleInputChange} />

                  <label>Rate per Session:</label>
                  <input type="number" name="ratePerSession" value={newTrainer.ratePerSession} onChange={handleInputChange} />

                  {/* Member History can be added dynamically */}
                </form>
              </div>
              <div className="modal-footer">
                <button className="save-button" onClick={handleSaveTrainer}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCloseAddTrainerModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainers;
