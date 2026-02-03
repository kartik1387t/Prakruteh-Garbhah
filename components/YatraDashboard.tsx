import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { UserBudget } from '../types';
import Reveal from './Reveal';

const YatraDashboard: React.FC = () => {
  const budgetData: UserBudget = {
    total: 50000,
    spent: 32000,
    categories: {
      travel: 12000,
      stay: 15000,
      food: 3000,
      shopping: 2000
    }
  };

  const chartData = [
    { name: 'Travel', value: budgetData.categories.travel, color: '#FF9933' }, // Saffron
    { name: 'Stay', value: budgetData.categories.stay, color: '#138808' },    // Indigo/Green
    { name: 'Food', value: budgetData.categories.food, color: '#FBBF24' },    // Gold
    { name: 'Local Art', value: budgetData.categories.shopping, color: '#A855F7' } // Purple for "Vocal"
  ];

  return (
    <section className="py-20 bg-cosmos-light" id="dashboard">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-3xl text-white">My Yatra Dashboard</h2>
            <span className="bg-saffron text-cosmos px-3 py-1 rounded font-bold text-sm">Digital Secretary</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Budget Guru */}
          <Reveal delay={0.2} className="h-full">
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden h-full">
              <h3 className="text-xl font-display text-gray-200 mb-4">Financial Guru</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #333' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-[-20px]">
                <p className="text-gray-400 text-sm">Budget Remaining</p>
                <p className="text-2xl font-bold text-green-400">₹{budgetData.total - budgetData.spent}</p>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Vocal for Local (Badges) */}
          <Reveal delay={0.4} className="h-full">
            <div className="glass-card rounded-2xl p-6 h-full">
              <h3 className="text-xl font-display text-gray-200 mb-6">Swadeshi Patron Badges</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg text-center border border-dashed border-gray-600 hover:border-saffron transition-colors cursor-pointer group">
                    <div className="text-3xl mb-2 grayscale group-hover:grayscale-0 transition-all">🧣</div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Pashmina Patron</p>
                    <p className="text-xs text-saffron mt-1 font-bold opacity-0 group-hover:opacity-100">Unlocked!</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg text-center border border-dashed border-gray-600 opacity-50">
                    <div className="text-3xl mb-2">🏺</div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Pottery Guardian</p>
                    <p className="text-xs text-gray-500 mt-1">Visit Jaipur</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg text-center border border-dashed border-gray-600 opacity-50">
                    <div className="text-3xl mb-2">🍵</div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Tea Sommelier</p>
                    <p className="text-xs text-gray-500 mt-1">Visit Darjeeling</p>
                </div>
              </div>
              <div className="mt-6 p-3 bg-indigo/20 rounded border border-indigo/30">
                <p className="text-sm text-indigo-200">"Your purchase of 1 Pashmina supported a family in Ladakh for 2 weeks."</p>
              </div>
            </div>
          </Reveal>

          {/* Card 3: AI Planner Suggestion */}
          <Reveal delay={0.6} className="h-full">
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-display text-gray-200 mb-2">Next Activity?</h3>
                  <span className="animate-pulse text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">AI Live</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">Based on your location in <strong>Udaipur</strong> (7:00 PM)</p>
                
                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-4 rounded-xl border border-white/10 mb-4">
                    <h4 className="font-serif text-lg text-white mb-1">Lake Pichola Boat Ride</h4>
                    <p className="text-xs text-gray-300">"The sunset glow is perfect right now. 95% match for your 'Romantic' vibe."</p>
                </div>
              </div>
              
              <button className="w-full py-3 border border-white/20 rounded hover:bg-white/10 transition-colors text-sm uppercase tracking-wider">
                Add to Itinerary
              </button>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default YatraDashboard;