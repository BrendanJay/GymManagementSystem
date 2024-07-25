import React, { useState, useEffect } from 'react';
import { CheckCircleOutline } from '@mui/icons-material';
import './PlanSelection.css';
import gcashLogo from './GCash-Logo-tumb.png';
import { collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

function PlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [gcashNumber, setGcashNumber] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const plansRef = collection(db, 'membershipPlans');
      const snapshot = await getDocs(plansRef);
      const plansArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlans(plansArray);
    };

    fetchPlans();
  }, []);

  const handleSelect = (index) => {
    setSelectedPlan(index);
    setShowWarning(false); // Hide warning if a plan is selected
  };

  const handleProceed = () => {
    if (selectedPlan === null) {
      setShowWarning(true);
    } else {
      setShowModal(true);
      setErrorMessage(''); // Clear any previous error messages
    }
  };

  const calculateEndDate = (startDate, duration) => {
    const start = new Date(startDate);
    const [amount, unit] = duration.split(' ');
    
    switch(unit.toLowerCase()) {
      case 'day':
      case 'days':
        start.setDate(start.getDate() + parseInt(amount));
        break;
      case 'week':
      case 'weeks':
        start.setDate(start.getDate() + (parseInt(amount) * 7));
        break;
      case 'month':
      case 'months':
        start.setMonth(start.getMonth() + parseInt(amount));
        break;
      case 'year':
      case 'years':
        start.setFullYear(start.getFullYear() + parseInt(amount));
        break;
      default:
        console.warn(`Unhandled duration unit: ${unit}`);
    }
    
    return start.toISOString().split('T')[0];
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setPaymentSuccessful(false);
  };
 

  const validateGcashNumber = (number) => {
    // Regex for +63 followed by 10 digits
    const regex = /^\+63\d{10}$/;
    return regex.test(number);
  };

  const handlePay = async () => {
    if (!gcashNumber || !date) {
      setErrorMessage('Please fill in all fields.');
    } else if (!validateGcashNumber(gcashNumber)) {
      setErrorMessage('Please enter a valid GCash number (+63 followed by 10 digits).');
    } else {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(db, 'members'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            await updateDoc(userDoc.ref, {
              membershipPlansHistory: arrayUnion({
                planName: plans[selectedPlan].planName,
                startDate: date,
                endDate: calculateEndDate(date, plans[selectedPlan].duration),
                status: 'Active'
              })
            });
            setPaymentSuccessful(true);
            setErrorMessage('');
          }
        }
      } catch (error) {
        console.error("Error updating user's membership plan history:", error);
        setErrorMessage('An error occurred while processing your payment. Please try again.');
      }
    }
  };  

  return (
    <div className="ps-plan-selection">
      <div className="ps-plan-wrapper">
        <h1>Available Plans</h1>
        <div className="ps-plans-container">
          <div className="ps-plan-row">
            <span className="ps-plan-label">Plan</span>
            <span className="ps-plan-label ps-plan-description-label">Description</span>
            <span className="ps-plan-label">Duration</span>
            <span className="ps-plan-label">Price</span>
          </div>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`ps-plan-card ${selectedPlan === index ? 'ps-selected' : ''}`}
              onClick={() => handleSelect(index)}
            >
              <div className="ps-plan-column">{plan.planName}</div> {/* Updated field name */}
              <div className="ps-plan-column ps-plan-description">{plan.description}</div>
              <div className="ps-plan-column">{plan.duration}</div>
              <div className="ps-plan-column">₱{plan.price}</div>
              {selectedPlan === index && (
                <CheckCircleOutline className="ps-check-icon" />
              )}
            </div>
          ))}
        </div>
        {showWarning && <p className="ps-warning-text">Please select a plan before proceeding.</p>}
        <button className="ps-proceed-button" onClick={handleProceed}>Proceed to Payment</button>
      </div>

      {showModal && (
        <div className="ps-modal-overlay">
          <div className="ps-modal-content">
            <div className="ps-modal-header">
              <img src={gcashLogo} alt="GCash Logo" className="ps-gcash-logo" />
              <button className="ps-close-modal" onClick={handleCloseModal}>X</button>
            </div>
            
            {paymentSuccessful ? (
              <div className="ps-success-message">
                <h2>Payment Successful!</h2>
                <p>Thank you for your purchase.</p>
                <button className="ps-close-modal" onClick={handleCloseModal}>Close</button>
              </div>
            ) : (
              <>
                <div className="ps-input-container">
                  <label><strong>GCash Number</strong></label>
                  <label><strong>Date</strong></label>
                </div>
                <div className="ps-line" /> {/* Line below input fields */}
                <div className="ps-input-container">
                  <input
                    type="text"
                    placeholder="Enter GCash Number"
                    value={gcashNumber}
                    onChange={(e) => setGcashNumber(e.target.value)}
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="ps-line" /> {/* Line below input fields */}
                <div className="ps-plan-details">
                  <p><strong>You are about to purchase</strong></p>
                  <div className="ps-line" /> {/* Line below "You are about to purchase" */}
                  <p>{plans[selectedPlan].planName}</p> {/* Updated field name */}
                  <p>{plans[selectedPlan].description}</p>
                  <p>{plans[selectedPlan].duration}</p>
                  <p>₱{plans[selectedPlan].price}</p>
                </div>
                <div className="ps-line" /> {/* Line below plan details */}
                {errorMessage && <p className="ps-error-text">{errorMessage}</p>}
                <button className="ps-pay-button" onClick={handlePay}>Pay ₱{plans[selectedPlan].price}</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanSelection;
