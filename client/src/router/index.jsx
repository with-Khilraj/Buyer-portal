import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import PageLoader from '../components/PageLoader';

const LoginPage = React.lazy(() => import('../features/auth/pages/LoginPage'));
const SignupPage = React.lazy(() => import('../features/auth/pages/SignupPage'));
const Dashboard = React.lazy(() => import('../features/properties/pages/Dashboard'));
const ProfilePage = React.lazy(() => import('../features/auth/pages/ProfilePage'));

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const withSuspense = (Component) => (
    <Suspense fallback={<PageLoader />}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" />,
    },
    {
        path: '/login',
        element: withSuspense(LoginPage),
    },
    {
        path: '/signup',
        element: withSuspense(SignupPage),
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                {withSuspense(Dashboard)}
            </ProtectedRoute>
        ),
    },
    {
        path: '/profile',
        element: (
            <ProtectedRoute>
                {withSuspense(ProfilePage)}
            </ProtectedRoute>
        ),
    },
]);
