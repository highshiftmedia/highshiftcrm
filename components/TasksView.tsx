
import React, { useState } from 'react';
import { Task, Employee, Project } from '../types';
import { Clock, AlertCircle, CheckCircle2, ClipboardList, Plus, X } from 'lucide-react';

interface TasksViewProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  employees: Employee[];
  projects: Project[];
}

const TasksView: React.FC<TasksViewProps> = ({ tasks, setTasks, employees, projects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    projectId: '',
    assigneeId: '',
    priority: 'Medium' as Task['priority'],
    dueDate: new Date().toISOString().split('T')[0]
  });

  const getAssignee = (id: string) => employees.find(e => e.id === id);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      projectId: newTask.projectId,
      assigneeId: newTask.assigneeId,
      title: newTask.title,
      priority: newTask.priority,
      status: 'To-Do',
      dueDate: newTask.dueDate
    };

    setTasks([task, ...tasks]);
    setNewTask({ title: '', projectId: '', assigneeId: '', priority: 'Medium', dueDate: new Date().toISOString().split('T')[0] });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Task Management</h2>
          <p className="text-gray-500">Assign and track team activities across all projects.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center font-bold"
        >
          <Plus size={18} className="mr-2" />
          New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white py-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
            <ClipboardList size={32} />
          </div>
          <h3 className="font-bold text-slate-900">No tasks created yet</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">Define your project goals by breaking them down into actionable tasks.</p>
          <button onClick={() => setIsModalOpen(true)} className="text-blue-600 font-bold hover:underline">Create your first task</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {['To-Do', 'In Progress', 'Done'].map(status => (
            <div key={status} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-700 flex items-center text-sm">
                  {status}
                  <span className="ml-2 px-2 py-0.5 bg-white border border-slate-200 text-gray-600 rounded-full text-[10px] font-bold">
                    {tasks.filter(t => t.status === status).length}
                  </span>
                </h3>
              </div>
              <div className="space-y-3">
                {tasks.filter(t => t.status === status).map(task => {
                  const assignee = getAssignee(task.assigneeId);
                  return (
                    <div key={task.id} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:border-blue-400 transition cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                          task.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {task.priority} Priority
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-4 leading-tight">{task.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            src={`https://picsum.photos/seed/${assignee?.id || 'anon'}/100`} 
                            className="w-5 h-5 rounded-full border border-white ring-1 ring-slate-100" 
                          />
                          <span className="ml-1.5 text-[10px] text-gray-500 font-medium">{assignee?.name || 'Unassigned'}</span>
                        </div>
                        <div className="flex items-center text-[10px] text-gray-400 font-medium">
                          <Clock size={10} className="mr-1" /> {task.dueDate}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50 rounded-t-3xl">
              <h3 className="font-bold">Create New Task</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddTask} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Task Title</label>
                <input 
                  required 
                  autoFocus
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                  placeholder="e.g. Design homepage wireframes"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Project</label>
                  <select 
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={newTask.projectId}
                    onChange={e => setNewTask({...newTask, projectId: e.target.value})}
                  >
                    <option value="">No Project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Assign To</label>
                  <select 
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={newTask.assigneeId}
                    onChange={e => setNewTask({...newTask, assigneeId: e.target.value})}
                  >
                    <option value="">Unassigned</option>
                    {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Priority</label>
                  <select 
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={newTask.priority}
                    onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Due Date</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={newTask.dueDate}
                    onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 mt-4">
                Save Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksView;
