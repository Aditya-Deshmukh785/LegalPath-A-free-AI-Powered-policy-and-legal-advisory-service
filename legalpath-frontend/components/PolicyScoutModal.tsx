import React, { useState } from 'react';
import { X, Search, GraduationCap, Building2, Sparkles, Scale, Shield } from 'lucide-react';

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
        <div className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-in fade-in duration-500">
            {/* Decorative Legal Pattern Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Main Container */}
            <div className="relative h-full overflow-y-auto">
                {/* Header Section */}
                <div className="border-b border-amber-900/30 bg-gradient-to-r from-slate-900 to-slate-800 sticky top-0 z-50 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg shadow-lg shadow-amber-900/50">
                                <Scale className="text-white" size={28} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-serif font-bold text-amber-500 tracking-wide">
                                    Policy Scout
                                </h1>
                                <p className="text-slate-400 text-sm font-medium">Government Schemes & Benefits Portal</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-300"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-6xl mx-auto px-8 py-12">
                    {/* Official Notice Banner */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-amber-900/20 to-amber-800/10 border-l-4 border-amber-600 rounded-r-lg">
                        <div className="flex items-start space-x-3">
                            <Shield className="text-amber-500 mt-1 flex-shrink-0" size={20} />
                            <div>
                                <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-1">Official Portal</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    This platform provides access to verified government schemes and policies. All information is sourced from official government databases.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Form Inputs */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Sector Selection */}
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl">
                                <label className="block text-amber-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center space-x-2">
                                    <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
                                    <span>Sector Classification</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedSector}
                                        onChange={(e) => setSelectedSector(e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-900/80 border-2 border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all appearance-none cursor-pointer font-semibold text-lg"
                                    >
                                        <option value="education">Education Sector</option>
                                        {/* More sectors can be added here in the future */}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* User Type Selection */}
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl">
                                <label className="block text-amber-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center space-x-2">
                                    <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
                                    <span>Applicant Category</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {userTypes.map((type) => {
                                        const Icon = type.icon;
                                        const isSelected = selectedUserType === type.id;

                                        return (
                                            <button
                                                key={type.id}
                                                onClick={() => setSelectedUserType(type.id as UserType)}
                                                className={`p-5 rounded-lg border-2 transition-all duration-300 text-left group ${isSelected
                                                        ? 'border-amber-500 bg-gradient-to-br from-amber-900/40 to-amber-800/20 shadow-lg shadow-amber-900/30'
                                                        : 'border-slate-600 bg-slate-900/50 hover:border-amber-600/50 hover:bg-slate-800/50'
                                                    }`}
                                            >
                                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 transition-all ${isSelected ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                                                    }`}>
                                                    <Icon size={24} />
                                                </div>
                                                <h3 className={`font-bold mb-1 text-base ${isSelected ? 'text-amber-400' : 'text-slate-200'
                                                    }`}>
                                                    {type.label}
                                                </h3>
                                                <p className="text-xs text-slate-400 leading-relaxed">{type.description}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Query Input */}
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl">
                                <label className="block text-amber-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center space-x-2">
                                    <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
                                    <span>Detailed Query</span>
                                </label>
                                <textarea
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Please provide detailed information about your current situation, educational background, financial status, and specific requirements. Example: 'I am a final year B.Tech student from a rural area with family income below 3 lakhs per annum, seeking scholarship opportunities for higher education...'"
                                    rows={6}
                                    className="w-full px-5 py-4 bg-slate-900/80 border-2 border-slate-600 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none font-medium leading-relaxed"
                                />
                                <p className="text-xs text-slate-400 mt-3 flex items-start space-x-2">
                                    <span className="text-amber-500 mt-0.5">•</span>
                                    <span>Provide comprehensive details to receive the most accurate policy recommendations</span>
                                </p>
                            </div>

                            {/* Scout Button */}
                            <button
                                onClick={handleScout}
                                disabled={loading || !selectedUserType || !query.trim()}
                                className="w-full py-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-lg rounded-lg shadow-xl shadow-amber-900/50 hover:from-amber-500 hover:to-amber-600 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 border-2 border-amber-500/30"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Processing Your Request...</span>
                                    </>
                                ) : (
                                    <>
                                        <Search size={24} />
                                        <span>Initiate Policy Search</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Right Column - Information Panel */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl">
                                <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-4 flex items-center space-x-2">
                                    <Shield size={16} />
                                    <span>How It Works</span>
                                </h3>
                                <ol className="space-y-3 text-slate-300 text-sm">
                                    <li className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                        <span>Select your sector and applicant category</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                        <span>Provide detailed information about your situation</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                        <span>Our AI analyzes government databases</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                        <span>Receive personalized policy recommendations</span>
                                    </li>
                                </ol>
                            </div>

                            <div className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 backdrop-blur-sm border border-amber-700/30 rounded-xl p-6 shadow-xl">
                                <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3">Important Notice</h3>
                                <p className="text-slate-300 text-xs leading-relaxed">
                                    All recommendations are based on official government policy documents. Please verify eligibility criteria on respective official portals before applying.
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
