import React, { useState } from 'react';
import { LifeBuoy, Phone, Mail, MapPin, X, ShieldAlert } from 'lucide-react';
import { SAFETY_CONTACTS } from '../constants';

const SafetyDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Persistent Floating Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-32 z-[60] group flex items-center justify-center transition-all duration-300 hover:scale-105"
        title="Safety & Help"
      >
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg group-hover:bg-red-500 group-hover:border-red-500">
          <LifeBuoy size={20} className="animate-pulse-slow" />
        </div>
        <span className="ml-3 px-3 py-1 bg-black/60 backdrop-blur rounded text-xs font-bold uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block border border-white/10">
          Safety & Help
        </span>
      </button>

      {/* Dashboard Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center md:justify-start md:pl-32 pb-8 md:pb-0 pointer-events-none">
          <div className="bg-cosmos border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-4 md:mx-0 shadow-2xl pointer-events-auto animate-fade-in relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <ShieldAlert size={120} />
            </div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="text-white font-serif text-xl">Atithi Devo Bhava</h3>
                <p className="text-saffron text-xs uppercase tracking-widest font-bold">24/7 Tourist Assistance</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 relative z-10">
              
              {/* Emergency Numbers */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-lg text-center hover:bg-red-900/30 transition-colors">
                  <div className="text-red-400 text-xs uppercase font-bold mb-1">Emergency</div>
                  <a href={`tel:${SAFETY_CONTACTS.emergency}`} className="text-2xl text-white font-mono font-bold block">{SAFETY_CONTACTS.emergency}</a>
                  <span className="text-[10px] text-gray-400">Police, Fire, Ambulance</span>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg text-center hover:bg-blue-900/30 transition-colors">
                  <div className="text-blue-400 text-xs uppercase font-bold mb-1">Tourist Helpline</div>
                  <a href={`tel:${SAFETY_CONTACTS.touristHelpline.replace(/-/g,'')}`} className="text-sm text-white font-mono font-bold block py-1.5">{SAFETY_CONTACTS.touristHelpline}</a>
                  <span className="text-[10px] text-gray-400">Multi-lingual Support</span>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white/5 rounded-lg p-4 space-y-3">
                 <div className="flex items-center gap-3 text-sm text-gray-300 hover:text-saffron transition-colors cursor-pointer">
                    <div className="p-2 bg-white/5 rounded-full"><Phone size={14} className="text-pink-400" /></div>
                    <div>
                       <div className="font-bold text-white">Women's Helpline</div>
                       <div className="font-mono text-xs">{SAFETY_CONTACTS.womenHelpline}</div>
                    </div>
                 </div>
                 <div className="w-full h-px bg-white/10"></div>
                 <a href={`mailto:${SAFETY_CONTACTS.tourismEmail}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-saffron transition-colors">
                    <div className="p-2 bg-white/5 rounded-full"><Mail size={14} className="text-yellow-400" /></div>
                    <div>
                       <div className="font-bold text-white">Ministry Complaint Desk</div>
                       <div className="font-mono text-xs">{SAFETY_CONTACTS.tourismEmail}</div>
                    </div>
                 </a>
                 <div className="w-full h-px bg-white/10"></div>
                 <div className="flex items-center gap-3 text-sm text-gray-300 hover:text-saffron transition-colors cursor-pointer">
                    <div className="p-2 bg-white/5 rounded-full"><MapPin size={14} className="text-green-400" /></div>
                    <div>
                       <div className="font-bold text-white">Find Nearest Office</div>
                       <div className="text-[10px]">Locate Incredible India offices</div>
                    </div>
                 </div>
              </div>

              <div className="bg-green-900/20 border border-green-500/20 p-3 rounded text-[10px] text-green-200 text-center leading-relaxed">
                 "Bharat welcomes you. We are here to ensure your journey is safe, secure, and spiritually fulfilling."
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SafetyDashboard;