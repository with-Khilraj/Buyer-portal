import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import PageLoader from './PageLoader';

const AuthProvider = ({ children }) => {
    const { checkAuth } = useAuthStore();
    const [isRehydrating, setIsRehydrating] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const userHint = localStorage.getItem('user');
            
            if (userHint) {
                await checkAuth();
            }
            
            setIsRehydrating(false);
        };
        initAuth();
    }, [checkAuth]);

    if (isRehydrating) {
        return <PageLoader />;
    }

    return children;
};

export default AuthProvider;
