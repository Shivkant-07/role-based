import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Manager from '../pages/Manager'; // 1. Yahan import kiya
import Profile from '../pages/Profile';
import AdminPanel from '../pages/AdminPanel';
import AccessDenied from '../pages/AccessDenied';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/access-denied" element={<AccessDenied />} />

      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['Admin', 'Manager', 'Employee']}>
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* 2. Yahan Manager route add kiya */}
      <Route path="/manager" element={
        <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
          <Manager />
        </ProtectedRoute>
      } />

      <Route path="/employees" element={
        <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
          <Employees />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={['Admin', 'Manager', 'Employee']}>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <AdminPanel />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;