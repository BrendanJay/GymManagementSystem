import React, { useState, useEffect } from "react";
import "./Sales.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { collection, setDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Sales = () => {
    const [salesData, setSalesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [members, setMembers] = useState([]);
    const [currentSale, setCurrentSale] = useState(null);
    const [filteredSales, setFilteredSales] = useState(salesData); // State to hold filtered sales
    const [membershipPlans, setMembershipPlans] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        const salesRef = collection(db, 'sales');
        const salesSnapshot = await getDocs(salesRef);
        const salesArray = salesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSalesData(salesArray);
        setFilteredSales(salesArray);

          const membersRef = collection(db, 'members');
          const membersSnapshot = await getDocs(membersRef);
          const membersArray = membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMembers(membersArray);

          const plansRef = collection(db, 'membershipPlans');
          const plansSnapshot = await getDocs(plansRef);
          const plansArray = plansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMembershipPlans(plansArray);
      };

      fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'plan') {
        const selectedPlan = membershipPlans.find(plan => plan.planName === value);
        setCurrentSale(prevSale => ({
            ...prevSale,
            [name]: value,
            totalPrice: selectedPlan ? selectedPlan.price : 0
        }));
    } else {
        setCurrentSale(prevSale => ({
            ...prevSale,
            [name]: value
        }));
    }
};

  const handleAddNewClick = () => {
    setCurrentSale({
      id: salesData.length + 1,
      memberName: '',
      plan: '',
      sessions: '',
      totalPrice: '',
      purchaseDate: '',
    });
    setShowModal(true);
  };

  const handleEdit = (id) => {
    const saleToEdit = salesData.find((sale) => sale.id === id);
    setCurrentSale(saleToEdit);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const salesRef = collection(db, 'sales');
      
      if (currentSale.id) {
        // Updating existing sale
        await setDoc(doc(db, 'sales', currentSale.id.toString()), {
          memberName: currentSale.memberName,
          plan: currentSale.plan,
          sessions: parseInt(currentSale.sessions),
          totalPrice: parseFloat(currentSale.totalPrice),
          purchaseDate: currentSale.purchaseDate
        }, { merge: true });
  
        setSalesData(salesData.map(sale => 
          sale.id === currentSale.id ? currentSale : sale
        ));
      } else {
        // Adding new sale
        const snapshot = await getDocs(salesRef);
        const ids = snapshot.docs.map(doc => parseInt(doc.id));
        const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  
        await setDoc(doc(db, 'sales', nextId.toString()), {
          id: nextId,
          memberName: currentSale.memberName,
          plan: currentSale.plan,
          sessions: parseInt(currentSale.sessions),
          totalPrice: parseFloat(currentSale.totalPrice),
          purchaseDate: currentSale.purchaseDate
        });
  
        setSalesData([...salesData, { ...currentSale, id: nextId }]);
      }
  
      setShowModal(false);
      setCurrentSale(null);
    } catch (error) {
      console.error("Error saving sale: ", error);
      alert(error.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'sales', id.toString()));
      setSalesData(salesData.filter(sale => sale.id !== id));
      setFilteredSales(filteredSales.filter(sale => sale.id !== id));
    } catch (error) {
      console.error("Error deleting sale: ", error);
      alert(error.message);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = salesData.filter((sale) =>
      sale.memberName.toLowerCase().includes(searchTerm)
    );
    setFilteredSales(filteredData);
  };

  const handleCancel = () => {
    setShowModal(false);
    setCurrentSale(null);
  };

  return (
    <div className="sales">
      <div className="table-header">
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input type="text" placeholder="Search..." onChange={handleSearch} className="search-input" />
        </div>
        <div className="add-new-button" onClick={handleAddNewClick}>
          ADD NEW
          <AddCircleIcon className="icon" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Member Name</th>
            <th>Plan</th>
            <th>Sessions</th>
            <th>Total Price</th>
            <th>Purchase Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.memberName}</td>
              <td>{sale.plan}</td>
              <td>{sale.sessions}</td>
              <td>{sale.totalPrice}</td>
              <td>{sale.purchaseDate}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(sale.id)}>
                  <EditIcon className="icon" />
                </button>
                <button className="delete-button" onClick={() => handleDelete(sale.id)}>
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
                  <h2>{currentSale.id ? "Edit Sale" : "Add New Sale"}</h2>
              </div>
              <div className="modal-content">
                  <label>Member Name</label>
                  <select name="memberName" value={currentSale.memberName} onChange={handleInputChange}>
                      <option value="">Select Member</option>
                      {members.map(member => (
                          <option key={member.id} value={member.fullName}>{member.fullName}</option>
                      ))}
                  </select>
                  <label>Plan</label>
                  <select name="plan" value={currentSale.plan} onChange={handleInputChange}>
                      <option value="">Select Plan</option>
                      {membershipPlans.map(plan => (
                          <option key={plan.id} value={plan.planName}>{plan.planName}</option>
                      ))}
                  </select>
                  <label>Sessions</label>
                  <input type="number" name="sessions" value={currentSale.sessions} onChange={handleInputChange} />
                  <label>Total Price</label>
                  <input type="number" name="totalPrice" value={currentSale.totalPrice} readOnly />
                  <label>Purchase Date</label>
                  <input type="date" name="purchaseDate" value={currentSale.purchaseDate} onChange={handleInputChange} />
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

export default Sales;
