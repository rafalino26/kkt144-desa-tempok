// src/app/login/page.tsx
'use client'; // <-- WAJIB untuk signIn v4

import { useState, useEffect } from 'react'; // <-- 1. Impor useEffect
import { signIn } from 'next-auth/react'; 
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  // <-- 2. Pindahkan logika error ke dalam useEffect
  useEffect(() => {
    // Gunakan 'searchParams?.get' (optional chaining)
    // untuk mengatasi error 'possibly 'null''
    const callbackError = searchParams?.get('error');
    if (callbackError) {
      setError('Email atau password salah. Silakan coba lagi.');
    }
    // '[]' berarti ini hanya berjalan sekali saat komponen dimuat
  }, [searchParams]); 

  // <-- Hapus 'if (callbackError ...)' dari sini

  // Handle submit form di sisi client
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null); // Hapus error lama saat submit baru

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError('Email dan password harus diisi.');
      return;
    }

    try {
      // Panggil signIn dari next-auth/react
      const result = await signIn('credentials', {
        redirect: false, // Kita handle redirect manual
        email: email,
        password: password,
      });

      if (result?.error) {
        setError('Email atau password salah.');
      } else if (result?.ok) {
        // Jika berhasil, redirect ke halaman utama
        router.push('/');
      }
    } catch (err) { // <-- 3. Perbaiki error ESLint
      console.error('Login Gagal:', err); // Tampilkan error di console
      setError('Terjadi kesalahan. Coba lagi nanti.');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface">
      <form 
        onSubmit={handleSubmit} // <-- Ganti 'action' menjadi 'onSubmit'
        className="p-8 bg-white rounded-lg shadow-md w-96"
      >
        <h1 className="mb-6 text-2xl font-semibold text-center text-brand-dark">
          Login Admin
        </h1>
        
        {/* Tampilkan pesan error di sini */}
        {error && (
          <p className="mb-4 text-sm text-center text-red-600">{error}</p>
        )}

        <div className="mb-4">
          <label 
            htmlFor="email" 
            className="block mb-1 text-sm font-medium text-ink/80"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email" 
            required
            className="w-full px-3 py-2 border rounded-md border-ink/20 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>

        <div className="mb-6">
          <label 
            htmlFor="password" 
            className="block mb-1 text-sm font-medium text-ink/80"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 border rounded-md border-ink/20 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>

        <button 
          type="submit"
          className="w-full py-2 font-semibold text-white rounded-lg bg-brand-dark hover:bg-brand-dark/90"
        >
          Login
        </button>
      </form>
    </div>
  );
}