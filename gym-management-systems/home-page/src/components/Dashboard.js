import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalMembers: 0,
    totalTrainers: 0,
    totalPlans: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      const membersSnapshot = await getDocs(collection(db, 'members'));
      const plansSnapshot = await getDocs(collection(db, 'membershipPlans'));
      const trainersSnapshot = await getDocs(collection(db, 'trainers'));
  
      setMetrics({
        totalMembers: membersSnapshot.size,
        totalPlans: plansSnapshot.size,
        totalTrainers: trainersSnapshot.size,
      });
    };
  
    fetchMetrics();
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
