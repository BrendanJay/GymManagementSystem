import React, { useState } from 'react';
import { CheckCircleOutline } from '@mui/icons-material';
import './PlanSelection.css';

function PlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { name: 'Basic Plan', description: 'Access to gym facilities', duration: '1 Month', price: '$20' },
    { name: 'Standard Plan', description: 'Access to gym + classes', duration: '3 Months', price: '$50' },
    // Add more plans as needed
  ];

  const handleSelect = (index) => {
    setSelectedPlan(index);
  };

  return (
    <div className="plan-selection">
      <div className="plan-wrapper">
        <h1>Available Membership Plans:</h1>
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
        <button className="proceed-button">Proceed to Payment</button>
      </div>
    </div>
  );
}

export default PlanSelection;
