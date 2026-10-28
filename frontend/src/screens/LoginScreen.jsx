import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, HelpCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      // Show success modal, wait briefly, then navigate
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface px-6 py-8 max-w-md mx-auto select-none">
      
      {/* Success Modal Overlay */}
      {success && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[320px] w-full text-center shadow-2xl border border-slate-100 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200/70 shadow-xs">
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-display font-bold text-slate-900 mb-1 tracking-tight">Login Successful!</h2>
            <p className="text-slate-500 font-medium text-xs">Entering your EasyPay supermarket session...</p>
          </div>
        </div>
      )}

      {/* Logo and Header */}
      <div className="flex flex-col items-center mt-6 mb-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary-500 to-primary-700 text-white rounded-2xl flex items-center justify-center shadow-coral mb-4">
          <span className="text-2xl font-display font-black tracking-tight">EP</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Welcome to EasyPay
        </h1>
        <p className="text-slate-500 text-xs font-medium max-w-[280px] mt-1">
          Sign in for live supermarket self-checkout & AI health insights
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col w-full">
        <div className="space-y-4 mb-6">
          
          {/* Email Field */}
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
                className="w-full bg-white border border-slate-200/80 rounded-2xl py-3.5 pl-11 pr-4 focus:border-primary focus:bg-white outline-none transition-all text-slate-900 text-xs placeholder:text-slate-400 font-medium shadow-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
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
                className="w-full bg-white border border-slate-200/80 rounded-2xl py-3.5 pl-11 pr-4 focus:border-primary focus:bg-white outline-none transition-all text-slate-900 text-xs placeholder:text-slate-400 font-medium shadow-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          disabled={loading || success}
          className="w-full bg-primary hover:bg-primary-600 active:scale-[0.98] text-white py-4 rounded-full font-display font-bold text-sm transition-all shadow-coral disabled:opacity-70 flex justify-center items-center h-[52px]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            'Sign In to EasyPay'
          )}
        </button>

        <div className="my-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center max-w-[200px] mx-auto w-full">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative bg-surface px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              New Shopper?
            </div>
          </div>
        </div>

        <Link 
          to="/register"
          className="w-full bg-white border border-slate-200/80 text-slate-800 py-3.5 rounded-full font-display font-bold text-xs hover:bg-slate-50 transition-colors flex justify-center items-center gap-2 shadow-xs active:scale-[0.98]"
        >
          <span>Create an Account</span>
        </Link>
        
        <div className="mt-auto pt-8 flex flex-col items-center gap-3 text-slate-400 text-xs">
          <div className="flex items-center gap-1.5 font-medium">
            <HelpCircle size={14} />
            <span>Need assistance? Ask store staff</span>
          </div>
          
          <Link 
            to="/guard"
            className="flex items-center gap-1.5 text-primary font-display font-bold hover:text-primary-600 transition-colors py-1 px-3 rounded-full bg-primary-50 border border-primary-200/70"
          >
            <ShieldCheck size={14} />
            <span>Security Guard Portal</span>
          </Link>
        </div>
      </form>

    </div>
  );
};

export default LoginScreen;
