import React, { useState, useEffect } from 'react';

const Manager = () => {
  const [managers, setManagers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form state (Role strictly fixed as Manager)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role] = useState('Manager');

  // Load and filter ONLY managers from localStorage
  const loadManagers = () => {
    const savedEmployees = JSON.parse(localStorage.getItem('employeesList')) || [];
    const managerList = savedEmployees.filter(emp => emp.role === 'Manager');
    setManagers(managerList);
  };

  useEffect(() => {
    loadManagers();
  }, []);

  // Save changes to full localStorage list
  const saveToLocalStorage = (updatedManager) => {
    const savedEmployees = JSON.parse(localStorage.getItem('employeesList')) || [];
    
    if (isEditing) {
      // Update existing record in the main list keeping timestamps intact
      const updatedList = savedEmployees.map(emp => 
        emp.id === currentId ? { ...emp, name, email, role } : emp
      );
      localStorage.setItem('employeesList', JSON.stringify(updatedList));
    } else {
      // Append new manager to the main list with timestamp
      localStorage.setItem('employeesList', JSON.stringify([...savedEmployees, updatedManager]));
    }
    loadManagers();
  };

  // Open modal for adding new manager
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setName('');
    setEmail('');
    setIsModalOpen(true);
  };

  // Open modal for editing manager
  const handleEditClick = (mgr) => {
    setIsEditing(true);
    setCurrentId(mgr.id);
    setName(mgr.name);
    setEmail(mgr.email);
    setIsModalOpen(true);
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();

    if (isEditing) {
      saveToLocalStorage();
    } else {
      const newManager = {
        id: Date.now(),
        name,
        email,
        role,
        status: 'Active',
        joinedAt: timestamp,
        lastLogin: 'Manual Onboard'
      };
      saveToLocalStorage(newManager);
    }
    setIsModalOpen(false);
  };

  // Delete Manager
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this manager?')) {
      const savedEmployees = JSON.parse(localStorage.getItem('employeesList')) || [];
      const filteredEmployees = savedEmployees.filter(emp => emp.id !== id);
      localStorage.setItem('employeesList', JSON.stringify(filteredEmployees));
      loadManagers();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Manager Directory</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and oversee all active managerial personnel and their login activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-purple-50 border border-purple-100 text-purple-700 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase">
            Total Managers: {managers.length}
          </span>
          <button 
            onClick={handleOpenAddModal}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm cursor-pointer flex items-center gap-2"
          >
            <span>+</span> Add Manager
          </button>
        </div>
      </div>

      {/* Modern Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4.5">Manager Profile</th>
                <th className="p-4.5">Email Address</th>
                <th className="p-4.5">Assigned Role</th>
                <th className="p-4.5">Joined / Registered Time</th>
                <th className="p-4.5">Last Login Time</th>
                <th className="p-4.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {managers.length > 0 ? (
                managers.map((mgr) => (
                  <tr key={mgr.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm shadow-inner">
                          {mgr.name ? mgr.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="font-semibold text-slate-800">{mgr.name}</span>
                      </div>
                    </td>
                    <td className="p-4.5 text-slate-600 font-medium">{mgr.email}</td>
                    <td className="p-4.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                        {mgr.role}
                      </span>
                    </td>
                    <td className="p-4.5 text-xs text-slate-600 font-medium">
                      {mgr.joinedAt || mgr.createdAt || 'N/A'}
                    </td>
                    <td className="p-4.5 text-xs text-purple-600 font-medium">
                      {mgr.lastLogin || 'Not Logged In'}
                    </td>
                    <td className="p-4.5 text-right space-x-2">
                      <button 
                        onClick={() => handleEditClick(mgr)} 
                        className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg transition shadow-sm cursor-pointer"
                      >
                        Edit Details
                      </button>
                      <button 
                        onClick={() => handleDelete(mgr.id)} 
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition shadow-sm cursor-pointer"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-400">
                    <p className="text-base font-medium text-slate-500 mb-1">No managers found</p>
                    <p className="text-xs text-slate-400">Click on the "+ Add Manager" button above to onboard new managers.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Professional Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-100 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              {isEditing ? 'Edit Manager Details' : 'Onboard New Manager'}
            </h2>
            <p className="text-xs text-slate-500 mb-6">Modify profile information securely.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-slate-50/50" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-slate-50/50" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Role Permission</label>
                <input 
                  type="text" 
                  value="Manager" 
                  disabled 
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-100 text-slate-500 cursor-not-allowed" 
                />
                <p className="text-[11px] text-slate-400 mt-1">Role is strictly fixed to Manager in this directory.</p>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2.5 text-sm font-medium border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-sm transition cursor-pointer"
                >
                  {isEditing ? 'Save Changes' : 'Onboard Manager'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manager;