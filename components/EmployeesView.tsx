
import React, { useState } from 'react';
import { Star, Mail, Briefcase, Award, TrendingUp, UserPlus, X, Shield } from 'lucide-react';
import { Employee } from '../types';

interface EmployeesViewProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const EmployeesView: React.FC<EmployeesViewProps> = ({ employees, setEmployees }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    department: 'Web Development',
    type: 'W-2' as Employee['type']
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployee.name) return;

    const emp: Employee = {
      id: `emp-${Date.now()}`,
      name: newEmployee.name,
      role: newEmployee.role || 'Team Member',
      department: newEmployee.department,
      rate: 0,
      type: newEmployee.type,
      tasksCompleted: 0,
      performanceScore: 100
    };

    setEmployees([...employees, emp]);
    setNewEmployee({ name: '', role: '', department: 'Web Development', type: 'W-2' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Directory</h2>
          <p className="text-gray-500">Manage Highshift Media W-2 employees and contractors.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center font-bold"
        >
          <UserPlus size={18} className="mr-2" />
          Add Employee
        </button>
      </div>

      {employees.length === 0 ? (
        <div className="bg-white py-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center">
          <UserPlus className="text-gray-300 mb-4" size={48} />
          <h3 className="font-bold text-slate-900">Your team is empty</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">Scale Highshift Media by adding your developers, managers, and contractors.</p>
          <button onClick={() => setIsModalOpen(true)} className="text-blue-600 font-bold hover:underline">Add first employee</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {employees.map(emp => (
            <div key={emp.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:border-blue-500 transition-all">
              <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                <div className="absolute -bottom-10 left-6">
                  <img src={`https://picsum.photos/seed/${emp.id}/200`} className="w-20 h-20 rounded-2xl border-4 border-white shadow-md object-cover" />
                </div>
              </div>
              <div className="pt-12 px-6 pb-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{emp.name}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{emp.role}</p>
                  </div>
                  <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg text-green-700 border border-green-100">
                    <Star size={12} className="fill-current mr-1" />
                    <span className="text-[10px] font-black">{emp.performanceScore}%</span>
                  </div>
                </div>
                <div className="space-y-3 mt-auto pt-4 border-t border-slate-50">
                  <div className="flex items-center text-xs text-gray-600 font-medium">
                    <Shield size={14} className="mr-2 text-slate-300" />
                    {emp.department}
                  </div>
                  <div className="flex items-center text-xs text-gray-600 font-medium">
                    <Briefcase size={14} className="mr-2 text-slate-300" />
                    {emp.type}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50 rounded-t-3xl">
              <h3 className="font-bold text-slate-900">Add New Team Member</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Full Name</label>
                <input 
                  required 
                  autoFocus
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                  placeholder="e.g. John Doe"
                  value={newEmployee.name}
                  onChange={e => setNewEmployee({...newEmployee, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Job Title</label>
                <input 
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newEmployee.role}
                  onChange={e => setNewEmployee({...newEmployee, role: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Department</label>
                <select 
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={newEmployee.department}
                  onChange={e => setNewEmployee({...newEmployee, department: e.target.value})}
                >
                  <option value="Web Development">Web Development</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Employee Type</label>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setNewEmployee({...newEmployee, type: 'W-2'})}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${newEmployee.type === 'W-2' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    W-2
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setNewEmployee({...newEmployee, type: 'Contractor'})}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${newEmployee.type === 'Contractor' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    Contractor
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 mt-4">
                Add to Team
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesView;
