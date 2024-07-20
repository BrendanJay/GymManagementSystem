import React, { useState } from "react";
import "./Products.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

const Products = () => {
  const [productsData, setProductsData] = useState([
    { id: 1, productName: "Protein Powder", brand: "Brand A", quantity: 20, price: 50, dateAdded: "2024-01-01", expirationDate: "2025-01-01" },
    { id: 2, productName: "Energy Bar", brand: "Brand B", quantity: 100, price: 2, dateAdded: "2024-01-15", expirationDate: "2025-01-15" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: '',
    productName: '',
    brand: '',
    quantity: '',
    price: '',
    dateAdded: '',
    expirationDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddNewClick = () => {
    setShowModal(true);
    setIsEdit(false);
    setNewProduct({
      id: '',
      productName: '',
      brand: '',
      quantity: '',
      price: '',
      dateAdded: '',
      expirationDate: '',
    });
  };

  const handleEditClick = (product) => {
    setShowModal(true);
    setIsEdit(true);
    setEditProductId(product.id);
    setNewProduct({
      productName: product.productName,
      brand: product.brand,
      quantity: product.quantity,
      price: product.price,
      dateAdded: product.dateAdded,
      expirationDate: product.expirationDate,
    });
  };

  const handleSave = () => {
    if (isEdit) {
      setProductsData(productsData.map(product => 
        product.id === editProductId ? { ...newProduct, id: editProductId } : product
      ));
    } else {
      setProductsData([...productsData, { ...newProduct, id: productsData.length + 1 }]);
    }
    setShowModal(false);
    setNewProduct({
      id: '',
      productName: '',
      brand: '',
      quantity: '',
      price: '',
      dateAdded: '',
      expirationDate: '',
    });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updatedProducts = productsData.filter(product => product.id !== id);
    setProductsData(updatedProducts);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="products">
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
            <th>Product Name</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date Added</th>
            <th>Expiration Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.brand}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.dateAdded}</td>
              <td>{product.expirationDate}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditClick(product)}>
                  <EditIcon className="icon" />
                </button>
                <button className="delete-button" onClick={() => handleDelete(product.id)}>
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
              <h2>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
            </div>
            <div className="modal-content">
              <label>Product Name</label>
              <input type="text" name="productName" value={newProduct.productName} onChange={handleInputChange} />
              <label>Brand</label>
              <input type="text" name="brand" value={newProduct.brand} onChange={handleInputChange} />
              <label>Quantity</label>
              <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} />
              <label>Price</label>
              <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
              <label>Date Added</label>
              <input type="date" name="dateAdded" value={newProduct.dateAdded} onChange={handleInputChange} />
              <label>Expiration Date</label>
              <input type="date" name="expirationDate" value={newProduct.expirationDate} onChange={handleInputChange} />
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

export default Products;
