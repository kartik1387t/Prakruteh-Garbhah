import React, { useState } from 'react';
import { useAuth } from '../src/context/AuthContext';
import { Mail, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { sendMagicLink } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      await sendMagicLink(email);
      alert("Magic link sent! Check your email.");
      onClose();
    } catch (error: any) {
      alert(error.message || "Something went wrong");
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
              Enter your email to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-saffron to-orange-600 text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
