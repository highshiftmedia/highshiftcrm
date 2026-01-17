
import React, { useState } from 'react';
import { Target, MousePointer2, Users, DollarSign, Megaphone, Plus, X, BarChart3, TrendingUp } from 'lucide-react';
import { MarketingCampaign } from '../types';

interface MarketingViewProps {
  campaigns: MarketingCampaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<MarketingCampaign[]>>;
}

const MarketingView: React.FC<MarketingViewProps> = ({ campaigns, setCampaigns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    channel: 'Facebook Ads' as MarketingCampaign['channel'],
    budget: '',
    leads: ''
  });

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.name) return;

    const leadsCount = parseInt(newCampaign.leads) || 0;
    const budgetVal = parseFloat(newCampaign.budget) || 0;

    const campaign: MarketingCampaign = {
      id: `camp-${Date.now()}`,
      name: newCampaign.name,
      channel: newCampaign.channel,
      budget: budgetVal,
      leads: leadsCount,
      costPerLead: leadsCount > 0 ? budgetVal / leadsCount : 0,
      roi: leadsCount > 0 ? (leadsCount * 150) / budgetVal : 0 // Mock ROI logic
    };

    setCampaigns([campaign, ...campaigns]);
    setNewCampaign({ name: '', channel: 'Facebook Ads', budget: '', leads: '' });
    setIsModalOpen(false);
  };

  const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0);
  const totalLeads = campaigns.reduce((s, c) => s + c.leads, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Marketing & Funnels</h2>
          <p className="text-slate-500 text-sm">Track campaign performance and lead generation ROI.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition flex items-center"
        >
          <Plus size={18} className="mr-2" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Ad Spend</p>
          <h3 className="text-2xl font-black text-slate-900">${totalBudget.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Leads Generated</p>
          <h3 className="text-2xl font-black text-slate-900">{totalLeads.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Cost Per Lead</p>
          <h3 className="text-2xl font-black text-blue-600">${totalLeads > 0 ? (totalBudget / totalLeads).toFixed(2) : '0.00'}</h3>
        </div>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white py-20 rounded-3xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 mb-6">
            <Megaphone size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">No active campaigns</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8">Launch your first marketing campaign to start tracking leads, spend, and multi-channel ROI.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition"
          >
            Launch Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-500 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-2xl ${
                    campaign.channel === 'Facebook Ads' ? 'bg-blue-50 text-blue-600' :
                    campaign.channel === 'Google Ads' ? 'bg-red-50 text-red-600' :
                    campaign.channel === 'Email' ? 'bg-purple-50 text-purple-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{campaign.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{campaign.channel}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Budget</p>
                  <p className="font-black text-slate-900">${campaign.budget.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl">
                 <div className="text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Leads</p>
                    <p className="text-sm font-black text-slate-900">{campaign.leads}</p>
                 </div>
                 <div className="text-center border-x border-slate-200">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">CPL</p>
                    <p className="text-sm font-black text-slate-900">${campaign.costPerLead.toFixed(2)}</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">ROI</p>
                    <p className="text-sm font-black text-green-600">{campaign.roi.toFixed(1)}x</p>
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
              <h3 className="font-bold text-slate-900">New Marketing Campaign</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddCampaign} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Campaign Name</label>
                <input 
                  required 
                  autoFocus
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                  placeholder="e.g. Q4 Website Automation Push"
                  value={newCampaign.name}
                  onChange={e => setNewCampaign({...newCampaign, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Channel</label>
                <select 
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={newCampaign.channel}
                  onChange={e => setNewCampaign({...newCampaign, channel: e.target.value as any})}
                >
                  <option value="Facebook Ads">Facebook Ads</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="SEO">SEO Content</option>
                  <option value="Email">Email Marketing</option>
                  <option value="Funnel">High-Ticket Funnel</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Budget ($)</label>
                  <input 
                    type="number"
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={newCampaign.budget}
                    onChange={e => setNewCampaign({...newCampaign, budget: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Leads (Actual)</label>
                  <input 
                    type="number"
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={newCampaign.leads}
                    onChange={e => setNewCampaign({...newCampaign, leads: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 mt-4">
                Launch & Track
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingView;
