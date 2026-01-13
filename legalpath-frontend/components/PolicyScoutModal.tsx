import React, { useState } from 'react';
import { X, Search, GraduationCap, Building2, Sparkles, Scale, Shield, Info } from 'lucide-react';

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
        { id: 'student', label: 'Student', icon: GraduationCap, description: 'Scholarships & Educational Benefits' },
        { id: 'researcher', label: 'Researcher', icon: Sparkles, description: 'Research Grants & Fellowships' },
        { id: 'institution', label: 'Institution', icon: Building2, description: 'Institutional Funding & Schemes' }
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-100 via-slate-50 to-stone-100 animate-in fade-in duration-500">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Main Container */}
            <div className="relative h-full overflow-y-auto">
                {/* Header Section */}
                <div className="border-b border-slate-200/60 bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
                    <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-md">
                                <Scale className="text-amber-400" size={26} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    Policy Scout
                                </h1>
                                <p className="text-slate-500 text-sm font-medium">Discover Government Schemes & Benefits</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
                        >
                            <X size={22} />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-6xl mx-auto px-8 py-10">
                    {/* Info Banner */}
                    <div className="mb-8 p-5 bg-slate-700/5 border border-slate-200/50 rounded-xl">
                        <div className="flex items-start space-x-3">
                            <Info className="text-slate-600 mt-0.5 flex-shrink-0" size={20} />
                            <div>
                                <h3 className="text-slate-700 font-semibold text-sm mb-1">Verified Information</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    All schemes and policies are sourced from official government databases and verified for accuracy.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Form Inputs */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Sector Selection */}
                            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <label className="block text-slate-700 font-semibold text-sm mb-3 flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                                    <span>Sector</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedSector}
                                        onChange={(e) => setSelectedSector(e.target.value)}
                                        className="w-full px-4 py-3.5 bg-slate-50/80 border border-slate-200 text-slate-800 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none transition-all appearance-none cursor-pointer font-medium"
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
                            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <label className="block text-slate-700 font-semibold text-sm mb-4 flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                                    <span>I am a</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {userTypes.map((type) => {
                                        const Icon = type.icon;
                                        const isSelected = selectedUserType === type.id;

                                        return (
                                            <button
                                                key={type.id}
                                                onClick={() => setSelectedUserType(type.id as UserType)}
                                                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left group ${isSelected
                                                        ? 'border-slate-400 bg-slate-100/80 shadow-md'
                                                        : 'border-slate-200/60 bg-white/50 hover:border-slate-300 hover:bg-slate-50/80'
                                                    }`}
                                            >
                                                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-lg mb-3 transition-all ${isSelected ? 'bg-slate-700 text-amber-400' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-700'
                                                    }`}>
                                                    <Icon size={22} />
                                                </div>
                                                <h3 className={`font-semibold mb-1 text-sm ${isSelected ? 'text-slate-800' : 'text-slate-700'
                                                    }`}>
                                                    {type.label}
                                                </h3>
                                                <p className="text-xs text-slate-500 leading-relaxed">{type.description}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Query Input */}
                            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <label className="block text-slate-700 font-semibold text-sm mb-3 flex items-center space-x-2">
                                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                                    <span>Your Query</span>
                                </label>
                                <textarea
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Describe your situation in detail. For example: 'I am a final year engineering student from a rural area with family income below 3 lakhs per annum, seeking scholarship opportunities for higher education...'"
                                    rows={6}
                                    className="w-full px-4 py-3.5 bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none transition-all resize-none font-medium leading-relaxed"
                                />
                                <p className="text-xs text-slate-500 mt-2.5 flex items-start space-x-1.5">
                                    <span className="text-slate-600 mt-0.5">•</span>
                                    <span>Be specific about your background, requirements, and goals for better recommendations</span>
                                </p>
                            </div>

                            {/* Scout Button */}
                            <button
                                onClick={handleScout}
                                disabled={loading || !selectedUserType || !query.trim()}
                                className="w-full py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold text-base rounded-lg shadow-lg shadow-slate-400/30 hover:from-slate-800 hover:to-slate-900 hover:shadow-xl hover:shadow-slate-400/40 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center space-x-2.5"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Searching...</span>
                                    </>
                                ) : (
                                    <>
                                        <Search size={20} />
                                        <span>Find Relevant Policies</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Right Column - Information Panel */}
                        <div className="space-y-6">
                            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 shadow-sm">
                                <h3 className="text-slate-800 font-semibold text-sm mb-4 flex items-center space-x-2">
                                    <Shield size={16} className="text-slate-600" />
                                    <span>How It Works</span>
                                </h3>
                                <ol className="space-y-3.5 text-slate-600 text-sm">
                                    <li className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                        <span>Select your sector and category</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                        <span>Describe your situation in detail</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                        <span>AI analyzes government databases</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                        <span>Get personalized recommendations</span>
                                    </li>
                                </ol>
                            </div>

                            <div className="bg-slate-700/5 border border-slate-200/50 rounded-xl p-5 shadow-sm">
                                <h3 className="text-slate-700 font-semibold text-sm mb-2">Important</h3>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Always verify eligibility criteria on official government portals before applying to any scheme.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PolicyScoutModal;
