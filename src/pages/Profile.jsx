import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Role ke hisab se badge color set karne ke liye
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'Manager':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5">View your personal account details and active system role.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Top Cover Background */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 relative"></div>

        {/* Profile Details Container */}
        <div className="px-8 pb-8 relative">
          
          {/* Avatar / Profile Initial */}
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-xl border border-slate-100 flex items-center justify-center">
              <div className="w-full h-full bg-indigo-600 text-white rounded-xl font-bold text-3xl flex items-center justify-center shadow-inner">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${getRoleBadgeStyle(user?.role)}`}>
              {user?.role || 'User'}
            </span>
          </div>

          {/* User Info Grid */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{user?.name || 'Guest User'}</h2>
              <p className="text-sm text-slate-500">{user?.email || 'No email provided'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Account Status</p>
                <p className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active Session
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Assigned Privilege</p>
                <p className="text-sm font-bold text-slate-700">{user?.role} Access Level</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
              <button 
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-semibold transition cursor-pointer shadow-sm"
              >
                Log Out
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;