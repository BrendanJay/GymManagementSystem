import React, { useState } from 'react';
import { CheckCircleOutline } from '@mui/icons-material';
import './PlanSelection.css';

function PlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plans = [
    { name: 'Basic Plan', description: 'Access to gym facilities', duration: '1 Month', price: '$20' },
    { name: 'Standard Plan', description: 'Access to gym + classes', duration: '3 Months', price: '$50' },
    // Add more plans as needed
  ];

  const handleSelect = (index) => {
    setSelectedPlan(index);
  };

  const handleProceed = () => {
    if (selectedPlan !== null) {
      setIsModalOpen(true);
    } else {
      alert('Please select a plan first.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="plan-selection">
      <div className="plan-wrapper">
        <h1>Available Membership Plans</h1>
        <div className="plans-container">
          <div className="plan-row">
            <span className="plan-label">Plan</span>
            <span className="plan-label plan-description-label">Description</span>
            <span className="plan-label">Duration</span>
            <span className="plan-label">Price</span>
          </div>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card ${selectedPlan === index ? 'selected' : ''}`}
              onClick={() => handleSelect(index)}
            >
              <div className="plan-column">{plan.name}</div>
              <div className="plan-column plan-description">{plan.description}</div>
              <div className="plan-column">{plan.duration}</div>
              <div className="plan-column">{plan.price}</div>
              {selectedPlan === index && (
                <CheckCircleOutline className="check-icon" />
              )}
            </div>
          ))}
        </div>
        <button className="proceed-button" onClick={handleProceed}>
          Proceed to Payment
        </button>
      </div>

      {isModalOpen && (
        <div className="plan-selection-modal-overlay">
          <div className="plan-selection-modal-content">
            <button className="plan-selection-modal-close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Payment Processing</h2>
            <form>
              <label>
                Card Number:
                <input type="text" placeholder="1234 5678 9012 3456" />
              </label>
              <label>
                Expiry Date:
                <input type="text" placeholder="MM/YY" />
              </label>
              <label>
                CVV:
                <input type="text" placeholder="123" />
              </label>
              <button type="submit">Pay Now</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanSelection;
