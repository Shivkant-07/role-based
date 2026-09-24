import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalStaff: 0,
    managers: 0,
    employees: 0,
  });

  // Employee To-Do List State
  const taskStorageKey = `employee_tasks_${user?.email || 'guest'}`;
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(taskStorageKey);
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, text: 'Submit weekly progress report', completed: false },
      { id: 2, text: 'Review team documentation', completed: true }
    ];
  });
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    localStorage.setItem(taskStorageKey, JSON.stringify(tasks));
  }, [tasks, taskStorageKey]);

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

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Welcome / Header Banner with Timestamps */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              {user?.role} Portal
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.name}! 👋</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            {user?.role === 'Employee' 
              ? 'Manage your daily tasks, track productivity, and check account status.' 
              : 'Here is your workspace overview and system-wide metrics for today.'}
          </p>

          {/* Login & Registration Time Display */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-slate-700/60 text-xs text-slate-300">
            {user?.createdAt && (
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                <span className="text-indigo-400 font-semibold">Registered At:</span> 
                <span>{user.createdAt}</span>
              </div>
            )}
            {user?.lastLogin && (
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                <span className="text-emerald-400 font-semibold">Last Login:</span> 
                <span>{user.lastLogin}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-4 rounded-xl text-right shrink-0">
          <p className="text-xs text-slate-200 uppercase tracking-wider font-semibold">Access Privilege</p>
          <p className="text-xl font-bold text-emerald-400 mt-0.5">
            {user?.role === 'Admin' ? 'Full Control' : user?.role === 'Manager' ? 'Department Lead' : 'Employee Access'}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      {user?.role === 'Employee' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Status</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span> Active
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Logged in successfully</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner">
              ✓
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned Role</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">Standard Employee</h3>
              <p className="text-xs text-indigo-600 font-medium mt-1">Team Member</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner">
              👤
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {user?.role === 'Admin' ? 'Total System Staff' : 'Total Team Employees'}
              </p>
              <h3 className="text-3xl font-extrabold text-slate-800 mt-1">
                {user?.role === 'Admin' ? stats.totalStaff : stats.employees}
              </h3>
              <p className="text-xs text-indigo-600 font-medium mt-1">
                {user?.role === 'Admin' ? 'Combined directory count' : 'Active department workers'}
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner">
              📊
            </div>
          </div>

          {user?.role === 'Admin' ? (
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
          ) : (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Role</p>
                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">Manager</h3>
                <p className="text-xs text-purple-600 font-medium mt-1">Department Lead</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner">
                🛡️
              </div>
            </div>
          )}

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
      )}

      {/* EMPLOYEE SPECIAL: Interactive To-Do List */}
      {user?.role === 'Employee' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Daily Task Manager & To-Do List</h2>
              <p className="text-xs text-slate-500 mt-0.5">Organize your daily work milestones and keep track of your progress.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-xl text-xs font-bold">
                Pending: {pendingCount}
              </span>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold">
                Completed: {completedCount}
              </span>
            </div>
          </div>

          <form onSubmit={handleAddTask} className="flex gap-3">
            <input 
              type="text" 
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Type a new daily task here..."
              className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-slate-50/50"
            />
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition shadow-sm cursor-pointer whitespace-nowrap"
            >
              + Add Task
            </button>
          </form>

          <div className="space-y-3 pt-2">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    task.completed 
                      ? 'bg-slate-50 border-slate-200 opacity-75' 
                      : 'bg-white border-slate-200 shadow-xs hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5 flex-1">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTaskComplete(task.id)}
                      className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className={`text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {task.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      task.completed ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition cursor-pointer"
                      title="Delete task"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm font-medium text-slate-500">No tasks added yet!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Navigation Cards */}
      {user?.role !== 'Employee' && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Navigation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.role === 'Admin' && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-purple-300 transition duration-200">
                <div>
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-bold mb-4 shadow-inner">
                    👔
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Manager Directory</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Onboard, view details, and manage managerial staff permissions across the organization.
                  </p>
                  <p className="text-xs font-semibold text-purple-600 mt-3">Total Managers: {stats.managers}</p>
                </div>
                <Link 
                  to="/manager" 
                  className="w-full block text-center bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl text-xs font-semibold transition shadow-sm"
                >
                  Manage Managers
                </Link>
              </div>
            )}

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-indigo-300 transition duration-200">
              <div>
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold mb-4 shadow-inner">
                  👥
                </div>
                <h3 className="text-lg font-bold text-slate-800">Employee Directory</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Oversee staff members, track standard personnel records, and update details.
                </p>
                <p className="text-xs font-semibold text-indigo-600 mt-3">Total Employees: {stats.employees}</p>
              </div>
              <Link 
                to="/employees" 
                className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-xs font-semibold transition shadow-sm"
              >
                Manage Employees
              </Link>
            </div>

            {user?.role === 'Admin' && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-slate-400 transition duration-200">
                <div>
                  <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center text-xl font-bold mb-4 shadow-inner">
                    ⚡
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Admin Command Center</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Access system-wide controls, review metrics, and clear or reset storage data.
                  </p>
                </div>
                <Link 
                  to="/admin" 
                  className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-semibold transition shadow-sm"
                >
                  Open Admin Panel
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;