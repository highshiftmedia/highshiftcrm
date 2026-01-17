
export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  EMPLOYEE = 'Employee'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  industry: string;
  contractValue: number;
  startDate: string;
  status: 'Active' | 'Onboarding' | 'Completed' | 'Inactive';
}

// GHL: Opportunity/Pipeline
export interface Opportunity {
  id: string;
  name: string;
  email: string;
  phone: string;
  value: number;
  stage: 'Lead' | 'Contacted' | 'Meeting' | 'Proposal' | 'Closed';
  source: string;
  lastActivity: string;
}

// GHL: Automation Workflow
export interface Workflow {
  id: string;
  name: string;
  status: 'Published' | 'Draft';
  trigger: string;
  stepsCount: number;
  enrolled: number;
}

// GHL: Conversations
export interface Message {
  id: string;
  contactName: string;
  lastMessage: string;
  time: string;
  type: 'SMS' | 'Email' | 'Facebook' | 'Instagram';
  unread: boolean;
}

// GHL: Reputation
export interface Review {
  id: string;
  platform: 'Google' | 'Facebook';
  author: string;
  rating: number;
  content: string;
  date: string;
  status: 'Replied' | 'Pending';
}

export enum ProjectStatus {
  PLANNING = 'Planning',
  IN_PROGRESS = 'In Progress',
  REVIEW = 'Review',
  COMPLETED = 'Completed'
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  status: ProjectStatus;
  deadline: string;
  progress: number;
  budget: number;
}

export interface Task {
  id: string;
  projectId: string;
  assigneeId: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To-Do' | 'In Progress' | 'Done';
  dueDate: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  rate: number;
  type: 'W-2' | 'Contractor';
  tasksCompleted: number;
  performanceScore: number;
}

export interface Expense {
  id: string;
  category: 'Marketing' | 'Software' | 'Payroll' | 'Operations' | 'Other';
  amount: number;
  date: string;
  description: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: 'Facebook Ads' | 'Google Ads' | 'SEO' | 'Email' | 'Funnel';
  budget: number;
  leads: number;
  costPerLead: number;
  roi: number;
}

export interface Budget {
  id: string;
  department: string;
  allocated: number;
  actual: number;
  month: string;
}
