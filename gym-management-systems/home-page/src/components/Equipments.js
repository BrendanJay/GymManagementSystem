import React, { useState } from "react";
import "./Equipments.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const Equipments = () => {
  const initialEquipmentState = {
    equipmentName: '',
    brand: '',
    quantity: '',
    condition: 'Good',
  };

  const [equipmentsData, setEquipmentsData] = useState([
    { id: 1, equipmentName: "Treadmill", brand: "Brand A", quantity: 10, condition: "Good" },
    { id: 2, equipmentName: "Dumbbell", brand: "Brand B", quantity: 50, condition: "Excellent" },
    { id: 3, equipmentName: "Stationary Bike", brand: "Brand C", quantity: 15, condition: "Fair" },
    { id: 4, equipmentName: "Bench Press", brand: "Brand D", quantity: 5, condition: "Poor" },
    { id: 5, equipmentName: "Elliptical Trainer", brand: "Brand E", quantity: 20, condition: "Good" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEquipment, setNewEquipment] = useState(initialEquipmentState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editEquipmentId, setEditEquipmentId] = useState(null);

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

  const handleSave = () => {
    if (isEditMode) {
      const updatedEquipments = equipmentsData.map(equipment =>
        equipment.id === editEquipmentId ? { ...newEquipment, id: editEquipmentId } : equipment
      );
      setEquipmentsData(updatedEquipments);
    } else {
      setEquipmentsData([...equipmentsData, { ...newEquipment, id: equipmentsData.length + 1 }]);
    }
    setShowModal(false);
    setNewEquipment(initialEquipmentState);
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

  const handleDelete = (id) => {
    const updatedEquipments = equipmentsData.filter(equipment => equipment.id !== id);
    setEquipmentsData(updatedEquipments);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    console.log(`Searching for: ${searchTerm}`);
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
