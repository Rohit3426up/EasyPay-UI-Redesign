import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
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
  const [googleLoading, setGoogleLoading] = useState(false);
  const [gsiLoaded, setGsiLoaded] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // State for Google post-signup Date of Birth requirement
  const [pendingGooglePayload, setPendingGooglePayload] = useState(null);
  const [googleUserPreview, setGoogleUserPreview] = useState(null);
  const [googleDob, setGoogleDob] = useState('');

  const googleBtnContainerRef = useRef(null);
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  // Parse JWT token to extract Google name and email for display
  const decodeJwtPayload = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const handleGoogleCredentialResponse = async (response) => {
    setError('');
    const decoded = decodeJwtPayload(response.credential);
    
    // Store pending credential and prompt user for their Date of Birth
    setPendingGooglePayload({ credential: response.credential });
    setGoogleUserPreview({
      name: decoded?.name || 'Shopper',
      email: decoded?.email || '',
      picture: decoded?.picture || ''
    });
  };

  // Complete Google sign-in after user inputs their Date of Birth
  const handleCompleteGoogleRegistration = async (e) => {
    e.preventDefault();
    if (!googleDob) {
      setError('Please provide your date of birth for age-based health recommendations.');
      return;
    }

    setGoogleLoading(true);
    setError('');
    try {
      await googleLogin({
        credential: pendingGooglePayload.credential,
        dob: googleDob
      });
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.message || 'Google registration failed');
      setGoogleLoading(false);
    }
  };

  // Initialize official Google Identity Services
  useEffect(() => {
    const googleClientId =
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      '707415891431-7g5oeg66jvn0js5ptkd71po5su2ch5th.apps.googleusercontent.com';

    const setupGoogle = () => {
      if (window.google?.accounts?.id && googleClientId) {
        try {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          if (googleBtnContainerRef.current) {
            googleBtnContainerRef.current.innerHTML = '';
            window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              shape: 'pill',
              text: 'continue_with',
              logo_alignment: 'left',
              width: 340,
            });

            // Detect if Google successfully injected the iframe
            setTimeout(() => {
              if (googleBtnContainerRef.current?.querySelector('iframe')) {
                setGsiLoaded(true);
              }
            }, 500);
          }
        } catch (err) {
          console.warn('Google Identity initialization failed:', err);
        }
      }
    };

    if (window.google?.accounts?.id) {
      setupGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          setupGoogle();
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  const handleFallbackGoogleClick = () => {
    const googleClientId =
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      '707415891431-7g5oeg66jvn0js5ptkd71po5su2ch5th.apps.googleusercontent.com';

    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            const reason = notification.getNotDisplayedReason() || notification.getSkippedReason() || 'unknown';
            setError(
              `Google sign-in popup blocked (${reason}). Please ensure "${window.location.origin}" is added to Authorized JavaScript origins in Google Cloud Console.`
            );
          }
        });
      } catch (err) {
        setError(`Google Sign-In failed: ${err.message || 'Domain not authorized in Google Cloud Console'}`);
      }
    } else {
      setError('Google Identity Services script is loading or blocked by an adblocker. Please refresh.');
    }
  };

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
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f9f8] text-[#1a1c1c] font-sans flex flex-col min-h-screen selection:bg-[#f97316]/20">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#f9f9f8]/90 backdrop-blur-xl border-b border-[#eeeeed]">
        <div className="h-16 px-4 md:px-8 max-w-md mx-auto flex items-center justify-between">
          <Link to="/welcome" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#9d4300] flex items-center justify-center shadow-sm">
              <span className="text-white font-extrabold text-xs">EP</span>
            </div>
            <span className="font-display font-extrabold text-xl text-[#1a1c1c] tracking-tight">
              EasyPay
            </span>
          </Link>
          <Link
            to="/login"
            className="text-xs font-bold text-[#f97316] hover:underline"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-8 flex flex-col justify-center">
        
        {/* Header Greeting */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbca] text-[#783200] text-xs font-bold shadow-sm mb-3">
            <span className="material-symbols-outlined text-[14px] text-[#9d4300]">how_to_reg</span>
            <span>Create Free Account</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-[#1a1c1c] tracking-tight">
            Start with <span className="text-[#f97316]">EasyPay</span>
          </h1>
          <p className="text-xs text-[#584237] mt-1.5 leading-relaxed max-w-xs mx-auto">
            Experience cashierless checkout, instant UPI passes, and real-time AI nutrition safety.
          </p>
        </div>

        {/* 1. Official Google Continue Button & Fallback */}
        <div className="flex flex-col items-center justify-center mb-6 w-full max-w-[340px] mx-auto">
          <div
            ref={googleBtnContainerRef}
            className={`w-full flex justify-center ${gsiLoaded ? 'block' : 'hidden'}`}
          />
          {!gsiLoaded && (
            <button
              type="button"
              onClick={handleFallbackGoogleClick}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#3c4043] font-medium text-sm py-2.5 px-4 rounded-full border border-[#dadce0] shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          )}
          {googleLoading && (
            <div className="flex items-center gap-2 text-xs text-[#f97316] font-semibold mt-2">
              <div className="w-4 h-4 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin" />
              <span>Registering Google profile...</span>
            </div>
          )}
        </div>

        {/* Divider OR */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e2e2e2]"></div>
          </div>
          <div className="relative bg-[#f9f9f8] px-3 text-[11px] font-bold text-[#584237] uppercase tracking-wider">
            or register with credentials
          </div>
        </div>

        {/* 2. Traditional Registration Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-[#1a1c1c] mb-1.5">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#584237]/60" size={18} />
              <input 
                type="text"
                required
                placeholder="Enter your Name "
                className="w-full bg-white border border-[#e2e2e2] rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#1a1c1c] placeholder:text-[#584237]/40 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] outline-none transition-all"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-[#1a1c1c] mb-1.5">
              Personal or Work Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#584237]/60" size={18} />
              <input 
                type="email"
                required
                placeholder="Enter your Email "
                className="w-full bg-white border border-[#e2e2e2] rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#1a1c1c] placeholder:text-[#584237]/40 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-bold text-[#1a1c1c] mb-1.5">
              Date of Birth <span className="text-[10px] text-[#584237] font-normal">(for tailored health scores)</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#584237]/60" size={18} />
              <input 
                type="date"
                required
                className="w-full bg-white border border-[#e2e2e2] rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#1a1c1c] focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] outline-none transition-all min-h-[46px]"
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-[#1a1c1c] mb-1.5">
              Account Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#584237]/60" size={18} />
              <input 
                type="password"
                required
                placeholder="Create a strong 8+ character password"
                className="w-full bg-white border border-[#e2e2e2] rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#1a1c1c] placeholder:text-[#584237]/40 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] outline-none transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-[#1a1c1c] mb-1.5">
              Re-enter Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#584237]/60" size={18} />
              <input 
                type="password"
                required
                placeholder="Repeat your password to confirm"
                className="w-full bg-white border border-[#e2e2e2] rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#1a1c1c] placeholder:text-[#584237]/40 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] outline-none transition-all"
                value={formData.confirm_password}
                onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
              />
            </div>
          </div>

          {error && (
            <div className="text-[#ba1a1a] bg-[#ffdad6] text-xs font-medium py-2.5 px-3 rounded-xl border border-[#ba1a1a]/20 text-center leading-relaxed">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading || success}
            className="w-full min-h-[48px] rounded-full bg-gradient-to-r from-[#f97316] to-[#9d4300] text-white font-bold text-sm shadow-[0_8px_20px_-4px_rgba(249,115,22,0.4)] transition-all active:scale-95 disabled:opacity-70 flex justify-center items-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Links Footer */}
        <div className="mt-8 pt-4 border-t border-[#eeeeed] flex flex-col items-center gap-3 text-xs text-[#584237]">
          <div>
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#f97316] hover:underline">
              Sign In Instead
            </Link>
          </div>

          <div className="text-[11px] text-[#584237]/70 text-center max-w-xs mt-1">
            By registering, you agree to EasyPay terms, real-time receipt generation, and health analytics processing.
          </div>
        </div>
      </main>

      {/* Google Sign-Up: Date of Birth Modal (Only shown after user accepts Google popup) */}
      {pendingGooglePayload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#eeeeed] animate-in zoom-in duration-200">
            
            {/* Header with Google User Info */}
            <div className="flex items-center gap-3 pb-3 border-b border-[#eeeeed]">
              {googleUserPreview?.picture ? (
                <img
                  src={googleUserPreview.picture}
                  alt="Google Avatar"
                  className="w-10 h-10 rounded-full border border-[#e2e2e2]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#ffdbca] text-[#9d4300] flex items-center justify-center font-bold text-sm">
                  {googleUserPreview?.name?.[0] || 'G'}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="font-display font-bold text-sm text-[#1a1c1c] truncate">
                  {googleUserPreview?.name}
                </span>
                <span className="text-[11px] text-[#584237] truncate">
                  {googleUserPreview?.email}
                </span>
              </div>
            </div>

            <form onSubmit={handleCompleteGoogleRegistration} className="mt-4 flex flex-col gap-3.5">
              <div className="bg-[#6ffbbe]/25 p-3 rounded-2xl border border-[#6ffbbe]/40 flex items-start gap-2">
                <span className="material-symbols-outlined text-[#006c49] text-[18px] shrink-0 mt-0.5">verified</span>
                <p className="text-xs text-[#002113] leading-relaxed">
                  Google account verified! Please enter your <span className="font-bold">Date of Birth</span> below so our AI engine can calculate personalized health safety ratings.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a1c1c] mb-1.5">
                  Select Your Date of Birth *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#584237]/60" size={18} />
                  <input
                    type="date"
                    required
                    value={googleDob}
                    onChange={(e) => setGoogleDob(e.target.value)}
                    className="w-full bg-[#f9f9f8] border border-[#e2e2e2] rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#1a1c1c] focus:border-[#f97316] outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="text-[#ba1a1a] bg-[#ffdad6] text-xs font-medium py-2 px-3 rounded-xl border border-[#ba1a1a]/20 text-center">
                  {error}
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPendingGooglePayload(null)}
                  className="flex-1 py-2.5 rounded-full border border-[#e2e2e2] text-xs font-semibold text-[#584237] hover:bg-[#eeeeed]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={googleLoading}
                  className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#f97316] to-[#9d4300] text-white text-xs font-bold shadow-md hover:brightness-105 transition-all"
                >
                  {googleLoading ? 'Saving...' : 'Finish Setup'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[320px] w-full text-center shadow-2xl animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-[#6ffbbe] text-[#002113] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-xl font-display font-bold text-[#1a1c1c] mb-1">
              Account Created!
            </h2>
            <p className="text-xs text-[#584237] font-medium">
              Welcome to EasyPay Supermarket.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default RegisterScreen;
