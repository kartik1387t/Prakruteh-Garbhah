import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { UserProfile, UserBudget, VibeType } from '../types';
import Reveal from './Reveal';
import { User, Wallet, Sparkles, TrendingUp, BellRing, Settings, RefreshCw, LogOut, Award, HeartHandshake, ThumbsUp, Calendar, Heart, Share2 } from 'lucide-react';

interface YatraDashboardProps {
  user: UserProfile | null;
  onLoginRequest: () => void;
  onLogout: () => void;
  onUpdateBudget: (budget: number) => void;
}

const YatraDashboard: React.FC<YatraDashboardProps> = ({ user, onLoginRequest, onLogout, onUpdateBudget }) => {
  const [activeCurrency, setActiveCurrency] = useState<'INR' | 'USD' | 'EUR'>('INR');
  
  // Mock Data
  const budgetData: UserBudget = {
    total: user?.totalBudget || 50000,
    spent: user?.spent || 12500,
    categories: {
      travel: 5000,
      stay: 4500,
      food: 2000,
      shopping: 1000
    }
  };

  const chartData = [
    { name: 'Travel', value: budgetData.categories.travel, color: '#FF9933' }, // Saffron
    { name: 'Stay', value: budgetData.categories.stay, color: '#138808' },    // Indigo/Green
    { name: 'Food', value: budgetData.categories.food, color: '#FBBF24' },    // Gold
    { name: 'Shopping', value: budgetData.categories.shopping, color: '#A855F7' } // Purple
  ];

  const upcomingTrips = [
     { id: 1, name: 'Diwali in Varanasi', date: 'Nov 12', icon: '🪔' },
     { id: 2, name: 'Pushkar Camel Fair', date: 'Nov 20', icon: '🐫' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: activeCurrency, maximumSignificantDigits: 4 }).format(amount);
  };

  if (!user) {
    return (
      <section className="h-full flex items-center justify-center" id="dashboard">
        <div className="text-center p-8 glass-card rounded-2xl max-w-md mx-auto">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="font-serif text-2xl text-white mb-2">Access Personal Dashboard</h2>
          <p className="text-gray-400 mb-6">Login to view your Yatra Card, track budget, and get personalized AI suggestions.</p>
          <button 
            onClick={onLoginRequest}
            className="px-8 py-3 bg-saffron text-black font-bold uppercase tracking-widest rounded hover:bg-orange-500 transition-colors"
          >
            Login / Sign Up
          </button>
        </div>
      </section>
    );
  }

  // Progress Mandala Logic (Simple Circular Progress for now)
  const completionPercent = 35; // Mock progress
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (completionPercent / 100) * circumference;

  return (
    <section className="py-20 bg-cosmos-light min-h-full" id="dashboard">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl text-white">Yatra Command Center</h2>
              <p className="text-sm text-gray-400">Welcome back, Traveler.</p>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-xs uppercase font-bold border border-red-500/30 px-3 py-1 rounded-full transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Progress Mandala (New) */}
          <Reveal delay={0.1} className="h-full">
             <div className="glass-card rounded-2xl p-6 h-full flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] opacity-10 animate-spin-ultra-slow"></div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 z-10">Yatra Progress</h3>
                
                <div className="relative w-32 h-32 flex items-center justify-center z-10">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="40" stroke="#334155" strokeWidth="8" fill="transparent" />
                      <circle 
                         cx="64" cy="64" r="40" 
                         stroke="#FF9933" strokeWidth="8" fill="transparent" 
                         strokeDasharray={circumference} 
                         strokeDashoffset={strokeDashoffset}
                         strokeLinecap="round"
                         className="transition-all duration-1000"
                      />
                   </svg>
                   <div className="absolute text-center">
                      <span className="text-2xl font-bold text-white">{completionPercent}%</span>
                      <span className="block text-[8px] text-gray-400 uppercase">Complete</span>
                   </div>
                </div>
                <p className="text-xs text-center text-gray-400 mt-4 z-10">3 / 12 Jyotirlingas Visited</p>
             </div>
          </Reveal>

          {/* 2. Smart Calendar (New) */}
          <Reveal delay={0.2} className="h-full">
             <div className="glass-card rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calendar size={16} className="text-blue-400" /> Smart Schedule
                   </h3>
                   <span className="text-[10px] bg-blue-900/30 text-blue-300 px-2 py-1 rounded">Sync On</span>
                </div>
                
                <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
                   {upcomingTrips.map(trip => (
                      <div key={trip.id} className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center gap-3 hover:bg-white/10 transition-colors">
                         <div className="text-2xl">{trip.icon}</div>
                         <div className="flex-1">
                            <div className="text-xs font-bold text-gray-200">{trip.name}</div>
                            <div className="text-[10px] text-gray-500">{trip.date} • Confirmed</div>
                         </div>
                         <button className="text-gray-500 hover:text-white"><Share2 size={12}/></button>
                      </div>
                   ))}
                   <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-center text-xs text-gray-500 border-dashed">
                      + Add Plan
                   </div>
                </div>
             </div>
          </Reveal>

          {/* 3. Budget 3D Pie (Refined) */}
          <Reveal delay={0.3} className="h-full">
            <div className="glass-card rounded-2xl p-6 h-full relative">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Wallet className="text-green-400" size={16} /> Budget
                 </h3>
              </div>

              <div className="h-32 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5))' }} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #333', fontSize: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
              </div>
              
              <div className="space-y-1 mt-2">
                 <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-mono">{formatCurrency(budgetData.total)}</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Left</span>
                    <span className="text-green-400 font-mono font-bold">{formatCurrency(budgetData.total - budgetData.spent)}</span>
                 </div>
              </div>
            </div>
          </Reveal>

          {/* 4. Swadeshi Bonus (New) */}
          <Reveal delay={0.4} className="h-full">
             <div className="glass-card rounded-2xl p-6 h-full bg-gradient-to-br from-indigo-900/20 to-cosmos flex flex-col justify-between border-l-4 border-indigo-500">
                <div>
                   <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                      <HeartHandshake className="text-pink-400" size={16} /> Swadeshi Impact
                   </h3>
                   <p className="text-[10px] text-gray-400">Your spending supports local families.</p>
                </div>

                <div className="flex items-center gap-2 my-4">
                   <div className="text-4xl font-bold text-white">{user?.impactStats?.familiesSupported || 0}</div>
                   <div className="text-xs text-gray-300 leading-tight">Artisan<br/>Families</div>
                </div>

                <div className="bg-white/5 rounded-lg p-2 flex items-center gap-2">
                   <Heart size={12} className="text-red-500 fill-red-500" />
                   <span className="text-[10px] text-gray-300">You earned a 'Local Hero' badge!</span>
                </div>
             </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default YatraDashboard;