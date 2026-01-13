import React from 'react';
import { LogIn, X } from 'lucide-react';

interface LoginPromptPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginClick: () => void;
    featureName: string;
}

const LoginPromptPopup: React.FC<LoginPromptPopupProps> = ({
    isOpen,
    onClose,
    onLoginClick,
    featureName
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogIn className="text-amber-600" size={32} />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                        Login Required
                    </h2>

                    <p className="text-slate-600 mb-6">
                        To use <span className="font-semibold text-blue-950">{featureName}</span>, you need to log in to your account.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                onClose();
                                onLoginClick();
                            }}
                            className="w-full py-4 bg-blue-950 text-white font-bold rounded-xl shadow-lg shadow-blue-950/20 hover:bg-blue-900 active:scale-[0.98] transition-all"
                        >
                            Login Now
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full py-4 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPromptPopup;
