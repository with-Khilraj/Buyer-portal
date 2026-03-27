import { create } from 'zustand';
import apiClient from '../api/apiClient';

const usePropertyStore = create((set, get) => ({
    properties: [],
    favourites: [],
    loading: false,
    error: null,

    fetchProperties: async () => {
        set({ loading: true });
        try {
            const response = await apiClient.get('/products');
            set({ properties: response.data, loading: false });
        } catch (err) {
            set({ error: 'Failed to fetch properties', loading: false });
        }
    },

    fetchFavourites: async () => {
        try {
            const response = await apiClient.get('/favourites');
            set({ favourites: response.data.map(f => f._id) }); // Store IDs for easy lookup
        } catch (err) {
            console.error('Failed to fetch favourites', err);
        }
    },

    toggleFavourite: async (productId) => {
        const isFavourite = get().favourites.includes(productId);
        try {
            if (isFavourite) {
                await apiClient.delete(`/favourites/${productId}`);
                set({ favourites: get().favourites.filter(id => id !== productId) });
            } else {
                await apiClient.post('/favourites', { productId });
                set({ favourites: [...get().favourites, productId] });
            }
        } catch (err) {
            console.error('Failed to toggle favourite', err);
        }
    },
}));

export default usePropertyStore;
