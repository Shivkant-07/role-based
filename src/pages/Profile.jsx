import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="bg-white p-6 rounded-xl shadow border border-slate-200 text-center">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 font-bold text-2xl flex items-center justify-center rounded-full mx-auto mb-4">
          {user?.name?.charAt(0)}
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-1">{user?.name}</h1>
        <p className="text-slate-500 text-sm mb-4">{user?.email}</p>
        <div className="inline-block bg-slate-100 text-slate-700 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          {user?.role}
        </div>
      </div>
    </div>
  );
};

export default Profile;