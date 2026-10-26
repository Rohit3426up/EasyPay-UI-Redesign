import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [gsiLoaded, setGsiLoaded] = useState(false);
  const [success, setSuccess] = useState(false);
  const googleBtnContainerRef = useRef(null);

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleCredentialResponse = async (response) => {
    setGoogleLoading(true);
    setError('');
    try {
      await googleLogin({ credential: response.credential });
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setGoogleLoading(false);
    }
  };

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

          // Render official Google button into the container
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
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.message || 'Login failed');
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
            to="/register"
            className="text-xs font-bold text-[#f97316] hover:underline"
          >
            Create Account
          </Link>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-8 flex flex-col justify-center">
        
        {/* Header Greeting */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbca] text-[#783200] text-xs font-bold shadow-sm mb-3">
            <span className="material-symbols-outlined text-[14px] text-[#9d4300]">login</span>
            <span>Customer Sign In</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-[#1a1c1c] tracking-tight">
            Welcome to <span className="text-[#f97316]">EasyPay</span>
          </h1>
          <p className="text-xs text-[#584237] mt-1.5 leading-relaxed max-w-xs mx-auto">
            Scan groceries in aisles, get instant AI health scores, and walk past counter lines.
          </p>
        </div>

        {/* Official Google Identity Button & Fallback */}
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
              <span>Verifying Google account...</span>
            </div>
          )}
        </div>

        {/* Divider OR */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e2e2e2]"></div>
          </div>
          <div className="relative bg-[#f9f9f8] px-3 text-[11px] font-bold text-[#584237] uppercase tracking-wider">
            or sign in with email
          </div>
        </div>

        {/* Traditional Email Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1a1c1c] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#584237]/60" size={18} />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#e2e2e2] rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#1a1c1c] placeholder:text-[#584237]/50 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a1c1c] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#584237]/60" size={18} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#e2e2e2] rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#1a1c1c] placeholder:text-[#584237]/50 focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] outline-none transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="text-[#ba1a1a] bg-[#ffdad6] text-xs font-medium py-2.5 px-3 rounded-xl border border-[#ba1a1a]/20 text-center leading-relaxed">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="w-full min-h-[48px] rounded-full bg-gradient-to-r from-[#f97316] to-[#9d4300] text-white font-bold text-sm shadow-[0_8px_20px_-4px_rgba(249,115,22,0.4)] transition-all active:scale-95 disabled:opacity-70 flex justify-center items-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Links Footer */}
        <div className="mt-8 pt-4 border-t border-[#eeeeed] flex flex-col items-center gap-3 text-xs text-[#584237]">
          <div>
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#f97316] hover:underline">
              Create an Account
            </Link>
          </div>

          <Link
            to="/guard"
            className="inline-flex items-center gap-1.5 font-bold text-[#006c49] hover:underline pt-2"
          >
            <span className="material-symbols-outlined text-[16px]">shield</span>
            <span>Security Guard Verification Portal</span>
          </Link>
        </div>
      </main>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-[320px] w-full text-center shadow-2xl animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-[#6ffbbe] text-[#002113] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-xl font-display font-bold text-[#1a1c1c] mb-1">
              Login Successful!
            </h2>
            <p className="text-xs text-[#584237] font-medium">
              Welcome to EasyPay Scan &amp; Go.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginScreen;
