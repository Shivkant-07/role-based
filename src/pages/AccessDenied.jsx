import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ color: 'red' }}>403 - Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/dashboard">Go back to Dashboard</Link>
    </div>
  );
};

export default AccessDenied;