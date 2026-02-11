import React from 'react';
import { ThumbsUp, MapPin, ShieldCheck, BadgeCheck, Star, AlertCircle, Quote } from 'lucide-react';
import { ExperiencePost } from '../types';

interface ExperienceCardProps {
  post: ExperiencePost;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ post }) => {
  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'Desi Explorer': return <Star size={12} className="text-yellow-400" />;
      case 'Local Legend': return <BadgeCheck size={12} className="text-blue-400" />;
      case 'Pathbreaker': return <MapPin size={12} className="text-green-400" />;
      case 'Local Guru': return <ShieldCheck size={12} className="text-saffron" />;
      default: return null;
    }
  };

  const getBorderColor = () => {
    switch (post.type) {
      case 'do': return 'border-green-500/50';
      case 'dont': return 'border-red-500/50';
      case 'mirror_compare': return 'border-indigo-500/50';
      case 'tip': return 'border-yellow-500/50';
      case 'safety': return 'border-blue-500/50';
      default: return 'border-white/10';
    }
  };

  const getTypeLabel = () => {
    switch (post.type) {
      case 'do': return { label: '✅ Do This', color: 'text-green-400' };
      case 'dont': return { label: '❌ Avoid This', color: 'text-red-400' };
      case 'mirror_compare': return { label: '🌍 Mirror Reality', color: 'text-indigo-400' };
      case 'tip': return { label: '💡 Pro Tip', color: 'text-yellow-400' };
      case 'safety': return { label: '🛡️ Safety Check', color: 'text-blue-400' };
      default: return { label: 'Story', color: 'text-gray-400' };
    }
  };

  const typeInfo = getTypeLabel();

  return (
    <div className={`bg-[#1a150e]/80 backdrop-blur-sm border ${getBorderColor()} rounded-xl p-4 transition-all hover:translate-y-[-2px] hover:shadow-lg relative overflow-hidden group`}>
      
      {/* Background Gradient based on type */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${post.type === 'do' ? 'from-green-500/10' : post.type === 'dont' ? 'from-red-500/10' : 'from-indigo-500/10'} to-transparent rounded-bl-full pointer-events-none`}></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center font-serif text-xs text-white">
              {post.userName.charAt(0)}
           </div>
           <div>
              <p className="text-xs font-bold text-white flex items-center gap-1">
                 {post.userName}
                 {post.userBadge !== 'None' && (
                    <span className="bg-white/10 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider flex items-center gap-1 border border-white/5">
                       {getBadgeIcon(post.userBadge)} {post.userBadge}
                    </span>
                 )}
              </p>
              <p className="text-[10px] text-gray-500">{post.timestamp} • {post.locationName}</p>
           </div>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest border border-white/10 px-2 py-1 rounded bg-black/20 ${typeInfo.color}`}>
           {typeInfo.label}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4 relative">
         {post.type === 'mirror_compare' && <Quote size={16} className="absolute -left-2 -top-2 text-indigo-500/20" />}
         <p className="text-sm text-gray-300 leading-relaxed pl-1">
            {post.content}
         </p>
      </div>

      {/* Footer / Actions */}
      <div className="flex justify-between items-center border-t border-white/5 pt-3">
         <div className="flex gap-2">
            <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-saffron transition-colors">
               <ThumbsUp size={12} /> Helpful ({post.helpfulCount})
            </button>
         </div>
         {post.relatedPlaceId && (
            <button className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wide flex items-center gap-1 animate-pulse">
               Visit Nearby <MapPin size={10} />
            </button>
         )}
      </div>
    </div>
  );
};

export default ExperienceCard;