import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../schema/auth';
import useAuthStore from '../../../store/useAuthStore';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const { login, loading, error, clearError } = useAuthStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    useEffect(() => {
        clearError();
    }, [clearError]);

    const onSubmit = async (data) => {
        clearError();
        try {
            await login(data.email, data.password);
            toast.success("Login successful");
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Invalid email or password");
            console.error(err);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-slate-100 font-sans overflow-hidden">
            {/* Hero Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md p-8 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 transform transition-all duration-500 hover:shadow-primary/20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif text-primary mb-2 italic">Estate Reserve</h1>
                    <p className="text-slate-500 tracking-widest text-xs uppercase font-medium">The Digital Concierge</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-2">
                            <Mail size={14} className="text-secondary" /> Email Address
                        </label>
                        <input
                            type="text"
                            {...register('email')}
                            className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-secondary outline-none transition-colors text-slate-800"
                            placeholder="name@luxury.com"
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-1 italic font-semibold">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-2">
                            <Lock size={14} className="text-secondary" /> Password
                        </label>
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-secondary outline-none transition-colors text-slate-800"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-[10px] mt-1 italic font-semibold">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />}
                        Log In
                    </button>
                </form>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-slate-600">
                        Don't have an invitation? <Link to="/signup" className="text-secondary font-bold hover:underline decoration-2 underline-offset-4">Request Access</Link>
                    </p>
                    <a href="#" className="block text-xs text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
