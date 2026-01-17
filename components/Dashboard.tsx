
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
} from 'recharts';
import { 
  Users, Briefcase, TrendingUp, DollarSign,
  ArrowUpRight, Rocket, GitGraph, Target, MessageSquare, X, Activity, Clock
} from 'lucide-react';
import { Client, Project, MarketingCampaign, Expense, Opportunity } from '../types';

interface DashboardProps {
  clients: Client[];
  projects: Project[];
  campaigns: MarketingCampaign[];
  expenses: Expense[];
  opportunities: Opportunity[];
  setCurrentView: (view: string) => void;
}

const StatCard = ({ title, value, label, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div className="flex-1">
      <div className="flex items-center text-slate-400 mb-1">
         <Icon size={16} className="mr-2" />
         <p className="text-xs font-bold uppercase tracking-widest">{title}</p>
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-1">{value}</h3>
      <div className="flex items-center">
        <span className="text-[10px] font-bold text-green-500 mr-1">{trend}</span>
        <span className="text-[10px] text-slate-400 font-medium">{label}</span>
      </div>
    </div>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
       <Icon size={24} />
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ clients, projects, campaigns, expenses, opportunities, setCurrentView }) => {
  const [isLogOpen, setIsLogOpen] = useState(false);
  const totalRevenueValue = opportunities.filter(o => o.stage === 'Closed').reduce((acc, o) => acc + o.value, 0);
  const pipelineValue = opportunities.filter(o => o.stage !== 'Closed').reduce((acc, o) => acc + o.value, 0);
  
  const revenueData = [
    { name: 'Week 1', revenue: 0 },
    { name: 'Week 2', revenue: pipelineValue * 0.2 },
    { name: 'Week 3', revenue: pipelineValue * 0.45 },
    { name: 'Week 4', revenue: pipelineValue },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Business Command Center</h2>
          <p className="text-slate-500 font-medium">Marketing and Sales performance for Highshift Media.</p>
        </div>
        <div className="flex space-x-2">
           <button 
            onClick={() => setCurrentView('pipelines')}
            className="bg-blue-600 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
           >
             + New Lead
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Pipeline Value" value={`$${pipelineValue.toLocaleString()}`} label="Current Leads" icon={GitGraph} color="bg-blue-600" trend="+14.2%" />
        <StatCard title="Closed Won" value={`$${totalRevenueValue.toLocaleString()}`} label="Total Revenue" icon={DollarSign} color="bg-green-600" trend="+8.1%" />
        <StatCard title="Conversion Rate" value={`${opportunities.length > 0 ? ((opportunities.filter(o => o.stage === 'Closed').length / opportunities.length) * 100).toFixed(1) : 0}%`} label="Sales Efficiency" icon={Target} color="bg-amber-600" trend="+2.4%" />
        <StatCard title="Ad Spend" value={`$${expenses.filter(e => e.category === 'Marketing').reduce((s,e) => s+e.amount, 0).toLocaleString()}`} label="Marketing Budget" icon={TrendingUp} color="bg-red-600" trend="-4.5%" />
      </div>

      {opportunities.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
            <Rocket size={300} />
          </div>
          <div className="w-24 h-24 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/40 transform -rotate-6">
            <Rocket size={48} />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4">Ignite Your Sales Funnel</h3>
          <p className="text-slate-500 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
            Welcome to the Highshift Media All-in-One CRM. Start by adding your first opportunity to our sales pipeline or connect your Facebook Ads account.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            <div onClick={() => setCurrentView('pipelines')} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left hover:border-blue-500 transition-all cursor-pointer">
              <GitGraph className="text-blue-600 mb-3" />
              <p className="font-black text-slate-900 text-sm mb-1">Setup Pipeline</p>
              <p className="text-xs text-slate-400">Map your sales stages and start closing deals.</p>
            </div>
            <div onClick={() => setCurrentView('conversations')} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left hover:border-blue-500 transition-all cursor-pointer">
              <MessageSquare className="text-purple-600 mb-3" />
              <p className="font-black text-slate-900 text-sm mb-1">Unified Inbox</p>
              <p className="text-xs text-slate-400">Connect SMS, Email, and Social channels.</p>
            </div>
            <div onClick={() => setCurrentView('automation')} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left hover:border-blue-500 transition-all cursor-pointer">
              <Target className="text-green-600 mb-3" />
              <p className="font-black text-slate-900 text-sm mb-1">Automation Bots</p>
              <p className="text-xs text-slate-400">Build landing pages that convert like crazy.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black text-slate-900">Revenue Forecasting</h3>
               <div className="flex space-x-2">
                  <span className="flex items-center text-[10px] font-bold text-slate-400 uppercase"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span> Pipeline</span>
                  <span className="flex items-center text-[10px] font-bold text-slate-400 uppercase"><span className="w-2 h-2 bg-slate-200 rounded-full mr-2"></span> Projection</span>
               </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    formatter={(val) => [`$${val.toLocaleString()}`, 'Value']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-[#0f172a] p-8 rounded-3xl shadow-xl text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <TrendingUp size={120} />
            </div>
            <h3 className="font-bold mb-6 text-slate-400 uppercase text-xs tracking-widest">Recent Activity</h3>
            <div className="space-y-6">
              {opportunities.slice(0, 5).map(opp => (
                <div key={opp.id} className="flex items-start space-x-4 border-l-2 border-blue-500 pl-4 py-1">
                  <div>
                    <p className="text-sm font-bold">{opp.name}</p>
                    <p className="text-[10px] text-slate-400">Moved to <span className="text-blue-400 font-bold">{opp.stage}</span></p>
                  </div>
                  <div className="ml-auto text-xs font-bold text-slate-500">{opp.lastActivity}</div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsLogOpen(true)}
              className="w-full mt-8 py-3 bg-white/10 rounded-2xl font-bold text-sm hover:bg-white/20 transition"
            >
              View Audit Log
            </button>
          </div>
        </div>
      )}

      {/* Audit Log Sliding Panel */}
      {isLogOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsLogOpen(false)}></div>
           <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
              <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                 <div className="flex items-center space-x-3">
                    <Activity className="text-blue-600" />
                    <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">System Audit Log</h3>
                 </div>
                 <button onClick={() => setIsLogOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition"><X /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 {opportunities.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 font-medium italic">No recent system logs.</div>
                 ) : (
                    opportunities.map(opp => (
                       <div key={opp.id} className="flex items-start space-x-4 group">
                          <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 mt-1">
                             <Clock size={16} />
                          </div>
                          <div>
                             <p className="text-sm text-slate-900">
                                <span className="font-bold">Lead Status Update:</span> {opp.name} was moved to stage <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold text-[10px]">{opp.stage}</span>
                             </p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Today at 10:45 AM • System generated</p>
                          </div>
                       </div>
                    ))
                 )}
              </div>
              <div className="p-6 border-t bg-slate-50">
                 <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition shadow-lg">Export Log to CSV</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
