import {React, createContext, useState, useEffect } from 'react'; // Note: yahan comma sahi kar lena niche wale code ki tarah

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Yeh loading state add kiya hai

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Jab check ho jaye tab loading false kar do
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
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
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Jab tak user data load ho raha hai, tab tak blank screen ya loading dikhao taaki redirect na ho
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100 font-medium">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};