
import React, { useState } from 'react';
import { Plus, MoreHorizontal, DollarSign, Clock, Filter, Search, X } from 'lucide-react';
import { Opportunity } from '../types';

interface PipelineViewProps {
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
}

const PipelineView: React.FC<PipelineViewProps> = ({ opportunities, setOpportunities }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stages = ['Lead', 'Contacted', 'Meeting', 'Proposal', 'Closed'];

  const [newOpp, setNewOpp] = useState({ name: '', value: '', email: '', stage: 'Lead' as Opportunity['stage'] });

  const handleAddOpp = (e: React.FormEvent) => {
    e.preventDefault();
    const opp: Opportunity = {
      id: `opp-${Date.now()}`,
      name: newOpp.name,
      email: newOpp.email,
      phone: '',
      value: parseFloat(newOpp.value) || 0,
      stage: newOpp.stage,
      source: 'Direct Entry',
      lastActivity: new Date().toISOString().split('T')[0]
    };
    setOpportunities([...opportunities, opp]);
    setIsModalOpen(false);
    setNewOpp({ name: '', value: '', email: '', stage: 'Lead' });
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Sales Pipeline</h2>
          <p className="text-slate-500 text-sm">Manage leads and conversion stages for Highshift Media.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white px-3 py-1.5 border rounded-lg text-xs font-bold text-slate-600">
            <Filter size={14} className="mr-2" />
            Filters
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold text-sm shadow-sm"
          >
            <Plus size={18} className="mr-2" />
            Add Opportunity
          </button>
        </div>
      </div>

      <div className="flex-1 flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
        {stages.map(stage => {
          const stageOpps = opportunities.filter(o => o.stage === stage);
          const totalValue = stageOpps.reduce((sum, o) => sum + o.value, 0);

          return (
            <div key={stage} className="min-w-[280px] w-72 flex flex-col bg-slate-100 rounded-xl p-3 border border-slate-200">
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{stage}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    {stageOpps.length} Opportunities • ${totalValue.toLocaleString()}
                  </p>
                </div>
                <MoreHorizontal size={16} className="text-slate-400 cursor-pointer" />
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto">
                {stageOpps.map(opp => (
                  <div key={opp.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-move">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{opp.name}</h4>
                    <div className="flex items-center text-xs text-slate-500 mb-3">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded mr-2">{opp.source}</span>
                      <Clock size={12} className="mr-1" />
                      {opp.lastActivity}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <div className="flex items-center text-blue-600 font-bold text-sm">
                        <DollarSign size={14} className="mr-0.5" />
                        {opp.value.toLocaleString()}
                      </div>
                      <img src={`https://picsum.photos/seed/${opp.id}/100`} className="w-6 h-6 rounded-full ring-2 ring-white" />
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => {
                    setNewOpp({ ...newOpp, stage: stage as Opportunity['stage'] });
                    setIsModalOpen(true);
                  }}
                  className="w-full py-2 flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400 rounded-lg hover:bg-white hover:border-slate-400 transition text-xs font-bold"
                >
                  <Plus size={14} className="mr-1" />
                  Add Card
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="text-lg font-bold">New Opportunity</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <form onSubmit={handleAddOpp} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Name</label>
                <input required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newOpp.name} onChange={e => setNewOpp({...newOpp, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Estimated Value ($)</label>
                <input type="number" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newOpp.value} onChange={e => setNewOpp({...newOpp, value: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Stage</label>
                <select className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newOpp.stage} onChange={e => setNewOpp({...newOpp, stage: e.target.value as Opportunity['stage']})}>
                  {stages.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition mt-4">
                Create Lead
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineView;
