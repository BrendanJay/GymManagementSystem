import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./MembershipPlans.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, setDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    planName: "",
    description: "",
    duration: "",
    price: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editPlanId, setEditPlanId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPlans();
  }, [searchTerm]);

  const fetchPlans = async () => {
    const plansRef = collection(db, 'membershipPlans');
    const q = query(plansRef, 
      where('planName', '>=', searchTerm),
      where('planName', '<=', searchTerm + '\uf8ff')
    );
    const snapshot = await getDocs(q);
    const plansArray = snapshot.docs.map(doc => ({ id: parseInt(doc.id), ...doc.data() }));
    setPlans(plansArray);
  };

  const getNextId = async () => {
    const plansRef = collection(db, 'membershipPlans');
    const snapshot = await getDocs(plansRef);
    const ids = snapshot.docs.map(doc => parseInt(doc.id)).filter(id => !isNaN(id));
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  };

  const handleEdit = (plan) => {
    setIsEditMode(true);
    setEditPlanId(plan.id);
    setNewPlan(plan);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'membershipPlans', id.toString()));
      setPlans(plans.filter(plan => plan.id !== id));
    } catch (error) {
      console.error("Error deleting plan: ", error);
    }
  };

  const handleAddNew = () => {
    setIsEditMode(false);
    setNewPlan({
      planName: "",
      description: "",
      duration: "",
      price: "",
    });
    setIsModalOpen(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewPlan({
      planName: "",
      description: "",
      duration: "",
      price: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
  };

  const handleSave = async () => {
    if (isEditMode) {
      await setDoc(doc(db, 'membershipPlans', editPlanId.toString()), newPlan);
      setPlans(plans.map(plan => plan.id === editPlanId ? { ...newPlan, id: editPlanId } : plan));
    } else {
      const nextId = await getNextId();
      await setDoc(doc(db, 'membershipPlans', nextId.toString()), newPlan);
      setPlans([...plans, { ...newPlan, id: nextId }]);
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
