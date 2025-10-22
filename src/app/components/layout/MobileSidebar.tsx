"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/lib/auth";

const nav = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/data", label: "Data" },
  { href: "/potensi", label: "Potensi" },
  { href: "/umkm", label: "UMKM" },
  { href: "/berita", label: "Berita" },
  { href: "/layanan", label: "Layanan" },
  { href: "/kontak", label: "Kontak" },
];

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const { isAdmin, setIsAdmin } = useAuth();

  return (
    <div className="sticky top-0 z-50 md:hidden">
      <div className="h-14 bg-white/90 backdrop-blur border-b border-black/5 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border hover:bg-gray-50"
        >
          <span aria-hidden>≡</span>
          <span className="text-sm">Menu</span>
        </button>
        <span className="font-semibold">Desa Tempok</span>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="rounded-full border px-3 py-1.5 text-xs hover:bg-gray-50"
          aria-pressed={isAdmin}
        >
          {isAdmin ? "Admin: ON" : "Admin: OFF"}
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-80 max-w-[85%] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.12)] border-r border-black/5 transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog" aria-modal="true" aria-label="Menu"
      >
        <div className="h-14 px-4 flex items-center justify-between border-b border-black/5">
          <span className="font-semibold">Navigasi</span>
          <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-sm rounded-md border hover:bg-gray-50" aria-label="Close">
            Tutup
          </button>
        </div>
        <nav className="p-3">
          {nav.map((i) => (
            <Link key={i.href} href={i.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 pb-4 text-xs text-gray-500">© {new Date().getFullYear()} Desa Tempok</div>
      </aside>
    </div>
  );
}
