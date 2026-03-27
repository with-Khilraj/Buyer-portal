import React from 'react';
import { Heart, MapPin } from 'lucide-react';

const PropertyCard = React.memo(({ property, isFavourite, onToggleFavourite }) => {
    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                    src={property.image || `https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop`} 
                    alt={property.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button 
                    onClick={() => onToggleFavourite(property._id)}
                    className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all active:scale-95 ${isFavourite ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-white/80 text-primary hover:bg-white shadow-lg'}`}
                >
                    <Heart size={18} fill={isFavourite ? 'currentColor' : 'none'} />
                </button>
                <div className="absolute bottom-4 left-4">
                    <span className="bg-primary/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm backdrop-blur-sm">
                        {property.category}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-lg text-primary leading-tight h-12 line-clamp-2">{property.name}</h3>
                    <div className="flex items-center text-secondary font-bold">
                        <span className="text-[10px] mr-1">Rs.</span>
                        <span className="text-xl tracking-tighter">
                            {property.price >= 10000000 
                                ? `${(property.price / 10000000).toFixed(1)} Cr` 
                                : `${(property.price / 100000).toFixed(1)} L`}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400 mb-6">
                    <MapPin size={14} className="text-secondary/60" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{property.location}</span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mb-6 leading-relaxed italic border-l-2 border-slate-100 pl-4">
                    {property.description}
                </p>

                <button className="w-full py-3 border-2 border-primary text-primary font-bold text-[10px] uppercase tracking-[0.2em] rounded hover:bg-primary hover:text-white transition-all">
                    View Details
                </button>
            </div>
        </div>
    );
});

export default PropertyCard;
