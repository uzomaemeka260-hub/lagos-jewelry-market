'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { KeyRound } from 'lucide-react';

export default function VendorLogin() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/vendor/dashboard` },
    });

    if (error) {
      setMessage(`❌ Auth Error: ${error.message}`);
    } else {
      setMessage('📩 Login link sent! Check your inbox or spam folder.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="max-w-sm w-full bg-white border rounded-2xl p-8 shadow-xs text-center">
        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3 border border-amber-200">
          <KeyRound className="w-5 h-5 text-amber-600" />
        </div>
        <h2 className="text-xl font-black text-neutral-800 tracking-tight">Merchant Portal</h2>
        <p className="text-xs text-neutral-400 mt-0.5 mb-6">Passwordless sign-in for registered marketplace stalls.</p>

        <form onSubmit={handleMagicLinkLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Stall Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="merchant@gmail.com" className="w-full px-3 py-2 border rounded-xl text-xs bg-neutral-50 focus:outline-none focus:border-amber-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-2.5 rounded-xl text-xs transition disabled:opacity-50 cursor-pointer">
            {loading ? 'Sending link...' : 'Request Verification Access'}
          </button>
        </form>
        {message && <p className="text-xs font-semibold mt-4 text-neutral-600 bg-neutral-50 p-3 border rounded-xl">{message}</p>}
      </div>
    </div>
  );
}
