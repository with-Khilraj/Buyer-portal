import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePropertyStore from '../../../store/usePropertyStore';
import { useDebounce } from '../../../hooks/useDebounce';

export function useDashboard() {
    const { properties, favourites, fetchProperties, fetchFavourites, loading, error, toggleFavourite } = usePropertyStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const view = searchParams.get('view') || 'all';

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);

    useEffect(() => {
        fetchProperties();
        fetchFavourites();
    }, [fetchProperties, fetchFavourites]);

    const filteredProperties = useMemo(() => {
        let items = view === 'all' 
            ? properties 
            : properties.filter(p => favourites.includes(p._id));
            
        if (debouncedSearch) {
            const query = debouncedSearch.toLowerCase();
            items = items.filter(p => 
                p.title?.toLowerCase().includes(query) || 
                p.location?.toLowerCase().includes(query) ||
                p.description?.toLowerCase().includes(query)
            );
        }
        return items;
    }, [properties, favourites, view, debouncedSearch]);

    const navigateToFavourites = () => {
        setSearchParams({ view: 'favourites' });
    };

    return {
        view,
        searchTerm,
        setSearchTerm,
        filteredProperties,
        favourites,
        favouritesCount: favourites.length,
        loading,
        error,
        navigateToFavourites,
        toggleFavourite
    };
}
