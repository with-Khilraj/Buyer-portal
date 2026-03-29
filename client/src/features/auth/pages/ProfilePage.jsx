import React, { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import useAuthStore from '../../../store/useAuthStore';
import { User, Shield, Camera, Check, AlertCircle, Loader2 } from 'lucide-react';
import maleIcon from '../../../assets/male.png';
import femaleIcon from '../../../assets/female.png';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const { user, updateProfile, updatePassword, clearError } = useAuthStore();
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const [nameInput, setNameInput] = useState('');

    useEffect(() => {
        if (user?.name) setNameInput(user.name);
    }, [user]);

    // Password form state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsUpdatingProfile(true);
        try {
            await updateProfile({ name: nameInput });
            toast.success('Profile updated successfully');
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || 'Profile update failed');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords don't match");
            return;
        }
        setIsUpdatingPassword(true);
        try {
            await updatePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            toast.success('Password updated successfully');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || 'Password update failed');
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-serif text-primary italic">My Profile</h1>
                    <p className="text-slate-500 mt-2">Manage your account identity and security preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Identity Section */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                                <User size={24} />
                            </div>
                            <h2 className="text-xl font-serif text-primary">Personal Identity</h2>
                        </div>

                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-lg transition-transform duration-300 hover:scale-105">
                                    <img src={user?.gender === 'female' ? femaleIcon : maleIcon} alt={user?.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">Profile Avatar</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 font-bold text-primary placeholder:text-slate-300 transition-all"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isUpdatingProfile}
                                className="w-full h-14 bg-primary text-secondary font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-primary/95 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                            >
                                {isUpdatingProfile ? <Loader2 className="animate-spin" size={18} /> : 'Save Identity'}
                            </button>
                        </form>
                    </div>

                    {/* Security Section */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <Shield size={24} />
                            </div>
                            <h2 className="text-xl font-serif text-primary">Account Security</h2>
                        </div>

                        <form onSubmit={handlePasswordUpdate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 font-bold text-primary placeholder:text-slate-300 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 font-bold text-primary placeholder:text-slate-300 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 font-bold text-primary placeholder:text-slate-300 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isUpdatingPassword}
                                className="w-full h-14 bg-emerald-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                            >
                                {isUpdatingPassword ? <Loader2 className="animate-spin" size={18} /> : 'Update Security'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProfilePage;
