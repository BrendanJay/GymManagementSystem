import React, { useState } from 'react';
import { CheckCircleOutline } from '@mui/icons-material';
import './PlanSelection.css';
import gcashLogo from './GCash-Logo-tumb.png';

function PlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [gcashNumber, setGcashNumber] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const plans = [
    { name: 'Basic Plan', description: 'Basic gym access', price: 500, duration: '1 month' },
    { name: 'Premium Plan', description: 'All access + personal trainer', price: 1000, duration: '1 month' },
    // Add more plans as needed
  ];

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

  const validateGcashNumber = (number) => {
    // Regex for +63 followed by 10 digits
    const regex = /^\+63\d{10}$/;
    return regex.test(number);
  };

  const handlePay = () => {
    if (!gcashNumber || !date) {
      setErrorMessage('Please fill in all fields.');
    } else if (!validateGcashNumber(gcashNumber)) {
      setErrorMessage('Please enter a valid GCash number (+63 followed by 10 digits).');
    } else {
      setPaymentSuccessful(true);
      setErrorMessage(''); // Clear any previous error messages
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPaymentSuccessful(false);
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
              <div className="ps-plan-column">{plan.name}</div>
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
                  <p>{plans[selectedPlan].name}</p>
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
