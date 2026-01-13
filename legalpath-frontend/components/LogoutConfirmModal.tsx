import React from 'react';
import { X, LogOut, AlertCircle } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative">
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
            <AlertCircle size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign Out?</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Are you sure you want to sign out of your LegalPath account?
          </p>

          <div className="flex flex-col space-y-3">
            <button
              onClick={onConfirm}
              className="w-full py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <LogOut size={20} />
              <span>Confirm Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 active:scale-[0.98] transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;