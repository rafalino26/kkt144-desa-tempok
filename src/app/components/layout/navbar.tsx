"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/lib/auth";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil Desa" },
  { href: "/data", label: "Data" },
  { href: "/potensi", label: "Potensi" },
  { href: "/umkm", label: "UMKM" },
  { href: "/berita", label: "Berita" },
  { href: "/layanan", label: "Layanan" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const { isAdmin, setIsAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-black/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block size-3 rounded-full bg-brand-primary" />
          <span>Desa Tempok</span>
        </Link>
        <nav className="ml-auto hidden lg:flex items-center gap-6">
          {navItems.map((it) => (
            <Link key={it.href} href={it.href} className="text-sm text-gray-700 hover:text-black">
              {it.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="ml-auto lg:ml-4 rounded-full border px-3 py-1.5 text-xs hover:bg-gray-50"
          aria-pressed={isAdmin}
        >
          {isAdmin ? "Admin: ON" : "Admin: OFF"}
        </button>
      </div>
    </header>
  );
}
