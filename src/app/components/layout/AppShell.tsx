"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import type { Session } from "next-auth";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Profil Desa", href: "/profil" },
  { label: "Potensi Desa", href: "/potensi" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
];

export default function AppShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      {/* Header */}
      <Header
        navItems={navItems}
        onMenuClick={() => setIsSidebarOpen(true)}
        session={session}
      />

      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        session={session}
      />

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer
        className="
          w-full p-4 text-center shadow-xl border-t border-black/5
          bg-white text-ink
          dark:bg-elev dark:text-ink dark:border-border
          transition-colors duration-300
        "
      >
        <p className="text-sm">
          © Desa Tempok, Tompaso, Minahasa. KKT-144 Universitas Sam Ratulangi.
        </p>
      </footer>
    </div>
  );
}
