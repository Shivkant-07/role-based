import React from 'react';

const Employees = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Employee Management</h1>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">Add Employee</button>
        </div>
        <p className="text-slate-600 mb-4">Here you can View, Edit, and Delete employees based on role-based authorizations.</p>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-700 text-sm">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-600">
              <tr className="border-b">
                <td className="p-3">Rahul Sharma</td>
                <td className="p-3">rahul@example.com</td>
                <td className="p-3">Employee</td>
                <td className="p-3 space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;