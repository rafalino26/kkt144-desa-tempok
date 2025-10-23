// src/app/components/layout/Sidebar.tsx
import Link from 'next/link';
import { X, LogIn, LogOut } from 'lucide-react';
import type { Session } from 'next-auth';
// Hapus 'redirect'
import { handleLogout } from '@/actions/auth'; // <-- 1. Impor action yang baru

interface NavItem {
  label: string;
  href: string;
}

interface SidebarProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
}

// 2. HAPUS FUNGSI 'handleLogout' YANG ADA DI SINI
// async function handleLogout() {
//   'use server';
//   redirect('/api/auth/signout');
// }

export default function Sidebar({ navItems, isOpen, onClose, session }: SidebarProps) {
  const isAdmin = !!session?.user;

  return (
    <>
      {/* 1. Backdrop (Overlay) */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } md:hidden`} 
      />

      {/* 2. Panel Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 flex flex-col h-full w-72 bg-brand-light p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`} 
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-brand-dark">Menu</h2>
          <button onClick={onClose} aria-label="Tutup menu">
            <X size={24} className="text-brand-dark" />
          </button>
        </div>

        {/* Daftar Link Navigasi */}
        <nav className="flex flex-col flex-grow space-y-4">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              onClick={onClose}
              className="block px-4 py-3 text-lg rounded-md text-brand-dark hover:bg-brand-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 3. Tombol Login/Logout (Hanya Mobile) */}
        <div className="pt-4 mt-auto border-t border-brand-dark/10">
          {isAdmin ? (
            // 3. Gunakan 'handleLogout' yang sudah di-impor
            <form action={handleLogout} className="w-full">
              <button 
                type="submit" 
                className="flex items-center w-full gap-3 px-4 py-3 text-lg rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut size={22} />
                Logout
              </button>
            </form>
          ) : (
            <Link 
              href="/login" 
              onClick={onClose} 
              className="flex items-center w-full gap-3 px-4 py-3 text-lg rounded-md text-brand-dark hover:bg-brand-primary"
            >
              <LogIn size={22} />
              Login
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}