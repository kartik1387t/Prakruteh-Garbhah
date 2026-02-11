import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { VibeType } from '../types';

interface AuthModalProps {
  onLogin: (profile: any) => void; // Legacy prop for compatibility, can be phased out
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onClose }) => {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        // Usually Supabase requires email verification, inform user
        alert('Check your email for confirmation link!');
        onClose();
      } else {
        const { user } = await signIn(email, password);
        if (user) {
           // Provide a mock profile temporarily if profile fetch lags, or rely on context update
           onLogin({ email: user.email, name: user.user_metadata?.full_name || 'Traveler' });
           onClose();
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cosmos border border-white/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative animate-fade-in">
        
        {/* Decorative Header */}
        <div className="bg-gradient-to-r from-saffron to-red-600 h-2"></div>
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-white mb-2">{isSignUp ? 'Begin Yatra' : 'Welcome Back'}</h2>
            <p className="text-gray-400 text-sm">
              {isSignUp ? 'Create your digital identity.' : 'Access your dashboard and plans.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded flex items-center gap-2 text-red-200 text-xs">
               <AlertCircle size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="relative group">
                <User className="absolute left-3 top-3 text-gray-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-saffron"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="relative group">
              <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-saffron"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-saffron"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-saffron to-orange-600 text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? <Loader className="animate-spin" size={18} /> : (isSignUp ? 'Mint Identity' : 'Unlock Vault')}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 text-center">
             <button 
               onClick={() => setIsSignUp(!isSignUp)}
               className="text-xs text-gray-400 hover:text-white underline"
             >
                {isSignUp ? 'Already have a pass? Login' : 'New Traveler? Join Here'}
             </button>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">Skip</button>
      </div>
    </div>
  );
};

export default AuthModal;