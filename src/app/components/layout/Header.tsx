// src/app/components/layout/Header.tsx
import Link from 'next/link';
import { Menu, LogIn, LogOut } from 'lucide-react';
import type { Session } from 'next-auth';
// Hapus 'redirect' karena sudah tidak dipakai di sini
// import { redirect } from 'next/navigation'; 
import { handleLogout } from '@/actions/auth'; // <-- 1. Impor action yang baru

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems: NavItem[];
  onMenuClick: () => void;
  session: Session | null;
}

// 2. HAPUS FUNGSI 'handleLogout' YANG ADA DI SINI
// async function handleLogout() {
//   'use server';
//   redirect('/api/auth/signout');
// }

export default function Header({ navItems, onMenuClick, session }: HeaderProps) {
  const isAdmin = !!session?.user;

  return (
    <header className="sticky top-0 z-10 w-full shadow-md bg-white text-ink">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        
        {/* GRUP KIRI: Burger (Mobile) + Logo */}
        <div className="flex items-center flex-shrink-0 gap-3">
          <button 
            onClick={onMenuClick}
            className="p-2 md:hidden"
            aria-label="Buka menu"
          >
            <Menu size={24} className="text-ink" />
          </button>
          <Link href="/" className="text-xl font-bold text-brand-dark">
            Desa Tempok
          </Link>
        </div>

        {/* GRUP TENGAH: Navigasi Desktop */}
        <nav className="items-center hidden space-x-6 md:flex">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="font-medium transition-colors text-ink/80 hover:text-brand-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* GRUP KANAN: Tombol Login/Logout */}
        <div className="flex items-center">
          {isAdmin ? (
            // 3. Gunakan 'handleLogout' yang sudah di-impor
            <form action={handleLogout}> 
              <button 
                type="submit" 
                className="flex items-center justify-center w-10 h-10 p-2 text-sm font-medium rounded-full text-red-600 
                           md:w-auto md:h-auto md:px-3 md:py-1.5 md:gap-2 md:rounded-md 
                           hover:bg-red-50 transition-colors"
                aria-label="Logout"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Logout</span> 
              </button>
            </form>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center justify-center w-10 h-10 p-2 text-sm font-medium rounded-full text-ink/80 
                         md:w-auto md:h-auto md:px-3 md:py-1.5 md:gap-2 md:rounded-md 
                         hover:bg-brand-light hover:text-brand-dark transition-colors"
              aria-label="Login"
            >
              <LogIn size={16} />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}