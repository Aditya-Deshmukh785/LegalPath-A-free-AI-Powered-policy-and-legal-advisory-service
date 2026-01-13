import React, { useImperativeHandle, forwardRef, useRef, useState } from 'react';
import { Search, Scale, Bell, Clock, FileText, ChevronRight } from 'lucide-react';
import FeatureCard from './FeatureCard';
import PolicyScoutModal from './PolicyScoutModal';

export interface HeroSectionHandle {
  highlightCard: (type: 'policy' | 'law') => void;
}

interface HeroSectionProps {
  user?: { name: string; email: string; photoUrl?: string } | null;
  onLoginClick: () => void;
}

const HeroSection = forwardRef<HeroSectionHandle, HeroSectionProps>(({ user, onLoginClick }, ref) => {
  const displayUserName = user ? user.name.split(' ')[0] : "Citizen";
  const policyRef = useRef<HTMLDivElement>(null);
  const lawRef = useRef<HTMLDivElement>(null);
  const [activeHighlight, setActiveHighlight] = useState<'policy' | 'law' | null>(null);
  const [isPolicyScoutOpen, setIsPolicyScoutOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    highlightCard: (type) => {
      setActiveHighlight(type);
      const targetRef = type === 'policy' ? policyRef : lawRef;

      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      setTimeout(() => {
        setActiveHighlight(null);
      }, 3000);
    }
  }));

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 md:py-16 flex flex-col">
      {/* Welcome Header */}
      <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">{displayUserName}</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl">
          Your personalized dashboard for civic empowerment. Track policies, get legal clarity, and stay informed.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div
          ref={policyRef}
          className={`rounded-2xl transition-all duration-500 ${activeHighlight === 'policy' ? 'ring-4 ring-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.6)] scale-[1.02]' : ''}`}
        >
          <FeatureCard
            title="Policy Scout"
            description="Identify government schemes you are eligible for. AI-driven matching for subsidies, grants, and benefits."
            icon={<Search size={32} />}
            onClick={() => {
              if (!user) {
                onLoginClick();
              } else {
                setIsPolicyScoutOpen(true);
              }
            }}
          />
        </div>
        <div
          ref={lawRef}
          className={`rounded-2xl transition-all duration-500 ${activeHighlight === 'law' ? 'ring-4 ring-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.6)] scale-[1.02]' : ''}`}
        >
          <FeatureCard
            title="Personal Lawyer"
            description="Instant legal definitions and guidance. Upload documents for summary or ask complex legal questions."
            icon={<Scale size={32} />}
            onClick={() => {
              if (!user) {
                onLoginClick();
              } else {
                console.log("Personal Lawyer Clicked");
              }
            }}
          />
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 ${user ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Bell className="text-amber-500" size={24} />
              Live Updates
            </h2>
            <button className="text-blue-600 font-semibold hover:text-blue-800 text-sm">View All</button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group flex items-start p-4 rounded-xl hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 cursor-pointer">
                <div className="mt-1 min-w-[40px] h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                  New
                </div>
                <div className="ml-4">
                  <h4 className="text-slate-800 font-semibold group-hover:text-blue-700 transition-colors">
                    Cyber Security Guidelines 2024 Released
                  </h4>
                  <p className="text-slate-500 text-sm mt-1">
                    The ministry has updated the protocols for digital data protection effective immediately...
                  </p>
                </div>
                <ChevronRight className="ml-auto text-slate-300 group-hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100 self-center" />
              </div>
            ))}
          </div>
        </div>

        {user && (
          <div className="flex flex-col space-y-6">
            <div className="bg-blue-950 rounded-2xl p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Scale size={100} />
              </div>
              <h3 className="text-amber-400 font-bold tracking-wider text-sm uppercase mb-2">My Activity</h3>
              <div className="space-y-6 relative z-10">
                <div>
                  <div className="text-4xl font-bold">12</div>
                  <div className="text-blue-200 text-sm">Policies Tracked</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">03</div>
                  <div className="text-blue-200 text-sm">Legal Queries</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button className="w-full py-4 px-6 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 font-semibold hover:border-amber-400 hover:text-amber-600 hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-between group">
                <span className="flex items-center gap-3">
                  <Clock size={20} className="text-slate-400 group-hover:text-amber-500" />
                  History
                </span>
                <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full py-4 px-6 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 font-semibold hover:border-amber-400 hover:text-amber-600 hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-between group">
                <span className="flex items-center gap-3">
                  <FileText size={20} className="text-slate-400 group-hover:text-amber-500" />
                  Saved Documents
                </span>
                <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-0 right-0 -z-10 w-3/4 h-[500px] bg-gradient-to-b from-blue-100/40 to-transparent pointer-events-none rounded-bl-[100px]" />

      {/* Policy Scout Modal */}
      <PolicyScoutModal
        isOpen={isPolicyScoutOpen}
        onClose={() => setIsPolicyScoutOpen(false)}
      />
    </main>
  );
});

export default HeroSection;