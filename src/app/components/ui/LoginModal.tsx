'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react'; 
import { useRouter } from 'next/navigation'; // Kita mungkin butuh ini untuk refresh
import { X } from 'lucide-react';
import InputPasswordWithToggle from './InputPasswordWithToggle';

interface LoginModalProps {
  onClose: () => void; // Fungsi untuk menutup modal
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter(); // Untuk refresh halaman setelah login
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State loading

  // Handle submit form
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null); 
    setIsLoading(true); // Mulai loading

    if (!email || !password) {
      setError('Email dan password harus diisi.');
      setIsLoading(false); // Hentikan loading
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false, // Penting! Jangan redirect otomatis
        email: email,
        password: password,
      });

      setIsLoading(false); // Hentikan loading

      if (result?.error) {
        // Tampilkan pesan error spesifik dari next-auth jika ada
        setError(result.error === 'CredentialsSignin' 
                 ? 'Email atau password salah.' 
                 : 'Terjadi kesalahan. Coba lagi nanti.');
      } else if (result?.ok) {
        onClose(); // Tutup modal jika berhasil
        router.refresh(); // Refresh halaman untuk update session di header
      }
    } catch (err) { 
      setIsLoading(false); // Hentikan loading
      console.error('Login Gagal:', err); 
      setError('Terjadi kesalahan yang tidak diketahui. Coba lagi nanti.');
    }
  }

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // Tutup jika klik backdrop
    >
      {/* Konten Modal */}
      <div 
        className="relative p-8 bg-white rounded-lg shadow-md w-96"
        onClick={(e) => e.stopPropagation()} // Cegah klik di dalam modal menutupnya
      >
        {/* Tombol Close (X) */}
        <button 
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-3 right-3 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <h1 className="mb-6 text-2xl font-semibold text-center text-brand-dark">
          Login Admin
        </h1>
        
        {error && (
          <p className="mb-4 text-sm text-center text-red-600">{error}</p>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="modal-email" 
              className="block mb-1 text-sm font-medium text-ink/80"
            >
              Email
            </label>
            <input
              type="email"
              id="modal-email" // Gunakan id unik
              name="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border rounded-md border-ink/20 focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:bg-gray-100"
            placeholder="Masukkan email Anda"     
           />
          </div>

          <div>
            <InputPasswordWithToggle
              label="Password" 
              id="modal-password" // Gunakan id unik   
              name="password"  
              required
              value={password} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
              disabled={isLoading}
              className="border-ink/20 focus:ring-brand-primary disabled:bg-gray-100" 
              placeholder="Masukkan password Anda"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-2 font-semibold text-white rounded-lg bg-brand-dark hover:bg-brand-dark/90
                       disabled:bg-gray-400 disabled:cursor-not-allowed" // Style saat loading
          >
            {isLoading ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}