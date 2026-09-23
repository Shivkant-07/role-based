import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome back, <strong>{user?.name}</strong>!</p>
      <p>Your Role: <strong>{user?.role}</strong></p>
    </div>
  );
};

export default Dashboard; 