import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 cursor-pointer 
                 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 hover:border-amber-200 
                 transition-all duration-300 ease-in-out group flex flex-col h-full relative overflow-hidden"
    >
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-10 -translate-y-10" />

      <div className="flex items-start justify-between mb-6 z-10">
        <div className="p-4 bg-blue-50 text-blue-900 rounded-2xl group-hover:bg-blue-950 group-hover:text-amber-400 transition-colors duration-300 shadow-sm">
          {icon}
        </div>
        <div className="p-2 bg-slate-50 rounded-full group-hover:bg-amber-100 transition-colors">
             <ArrowRight size={20} className="text-slate-400 group-hover:text-amber-600 transform group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
      
      <div className="z-10 flex-1">
        <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-900 transition-colors">
            {title}
        </h3>
        <p className="text-slate-500 leading-relaxed font-medium">
            {description}
        </p>
      </div>

      <div className="mt-8 z-10">
          <button className="w-full py-3 px-4 bg-slate-50 text-slate-600 font-semibold rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Explore Now</span>
          </button>
      </div>
    </div>
  );
};

export default FeatureCard;