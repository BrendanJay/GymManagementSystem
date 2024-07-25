import React, { useState } from 'react';
import { CheckCircleOutline } from '@mui/icons-material';
import './TrainerSelection.css';
import gcashLogo from './GCash-Logo-tumb.png';

function TrainerSelection() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [gcashNumber, setGcashNumber] = useState('');
  const [date, setDate] = useState('');
  const [sessions, setSessions] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const trainers = [
    { name: 'John Doe', specialty: 'Strength Training', rate: 700 },
    { name: 'Jane Smith', specialty: 'Cardio Training', rate: 600 },
    // Add more trainers as needed
  ];

  const handleSelect = (index) => {
    setSelectedTrainer(index);
    setShowWarning(false); // Hide warning if a trainer is selected
  };

  const handleProceed = () => {
    if (selectedTrainer === null) {
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
    if (!gcashNumber || !date || !sessions) {
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

  const calculateTotal = () => {
    return selectedTrainer !== null && sessions ? trainers[selectedTrainer].rate * sessions : 0;
  };

  return (
    <div className="ts-trainer-selection">
      <div className="ts-trainer-wrapper">
        <h1>Available Trainers</h1>
        <div className="ts-trainers-container">
          <div className="ts-trainer-row">
            <span className="ts-trainer-label">Trainer</span>
            <span className="ts-trainer-label ts-trainer-specialty-label">Specialty</span>
            <span className="ts-trainer-label">Rate</span>
          </div>
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className={`ts-trainer-card ${selectedTrainer === index ? 'ts-selected' : ''}`}
              onClick={() => handleSelect(index)}
            >
              <div className="ts-trainer-column">{trainer.name}</div>
              <div className="ts-trainer-column ts-trainer-specialty">{trainer.specialty}</div>
              <div className="ts-trainer-column">₱{trainer.rate} per session</div>
              {selectedTrainer === index && (
                <CheckCircleOutline className="ts-check-icon" />
              )}
            </div>
          ))}
        </div>
        {showWarning && <p className="ts-warning-text">Please select a trainer before proceeding.</p>}
        <button className="ts-proceed-button" onClick={handleProceed}>Proceed to Payment</button>
      </div>

      {showModal && (
        <div className="ts-modal-overlay">
          <div className="ts-modal-content">
            <div className="ts-modal-header">
              <img src={gcashLogo} alt="GCash Logo" className="ts-gcash-logo" />
              <button className="ts-close-modal" onClick={handleCloseModal}>X</button>
            </div>
            
            {paymentSuccessful ? (
              <div className="ts-success-message">
                <h2>Payment Successful!</h2>
                <p>Thank you for your purchase.</p>
                <button className="ts-close-modal" onClick={handleCloseModal}>Close</button>
              </div>
            ) : (
              <>
                <div className="ts-input-container">
                  <label><strong>GCash Number</strong></label>
                  <label><strong>Date</strong></label>
                  <label><strong>Sessions</strong></label>
                </div>
                <div className="ts-line" /> {/* Line below input fields */}
                <div className="ts-input-container">
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
                  <input
                    type="number"
                    placeholder="Enter Sessions"
                    value={sessions}
                    onChange={(e) => setSessions(e.target.value)}
                  />
                </div>
                <div className="ts-line" /> {/* Line below input fields */}
                <div className="ts-trainer-details">
                  <p><strong>You are about to purchase</strong></p>
                  <div className="ts-line" /> {/* Line below "You are about to purchase" */}
                  <p>Trainer: {trainers[selectedTrainer].name}</p>
                  <p>{trainers[selectedTrainer].specialty}</p>
                  <p>₱{trainers[selectedTrainer].rate} per session</p>
                </div>
                <div className="ts-line" /> {/* Line below trainer details */}
                {errorMessage && <p className="ts-error-text">{errorMessage}</p>}
                <button className="ts-pay-button" onClick={handlePay}>Pay ₱{calculateTotal()}</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainerSelection;
