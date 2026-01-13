import React from 'react';
import { BookOpen, Scale, LogIn, Menu, UserCircle } from 'lucide-react';

interface MobileNavProps {
  onLoginClick?: () => void;
  user?: { name: string; email: string; photoUrl?: string } | null;
}

const MobileNav: React.FC<MobileNavProps> = ({ onLoginClick, user }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 1);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-blue-950 text-white border-t border-blue-900 flex justify-around items-center p-4 z-50 shadow-[0_-4px_20px_-1px_rgba(0,0,0,0.2)]">
      <button className="flex flex-col items-center space-y-1 text-amber-400">
        <BookOpen size={20} />
        <span className="text-[10px] uppercase tracking-wider font-bold">Policy</span>
      </button>
      <button className="flex flex-col items-center space-y-1 text-blue-200 hover:text-white transition-colors">
        <Scale size={20} />
        <span className="text-[10px] uppercase tracking-wider font-bold">Law</span>
      </button>
      
      {!user ? (
        <button 
          onClick={onLoginClick}
          className="flex flex-col items-center space-y-1 text-blue-200 hover:text-white transition-colors"
        >
          <LogIn size={20} />
          <span className="text-[10px] uppercase tracking-wider font-bold">Login</span>
        </button>
      ) : (
        <button className="flex flex-col items-center space-y-1 text-amber-400">
          {user.photoUrl ? (
             <img src={user.photoUrl} alt="" className="w-5 h-5 rounded-full ring-1 ring-amber-400" />
          ) : (
             <div className="w-5 h-5 rounded-full bg-amber-400 text-blue-950 flex items-center justify-center font-bold text-[10px]">
               {getInitials(user.name)}
             </div>
          )}
          <span className="text-[10px] uppercase tracking-wider font-bold truncate max-w-[50px]">{user.name.split(' ')[0]}</span>
        </button>
      )}

      <button className="flex flex-col items-center space-y-1 text-blue-200 hover:text-white transition-colors">
        <Menu size={20} />
        <span className="text-[10px] uppercase tracking-wider font-bold">More</span>
      </button>
    </nav>
  );
};

export default MobileNav;