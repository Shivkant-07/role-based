import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h2>
      <p className="text-slate-600 mb-6">You do not have the required permissions to view this page.</p>
      <Link to="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition">
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default AccessDenied;