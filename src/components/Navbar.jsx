import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-6">
        <span className="font-bold text-lg tracking-wide text-indigo-400">RBAC App</span>
        <Link to="/dashboard" className="hover:text-indigo-300 transition">Dashboard</Link>
        
        {(user.role === 'Admin' || user.role === 'Manager') && (
          <Link to="/employees" className="hover:text-indigo-300 transition">Employees</Link>
        )}

        {user.role === 'Admin' && (
          <Link to="/admin" className="hover:text-indigo-300 transition">Admin Panel</Link>
        )}

        <Link to="/profile" className="hover:text-indigo-300 transition">Profile</Link>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          {user.name} ({user.role})
        </span>
        <button 
          onClick={() => { logout(); navigate('/login'); }} 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;