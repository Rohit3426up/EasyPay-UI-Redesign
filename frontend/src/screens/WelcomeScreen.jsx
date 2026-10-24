import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = ({ onNext }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [cartTotal, setCartTotal] = useState(610.0);
  const [itemCount, setItemCount] = useState(2);
  const [toastMessage, setToastMessage] = useState(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleAddHeroItem = () => {
    setCartTotal((prev) => prev + 145.0);
    setItemCount((prev) => prev + 1);
    showToast('Added Hass Avocado (₹145) to Cart');
  };

  const handleMockScan = () => {
    setCartTotal((prev) => prev + 240.0);
    setItemCount((prev) => prev + 1);
    showToast('Scanned: Almond Milk 1L added!');
  };

  const handleLaunch = () => {
    if (onNext) {
      onNext();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-[#f9f9f8] text-[#1a1c1c] font-sans flex flex-col min-h-screen selection:bg-[#f97316]/20">
      
      {/* 1. Header with Brand, Launch button & Profile Icon */}
      <header className="fixed top-0 w-full z-50 bg-[#f9f9f8]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eeeeed]">
        <div className="h-16 px-4 md:px-8 max-w-md md:max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f97316] to-[#9d4300] flex items-center justify-center shadow-sm">
              <span className="text-white font-extrabold text-xs tracking-tight">EP</span>
            </div>
            <span className="font-display font-extrabold text-xl text-[#1a1c1c] tracking-tight">
              EasyPay
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleLaunch}
              className="inline-flex items-center justify-center min-h-[38px] px-5 rounded-full bg-gradient-to-r from-[#f97316] to-[#9d4300] text-white text-xs font-bold tracking-wide shadow-[0_6px_18px_-4px_rgba(249,115,22,0.45)] transition-all active:scale-95 hover:opacity-95 cursor-pointer"
            >
              Launch
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-8 h-8 rounded-full bg-[#9d4300] flex items-center justify-center text-white active:scale-95 transition-transform"
              title="Sign In / Account"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-md md:max-w-xl mx-auto pt-20 pb-28 px-4">
        
        {/* Floating Toast Message */}
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-xl shadow-lg border border-[#e2e2e2] ${
            toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <span className="material-symbols-outlined text-[#006c49] text-[20px]">verified</span>
          <span className="text-xs font-semibold text-[#1a1c1c]">{toastMessage || 'Ready'}</span>
        </div>

        {/* Hero Section */}
        <section className="pt-2 pb-5 flex flex-col gap-3.5">
          
          {/* Top Pill Badge (Warm Peach/Gold Tone with Orange Bolt) */}
          <div className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbca] text-[#783200] shadow-sm">
            <span className="material-symbols-outlined text-[15px] text-[#9d4300] font-bold">bolt</span>
            <span className="text-xs font-bold tracking-tight">AI-Powered Scan &amp; Go Supermarket</span>
          </div>

          {/* Main Headline */}
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display font-extrabold text-[32px] sm:text-[38px] text-[#1a1c1c] tracking-tight leading-[1.12]">
              Skip Counter Lines.<br />
              <span className="text-[#f97316]">Scan, Pay</span> &amp; Walk Out.
            </h1>
            <p className="text-[14px] text-[#584237] leading-[22px] mt-1">
              Say goodbye to long grocery queues. Point your phone, review instant AI nutritional grades, tap once with UPI, and walk out with verified digital receipts in seconds.
            </p>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex items-center gap-2.5 pt-1">
            <button
              onClick={handleLaunch}
              className="inline-flex items-center justify-center gap-1.5 min-h-[46px] px-5 rounded-full bg-gradient-to-r from-[#f97316] to-[#9d4300] text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_-4px_rgba(249,115,22,0.4)] transition-all active:scale-95 cursor-pointer"
            >
              <span>Start Scanning Now</span>
              <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
            </button>
            <button
              onClick={() => setIsDemoOpen(!isDemoOpen)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[46px] px-4 rounded-full bg-[#eeeeed] text-[#1a1c1c] font-bold text-xs sm:text-sm transition-colors hover:bg-[#e2e2e2] active:scale-95 cursor-pointer border border-[#e2e2e2]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#9d4300]">play_circle</span>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Exact Hero Visual Showcase Card with Authentic Supermarket Produce & Phone Scanner */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#e8e8e7] mt-2 border border-[#e8e8e7]">
            <img
              alt="Woman happily scanning fresh avocado in bright supermarket produce aisle"
              className="w-full h-80 sm:h-96 md:h-[420px] object-cover object-[center_35%]"
              src="/assets/hero_scanner.jpg"
            />

            {/* Gradient Overlay for bottom readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

            {/* Top-Left Floating Badge: VERIFIED IN 0.2s */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md border border-white/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00b07a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006c49]"></span>
              </span>
              <span className="material-symbols-outlined text-[#f97316] text-[13px]">bolt</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1a1c1c]">
                VERIFIED IN 0.2s
              </span>
            </div>

            {/* Top-Right Floating Badge: Cart Tally */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md border border-white/50">
              <span className="material-symbols-outlined text-[#f97316] text-[15px]">shopping_bag</span>
              <span className="text-[11px] font-extrabold text-[#1a1c1c] font-tnum">
                ₹{cartTotal.toFixed(2)} • {itemCount} items
              </span>
            </div>

            {/* Bottom Overlay Pill: Emerald Nutri-Score A 98/100 + Orange Add Button */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xl p-2.5 rounded-xl shadow-lg flex items-center justify-between gap-2.5 border border-white/60">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#6ffbbe] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#002113] text-[18px]">eco</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#1a1c1c] truncate">Nutri-Score A</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] inline-block"></span>
                    <span className="text-[11px] font-extrabold text-[#006c49]">98/100</span>
                  </div>
                  <span className="text-[10px] text-[#584237] truncate font-medium">
                    Organic Haas Avocado • Pesticide Free
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddHeroItem}
                className="shrink-0 w-8 h-8 rounded-full bg-[#f97316] text-white flex items-center justify-center active:scale-90 transition-transform shadow-sm hover:opacity-90"
                title="Add avocado to cart"
              >
                <span className="material-symbols-outlined text-[18px] font-bold">add</span>
              </button>
            </div>
          </div>
        </section>

        {/* Clean Metrics Bar (Orange, Deep Slate, Golden/Star, Emerald) */}
        <section className="py-2">
          <div className="grid grid-cols-2 gap-2 bg-white p-4 rounded-2xl shadow-sm border border-[#eeeeed]">
            {/* 1. Orange 0s */}
            <div className="flex flex-col p-1.5">
              <span className="font-display font-extrabold text-[32px] text-[#f97316] tracking-tight font-tnum leading-none">
                0s
              </span>
              <span className="text-[11px] text-[#584237] font-medium mt-1">Wait Time at Counter</span>
            </div>

            {/* 2. Slate 100% */}
            <div className="flex flex-col p-1.5">
              <span className="font-display font-extrabold text-[32px] text-[#1a1c1c] tracking-tight font-tnum leading-none">
                100%
              </span>
              <span className="text-[11px] text-[#584237] font-medium mt-1">Cashierless Checkout</span>
            </div>

            {/* 3. Golden Star 4.9 */}
            <div className="flex flex-col p-1.5 pt-2">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-display font-extrabold text-[32px] text-[#1a1c1c] tracking-tight font-tnum leading-none">
                  4.9
                </span>
                <span className="material-symbols-outlined text-[#f59e0b] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </div>
              <span className="text-[11px] text-[#584237] font-medium mt-1">50k+ Happy Shoppers</span>
            </div>

            {/* 4. Emerald ₹0 */}
            <div className="flex flex-col p-1.5 pt-2">
              <span className="font-display font-extrabold text-[32px] text-[#006c49] tracking-tight font-tnum leading-none">
                ₹0
              </span>
              <span className="text-[11px] text-[#584237] font-medium mt-1">Extra Convenience Fee</span>
            </div>
          </div>
        </section>

        {/* 4-Step Illustrated Walkthrough */}
        <section className="pt-6 pb-3 flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="inline-flex items-center gap-1 text-[#f97316]">
              <span className="material-symbols-outlined text-[15px]">timeline</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f97316]">
                ZERO FRICTION JOURNEY
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-[#1a1c1c] tracking-tight">
              How EasyPay Works
            </h2>
            <p className="text-xs text-[#584237]">
              Four effortless steps from supermarket aisle to exit.
            </p>
          </div>

          {/* Step Cards List */}
          <div className="flex flex-col gap-2.5">
            {/* Step 1: Peach/Orange Barcode */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#eeeeed] flex flex-col gap-2 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffdbca] flex items-center justify-center text-[#341100]">
                    <span className="material-symbols-outlined text-[20px] text-[#9d4300]">barcode_scanner</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#9d4300] tracking-wider">Step 01</span>
                    <h3 className="font-display font-bold text-base text-[#1a1c1c]">Scan Item Barcode</h3>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#e0c0b1] text-[20px]">chevron_right</span>
              </div>
              <p className="text-xs text-[#584237] leading-[18px]">
                Activate the neural viewfinder directly from your mobile browser. High-speed camera reader recognizes barcodes &amp; SKU tags in 0.2s without typing.
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#eeeeed] text-[#584237] text-[10px] font-semibold">
                  Continuous scanning
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eeeeed] text-[#584237] text-[10px] font-semibold">
                  Weight synced
                </span>
              </div>
            </div>

            {/* Step 2: Emerald Green AI Health Score */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#eeeeed] flex flex-col gap-2 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#6ffbbe] flex items-center justify-center text-[#002113]">
                    <span className="material-symbols-outlined text-[20px] text-[#006c49]">health_and_safety</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">Step 02</span>
                    <h3 className="font-display font-bold text-base text-[#1a1c1c]">AI Health Score Check</h3>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#e0c0b1] text-[20px]">chevron_right</span>
              </div>
              <p className="text-xs text-[#584237] leading-[18px]">
                Instant ingredient transparency. See real-time Nutri-Scores (A through E), allergen warnings (gluten, dairy, nuts), and lower-sugar organic swaps.
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-[10px] font-bold">
                  Nutri-Score 0 to 100
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eeeeed] text-[#584237] text-[10px] font-semibold">
                  Allergen alert
                </span>
              </div>
            </div>

            {/* Step 3: Lavender/Blue-Indigo Instant UPI Payment */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#eeeeed] flex flex-col gap-2 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#131b2e]">
                    <span className="material-symbols-outlined text-[20px] text-[#565e74]">flash_on</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#565e74] tracking-wider">Step 03</span>
                    <h3 className="font-display font-bold text-base text-[#1a1c1c]">Instant UPI Payment</h3>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#e0c0b1] text-[20px]">chevron_right</span>
              </div>
              <p className="text-xs text-[#584237] leading-[18px]">
                One-tap checkout via Google Pay, PhonePe, Paytm, or Apple Pay. Zero card-swiping machines, zero waiting for counter staff.
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#eeeeed] text-[#584237] text-[10px] font-semibold">
                  1-Tap UPI
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eeeeed] text-[#584237] text-[10px] font-semibold">
                  Zero OTP friction
                </span>
              </div>
            </div>

            {/* Step 4: Peach-dim Guard Digital QR Exit */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#eeeeed] flex flex-col gap-2 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffb690] flex items-center justify-center text-[#341100]">
                    <span className="material-symbols-outlined text-[20px] text-[#9d4300]">qr_code_2</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#9d4300] tracking-wider">Step 04</span>
                    <h3 className="font-display font-bold text-base text-[#1a1c1c]">Guard Digital QR Exit</h3>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#e0c0b1] text-[20px]">chevron_right</span>
              </div>
              <p className="text-xs text-[#584237] leading-[18px]">
                Receive an animated encrypted digital pass. Show it to the gate reader or security guard in 2 seconds and walk straight into the parking lot.
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbca] text-[#783200] text-[10px] font-bold">
                  2-sec gate scan
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eeeeed] text-[#584237] text-[10px] font-semibold">
                  Eco e-receipt
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Watch Demo Drawer / Simulated Live Barcode Feed */}
        {isDemoOpen && (
          <section className="py-2">
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#eeeeed] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse"></span>
                  <span className="text-xs font-bold text-[#1a1c1c]">Simulated Scan Feed</span>
                </div>
                <button
                  onClick={() => setIsDemoOpen(false)}
                  className="w-6 h-6 rounded-full bg-[#eeeeed] flex items-center justify-center text-[#584237]"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>

              <div className="relative w-full h-40 rounded-xl bg-[#2f3130] overflow-hidden flex items-center justify-center">
                <div className="w-28 h-28 rounded-lg border-2 border-[#f97316]/80 border-dashed flex items-center justify-center relative">
                  <span className="material-symbols-outlined text-[#f1f1f0]/40 text-[32px]">
                    qr_code_scanner
                  </span>
                  <div className="absolute inset-x-0 h-0.5 bg-[#f97316] top-1/2 -translate-y-1/2 shadow-[0_0_8px_#f97316]"></div>
                </div>
                <div className="absolute bottom-2 inset-x-0 text-center">
                  <span className="text-[10px] font-medium text-white/90 bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    Point at any product barcode
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-xs font-bold text-[#1a1c1c]">Organic Almond Milk 1L</p>
                  <p className="text-[11px] text-[#006c49] font-semibold">Nutri-Score A • ₹240.00</p>
                </div>
                <button
                  onClick={handleMockScan}
                  className="px-3.5 py-1.5 rounded-full bg-[#9d4300] text-white text-xs font-bold shadow-sm active:scale-95"
                >
                  Scan Item
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Feature Pill Card: No App Download Required */}
        <section className="py-2">
          <div className="bg-[#f3f4f3] p-4 rounded-2xl flex items-center gap-3.5 border border-[#eeeeed]">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[#006c49] text-[22px]">install_mobile</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-display font-bold text-sm text-[#1a1c1c]">No App Download Required</h3>
              <p className="text-xs text-[#584237] mt-0.5 leading-[18px]">
                Tap our NFC tag at supermarket entrance doors or scan the kiosk poster. EasyPay loads instantly in Safari or Chrome without storage clutter.
              </p>
            </div>
          </div>
        </section>

        {/* High-Impact Minimalist CTA Banner */}
        <section className="pt-4 pb-4">
          <div className="relative rounded-2xl bg-[#2f3130] text-[#f1f1f0] p-6 shadow-xl overflow-hidden flex flex-col gap-3.5">
            <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#f97316]/20 blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-1 relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ffb690]">
                LINE-FREE SHOPPING
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                Ready to walk past checkout queues?
              </h2>
              <p className="text-xs text-white/80 max-w-sm leading-relaxed">
                Try the instant Web-Scanner now on your mobile browser. No downloads or sign-up hassle required.
              </p>
            </div>

            <div className="flex flex-col gap-2 relative z-10 pt-1">
              <button
                onClick={handleLaunch}
                className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] px-5 rounded-full bg-gradient-to-r from-[#f97316] to-[#9d4300] text-white text-xs sm:text-sm font-bold shadow-[0_8px_20px_-4px_rgba(249,115,22,0.4)] transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[19px]">qr_code_scanner</span>
                <span>Launch EasyPay Web Scanner</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-white/70 text-[11px] pt-1">
                <div className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[15px]">lock</span>
                  <span>256-bit Encrypted</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>UPI &amp; Card Secure</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Modern Minimal Bottom Navigation Dock matching design reference */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#f9f9f8]/90 backdrop-blur-xl border-t border-[#eeeeed] shadow-[0_-2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex justify-around items-center h-16 max-w-md md:max-w-xl mx-auto px-2">
          {/* Overview */}
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
              activeTab === 'overview' ? 'text-[#f97316] font-bold' : 'text-[#584237]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">storefront</span>
            <span className="text-[10px] mt-0.5">Overview</span>
          </button>

          {/* Scan & Go */}
          <button
            onClick={handleLaunch}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
              activeTab === 'scan' ? 'text-[#f97316] font-bold' : 'text-[#584237]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
            <span className="text-[10px] mt-0.5">Scan &amp; Go</span>
          </button>

          {/* Live Cart */}
          <button
            onClick={() => {
              showToast(`Live Cart Preview: ₹${cartTotal.toFixed(2)} (${itemCount} items)`);
              navigate('/cart');
            }}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
              activeTab === 'cart' ? 'text-[#f97316] font-bold' : 'text-[#584237]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            <span className="text-[10px] mt-0.5">Live Cart</span>
          </button>

          {/* AI Tech */}
          <button
            onClick={() => {
              showToast('AI Nutri-Score & Allergen Detection Engine');
              navigate('/profile');
            }}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
              activeTab === 'ai' ? 'text-[#f97316] font-bold' : 'text-[#584237]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            <span className="text-[10px] mt-0.5">AI Tech</span>
          </button>
        </div>
      </nav>

    </div>
  );
};

export default WelcomeScreen;
