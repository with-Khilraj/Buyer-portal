import React from 'react';
import MainLayout from '../../../layouts/MainLayout';
import PropertyCard from '../../../components/PropertyCard';
import { Loader2, Heart, Search } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';

const Dashboard = () => {
    const {
        view,
        searchTerm,
        setSearchTerm,
        filteredProperties,
        favourites,
        favouritesCount,
        loading,
        error,
        navigateToFavourites,
        toggleFavourite
    } = useDashboard();

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-4xl font-serif text-primary italic mb-2">The Collection</h2>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em]">Exquisite properties curated for your legacy</p>
                    </div>

                    {/* Top Actions: Search & Saved Toggle */}
                    <div className="flex items-center gap-4 self-start">
                        {/* Global Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            <input 
                                type="text"
                                placeholder="Search properties..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                            />
                        </div>

                        {/* Saved Button */}
                        <button 
                            onClick={navigateToFavourites}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all text-xs font-bold uppercase tracking-widest border border-slate-200 shadow-sm hover:shadow-md ${view === 'favourites' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-slate-500 hover:text-red-500 hover:border-red-200'}`}
                        >
                            <Heart size={16} fill={view === 'favourites' ? 'white' : 'none'} className={view === 'favourites' ? 'text-white' : ''} />
                            Saved ({favouritesCount})
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-400">
                        <Loader2 className="animate-spin" size={48} />
                        <p className="font-serif italic text-lg translate-y-2 animate-pulse">Consulting the archives...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-100 p-8 rounded-xl text-center">
                        <p className="text-red-600 font-bold uppercase tracking-widest text-sm">{error}</p>
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="h-96 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-slate-100 p-12 text-center group">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Search size={32} className="text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-serif text-primary mb-2 italic">Nothing found in {view === 'all' ? 'Marketplace' : 'Favourites'}</h3>
                        <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                            Fine architecture is a rarity. {view === 'favourites' ? "Begin your curation by liking properties in the marketplace." : "Our curators are securing new listings soon."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        {filteredProperties.map(property => (
                            <PropertyCard 
                                key={property._id} 
                                property={property} 
                                isFavourite={favourites.includes(property._id)}
                                onToggleFavourite={toggleFavourite}
                            />
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Dashboard;
