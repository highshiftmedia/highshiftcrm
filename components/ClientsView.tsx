
import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Mail, Phone, ExternalLink, X, Users } from 'lucide-react';
import { Client } from '../types';

interface ClientsViewProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
}

const ClientsView: React.FC<ClientsViewProps> = ({ clients, setClients }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Client Form State
  const [newClient, setNewClient] = useState({
    name: '',
    industry: '',
    contact: '',
    contractValue: ''
  });

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name) return;

    const client: Client = {
      id: `c-${Date.now()}`,
      name: newClient.name,
      industry: newClient.industry || 'Unknown',
      contact: newClient.contact || 'No contact info',
      contractValue: parseFloat(newClient.contractValue) || 0,
      startDate: new Date().toISOString().split('T')[0],
      status: 'Onboarding'
    };

    setClients([...clients, client]);
    setNewClient({ name: '', industry: '', contact: '', contractValue: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Directory</h2>
          <p className="text-gray-500">Total: {clients.length} clients</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <Plus size={18} className="mr-2" />
          Add Client
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search clients..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
            <Users size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No clients found</h3>
          <p className="text-gray-500 mb-6">Start by adding your first client to the CRM.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add First Client
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map(client => (
            <div key={client.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {client.name.charAt(0)}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{client.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{client.industry} • Joined {client.startDate}</p>
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center"><Mail size={14} className="mr-2 text-gray-400" /> {client.contact}</div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Contract Value</p>
                  <p className="text-lg font-bold text-gray-900">${client.contractValue.toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {client.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for adding client */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Add New Client</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
            </div>
            <form onSubmit={handleAddClient} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
                <input 
                  autoFocus
                  required
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newClient.name}
                  onChange={e => setNewClient({...newClient, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Industry</label>
                <input 
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newClient.industry}
                  onChange={e => setNewClient({...newClient, industry: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Email</label>
                <input 
                  type="email"
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newClient.contact}
                  onChange={e => setNewClient({...newClient, contact: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contract Value ($)</label>
                <input 
                  type="number"
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                  value={newClient.contractValue}
                  onChange={e => setNewClient({...newClient, contractValue: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
                Save Client
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsView;
