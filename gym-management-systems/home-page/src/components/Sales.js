import React, { useState } from "react";
import "./Sales.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Sales = () => {
    const [salesData, setSalesData] = useState([
        { id: 1, memberName: "John Doe", plan: "Gold", sessions: 10, totalPrice: "$200", purchaseDate: "2024-06-01" },
        { id: 2, memberName: "Jane Smith", plan: "Silver", sessions: 5, totalPrice: "$100", purchaseDate: "2024-06-15" },
        { id: 3, memberName: "Alice Brown", plan: "Platinum", sessions: 15, totalPrice: "$300", purchaseDate: "2024-06-10" },
        { id: 4, memberName: "Bob Green", plan: "Bronze", sessions: 8, totalPrice: "$150", purchaseDate: "2024-06-20" },
        { id: 5, memberName: "Eve Jones", plan: "Gold", sessions: 12, totalPrice: "$240", purchaseDate: "2024-06-05" },
      ]);
      

  const [showModal, setShowModal] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);
  const [filteredSales, setFilteredSales] = useState(salesData); // State to hold filtered sales

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSale((prevSale) => ({
      ...prevSale,
      [name]: value,
    }));
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

  const handleSave = () => {
    if (currentSale.id > salesData.length) {
      setSalesData([...salesData, currentSale]);
    } else {
      setSalesData(
        salesData.map((sale) => (sale.id === currentSale.id ? currentSale : sale))
      );
    }
    setShowModal(false);
    setCurrentSale(null);
  };

  const handleDelete = (id) => {
    const updatedSales = salesData.filter((sale) => sale.id !== id);
    setSalesData(updatedSales);
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
              <h2>{currentSale.id > salesData.length ? "Add New Sale" : "Edit Sale"}</h2>
            </div>
            <div className="modal-content">
              <label>Member Name</label>
              <input type="text" name="memberName" value={currentSale.memberName} onChange={handleInputChange} />
              <label>Plan</label>
              <input type="text" name="plan" value={currentSale.plan} onChange={handleInputChange} />
              <label>Sessions</label>
              <input type="number" name="sessions" value={currentSale.sessions} onChange={handleInputChange} />
              <label>Total Price</label>
              <input type="number" name="totalPrice" value={currentSale.totalPrice} onChange={handleInputChange} />
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
