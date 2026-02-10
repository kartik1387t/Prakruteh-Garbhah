import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioOrbProps {
  isMuted: boolean;
  onToggle: () => void;
  primaryColor: string;
}

const AudioOrb: React.FC<AudioOrbProps> = ({ isMuted, onToggle, primaryColor }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] group">
      <button 
        onClick={onToggle}
        className="w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 border"
        style={{ 
          backgroundColor: `${primaryColor}20`, // 20% opacity
          borderColor: `${primaryColor}60`, 
          boxShadow: isMuted ? 'none' : `0 0 20px ${primaryColor}40`
        }}
        title={isMuted ? "Unmute Cosmic Sound" : "Mute Soundscape"}
      >
        {isMuted ? (
          <VolumeX size={20} className="text-gray-400" />
        ) : (
          <div className="relative">
             <Volume2 size={20} style={{ color: primaryColor }} />
             <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: primaryColor }}></div>
          </div>
        )}
      </button>

      {/* Visual Equalizer Effect (Simulated) */}
      {!isMuted && (
        <div className="absolute bottom-14 right-3 flex items-end gap-1 h-8">
           {[...Array(4)].map((_, i) => (
             <div 
                key={i} 
                className="w-1 bg-white/50 rounded-full animate-pulse"
                style={{ 
                   height: `${Math.random() * 100}%`,
                   animationDuration: `${0.5 + Math.random()}s`,
                   backgroundColor: primaryColor
                }}
             ></div>
           ))}
        </div>
      )}
    </div>
  );
};

export default AudioOrb;