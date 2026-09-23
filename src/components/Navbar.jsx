import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav style={{ padding: '15px', background: '#222', color: '#fff', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
      
      {(user.role === 'Admin' || user.role === 'Manager') && (
        <Link to="/employees" style={{ color: '#fff', textDecoration: 'none' }}>Employees</Link>
      )}

      {user.role === 'Admin' && (
        <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Admin Panel</Link>
      )}

      <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
      
      <button onClick={() => { logout(); navigate('/login'); }} style={{ marginLeft: 'auto', background: 'crimson', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;   