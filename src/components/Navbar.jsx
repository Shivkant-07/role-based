import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  const getLinkClass = (path) => {
    return `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/50'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-3 flex justify-between items-center shadow-lg border-b border-slate-800 sticky top-0 z-50">
      
      {/* Left: Brand & Navigation Links */}
      <div className="flex items-center space-x-2">
        <span className="font-bold text-base tracking-wide bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mr-4">
          RBAC App
        </span>
        
        <div className="flex items-center space-x-1">
          <Link to="/dashboard" className={getLinkClass('/dashboard')}>
            Dashboard
          </Link>
          
          {user.role === 'Admin' && (
            <>
              <Link to="/manager" className={getLinkClass('/manager')}>
                Manager
              </Link>
              <Link to="/employees" className={getLinkClass('/employees')}>
                Employees
              </Link>
              <Link to="/admin" className={getLinkClass('/admin')}>
                Admin Panel
              </Link>
            </>
          )}

          {user.role === 'Manager' && (
            <Link to="/employees" className={getLinkClass('/employees')}>
              Employees
            </Link>
          )}

          <Link to="/profile" className={getLinkClass('/profile')}>
            Profile
          </Link>
        </div>
      </div>

      {/* Right: User Info & Logout Button */}
      <div className="flex items-center space-x-3">
        <div className="text-right hidden sm:block border-r border-slate-700 pr-3">
          <p className="text-xs font-semibold text-slate-200">{user.name}</p>
          <span className="text-[10px] text-indigo-400 font-medium uppercase tracking-wider">
            {user.role}
          </span>
        </div>

        <button 
          onClick={() => { logout(); navigate('/login'); }} 
          className="bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer shadow-sm"
        >
          Logout
        </button>
      </div>

    </nav>
  );
};

export default Navbar;