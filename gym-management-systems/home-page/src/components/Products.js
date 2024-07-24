import React, { useState, useEffect } from "react";
import "./Products.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Products = () => {
  const initialProductState = {
    id: '',
    productName: '',
    brand: '',
    quantity: '',
    price: '',
    dateAdded: '',
    expirationDate: '',
  };
  
  const [productsData, setProductsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [isEdit, setIsEdit] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [originalProductsData, setOriginalProductsData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      const productsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductsData(productsArray);
      setOriginalProductsData(productsArray);
    };
  
    fetchProducts();
  }, []);
  

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

  const handleSave = async () => {
    try {
      const productsRef = collection(db, 'products');
      let productToSave = { ...newProduct };
  
      if (!isEdit) {
        const snapshot = await getDocs(productsRef);
        const ids = snapshot.docs.map(doc => parseInt(doc.id));
        const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        productToSave.id = nextId;
      }
  
      await setDoc(doc(db, 'products', productToSave.id.toString()), productToSave);
  
      setProductsData(prevData => {
        if (isEdit) {
          return prevData.map(product => 
            product.id === productToSave.id ? productToSave : product
          );
        } else {
          return [...prevData, productToSave];
        }
      });
  
      setShowModal(false);
      setNewProduct(initialProductState);
      setIsEdit(false);
    } catch (error) {
      console.error("Error saving product: ", error);
      alert(error.message);
    }
  };
  
  
  
  

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setEditProductId(product.id);
    setNewProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id.toString()));
      setProductsData(productsData.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
      //alert(error.message);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === '') {
      setProductsData(originalProductsData);
    } else {
      const filteredProducts = originalProductsData.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm)
      );
      setProductsData(filteredProducts);
    }
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
                <button className="edit-button" onClick={() => handleEdit(product)}>
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
