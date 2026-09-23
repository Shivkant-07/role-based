import React from 'react';

const AdminPanel = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow border border-red-100">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Admin Panel</h1>
        <p className="text-slate-600">This section is restricted strictly to Admin users. System configurations and logs can be managed here.</p>
      </div>
    </div>
  );
};

export default AdminPanel;