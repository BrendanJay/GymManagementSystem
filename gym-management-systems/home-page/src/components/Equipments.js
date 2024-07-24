import React, { useState, useEffect } from "react";
import "./Equipments.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { collection, setDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Equipments = () => {
  const initialEquipmentState = {
    equipmentName: '',
    brand: '',
    quantity: '',
    condition: 'Good',
  };

  const [equipmentsData, setEquipmentsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEquipment, setNewEquipment] = useState(initialEquipmentState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editEquipmentId, setEditEquipmentId] = useState(null);
  const [originalEquipmentsData, setOriginalEquipmentsData] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      const equipmentsRef = collection(db, 'equipments');
      const snapshot = await getDocs(equipmentsRef);
      const equipmentsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEquipmentsData(equipmentsArray);
      setOriginalEquipmentsData(equipmentsArray);
    };
  
    fetchEquipments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEquipment((prevEquipment) => ({
      ...prevEquipment,
      [name]: value,
    }));
  };

  const handleAddNewClick = () => {
    setIsEditMode(false);
    setNewEquipment(initialEquipmentState);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const equipmentsRef = collection(db, 'equipments');
      let equipmentToSave = { ...newEquipment };
  
      if (!isEditMode) {
        const snapshot = await getDocs(equipmentsRef);
        const ids = snapshot.docs.map(doc => parseInt(doc.id));
        const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        equipmentToSave.id = nextId;
      }
  
      await setDoc(doc(db, 'equipments', equipmentToSave.id.toString()), equipmentToSave);
  
      setEquipmentsData(prevData => {
        if (isEditMode) {
          return prevData.map(equipment => 
            equipment.id === equipmentToSave.id ? equipmentToSave : equipment
          );
        } else {
          return [...prevData, equipmentToSave];
        }
      });
  
      setShowModal(false);
      setNewEquipment(initialEquipmentState);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving equipment: ", error);
      alert(error.message);
    }
  };
  
  const handleCancel = () => {
    setShowModal(false);
  };

  const handleEdit = (equipment) => {
    setIsEditMode(true);
    setEditEquipmentId(equipment.id);
    setNewEquipment(equipment);
    setShowModal(true);
  };
  
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'equipments', id.toString()));
      setEquipmentsData(equipmentsData.filter(equipment => equipment.id !== id));
    } catch (error) {
      console.error("Error deleting equipment: ", error);
      alert(error.message);
    }
  };
  

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === '') {
      setEquipmentsData(originalEquipmentsData);
    } else {
      const filteredEquipments = originalEquipmentsData.filter((equipment) =>
        equipment.equipmentName.toLowerCase().includes(searchTerm)
      );
      setEquipmentsData(filteredEquipments);
    }
  };

  return (
    <div className="equipments">
      <div className="table-header">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input type="text" placeholder="Search..." onChange={handleSearch} className="search-input" />
        </div>
        <div className="add-new-button" onClick={handleAddNewClick}>
          ADD NEW
          <span className="icon">+</span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Equipment Name</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Condition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {equipmentsData.map((equipment) => (
            <tr key={equipment.id}>
              <td>{equipment.id}</td>
              <td>{equipment.equipmentName}</td>
              <td>{equipment.brand}</td>
              <td>{equipment.quantity}</td>
              <td>{equipment.condition}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(equipment)}>
                  <EditIcon className="icon" />
                </button>
                <button className="delete-button" onClick={() => handleDelete(equipment.id)}>
                  <DeleteIcon className="icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{isEditMode ? "Edit Equipment" : "Add New Equipment"}</h2>
            </div>
            <div className="modal-content">
              <label>Equipment Name</label>
              <input type="text" name="equipmentName" value={newEquipment.equipmentName} onChange={handleInputChange} />
              <label>Brand</label>
              <input type="text" name="brand" value={newEquipment.brand} onChange={handleInputChange} />
              <label>Quantity</label>
              <input type="number" name="quantity" value={newEquipment.quantity} onChange={handleInputChange} />
              <label>Condition</label>
              <select name="condition" value={newEquipment.condition} onChange={handleInputChange}>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
                <option value="Broken">Broken</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipments;
