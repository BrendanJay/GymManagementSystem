import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // State for key metrics
  const [metrics, setMetrics] = useState({
    totalMembers: 0,
    totalTrainers: 0,
    totalPlans: 0,
  });

  // Fetch metrics from API (dummy data for now)
  useEffect(() => {
    // Simulating API calls
    setMetrics({
      totalMembers: 150,
      totalTrainers: 20,
      totalPlans: 10,
    });
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard">
      <div className="metrics">
        <div className="card members-card" onClick={() => handleCardClick('/admin/members')}>
          <h3>Total Members</h3>
          <p className="metric-value">{metrics.totalMembers}</p>
        </div>
        <div className="card plans-card" onClick={() => handleCardClick('/admin/membershipplans')}>
          <h3>Total Plans</h3>
          <p className="metric-value">{metrics.totalPlans}</p>
        </div>
        <div className="card trainers-card" onClick={() => handleCardClick('/admin/trainers')}>
          <h3>Total Trainers</h3>
          <p className="metric-value">{metrics.totalTrainers}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
