import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { LayoutDashboard, User, LogOut, Menu, X, Settings, ChevronUp, Search } from 'lucide-react';

const MainLayout = ({ children }) => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const NavItem = ({ icon: Icon, label, to }) => {
        const currentPath = location.pathname + location.search;
        const isActive = currentPath === to;

        return (
            <NavLink 
                to={to}
                className={`flex items-center px-8 py-4 cursor-pointer transition-all whitespace-nowrap overflow-hidden ${isActive ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-primary'}`}
            >
                <div className="shrink-0 flex items-center justify-center w-6">
                    <Icon size={24} />
                </div>
                <span className="ml-6 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">{label}</span>
            </NavLink>
        );
    };

    return (
        <div className="min-h-screen bg-surface flex font-sans">
            {/* Sidebar */}
            <aside className={`group peer fixed inset-y-0 left-0 z-50 w-24 hover:w-72 bg-white border-r border-slate-200 transform transition-all duration-300 ${isSidebarOpen ? 'translate-x-0 !w-72' : '-translate-x-full'} lg:translate-x-0 overflow-hidden`}>
                <div className="h-full flex flex-col justify-between w-72">
                    <div>
                        <div className="p-8 flex items-center h-24 relative overflow-hidden">
                            <h1 className="text-2xl font-serif text-primary italic absolute opacity-100 group-hover:opacity-0 transition-opacity duration-200 shrink-0">ER</h1>
                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap">
                                <h1 className="text-2xl font-serif text-primary italic">Estate Reserve</h1>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">Concierge View</p>
                            </div>
                        </div>

                        <nav className="mt-8">
                            <NavItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
                            <NavItem icon={Search} label="Marketplace" to="/dashboard?view=all" />
                        </nav>
                    </div>

                    <div className="p-4 lg:p-6 border-t border-slate-100 relative whitespace-nowrap" ref={menuRef}>
                        {/* Drop-up Menu */}
                        {isUserMenuOpen && (
                            <div className="absolute bottom-full left-4 right-4 mb-4 bg-white border border-slate-200 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                <div className="p-2">
                                    <button 
                                        onClick={() => {
                                            navigate('/dashboard?view=profile');
                                            setIsUserMenuOpen(false);
                                            setIsSidebarOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary rounded-xl transition-colors"
                                    >
                                        <User size={18} />
                                        Profile
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setIsUserMenuOpen(false);
                                            setIsSidebarOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary rounded-xl transition-colors"
                                    >
                                        <Settings size={18} />
                                        Settings & Privacy
                                    </button>
                                </div>
                                <div className="border-t border-slate-100 p-2">
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* User Profile Button */}
                        <button 
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className={`w-full flex items-center p-2 rounded-2xl transition-colors ${isUserMenuOpen ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                        >
                            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-serif text-xl border-2 border-secondary/20 shrink-0 mx-auto group-hover:mx-0 transition-all duration-300">
                                {user?.name?.charAt(0)}
                            </div>
                            <div className="flex items-center justify-between w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4 overflow-hidden">
                                <div className="text-left overflow-hidden">
                                    <p className="text-sm font-bold text-primary transition-colors truncate">{user?.name}</p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-tight truncate">{user?.role}</p>
                                </div>
                                <ChevronUp 
                                    size={18} 
                                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-40 px-6 py-4 flex justify-between items-center">
                <h1 className="font-serif text-primary italic text-xl">Estate Reserve</h1>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-primary">
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 lg:ml-24 peer-hover:lg:ml-72 transition-all duration-300 p-6 lg:p-12 mt-16 lg:mt-0">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
