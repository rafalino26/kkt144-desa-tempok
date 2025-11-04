'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LogIn, LogOut, Sun, Moon } from 'lucide-react';
import LoginModal from '../ui/LoginModal';
import ConfirmLogoutModal from '../ui/ConfirmLogoutModal';
import { Session } from 'next-auth';  


interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems: NavItem[];
  onMenuClick: () => void;
  session: Session | null; 
}

export default function Header({ navItems, onMenuClick, session }: HeaderProps) {
  const isAdmin = !!session?.user; 
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? '';

  const normalize = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);
  const isActive = (href: string) => {
    const cur = normalize(pathname);
    const target = normalize(href);
    if (target === '/') return cur === '/';
    return cur === target || cur.startsWith(`${target}/`);
  };

  const fullNav = [
    ...navItems,
    { label: 'Tentang KKT-144', href: '/kkt-144' },
  ];

  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const applyTheme = (t: 'light' | 'dark') => {
    const root = document.documentElement;
    if (t === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  };

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined'
      ? window.matchMedia?.('(prefers-color-scheme: dark)').matches
      : false;

    const initial: 'light' | 'dark' =
      saved === 'dark' || (!saved && prefersDark) ? 'dark' : 'light';

    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch {}
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full
          bg-elev text-ink border-b border-border
          shadow-md`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* --- Left: Logo + Menu Button --- */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <button onClick={onMenuClick} className="p-2 md:hidden" aria-label="Buka menu">
              <Menu size={24} className="text-ink/90" />
            </button>
            <Link href="/" className="text-xl font-bold dark:text-brand-primary">
              Desa Tempok
            </Link>
          </div>

          {/* --- Middle: Navigation --- */}
          <nav className="hidden items-center space-x-6 md:flex">
            {fullNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`font-medium transition-colors ${
                    active
                      ? 'text-brand-primary'
                      : 'text-ink/80 hover:text-brand-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* --- Right: Theme Toggle + Login/Logout --- */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted ? (
              <button
                onClick={toggleTheme}
                className="
                  inline-flex items-center justify-center
                  w-10 h-10 rounded-full
                  hover:bg-muted
                  border border-border
                  transition
                "
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                {theme === 'dark' ? <Sun size={18} className="text-ink/90" /> : <Moon size={18} className="text-ink/90" />}
              </button>
            ) : (
              /* spacer to avoid layout shift before mounted */
              <div className="w-10 h-10" aria-hidden />
            )}

            {/* Auth buttons */}
            {isAdmin ? (
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

      {/* --- Modal --- */}
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      {isConfirmOpen && <ConfirmLogoutModal onClose={() => setIsConfirmOpen(false)} />}
    </>
  );
}
