import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-12 border-t border-blue-900 bg-blue-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-2xl tracking-tight">LegalPath</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Empowering citizens with AI-driven policy insights and accessible legal clarity.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 text-sm">
            <div className="flex flex-col space-y-3">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">Resources</h4>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">Policy Guide</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">Legal FAQ</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">Documentation</a>
            </div>
            <div className="flex flex-col space-y-3">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">Company</h4>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">About Us</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">Careers</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">Contact</a>
            </div>
            <div className="flex flex-col space-y-3">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">Legal</h4>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">Terms of Use</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LegalPath Inc. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;