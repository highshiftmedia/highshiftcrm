
import React, { useState } from 'react';
import { Sparkles, Loader2, BrainCircuit, Zap, AlertTriangle } from 'lucide-react';
import { getBusinessInsights } from '../geminiService';
import { Client, Project, MarketingCampaign, Employee, Expense } from '../types';

interface AIInsightsProps {
  clients: Client[];
  projects: Project[];
  campaigns: MarketingCampaign[];
  employees: Employee[];
  expenses: Expense[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ clients, projects, campaigns, employees, expenses }) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);

  const generateInsights = async () => {
    if (clients.length === 0) return;
    setLoading(true);
    
    const summary = `
      - Total Active Clients: ${clients.filter(c => c.status === 'Active').length}
      - Total Projects: ${projects.length}
      - Total Revenue Opportunity: $${clients.reduce((acc, c) => acc + c.contractValue, 0)}
      - Current Campaigns: ${campaigns.length}
      - Staff Size: ${employees.length}
    `;

    const result = await getBusinessInsights(summary);
    setInsights(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 mb-2">
          <BrainCircuit size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">AI Business Intelligence</h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Deep-dive analysis of your Highshift Media database.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-xl relative overflow-hidden">
        {clients.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle size={48} className="text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Insufficient Data</h3>
            <p className="text-gray-500 mb-8">Please add at least one client to enable AI business intelligence features.</p>
          </div>
        ) : !insights ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready for analysis</h3>
            <button 
              onClick={generateInsights}
              disabled={loading}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center mx-auto"
            >
              {loading ? <Loader2 className="animate-spin mr-3" /> : <Zap className="mr-3 fill-current" />}
              {loading ? 'Analyzing Data...' : 'Generate Insights'}
            </button>
          </div>
        ) : (
          <div className="prose prose-blue max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg font-medium">
              {insights}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
