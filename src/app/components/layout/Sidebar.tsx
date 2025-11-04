'use client';

import Link from 'next/link';
import { X, LogIn, LogOut } from 'lucide-react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';  

interface NavItem { label: string; href: string; }
interface SidebarProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
}

export default function Sidebar({ navItems, isOpen, onClose, session }: SidebarProps) {
  const isAdmin = !!session?.user;

  // ✅ Tambahkan menu baru di sini juga
  const fullNav = [
    ...navItems,
    { label: 'Tentang KKT-144', href: '/kkt-144' },
  ];

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } md:hidden`}
      />
      <aside
        className={`fixed top-0 left-0 z-30 flex h-full w-72 flex-col bg-brand-primary p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink dark:text-black">Menu</h2>
          <button onClick={onClose} aria-label="Tutup menu">
            <X size={24} className="text-brand-dark" />
          </button>
        </div>

        <nav className="flex grow flex-col space-y-4">
          {fullNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="block rounded-md px-4 py-3 text-lg text-ink hover:bg-brand-primary dark:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-brand-dark/10 pt-4">
          {isAdmin ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })} 
              className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-lg text-red-600 hover:bg-red-50"
            >
              <LogOut size={22} />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-lg text-black dark:text-black hover:bg-brand-primary"
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
