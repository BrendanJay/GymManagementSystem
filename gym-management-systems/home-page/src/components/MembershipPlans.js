import React, { useState } from "react";
import Modal from "react-modal";
import "./MembershipPlans.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

const MembershipPlans = () => {
  const initialPlanState = {
    planName: "",
    description: "",
    duration: "",
    price: "",
  };

  const [plans, setPlans] = useState([
    {
      id: 1,
      planName: "Premium",
      description: "Access to all facilities",
      duration: "12 months",
      price: "$1200",
    },
    {
      id: 2,
      planName: "Standard",
      description: "Basic gym access",
      duration: "6 months",
      price: "$600",
    },
    {
      id: 3,
      planName: "Basic",
      description: "Limited access to facilities",
      duration: "3 months",
      price: "$300",
    },
    {
      id: 4,
      planName: "Student",
      description: "Discounted rate for students",
      duration: "12 months",
      price: "$800",
    },
    {
      id: 5,
      planName: "Senior",
      description: "Discounted rate for seniors",
      duration: "12 months",
      price: "$900",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState(initialPlanState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editPlanId, setEditPlanId] = useState(null);

  const handleEdit = (plan) => {
    setIsEditMode(true);
    setEditPlanId(plan.id);
    setNewPlan(plan);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedPlans = plans.filter(plan => plan.id !== id);
    setPlans(updatedPlans);
  };

  const handleAddNew = () => {
    setIsEditMode(false);
    setNewPlan(initialPlanState);
    setIsModalOpen(true);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    console.log(`Searching for: ${searchTerm}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewPlan(initialPlanState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
  };

  const handleSave = () => {
    if (isEditMode) {
      const updatedPlans = plans.map(plan => 
        plan.id === editPlanId ? { ...newPlan, id: editPlanId } : plan
      );
      setPlans(updatedPlans);
    } else {
      setPlans([...plans, { ...newPlan, id: plans.length + 1 }]);
    }
    handleCloseModal();
  };

  return (
    <div className="membership-plans">
      <div className="table-header">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="add-new-button" onClick={handleAddNew}>
          ADD NEW
          <AddCircleIcon className="icon" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Plan Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.id}</td>
              <td>{plan.planName}</td>
              <td>{plan.description}</td>
              <td>{plan.duration}</td>
              <td>{plan.price}</td>
              <td className="action-buttons">
                <button className="edit-button" onClick={() => handleEdit(plan)}>
                  <EditIcon className="icon" />
                </button>
                <button className="delete-button" onClick={() => handleDelete(plan.id)}>
                  <DeleteIcon className="icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="modal"
        overlayClassName="overlay"
        contentLabel={isEditMode ? "Edit Membership Plan" : "Add New Membership Plan"}
      >
        <div className="modal-header">
          <b>{isEditMode ? "EDIT MEMBERSHIP PLAN" : "ADD NEW MEMBERSHIP PLAN"}</b>
        </div>
        <div className="modal-divider"></div>
        <div className="modal-content">
          <div className="modal-field">
            <label>Plan Name</label>
            <input
              type="text"
              name="planName"
              value={newPlan.planName}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={newPlan.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-field">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={newPlan.duration}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-field">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={newPlan.price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="modal-divider"></div>
        <div className="modal-footer">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default MembershipPlans;
