"use client";

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import type { Session } from 'next-auth'; 

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Desa', href: '/profil' },
  { label: 'Potensi Desa', href: '/potensi' },
  { label: 'Berita', href: '/berita' },
  { label: 'Kontak', href: '/kontak' },
];

export default function AppShell({ 
  children,
  session
}: { 
  children: React.ReactNode,
  session: Session | null 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        navItems={navItems} 
        onMenuClick={() => setIsSidebarOpen(true)} 
        session={session} 
      />

      <Sidebar 
        navItems={navItems} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        session={session} 
      />

      <main className="flex-grow">
        {children}
      </main>

      <footer className="w-full p-4 text-center bg-gradient-to-br from-brand-primary/90 via-brand-light/70 to-brand-primary/60 text-brand-dark">
        <p>© 2025 Desa Tempok, Tompaso, Minahasa. Mahasiswa KKT [Nama Univ].</p>
      </footer>
    </div>
  );
}