import React, { useState } from 'react';
import { User, Mail, Sparkles, Mountain, Waves, PawPrint, Tent, ArrowRight } from 'lucide-react';
import { UserProfile, VibeType } from '../types';

interface AuthModalProps {
  onLogin: (profile: UserProfile) => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vibe, setVibe] = useState<VibeType>('nature');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      const newProfile: UserProfile = {
        name,
        email,
        vibe,
        currency: 'INR',
        totalBudget: 50000,
        spent: 0,
        level: 1,
        badges: []
      };
      onLogin(newProfile);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cosmos border border-white/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative animate-fade-in">
        
        {/* Decorative Header */}
        <div className="bg-gradient-to-r from-saffron to-red-600 h-2"></div>
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-white mb-2">Join the Yatra</h2>
            <p className="text-gray-400 text-sm">Create your Digital Identity to access personal features.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-3 top-3 text-gray-500 group-focus-within:text-saffron transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-saffron transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 text-gray-500 group-focus-within:text-saffron transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-saffron transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-gray-400 uppercase font-bold tracking-widest block">Select Your Vibe</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'nature', icon: <Tent size={18} />, label: 'Nature' },
                  { id: 'beach', icon: <Waves size={18} />, label: 'Beach' },
                  { id: 'wildlife', icon: <PawPrint size={18} />, label: 'Wild' },
                  { id: 'spiritual', icon: <Sparkles size={18} />, label: 'Spirit' },
                ].map((v) => (
                  <button
                    type="button"
                    key={v.id}
                    onClick={() => setVibe(v.id as VibeType)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-300 ${vibe === v.id ? 'bg-saffron text-black border-saffron' : 'bg-white/5 text-gray-400 border-transparent hover:border-white/20'}`}
                  >
                    {v.icon}
                    <span className="text-[10px] mt-1 font-bold">{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-saffron to-orange-600 text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,153,51,0.3)]"
            >
              Mint Yatra Card <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">Skip for now</button>
      </div>
    </div>
  );
};

export default AuthModal;