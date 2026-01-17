
import React, { useState } from 'react';
import { Calendar, Layers, MoreVertical, Filter, X, Plus, FolderOpen } from 'lucide-react';
import { Project, Client, ProjectStatus } from '../types';

interface ProjectsViewProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  clients: Client[];
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects, setProjects, clients }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    clientId: '',
    budget: '',
    deadline: ''
  });

  const getClientName = (id: string) => clients.find(c => c.id === id)?.name || 'Unknown Client';

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.clientId) return;

    const project: Project = {
      id: `p-${Date.now()}`,
      clientId: newProject.clientId,
      name: newProject.name,
      status: ProjectStatus.PLANNING,
      deadline: newProject.deadline || new Date().toISOString().split('T')[0],
      progress: 0,
      budget: parseFloat(newProject.budget) || 0
    };

    setProjects([...projects, project]);
    setNewProject({ name: '', clientId: '', budget: '', deadline: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Active Projects</h2>
          <p className="text-gray-500">Track milestones and delivery status.</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Create Project
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-400 mb-4">
            <FolderOpen size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No projects active</h3>
          <p className="text-gray-500 mb-6 px-4 max-w-sm">Create your first project to start tracking tasks and budgets for your clients.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-blue-200 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{project.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium">{getClientName(project.clientId)}</p>
              </div>
              <div className="w-full md:w-64">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Progress</span>
                  <span className="text-xs font-bold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
              <div className="flex items-center space-x-8 shrink-0">
                <div className="text-center">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Budget</p>
                  <p className="text-sm font-bold text-gray-900">${project.budget.toLocaleString()}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">New Project</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
            </div>
            <form onSubmit={handleAddProject} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Project Name</label>
                <input 
                  required
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newProject.name}
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Client</label>
                <select 
                  required
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newProject.clientId}
                  onChange={e => setNewProject({...newProject, clientId: e.target.value})}
                >
                  <option value="">Choose a client...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {clients.length === 0 && <p className="text-xs text-red-500 mt-1">Please add a client first.</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Budget ($)</label>
                  <input type="number" className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newProject.budget} onChange={e => setNewProject({...newProject, budget: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Deadline</label>
                  <input type="date" className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newProject.deadline} onChange={e => setNewProject({...newProject, deadline: e.target.value})} />
                </div>
              </div>
              <button disabled={clients.length === 0} type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50">
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsView;
