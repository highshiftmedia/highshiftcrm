import React, { useState } from 'react';
import { Search, Send, Phone, Video, Info, Paperclip, Smile, MoreVertical, MessageSquare, Loader2, Plus } from 'lucide-react';
import { Message } from '../types';

interface ConversationViewProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ConversationView: React.FC<ConversationViewProps> = ({ messages, setMessages }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [inputText, setInputText] = useState('');

  const connectChannels = () => {
    setIsConnecting(true);
    setTimeout(() => {
      const demoMessage: Message = {
        id: `msg-${Date.now()}`,
        contactName: 'Sarah from TechFlow',
        lastMessage: 'Great! Let me know when you can chat.',
        time: 'Just now',
        type: 'SMS',
        unread: true
      };
      setMessages([demoMessage, ...messages]);
      setIsConnecting(false);
    }, 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText) return;
    setInputText('');
    // Mock response simulation
  };

  return (
    <div className="h-full flex bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Sidebar - Chat List */}
      <div className="w-80 flex flex-col border-r border-slate-200 bg-slate-50/30">
        <div className="p-4 border-b bg-white/50 backdrop-blur-md sticky top-0">
          <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">Unified Inbox</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input type="text" placeholder="Search contacts..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-blue-500 shadow-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center justify-center h-full">
              <MessageSquare className="text-slate-200 mb-4" size={48} />
              <p className="text-sm text-slate-400 font-bold mb-6">No active conversations</p>
              <button 
                onClick={connectChannels}
                disabled={isConnecting}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center"
              >
                {/* Fixed missing Plus icon import to resolve 'Cannot find name Plus' error */}
                {isConnecting ? <Loader2 size={14} className="animate-spin mr-2" /> : <Plus size={14} className="mr-2" />}
                {isConnecting ? 'Syncing...' : 'Connect Channels'}
              </button>
            </div>
          ) : (
            messages.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 flex items-start space-x-3 cursor-pointer hover:bg-white transition border-b border-slate-50 ${selectedChat === chat.id ? 'bg-white border-l-4 border-l-blue-600 shadow-inner' : ''}`}
              >
                <img src={`https://picsum.photos/seed/${chat.id}/100`} className="w-10 h-10 rounded-xl" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="text-sm font-black text-slate-900 truncate">{chat.contactName}</h4>
                    <span className="text-[10px] text-slate-400 font-bold">{chat.time}</span>
                  </div>
                  <p className={`text-xs truncate ${chat.unread ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread && <div className="w-2 h-2 bg-blue-600 rounded-full mt-1 shrink-0"></div>}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main - Chat Interface */}
      <div className="flex-1 flex flex-col bg-slate-50/50">
        {selectedChat ? (
          <>
            <div className="h-16 bg-white border-b px-6 flex items-center justify-between">
               <div className="flex items-center space-x-3">
                  <img src="https://picsum.photos/seed/user1/100" className="w-10 h-10 rounded-xl" />
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">Customer Lead</h3>
                    <p className="text-[10px] text-green-500 font-black uppercase tracking-widest flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span> Live Status
                    </p>
                  </div>
               </div>
               <div className="flex items-center space-x-4 text-slate-400">
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition"><Phone size={18} /></button>
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition"><Video size={18} /></button>
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition"><MoreVertical size={18} /></button>
               </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
               <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm max-w-sm text-xs font-medium text-slate-800">
                    Hello! I'm interested in the AI Automation package you offered.
                  </div>
               </div>
               <div className="flex justify-end">
                  <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-lg max-w-sm text-xs font-bold text-white">
                    Absolutely! I'd love to help. Would you like to schedule a quick demo call?
                  </div>
               </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
               <form onSubmit={handleSend} className="flex items-center space-x-3 bg-slate-100 rounded-2xl p-1.5 pr-4 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <button type="button" className="p-2 text-slate-400 hover:text-slate-600"><Paperclip size={18} /></button>
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 bg-transparent border-none outline-none text-xs py-2 px-2"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button type="button" className="p-2 text-slate-400 hover:text-slate-600"><Smile size={18} /></button>
                  <button type="submit" className="p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition"><Send size={18} /></button>
               </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-24 h-24 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-center text-blue-600 mb-6 shadow-xl">
              <MessageSquare size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Omnichannel Inbox</h3>
            <p className="text-slate-500 max-w-sm font-medium">
              Manage SMS, Email, Facebook, and Instagram messages in one unified high-speed interface.
            </p>
            {messages.length === 0 && (
              <button 
                onClick={connectChannels}
                className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
              >
                Launch Communication Hub
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationView;