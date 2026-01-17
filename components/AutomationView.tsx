
import React, { useState } from 'react';
import { Zap, Plus, ArrowRight, MousePointer2, Mail, MessageSquare, Play, Clock, MoreVertical, X } from 'lucide-react';
import { Workflow } from '../types';

interface AutomationViewProps {
  workflows: Workflow[];
  setWorkflows: React.Dispatch<React.SetStateAction<Workflow[]>>;
}

const AutomationView: React.FC<AutomationViewProps> = ({ workflows, setWorkflows }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWF, setNewWF] = useState({ name: '', trigger: 'Form Submitted' });

  const handleAddWF = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWF.name) return;

    const wf: Workflow = {
      id: `wf-${Date.now()}`,
      name: newWF.name,
      status: 'Draft',
      trigger: newWF.trigger,
      stepsCount: 1,
      enrolled: 0
    };

    setWorkflows([...workflows, wf]);
    setNewWF({ name: '', trigger: 'Form Submitted' });
    setIsModalOpen(false);
  };

  const useTemplate = (name: string, steps: number) => {
    const wf: Workflow = {
      id: `wf-${Date.now()}`,
      name: name,
      status: 'Published',
      trigger: 'Lead Created',
      stepsCount: steps,
      enrolled: 0
    };
    setWorkflows([...workflows, wf]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Workflows & Automation</h2>
          <p className="text-slate-500 text-sm">Build sophisticated automated triggers and actions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition"
        >
          <Plus size={18} className="mr-2" />
          Create New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Templates */}
        {[
          { name: 'Lead Nurture Sequence', icon: Mail, color: 'text-blue-500', steps: 4 },
          { name: 'Appointment Confirmation', icon: Clock, color: 'text-green-500', steps: 3 },
          { name: 'Review Request Bot', icon: MessageSquare, color: 'text-amber-500', steps: 5 }
        ].map((template, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all group cursor-pointer relative overflow-hidden">
            <div className={`p-3 rounded-xl bg-slate-50 ${template.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
              <template.icon size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">{template.name}</h3>
            <p className="text-xs text-slate-500 mb-6">Automatically send follow-ups and update pipeline stages.</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{template.steps} Action Steps</span>
              <button 
                onClick={(e) => { e.stopPropagation(); useTemplate(template.name, template.steps); }}
                className="text-blue-600 font-bold text-xs flex items-center hover:underline"
              >
                Use Template <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {workflows.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
           <table className="w-full text-left">
              <thead className="bg-slate-50 border-b">
                 <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Workflow Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Steps</th>
                    <th className="px-6 py-4"></th>
                 </tr>
              </thead>
              <tbody className="divide-y">
                 {workflows.map(wf => (
                    <tr key={wf.id} className="hover:bg-slate-50 transition">
                       <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Zap size={16} /></div>
                             <div>
                                <p className="font-bold text-slate-900 text-sm">{wf.name}</p>
                                <p className="text-[10px] text-slate-400">Trigger: {wf.trigger}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${wf.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                             {wf.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-sm text-slate-600 font-medium">{wf.stepsCount} steps</td>
                       <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={18} /></button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50 rounded-t-3xl">
              <h3 className="font-bold">Create Workflow</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddWF} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Workflow Name</label>
                <input 
                  required 
                  autoFocus
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                  placeholder="e.g. Website Lead Follow-up"
                  value={newWF.name}
                  onChange={e => setNewWF({...newWF, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Entry Trigger</label>
                <select 
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={newWF.trigger}
                  onChange={e => setNewWF({...newWF, trigger: e.target.value})}
                >
                  <option value="Form Submitted">Form Submitted</option>
                  <option value="Opportunity Created">Opportunity Created</option>
                  <option value="Tag Added">Tag Added</option>
                  <option value="Incoming Message">Incoming Message</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 mt-4">
                Build Workflow
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationView;
