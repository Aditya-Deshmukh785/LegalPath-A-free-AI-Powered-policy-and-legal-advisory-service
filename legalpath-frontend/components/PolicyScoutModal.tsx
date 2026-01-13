import React, { useState } from 'react';
import { X, Search, GraduationCap, Users, Building2, Sparkles } from 'lucide-react';

interface PolicyScoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type UserType = 'student' | 'researcher' | 'institution' | null;

const PolicyScoutModal: React.FC<PolicyScoutModalProps> = ({ isOpen, onClose }) => {
    const [selectedSector, setSelectedSector] = useState<string>('education');
    const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleScout = async () => {
        if (!selectedUserType || !query.trim()) {
            alert('Please select a user type and enter your query');
            return;
        }

        setLoading(true);
        // TODO: Implement API call to backend
        console.log({
            sector: selectedSector,
            userType: selectedUserType,
            query: query
        });

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert('Policy Scout feature coming soon!');
        }, 1500);
    };

    const userTypes = [
        { id: 'student', label: 'Student', icon: GraduationCap, description: 'Scholarships & student benefits' },
        { id: 'researcher', label: 'Researcher', icon: Sparkles, description: 'Research grants & fellowships' },
        { id: 'institution', label: 'Institution', icon: Building2, description: 'Institutional funding & schemes' }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10 bg-white rounded-full shadow-sm"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-950 rounded-2xl mb-4">
                            <Search className="text-amber-400" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Policy Scout</h2>
                        <p className="text-slate-500 mt-2">
                            Discover government schemes and benefits tailored for you
                        </p>
                    </div>

                    {/* Sector Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                            Select Sector
                        </label>
                        <div className="relative">
                            <select
                                value={selectedSector}
                                onChange={(e) => setSelectedSector(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all appearance-none cursor-pointer font-medium text-slate-700"
                            >
                                <option value="education">Education</option>
                                {/* More sectors can be added here in the future */}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* User Type Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                            I am a
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {userTypes.map((type) => {
                                const Icon = type.icon;
                                const isSelected = selectedUserType === type.id;

                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => setSelectedUserType(type.id as UserType)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${isSelected
                                                ? 'border-amber-400 bg-amber-50 shadow-lg shadow-amber-400/20'
                                                : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                                            }`}
                                    >
                                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${isSelected ? 'bg-blue-950 text-amber-400' : 'bg-blue-50 text-blue-900'
                                            }`}>
                                            <Icon size={20} />
                                        </div>
                                        <h3 className={`font-bold mb-1 ${isSelected ? 'text-blue-900' : 'text-slate-800'
                                            }`}>
                                            {type.label}
                                        </h3>
                                        <p className="text-xs text-slate-500">{type.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Query Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                            Your Query
                        </label>
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="E.g., I am a final year engineering student looking for scholarship opportunities..."
                            rows={4}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all resize-none font-medium text-slate-700"
                        />
                        <p className="text-xs text-slate-400 mt-2">
                            Be specific about your situation to get the most relevant results
                        </p>
                    </div>

                    {/* Scout Button */}
                    <button
                        onClick={handleScout}
                        disabled={loading || !selectedUserType || !query.trim()}
                        className="w-full py-4 bg-blue-950 text-white font-bold rounded-xl shadow-lg shadow-blue-950/20 hover:bg-blue-900 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Scouting...</span>
                            </>
                        ) : (
                            <>
                                <Search size={20} />
                                <span>Scout Policies</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PolicyScoutModal;
