import React, { useState } from 'react';
import { User, Mail, Sparkles, Waves, PawPrint, Tent, ArrowRight, Loader, AlertCircle } from 'lucide-react';
import { VibeType } from '../types';
import { useAuth } from '../src/context/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { sendMagicLink } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vibe, setVibe] = useState<VibeType>('nature');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      await sendMagicLink(email);
      alert('Check your email to complete your Yatra ✨');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cosmos border border-white/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative animate-fade-in">
        
        <div className="bg-gradient-to-r from-saffron to-red-600 h-2"></div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-white mb-2">Join the Yatra</h2>
            <p className="text-gray-400 text-sm">
              Enter your email to receive a secure magic login link.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded flex items-center gap-2 text-red-200 text-xs">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Full Name (optional)"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-saffron"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-saffron"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-gray-400 uppercase font-bold tracking-widest block">
                Select Your Vibe
              </label>
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
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-300 ${
                      vibe === v.id
                        ? 'bg-saffron text-black border-saffron'
                        : 'bg-white/5 text-gray-400 border-transparent hover:border-white/20'
                    }`}
                  >
                    {v.icon}
                    <span className="text-[10px] mt-1 font-bold">{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-saffron to-orange-600 text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                <>
                  Send Magic Link <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
