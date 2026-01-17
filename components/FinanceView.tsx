
import React, { useState } from 'react';
import { 
  DollarSign, 
  PieChart, 
  ShoppingCart, 
  CreditCard, 
  ChevronDown, 
  Plus, 
  X, 
  Trash2,
  Calendar
} from 'lucide-react';
import { Expense, Budget } from '../types';

interface FinanceViewProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budgets: Budget[];
}

const FinanceView: React.FC<FinanceViewProps> = ({ expenses, setExpenses, budgets }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Software' as Expense['category'],
    date: new Date().toISOString().split('T')[0]
  });

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) return;

    const expense: Expense = {
      id: `ex-${Date.now()}`,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      date: newExpense.date,
      description: newExpense.description
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({
      description: '',
      amount: '',
      category: 'Software',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(false);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Management</h2>
          <p className="text-gray-500">Track budgets, expenses, and payroll for Highshift Media.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Log Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Budgets Summary */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Department Budgets</h3>
            {budgets.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed">
                <PieChart className="mx-auto text-gray-300 mb-2" size={32} />
                <p className="text-gray-400 text-sm italic">No budgets defined yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {budgets.map(budget => {
                  const percentage = Math.min((budget.actual / budget.allocated) * 100, 100);
                  return (
                    <div key={budget.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">{budget.department}</span>
                        <span className="text-sm text-gray-500">
                          <span className="font-bold text-gray-900">${budget.actual.toLocaleString()}</span> / ${budget.allocated.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${percentage > 90 ? 'bg-red-500' : 'bg-blue-500'}`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Transaction List */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Recent Transactions</h3>
              <span className="text-xs font-medium text-gray-400">{expenses.length} entries</span>
            </div>
            {expenses.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
                  <CreditCard size={32} />
                </div>
                <h4 className="text-gray-900 font-bold">No transactions found</h4>
                <p className="text-gray-400 text-sm mt-1">Start tracking your business spend by logging an expense.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {expenses.map(expense => (
                  <div key={expense.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition group">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        expense.category === 'Marketing' ? 'bg-pink-100 text-pink-600' :
                        expense.category === 'Software' ? 'bg-blue-100 text-blue-600' :
                        expense.category === 'Payroll' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {expense.category === 'Software' ? <ShoppingCart size={20} /> : <CreditCard size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{expense.description}</p>
                        <p className="text-xs text-gray-400">{expense.date} • {expense.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">-${expense.amount.toLocaleString()}</p>
                        <span className="text-[10px] text-green-600 font-bold uppercase">Cleared</span>
                      </div>
                      <button 
                        onClick={() => removeExpense(expense.id)}
                        className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Financial Overview Card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-8 rounded-3xl shadow-xl text-white">
            <p className="text-gray-400 text-sm font-medium mb-1">Total Expenses (MTD)</p>
            <h3 className="text-4xl font-bold mb-8 text-red-400">-${totalExpenses.toLocaleString()}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Projected Spend</span>
                </div>
                <span className="text-sm font-bold">$0.00</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Cash Reserve</span>
                </div>
                <span className="text-sm font-bold">$124,500</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4">Expense Categories</h4>
            <div className="space-y-4">
              {['Marketing', 'Software', 'Payroll', 'Operations'].map(cat => {
                const catTotal = expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0);
                const perc = totalExpenses > 0 ? (catTotal / totalExpenses) * 100 : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold uppercase text-gray-400">
                      <span>{cat}</span>
                      <span>{perc.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400" style={{ width: `${perc}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding expense */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Log New Expense</h3>
                <p className="text-xs text-gray-500">Add a business transaction to your ledger</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 bg-white rounded-xl shadow-sm text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddExpense} className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                <input 
                  autoFocus
                  required
                  placeholder="e.g. AWS Subscription"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium" 
                  value={newExpense.description}
                  onChange={e => setNewExpense({...newExpense, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Amount ($)</label>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold" 
                    value={newExpense.amount}
                    onChange={e => setNewExpense({...newExpense, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input 
                      type="date"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium" 
                      value={newExpense.date}
                      onChange={e => setNewExpense({...newExpense, date: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium" 
                  value={newExpense.category}
                  onChange={e => setNewExpense({...newExpense, category: e.target.value as Expense['category']})}
                >
                  <option value="Software">Software Tools</option>
                  <option value="Marketing">Marketing & Ads</option>
                  <option value="Payroll">Payroll</option>
                  <option value="Operations">Operations</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 mt-4 flex items-center justify-center"
              >
                <DollarSign size={20} className="mr-2" />
                Confirm Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceView;
