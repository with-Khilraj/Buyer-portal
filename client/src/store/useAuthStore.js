import { create } from 'zustand';
import apiClient from '../api/apiClient';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    loading: false,
    error: null,

    clearError: () => set({ error: null }),

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await apiClient.post('/users/login', { email, password });
            const { user, accessToken } = response.data;
            
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            
            set({ user, isAuthenticated: true, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || 'Login failed', loading: false });
            throw err;
        }
    },

    signup: async (userData) => {
        set({ loading: true, error: null });
        try {
            const response = await apiClient.post('/users/signup', userData);
            const { user, accessToken } = response.data;
            
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            
            set({ user, isAuthenticated: true, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || 'Signup failed', loading: false });
            throw err;
        }
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        set({ user: null, isAuthenticated: false });
    },
}));

export default useAuthStore;
