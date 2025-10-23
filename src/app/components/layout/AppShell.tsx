// src/app/components/AppShell.tsx
"use client";

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import type { Session } from 'next-auth'; // <-- Impor tipe Session

// Definisikan tipe untuk props
interface NavItem {
  label: string;
  href: string;
}

// Data link navigasi
const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Desa', href: '/profil' },
  { label: 'Potensi Desa', href: '/potensi' },
  { label: 'Berita', href: '/berita' },
  { label: 'Kontak', href: '/kontak' },
];

// Terima prop 'session'
export default function AppShell({ 
  children,
  session
}: { 
  children: React.ReactNode,
  session: Session | null // <-- Terima prop session
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER (NAVBAR DESKTOP) */}
      <Header 
        navItems={navItems} 
        onMenuClick={() => setIsSidebarOpen(true)} 
        session={session} // <-- Oper session ke Header
      />

      {/* SIDEBAR (NAVIGASI MOBILE) */}
      <Sidebar 
        navItems={navItems} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        session={session} // <-- Oper session ke Sidebar
      />

      {/* Konten Utama Halaman */}
      <main className="flex-grow">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full p-6 text-center bg-brand-dark text-surface">
        <p>© 2025 Desa Tempok, Tompaso, Minahasa. Mahasiswa KKT [Nama Univ].</p>
      </footer>
    </div>
  );
}