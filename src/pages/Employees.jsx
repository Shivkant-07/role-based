import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Employees = () => {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role] = useState('Employee');

  // Load and filter ONLY employees from localStorage
  const loadEmployees = () => {
    const savedEmployees = JSON.parse(localStorage.getItem('employeesList')) || [];
    const employeeList = savedEmployees.filter(emp => emp.role === 'Employee');
    setEmployees(employeeList);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Save changes to full localStorage list while keeping managers intact
  const saveToLocalStorage = (updatedEmployee) => {
    const savedEmployees = JSON.parse(localStorage.getItem('employeesList')) || [];
    
    if (isEditing) {
      // Update existing record in the main list keeping existing timestamps
      const newList = savedEmployees.map(emp => 
        emp.id === currentId ? { ...emp, name, email, role } : emp
      );
      localStorage.setItem('employeesList', JSON.stringify(newList));
    } else {
      // Append new employee to the main list with timestamp
      localStorage.setItem('employeesList', JSON.stringify([...savedEmployees, updatedEmployee]));
    }
    loadEmployees();
  };

  // Open modal for adding new employee
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setName('');
    setEmail('');
    setIsModalOpen(true);
  };

  // Open modal for editing employee
  const handleEditClick = (emp) => {
    setIsEditing(true);
    setCurrentId(emp.id);
    setName(emp.name);
    setEmail(emp.email);
    setIsModalOpen(true);
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();

    if (isEditing) {
      saveToLocalStorage();
    } else {
      const newEmp = {
        id: Date.now(),
        name,
        email,
        role,
        status: 'Active',
        joinedAt: timestamp,
        lastLogin: 'Manual Onboard'
      };
      saveToLocalStorage(newEmp);
    }
    setIsModalOpen(false);
  };

  // Delete Employee (Restricted to Admin)
  const handleDelete = (id) => {
    if (user?.role !== 'Admin') {
      alert('Access Denied: Only Admins can delete staff members.');
      return;
    }
    if (window.confirm('Are you sure you want to remove this employee?')) {
      const savedEmployees = JSON.parse(localStorage.getItem('employeesList')) || [];
      const filtered = savedEmployees.filter(emp => emp.id !== id);
      localStorage.setItem('employeesList', JSON.stringify(filtered));
      loadEmployees();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Employee Directory</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage working staff, onboard new profiles, and view login activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase">
            Total Employees: {employees.length}
          </span>
          <button 
            onClick={handleOpenAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm cursor-pointer flex items-center gap-2"
          >
            <span>+</span> Add Employee
          </button>
        </div>
      </div>

      {/* Modern Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4.5">Employee Profile</th>
                <th className="p-4.5">Email Address</th>
                <th className="p-4.5">System Role</th>
                <th className="p-4.5">Joined / Registered Time</th>
                <th className="p-4.5">Last Login Time</th>
                <th className="p-4.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm shadow-inner">
                          {emp.name ? emp.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="font-semibold text-slate-800">{emp.name}</span>
                      </div>
                    </td>
                    <td className="p-4.5 text-slate-600 font-medium">{emp.email}</td>
                    <td className="p-4.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {emp.role}
                      </span>
                    </td>
                    <td className="p-4.5 text-xs text-slate-600 font-medium">
                      {emp.joinedAt || emp.createdAt || 'N/A'}
                    </td>
                    <td className="p-4.5 text-xs text-emerald-600 font-medium">
                      {emp.lastLogin || 'Not Logged In'}
                    </td>
                    <td className="p-4.5 text-right space-x-2">
                      <button 
                        onClick={() => handleEditClick(emp)} 
                        className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg transition shadow-sm cursor-pointer"
                      >
                        Edit Details
                      </button>

                      {user?.role === 'Admin' && (
                        <button 
                          onClick={() => handleDelete(emp.id)} 
                          className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition shadow-sm cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-400">
                    <p className="text-base font-medium text-slate-500 mb-1">No employees found</p>
                    <p className="text-xs text-slate-400">Click on the "+ Add Employee" button above to onboard new staff members.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Professional Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-100 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              {isEditing ? 'Edit Employee Profile' : 'Onboard New Employee'}
            </h2>
            <p className="text-xs text-slate-500 mb-6">Fill in the required information below.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="e.g. Aman Verma"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-slate-50/50" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="e.g. aman@example.com"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-slate-50/50" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Assigned Role</label>
                <input 
                  type="text" 
                  value="Employee" 
                  disabled 
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-100 text-slate-500 cursor-not-allowed" 
                />
                <p className="text-[11px] text-slate-400 mt-1">New records in this directory are assigned the Employee role with timestamp.</p>
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
                  className="px-5 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition cursor-pointer"
                >
                  {isEditing ? 'Save Changes' : 'Onboard Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;