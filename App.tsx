
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  UserSquare2, 
  DollarSign, 
  TrendingUp, 
  Menu, 
  X,
  Search,
  Sparkles,
  MessageSquare,
  GitGraph,
  Zap,
  Star,
  Calendar,
  Layers,
  Plus
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import ClientsView from './components/ClientsView';
import ProjectsView from './components/ProjectsView';
import TasksView from './components/TasksView';
import EmployeesView from './components/EmployeesView';
import FinanceView from './components/FinanceView';
import MarketingView from './components/MarketingView';
import AIInsights from './components/AIInsights';
import PipelineView from './components/PipelineView';
import ConversationView from './components/ConversationView';
import AutomationView from './components/AutomationView';
import ReputationView from './components/ReputationView';

import { 
  currentUser, 
  initialClients, initialProjects, initialTasks, initialEmployees, 
  initialExpenses, initialMarketingCampaigns, initialBudgets,
  initialOpportunities, initialWorkflows, initialMessages, initialReviews
} from './mockData';
import { 
  Client, Project, Task, Employee, Expense, MarketingCampaign, Budget,
  Opportunity, Workflow, Message, Review 
} from './types';

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick,
  badge
}: { 
  icon: any, 
  label: string, 
  isActive: boolean, 
  onClick: () => void,
  badge?: number
}) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-2.5 mb-1 rounded-lg transition-all relative ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <Icon size={18} className="mr-3 shrink-0" />
    <span className="font-medium text-sm whitespace-nowrap">{label}</span>
    {badge && badge > 0 && (
      <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  const loadData = (key: string, fallback: any) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  };

  const [clients, setClients] = useState<Client[]>(() => loadData('crm_clients', initialClients));
  const [projects, setProjects] = useState<Project[]>(() => loadData('crm_projects', initialProjects));
  const [tasks, setTasks] = useState<Task[]>(() => loadData('crm_tasks', initialTasks));
  const [employees, setEmployees] = useState<Employee[]>(() => loadData('crm_employees', initialEmployees));
  const [expenses, setExpenses] = useState<Expense[]>(() => loadData('crm_expenses', initialExpenses));
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(() => loadData('crm_campaigns', initialMarketingCampaigns));
  const [budgets, setBudgets] = useState<Budget[]>(() => loadData('crm_budgets', initialBudgets));
  
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => loadData('crm_opps', initialOpportunities));
  const [workflows, setWorkflows] = useState<Workflow[]>(() => loadData('crm_workflows', initialWorkflows));
  const [messages, setMessages] = useState<Message[]>(() => loadData('crm_messages', initialMessages));
  const [reviews, setReviews] = useState<Review[]>(() => loadData('crm_reviews', initialReviews));

  useEffect(() => {
    const data = { 
      crm_clients: clients, crm_projects: projects, crm_tasks: tasks, 
      crm_employees: employees, crm_expenses: expenses, crm_campaigns: campaigns, 
      crm_budgets: budgets, crm_opps: opportunities, crm_workflows: workflows,
      crm_messages: messages, crm_reviews: reviews
    };
    Object.entries(data).forEach(([key, val]) => localStorage.setItem(key, JSON.stringify(val)));
  }, [clients, projects, tasks, employees, expenses, campaigns, budgets, opportunities, workflows, messages, reviews]);

  const renderView = () => {
    const props = { 
      clients, setClients, projects, setProjects, tasks, setTasks, 
      employees, setEmployees, expenses, setExpenses, campaigns, setCampaigns, 
      budgets, setBudgets, opportunities, setOpportunities, 
      workflows, setWorkflows, messages, setMessages, reviews, setReviews
    };

    switch (currentView) {
      case 'dashboard': return <Dashboard {...props} setCurrentView={setCurrentView} />;
      case 'conversations': return <ConversationView {...props} />;
      case 'pipelines': return <PipelineView {...props} />;
      case 'automation': return <AutomationView {...props} />;
      case 'marketing': return <MarketingView {...props} />;
      case 'clients': return <ClientsView {...props} />;
      case 'projects': return <ProjectsView {...props} />;
      case 'tasks': return <TasksView {...props} />;
      case 'reputation': return <ReputationView {...props} />;
      case 'employees': return <EmployeesView {...props} />;
      case 'finance': return <FinanceView {...props} />;
      case 'ai-insights': return <AIInsights {...props} />;
      default: return <Dashboard {...props} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9]">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#0f172a] h-full flex flex-col transition-all duration-300 z-50`}>
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-black">H</span>
            </div>
            <h1 className="text-white font-bold text-lg">Highshift</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 mt-2 overflow-y-auto overflow-x-hidden space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" isActive={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <SidebarItem icon={MessageSquare} label="Conversations" isActive={currentView === 'conversations'} onClick={() => setCurrentView('conversations')} badge={messages.filter(m => m.unread).length} />
          <SidebarItem icon={GitGraph} label="Pipelines" isActive={currentView === 'pipelines'} onClick={() => setCurrentView('pipelines')} />
          <SidebarItem icon={Users} label="Contacts" isActive={currentView === 'clients'} onClick={() => setCurrentView('clients')} />
          <SidebarItem icon={Zap} label="Automation" isActive={currentView === 'automation'} onClick={() => setCurrentView('automation')} />
          <SidebarItem icon={TrendingUp} label="Marketing" isActive={currentView === 'marketing'} onClick={() => setCurrentView('marketing')} />
          <SidebarItem icon={Briefcase} label="Projects" isActive={currentView === 'projects'} onClick={() => setCurrentView('projects')} />
          <SidebarItem icon={Star} label="Reputation" isActive={currentView === 'reputation'} onClick={() => setCurrentView('reputation')} />
          <SidebarItem icon={CheckSquare} label="Tasks" isActive={currentView === 'tasks'} onClick={() => setCurrentView('tasks')} />
          <div className="pt-4 border-t border-slate-800">
             <SidebarItem icon={DollarSign} label="Payments" isActive={currentView === 'finance'} onClick={() => setCurrentView('finance')} />
             <SidebarItem icon={UserSquare2} label="Team" isActive={currentView === 'employees'} onClick={() => setCurrentView('employees')} />
             <SidebarItem icon={Sparkles} label="AI Insights" isActive={currentView === 'ai-insights'} onClick={() => setCurrentView('ai-insights')} />
          </div>
        </nav>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'justify-center'}`}>
            <img src={currentUser.avatar} alt="Profile" className="w-9 h-9 rounded-full ring-2 ring-blue-500/20" />
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-white text-xs font-bold truncate">{currentUser.name}</p>
                <p className="text-slate-500 text-[10px] truncate">System Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-1.5 w-96 border border-slate-200">
            <Search size={16} className="text-slate-400 mr-2" />
            <input type="text" placeholder="Search contacts, deals, funnels..." className="bg-transparent border-none outline-none text-xs w-full" />
          </div>
          <div className="flex items-center space-x-4">
             <button 
              onClick={() => setIsQuickActionOpen(true)}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition flex items-center"
             >
               <Plus size={14} className="mr-1.5" />
               Quick Action
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-slate-50">
          {renderView()}
        </div>
      </main>

      {/* Global Quick Action Modal */}
      {isQuickActionOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold">Quick Create</h3>
              <button onClick={() => setIsQuickActionOpen(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="p-4 space-y-2">
              <button onClick={() => { setCurrentView('pipelines'); setIsQuickActionOpen(false); }} className="w-full flex items-center p-4 hover:bg-blue-50 rounded-2xl transition group text-left">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <GitGraph size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Add Opportunity</p>
                  <p className="text-[10px] text-slate-400 font-medium">Create a new lead in your pipeline</p>
                </div>
              </button>
              <button onClick={() => { setCurrentView('clients'); setIsQuickActionOpen(false); }} className="w-full flex items-center p-4 hover:bg-green-50 rounded-2xl transition group text-left">
                <div className="p-2 bg-green-100 text-green-600 rounded-xl mr-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Users size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Add Client</p>
                  <p className="text-[10px] text-slate-400 font-medium">Add a new business contact</p>
                </div>
              </button>
              <button onClick={() => { setCurrentView('tasks'); setIsQuickActionOpen(false); }} className="w-full flex items-center p-4 hover:bg-purple-50 rounded-2xl transition group text-left">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-xl mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <CheckSquare size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Create Task</p>
                  <p className="text-[10px] text-slate-400 font-medium">Assign work to a team member</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
