import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-600 mb-4">Welcome back, <span className="font-semibold text-indigo-600">{user?.name}</span>!</p>
        <div className="inline-block bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium">
          Role Permission: {user?.role}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;