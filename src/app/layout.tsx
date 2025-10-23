// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppShell from './components/layout/AppShell';// Pastikan path ini benar

// --- Tambahan untuk v4 ---
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// -------------------------

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Website Desa Tempok',
  description: 'Situs Resmi Pemerintah Desa Tempok, Tompaso, Minahasa',
};

// 1. Ubah fungsi layout menjadi 'async'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Ambil session di sini
  const session = await getServerSession(authOptions);

  return (
    <html lang="id">
      <body className={inter.className}>
        {/* 3. Oper session ke AppShell */}
        <AppShell session={session}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}