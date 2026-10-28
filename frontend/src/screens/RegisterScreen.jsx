import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Calendar, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    dob: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await register({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        dob: formData.dob
      });
      navigate('/scan');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface px-6 py-8 pb-16 max-w-md mx-auto select-none">
      
      {/* Header */}
      <div className="flex flex-col items-center mt-4 mb-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl flex items-center justify-center shadow-sm mb-3">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Create Account
        </h1>
        <p className="text-slate-500 text-xs font-medium max-w-[280px] mt-1">
          Join EasyPay for queue-free checkout & personalized dietary safety
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col w-full">
        <div className="space-y-3.5 mb-6">
          
          <div>
            <label className="block text-xs font-display font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                required
                placeholder="John Doe"
                className="w-full bg-white border border-slate-200/80 rounded-2xl py-3 pl-11 pr-4 focus:border-primary focus:bg-white outline-none transition-all text-slate-900 text-xs placeholder:text-slate-400 font-medium shadow-xs"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-display font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-white border border-slate-200/80 rounded-2xl py-3 pl-11 pr-4 focus:border-primary focus:bg-white outline-none transition-all text-slate-900 text-xs placeholder:text-slate-400 font-medium shadow-xs"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-display font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="date"
                required
                className="w-full bg-white border border-slate-200/80 rounded-2xl py-3 pl-11 pr-4 focus:border-primary focus:bg-white outline-none transition-all text-slate-900 text-xs placeholder:text-slate-400 font-medium shadow-xs"
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-display font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-white border border-slate-200/80 rounded-2xl py-3 pl-11 pr-4 focus:border-primary focus:bg-white outline-none transition-all text-slate-900 text-xs placeholder:text-slate-400 font-medium shadow-xs"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-display font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-white border border-slate-200/80 rounded-2xl py-3 pl-11 pr-4 focus:border-primary focus:bg-white outline-none transition-all text-slate-900 text-xs placeholder:text-slate-400 font-medium shadow-xs"
                value={formData.confirm_password}
                onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 text-rose-700 text-xs text-center bg-rose-50 py-2.5 px-3 rounded-2xl border border-rose-200/80 font-medium">
            {error}
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-3.5 rounded-full font-display font-bold text-sm transition-all shadow-sm disabled:opacity-70 flex justify-center items-center h-[52px]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            'Complete Registration'
          )}
        </button>

        <div className="mt-6 text-center text-xs font-medium text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
