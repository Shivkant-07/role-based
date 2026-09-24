import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === email && u.password === password);
    
    if (userIndex !== -1) {
      const timestamp = new Date().toLocaleString(); // Current date & time string
      users[userIndex].lastLogin = timestamp;
      localStorage.setItem('users', JSON.stringify(users));

      const foundUser = users[userIndex];
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));

      // Update timestamp in employeesList as well so Admin/Manager panel gets it
      const existingEmployees = JSON.parse(localStorage.getItem('employeesList')) || [];
      const empIndex = existingEmployees.findIndex(e => e.email === email);
      if (empIndex !== -1) {
        existingEmployees[empIndex].lastLogin = timestamp;
        localStorage.setItem('employeesList', JSON.stringify(existingEmployees));
      } else {
        // Fallback agar employeesList mein nahi hai
        existingEmployees.push({
          id: Date.now(),
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          status: 'Active',
          joinedAt: timestamp,
          lastLogin: timestamp
        });
        localStorage.setItem('employeesList', JSON.stringify(existingEmployees));
      }

      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existing = users.find(u => u.email === userData.email);
    if (existing) {
      return { success: false, message: 'User already exists with this email' };
    }

    const timestamp = new Date().toLocaleString();
    const newUser = {
      ...userData,
      createdAt: timestamp,
      lastLogin: timestamp
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Also push to employeesList with timestamp
    const existingEmployees = JSON.parse(localStorage.getItem('employeesList')) || [];
    const newUserEntry = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: 'Active',
      joinedAt: timestamp,
      lastLogin: timestamp
    };

    const isAlreadyExists = existingEmployees.some(emp => emp.email === userData.email);
    if (!isAlreadyExists) {
      existingEmployees.push(newUserEntry);
      localStorage.setItem('employeesList', JSON.stringify(existingEmployees));
    }

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100 font-medium">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};