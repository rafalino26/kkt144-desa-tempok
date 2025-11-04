'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react'; 
import { useRouter } from 'next/navigation'; 
import { X } from 'lucide-react';
import InputPasswordWithToggle from './InputPasswordWithToggle';

interface LoginModalProps {
  onClose: () => void; 
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter(); 
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null); 
    setIsLoading(true);

    if (!email || !password) {
      setError('Email dan password harus diisi.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false, 
        email: email,
        password: password,
      });

      setIsLoading(false); 

      if (result?.error) {

        setError(result.error === 'CredentialsSignin' 
                 ? 'Email atau password salah.' 
                 : 'Terjadi kesalahan. Coba lagi nanti.');
      } else if (result?.ok) {
        onClose();
        router.refresh();
      }
    } catch (err) { 
      setIsLoading(false);
      console.error('Login Gagal:', err); 
      setError('Terjadi kesalahan yang tidak diketahui. Coba lagi nanti.');
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70"
      onClick={onClose}
    >
      <div 
        className="relative p-8 bg-white dark:bg-elev rounded-lg shadow-md w-96"
        onClick={(e) => e.stopPropagation()} 
      >

        <button 
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-3 right-3 rounded-full p-1.5 text-gray-500 dark:text-ink/70 hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <h1 className="mb-6 text-2xl font-semibold text-center text-brand-dark dark:text-ink">
          Login Admin
        </h1>
        
        {error && (
          <p className="mb-4 text-sm text-center text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="modal-email" 
              className="block mb-1 text-sm font-medium text-ink/80 dark:text-ink/60"
            >
              Email
            </label>
            <input
              type="email"
              id="modal-email"
              name="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border rounded-md border-ink/20 dark:border-ink/40 focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:bg-gray-100 dark:disabled:bg-elev/60 text-ink dark:text-ink"
              placeholder="Masukkan email Anda"     
            />
          </div>

          <div>
            <InputPasswordWithToggle
              label="Password" 
              id="modal-password"  
              name="password"  
              required
              value={password} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
              disabled={isLoading}
              className="border-ink/20 dark:border-ink/40 focus:ring-brand-primary dark:focus:ring-brand-primary/60 disabled:bg-gray-100 dark:disabled:bg-elev/60" 
              placeholder="Masukkan password Anda"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-2 font-semibold text-white rounded-lg bg-brand-primaru hover:bg-brand-dark/90
                       disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-brand-primary dark:hover:bg-brand-dark/80 dark:disabled:bg-brand-dark/60" 
          >
            {isLoading ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
