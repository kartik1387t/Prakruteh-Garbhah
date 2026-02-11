import React, { useState } from 'react';
import { X, Volume2, BookOpen, MessageCircle, Languages, Mic } from 'lucide-react';
import { LanguageProfile, Phrase } from '../types';

interface LanguageCardProps {
  language: LanguageProfile;
  districtName: string;
  onClose: () => void;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language, districtName, onClose }) => {
  const [activeTab, setActiveTab] = useState<'phrases' | 'translate'>('phrases');
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTranslate = () => {
     if (!inputText) return;
     setIsTranslating(true);
     // Simulate API Call for translation
     setTimeout(() => {
        setTranslation(`[In ${language.name}]: ${inputText} (Simulated Translation)`);
        setIsTranslating(false);
     }, 1000);
  };

  const PhraseRow = ({ label, phrase }: { label: string, phrase: Phrase }) => (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-saffron/30 transition-colors group">
      <div>
         <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">{label}</div>
         <div className="text-lg text-white font-serif">{phrase.original}</div>
         <div className="text-xs text-saffron italic">{phrase.pronunciation}</div>
      </div>
      <button 
        onClick={() => playAudio(phrase.original)}
        className="p-2 rounded-full bg-black/40 text-gray-400 group-hover:text-white transition-colors"
      >
         <Volume2 size={16} />
      </button>
    </div>
  );

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-cosmos border border-white/20 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden relative flex flex-col h-[500px]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-cosmos p-6 relative flex-shrink-0">
           <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={20} />
           </button>
           <div className="flex items-start gap-3 mb-2">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
                 <MessageCircle className="text-saffron" size={24} />
              </div>
              <div>
                 <h2 className="text-white font-serif text-xl">Linguistic Soul</h2>
                 <p className="text-xs text-gray-300">Spoken in {districtName}</p>
              </div>
           </div>
           
           <div className="flex mt-4 bg-black/30 rounded p-1">
              <button 
                onClick={() => setActiveTab('phrases')}
                className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === 'phrases' ? 'bg-white text-black' : 'text-gray-400'}`}
              >
                 Key Phrases
              </button>
              <button 
                onClick={() => setActiveTab('translate')}
                className={`flex-1 py-2 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1 ${activeTab === 'translate' ? 'bg-white text-black' : 'text-gray-400'}`}
              >
                 <Languages size={12} /> Translate
              </button>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0F172A]">
           
           {activeTab === 'phrases' && (
              <>
                 <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-2 mt-2">Script: {language.scriptName}</div>
                 <div className="p-4 bg-white/5 rounded border border-white/10 text-center mb-4">
                    <span className="text-3xl text-white">{language.scriptSample}</span>
                 </div>
                 
                 <PhraseRow label="Greetings" phrase={language.hello} />
                 <PhraseRow label="Bargaining" phrase={language.cost} />
                 <PhraseRow label="Emergency" phrase={language.help} />
                 <PhraseRow label="Gratitude" phrase={language.thankYou} />
              </>
           )}

           {activeTab === 'translate' && (
              <div className="space-y-4 pt-2">
                 <div className="relative">
                    <textarea 
                       placeholder="Type English text here (e.g. 'Is this safe?')..."
                       className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-saffron h-24"
                       value={inputText}
                       onChange={(e) => setInputText(e.target.value)}
                    />
                    <button className="absolute bottom-3 right-3 text-gray-400 hover:text-white">
                       <Mic size={16} />
                    </button>
                 </div>
                 
                 <button 
                    onClick={handleTranslate}
                    disabled={isTranslating}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase text-xs tracking-widest rounded transition-colors"
                 >
                    {isTranslating ? 'Translating...' : 'Translate to Local'}
                 </button>

                 {translation && (
                    <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg animate-fade-in">
                       <p className="text-green-200 text-sm font-medium">{translation}</p>
                       <div className="flex justify-end mt-2">
                          <button onClick={() => playAudio(translation)} className="text-green-400 hover:text-white">
                             <Volume2 size={16} />
                          </button>
                       </div>
                    </div>
                 )}
                 
                 <div className="text-[10px] text-gray-500 text-center mt-4">
                    Powered by Bhashini AI (Mock)
                 </div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default LanguageCard;