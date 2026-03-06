import React from "react";
import { Search, Mic, User } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";

interface SmartSearchBarProps {
  searchTerm?: string;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userProfile?: any;
  onJoinClick?: () => void;
  onDashboardClick?: () => void;
}

const SmartSearchBar: React.FC<SmartSearchBarProps> = ({
  searchTerm = "",
  onSearch,
  userProfile,
  onJoinClick,
  onDashboardClick
}) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
      <div className="relative group">

        <div className="absolute -inset-0.5 bg-gradient-to-r from-saffron via-white to-indigo rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

        <div className="relative flex items-center h-11 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">

          <Search className="ml-4 text-saffron" size={18} />

          <input
            type="text"
            placeholder="Search a country, a vibe..."
            className="w-full bg-transparent text-white px-4 py-2 focus:outline-none font-sans text-sm placeholder-gray-400"
            value={searchTerm}
            onChange={onSearch}
          />

          <button className="p-2 hover:bg-white/10 rounded-full transition-colors mx-1">
            <Mic size={16} className="text-gray-400 group-hover:text-white" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1"></div>

          <button
            onClick={() => userProfile ? onDashboardClick?.() : onJoinClick?.()}
            className="px-3 py-1 flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
          >
            {userProfile ? (
              <ProfileAvatar />
            ) : (
              <>
                <User size={14} /> Join
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default SmartSearchBar;
