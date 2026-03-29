import { create } from 'zustand';
import apiClient from '../api/apiClient';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    loading: false,
    error: null,

    clearError: () => set({ error: null }),

    checkAuth: async () => {
        try {
            const response = await apiClient.get('/users/me');
            const { user } = response.data;
            set({ user, isAuthenticated: true });
            localStorage.setItem('user', JSON.stringify(user));
        } catch (err) {
            set({ user: null, isAuthenticated: false });
            localStorage.removeItem('user');
        }
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await apiClient.post('/users/login', { email, password });
            const { user } = response.data;
            
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
            const { user } = response.data;
            
            localStorage.setItem('user', JSON.stringify(user));
            
            set({ user, isAuthenticated: true, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || 'Signup failed', loading: false });
            throw err;
        }
    },

    logout: async () => {
        try {
            await apiClient.post('/users/logout');
        } finally {
            localStorage.removeItem('user');
            set({ user: null, isAuthenticated: false });
        }
    },

    updateProfile: async (data) => {
        set({ loading: true, error: null });
        try {
            const response = await apiClient.patch('/users/profile', data);
            const { user } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            set({ user, loading: false });
            return response.data;
        } catch (err) {
            set({ error: err.response?.data?.message || 'Update failed', loading: false });
            throw err;
        }
    },

    updatePassword: async (passwordData) => {
        set({ loading: true, error: null });
        try {
            const response = await apiClient.patch('/users/password', passwordData);
            set({ loading: false });
            return response.data;
        } catch (err) {
            set({ error: err.response?.data?.message || 'Password update failed', loading: false });
            throw err;
        }
    },
}));

export default useAuthStore;
