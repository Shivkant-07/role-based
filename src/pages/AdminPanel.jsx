import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalStaff: 0,
    managers: 0,
    employees: 0,
  });

  const loadSystemStats = () => {
    const savedEmployees = JSON.parse(localStorage.getItem('employeesList')) || [];
    const mgrs = savedEmployees.filter(emp => emp.role === 'Manager').length;
    const emps = savedEmployees.filter(emp => emp.role === 'Employee').length;

    setStats({
      totalStaff: savedEmployees.length,
      managers: mgrs,
      employees: emps,
    });
  };

  useEffect(() => {
    loadSystemStats();
  }, []);

  // System Data Reset Handler
  const handleResetData = () => {
    if (window.confirm('WARNING: This will clear all custom employee and manager records from local storage. Proceed?')) {
      localStorage.removeItem('employeesList');
      loadSystemStats();
      alert('System data has been reset successfully.');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Restricted Area
            </span>
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              Super Admin Control
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Command Center</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Oversee system-wide metrics, configure security protocols, and manage global data settings.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/15 px-5 py-3 rounded-xl text-right">
          <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Security Level</p>
          <p className="text-xl font-bold text-emerald-400">Root Control</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total System Staff</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{stats.totalStaff}</h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Combined directory count</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner">
            📊
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Managers</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{stats.managers}</h3>
            <p className="text-xs text-purple-600 font-medium mt-1">Managerial privilege level</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner">
            👔
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Employees</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{stats.employees}</h3>
            <p className="text-xs text-blue-600 font-medium mt-1">Standard personnel level</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner">
            👥
          </div>
        </div>

      </div>

      {/* Quick Management Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Directory Management Hub</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Quickly jump to specialized directories to onboard, modify details, or remove platform users.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Link 
              to="/manager" 
              className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl text-xs font-semibold transition shadow-sm"
            >
              Manage Managers
            </Link>
            <Link 
              to="/employees" 
              className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-xs font-semibold transition shadow-sm"
            >
              Manage Employees
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">System Security & Storage</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Control browser cache state or clear local persistence records for testing purposes.
            </p>
          </div>
          <div className="pt-2">
            <button 
              onClick={handleResetData}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Clear / Reset Local Directory Data
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminPanel;