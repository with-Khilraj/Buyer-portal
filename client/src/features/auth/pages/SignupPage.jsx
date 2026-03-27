import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../../schema/auth';
import useAuthStore from '../../../store/useAuthStore';
import { UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react';

const SignupPage = () => {
    const { signup, loading, error, clearError } = useAuthStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(signupSchema)
    });

    useEffect(() => {
        clearError();
    }, [clearError]);

    const onSubmit = async (data) => {
        clearError();
        try {
            await signup(data);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-slate-100 font-sans overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center grayscale-[20%] opacity-80"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg p-10 bg-white/95 backdrop-blur-lg rounded-2xl shadow-3xl border border-white/30 transform transition-all duration-500">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-primary italic">Join Estate Reserve</h2>
                    <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest font-semibold italic">Begin your journey to a new legacy</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] flex items-center gap-2">
                            <User size={12} className="text-secondary" /> Full Name
                        </label>
                        <input
                            type="text"
                            {...register('name')}
                            className="w-full px-0 py-2 bg-transparent border-b border-slate-300 focus:border-primary outline-none transition-all text-slate-800 placeholder-slate-300"
                            placeholder="Julien Thorne"
                        />
                        {errors.name && <p className="text-red-500 text-[10px] mt-1 italic font-semibold">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] flex items-center gap-2">
                            <Mail size={12} className="text-secondary" /> Email Address
                        </label>
                        <input
                            type="text"
                            {...register('email')}
                            className="w-full px-0 py-2 bg-transparent border-b border-slate-300 focus:border-primary outline-none transition-all text-slate-800 placeholder-slate-300"
                            placeholder="julien.t@estate.com"
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-1 italic font-semibold">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2 col-span-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] flex items-center gap-2">
                            <Lock size={12} className="text-secondary" /> Security Password
                        </label>
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full px-0 py-2 bg-transparent border-b border-slate-300 focus:border-primary outline-none transition-all text-slate-800 placeholder-slate-300"
                            placeholder="••••••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-[10px] mt-1 italic font-semibold">{errors.password.message}</p>}
                    </div>


                    {error && <p className="col-span-2 text-red-500 text-xs font-bold text-center uppercase tracking-tighter italic">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="col-span-2 mt-4 bg-primary hover:bg-primary-dark text-white py-4 rounded-sm font-bold tracking-widest shadow-xl transition-all flex items-center justify-center gap-4 hover:tracking-[0.3em] active:scale-95 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={18} />}
                        CREATE ACCOUNT
                    </button>
                </form>

                <div className="mt-8 text-center text-[11px] font-medium text-slate-400">
                    ALREADY REGISTERED? <Link to="/login" className="text-primary font-black hover:text-secondary transition-colors underline decoration-1 underline-offset-4">LOG IN TO PORTAL</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
