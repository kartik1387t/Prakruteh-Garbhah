import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, X, MessageSquare, Bot, MapPin, Loader } from 'lucide-react';
import { UserProfile, VibeType } from '../types';

interface BharatAIGuideProps {
  user: UserProfile | null;
  currentContext?: {
    district?: string;
    state?: string;
    vibe?: VibeType;
  };
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const BharatAIGuide: React.FC<BharatAIGuideProps> = ({ user, currentContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', sender: 'ai', text: 'Namaste! I am your Bharat AI Guide. Ask me about hidden gems, food, or travel plans.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Initialize Gemini
      // Fix: Use process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct System Instruction with Context
      let contextStr = `You are a knowledgeable and spiritual travel guide for India (Bharat). 
      Your tone is warm, respectful (Atithi Devo Bhava), and insightful.
      Do not give generic advice. Be specific to the location context provided.`;
      
      if (user) {
        contextStr += ` The user's name is ${user.name}. They prefer a "${user.vibe}" vibe.`;
      }
      if (currentContext?.district) {
        contextStr += ` The user is currently exploring ${currentContext.district}, ${currentContext.state}. Focus answers on this region.`;
      }

      // Using the specific model for basic text tasks as per guidelines
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: contextStr,
        },
      });

      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: response.text || "I apologize, the spirits are quiet right now. Please try again." 
      };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error("AI Guide Error:", error);
      // Fallback for demo if API key fails
      const fallbackMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: "I am currently meditating (API Limit/Error). But I suggest visiting the local temple at sunrise!" 
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-8 z-[90] p-4 rounded-full shadow-[0_0_20px_rgba(19,136,8,0.5)] transition-all duration-300 hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-cosmos border border-white/20' : 'bg-gradient-to-r from-indigo-600 to-green-600 text-white'}`}
      >
        {isOpen ? <X size={24} className="text-gray-400" /> : <Bot size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-8 z-[90] w-80 md:w-96 h-[500px] bg-cosmos/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-in-right">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-900/50 to-cosmos border-b border-white/10 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-full border border-indigo-500/50">
               <Sparkles size={18} className="text-indigo-400" />
            </div>
            <div>
               <h3 className="font-serif text-white font-bold">Bharat AI Guide</h3>
               <p className="text-[10px] text-gray-400 flex items-center gap-1">
                  {currentContext?.district ? <><MapPin size={8} /> Exploring {currentContext.district}</> : 'Ask me anything'}
               </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-saffron text-black rounded-tr-none font-medium' 
                      : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-xl rounded-tl-none flex items-center gap-2">
                     <Loader size={14} className="animate-spin text-saffron" />
                     <span className="text-xs text-gray-500">Consulting the ancient scrolls...</span>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 bg-cosmos-light">
             <div className="flex items-center gap-2 bg-black/40 rounded-full border border-white/10 px-4 py-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask for tips, routes, or food..."
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-500"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className={`text-saffron hover:text-white transition-colors ${isLoading ? 'opacity-50' : ''}`}
                >
                   <Send size={18} />
                </button>
             </div>
          </div>

        </div>
      )}
    </>
  );
};

export default BharatAIGuide;