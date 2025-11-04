'use client';

import React from 'react';
import { X, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

type Props = { onClose: () => void };

export default function ConfirmLogoutModal({ onClose }: Props) {
  const handleLogout = () => {
    // Hapus flag 'wasLoggedIn' setelah logout
    localStorage.removeItem("wasLoggedIn");

    // Pastikan flag sudah terhapus
    console.log('Flag after removal:', localStorage.getItem("wasLoggedIn"));

    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70"
         aria-modal="true" role="dialog" onClick={onClose}>
      <div 
        className="w-full max-w-sm rounded-xl bg-white dark:bg-elev p-5 shadow-xl dark:border dark:border-border" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink dark:text-ink">Konfirmasi Logout</h3>
          <button 
            onClick={onClose} 
            className="rounded p-1 text-gray-500 dark:text-ink/70 hover:bg-gray-100 dark:hover:bg-white/10" 
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-ink/80">Kamu yakin ingin keluar dari sesi admin?</p>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button 
            onClick={onClose} 
            className="rounded-md px-3 py-1.5 text-sm font-medium text-ink dark:text-ink hover:bg-gray-100 dark:hover:bg-elev/80"
          >
            Batal
          </button>

          <button
            onClick={handleLogout}  // Panggil handleLogout yang menghapus localStorage
            className="inline-flex items-center gap-1.5 rounded-md bg-red-600 dark:bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 dark:hover:bg-red-400"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
