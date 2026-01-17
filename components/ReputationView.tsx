
import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, X, Send } from 'lucide-react';
import { Review } from '../types';

interface ReputationViewProps {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

const ReputationView: React.FC<ReputationViewProps> = ({ reviews, setReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ name: '', platform: 'Google' as Review['platform'] });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.name) return;

    const review: Review = {
      id: `rev-${Date.now()}`,
      platform: newRequest.platform,
      author: newRequest.name,
      rating: 0,
      content: 'Request sent to customer. Awaiting response...',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    setReviews([review, ...reviews]);
    setNewRequest({ name: '', platform: 'Google' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reputation Management</h2>
          <p className="text-slate-500 text-sm">Monitor and request reviews from Google and Facebook.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition flex items-center"
        >
          <MessageSquare size={18} className="mr-2" />
          Send Review Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Average Rating</p>
            <h3 className="text-3xl font-bold text-slate-900">{reviews.filter(r => r.rating > 0).length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.filter(r => r.rating > 0).length).toFixed(1) : '5.0'}</h3>
            <div className="flex text-amber-400 mt-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Star size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Reviews</p>
            <h3 className="text-3xl font-bold text-slate-900">{reviews.length}</h3>
            <p className="text-[10px] text-green-500 font-bold uppercase mt-1">Verified Growth</p>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between text-indigo-600">
           <div className="p-3 bg-indigo-50 rounded-2xl w-full text-center">
              <p className="text-[10px] font-black uppercase tracking-widest mb-1">Automation Status</p>
              <p className="text-xs font-bold">Auto-Review Requests: Active</p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Reputation Feed</h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{reviews.length} total events</span>
        </div>
        
        {reviews.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={32} />
            </div>
            <h4 className="font-bold text-slate-900">Review feed is quiet</h4>
            <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">Click "Send Review Request" above to invite customers to leave feedback on Google or Facebook.</p>
          </div>
        ) : (
          <div className="divide-y">
            {reviews.map(review => (
              <div key={review.id} className="p-6 hover:bg-slate-50 transition group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <img src={`https://picsum.photos/seed/${review.id}/100`} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{review.author}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">{review.date} • via {review.platform}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {review.rating > 0 ? (
                      [1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= review.rating ? "currentColor" : "none"} />)
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full uppercase">Request Sent</span>
                    )}
                  </div>
                </div>
                <p className={`text-sm mb-4 ${review.rating === 0 ? 'text-slate-400 italic' : 'text-slate-600'}`}>{review.content}</p>
                <div className="flex justify-between items-center pt-2">
                   <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${review.status === 'Replied' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                      {review.status}
                   </span>
                   {review.status === 'Pending' && review.rating > 0 && <button className="text-blue-600 font-bold text-xs hover:underline">Reply to Review</button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50 rounded-t-3xl">
              <h3 className="font-bold text-slate-900">Send Review Request</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleSendRequest} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Customer Name</label>
                <input 
                  required 
                  autoFocus
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                  placeholder="e.g. Jane Smith"
                  value={newRequest.name}
                  onChange={e => setNewRequest({...newRequest, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Target Platform</label>
                <div className="flex gap-2">
                  {['Google', 'Facebook'].map(plat => (
                    <button 
                      key={plat}
                      type="button" 
                      onClick={() => setNewRequest({...newRequest, platform: plat as any})}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${newRequest.platform === plat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'}`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-400 italic text-center">This will send an SMS and Email request to the customer immediately.</p>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 mt-4 flex items-center justify-center">
                <Send size={16} className="mr-2" />
                Send Request Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReputationView;
