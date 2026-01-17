
import { 
  User, UserRole, Client, Project, Task, Employee, Expense, MarketingCampaign, Budget,
  Opportunity, Workflow, Message, Review
} from './types';

export const currentUser: User = {
  id: 'u-1',
  name: 'Admin User',
  email: 'admin@highshift.media',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/seed/admin/200'
};

export const initialClients: Client[] = [];
export const initialProjects: Project[] = [];
export const initialEmployees: Employee[] = [];
export const initialTasks: Task[] = [];
export const initialExpenses: Expense[] = [];
export const initialMarketingCampaigns: MarketingCampaign[] = [];
export const initialBudgets: Budget[] = [];

// GHL Initial States
export const initialOpportunities: Opportunity[] = [];
export const initialWorkflows: Workflow[] = [];
export const initialMessages: Message[] = [];
export const initialReviews: Review[] = [];
