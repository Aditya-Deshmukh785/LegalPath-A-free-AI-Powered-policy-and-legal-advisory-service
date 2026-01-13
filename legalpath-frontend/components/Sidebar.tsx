import React from 'react';
import { BookOpen, Scale, LogIn, ShieldCheck, LogOut } from 'lucide-react';

interface SidebarProps {
  onNavigate?: (type: 'policy' | 'law') => void;
  onLoginClick?: () => void;
  user?: { name: string; email: string; photoUrl?: string } | null;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, onLoginClick, user, onLogout }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-blue-950 text-white fixed left-0 top-0 shadow-2xl z-50 font-medium">
      {/* Header / Logo Area */}
      <div className="p-6 border-b border-blue-900 flex items-center space-x-3">
        <div className="bg-amber-500 p-2 rounded-lg shadow-lg shadow-amber-500/20">
          <ShieldCheck size={24} className="text-blue-950" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">LegalPath</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-8 space-y-4">
        <button 
          onClick={() => onNavigate?.('policy')}
          className="w-full group flex items-center space-x-3 px-4 py-3 bg-white/5 hover:bg-white/10 text-amber-50 rounded-xl transition-all duration-300 hover:translate-x-1 border border-transparent hover:border-white/10"
        >
          <BookOpen size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Policy</span>
        </button>
        <button 
          onClick={() => onNavigate?.('law')}
          className="w-full group flex items-center space-x-3 px-4 py-3 text-blue-200 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 hover:translate-x-1 border border-transparent hover:border-white/10"
        >
          <Scale size={20} className="group-hover:text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Law</span>
        </button>
      </nav>

      {/* Bottom Action / Profile Area */}
      <div className="p-6 border-t border-blue-900 bg-blue-950">
        {!user ? (
          <button 
            onClick={onLoginClick}
            className="flex items-center justify-center w-full space-x-2 bg-amber-500 hover:bg-amber-400 text-blue-950 py-4 rounded-xl shadow-lg shadow-amber-900/20 active:scale-95 hover:shadow-amber-500/30 transition-all duration-300 font-bold"
          >
            <LogIn size={20} />
            <span>Login</span>
          </button>
        ) : (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
              {user.photoUrl ? (
                <img src={user.photoUrl} alt={user.name} className="w-12 h-12 rounded-lg object-cover ring-2 ring-amber-500" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center text-blue-950 font-bold text-lg ring-2 ring-amber-500/50">
                  {getInitials(user.name)}
                </div>
              )}
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm truncate text-white">{user.name}</p>
                <p className="text-[10px] text-blue-300 truncate uppercase tracking-widest font-bold">Premium Member</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="flex items-center justify-center w-full space-x-2 text-slate-400 hover:text-white transition-colors py-2 text-sm font-bold group"
            >
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;