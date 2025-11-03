import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ClientLayout from './components/layout/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Website Desa Tempok',
  description: 'Situs Resmi Pemerintah Desa Tempok, Tompaso, Minahasa',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="id">
      <body className={inter.className}>
        <ClientLayout session={session}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
