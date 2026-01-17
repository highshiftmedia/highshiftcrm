
import React from 'react';
import { Target, MousePointer2, Users, DollarSign, Megaphone } from 'lucide-react';
import { MarketingCampaign } from '../types';

interface MarketingViewProps {
  campaigns: MarketingCampaign[];
}

const MarketingView: React.FC<MarketingViewProps> = ({ campaigns }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Marketing ROI</h2>
          <p className="text-gray-500">Track campaign performance.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          New Campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white py-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center">
          <Megaphone className="text-gray-300 mb-4" size={48} />
          <p className="text-gray-500">No active marketing campaigns.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-white p-6 rounded-xl border">
              <h4 className="font-bold">{campaign.name}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketingView;
