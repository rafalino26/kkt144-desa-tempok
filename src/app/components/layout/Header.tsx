'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, LogIn, LogOut } from 'lucide-react';
import type { Session } from 'next-auth';
import LoginModal from '../ui/LoginModal';
import ConfirmLogoutModal from '../ui/ConfirmLogoutModal';

interface NavItem { label: string; href: string; }
interface HeaderProps {
  navItems: NavItem[];
  onMenuClick: () => void;
  session: Session | null;
}

export default function Header({ navItems, onMenuClick, session }: HeaderProps) {
  const isAdmin = !!session?.user;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // ⬅️ baru

  return (
    <>
      <header className="sticky top-0 z-30 w-full shadow-md bg-white text-ink">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex flex-shrink-0 items-center gap-3">
            <button onClick={onMenuClick} className="p-2 md:hidden" aria-label="Buka menu">
              <Menu size={24} className="text-ink" />
            </button>
            <Link href="/" className="text-xl font-bold text-brand-dark">Desa Tempok</Link>
          </div>

          <nav className="hidden items-center space-x-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}
                className="font-medium text-ink/80 transition-colors hover:text-brand-primary">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            {isAdmin ? (
              // Tombol ini SEKARANG hanya buka modal
              <button
                onClick={() => setIsConfirmOpen(true)}
                className="flex items-center justify-center w-10 h-10 p-2 text-sm font-medium rounded-full text-red-600 
                           md:w-auto md:h-auto md:px-3 md:py-1.5 md:gap-2 md:rounded-md hover:bg-red-50 transition-colors"
                aria-label="Logout"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Logout</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center justify-center w-10 h-10 p-2 text-sm font-medium rounded-full text-ink/80 
                           md:w-auto md:h-auto md:px-3 md:py-1.5 md:gap-2 md:rounded-md hover:bg-brand-light hover:text-brand-dark transition-colors"
                aria-label="Login"
              >
                <LogIn size={16} />
                <span className="hidden md:inline">Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      {isConfirmOpen && <ConfirmLogoutModal onClose={() => setIsConfirmOpen(false)} />}
    </>
  );
}
