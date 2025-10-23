// src/app/components/sections/ChartSection.tsx
'use client'; // <-- TAMBAHKAN BARIS INI

import EditBadge from '@/app/components/ui/EditBadge';
import { PieChart, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic'; // <-- Tetap butuh ini

// Impor MapComponent secara dinamis, nonaktifkan SSR
const MapComponentWithNoSSR = dynamic(
  () => import('@/app/components/ui/MapComponent'), // Path ke MapComponent kamu
  { ssr: false } // <-- Ini sekarang diizinkan karena ada 'use client' di atas
);

interface ChartSectionProps {
  isAdmin: boolean;
}

// Ganti URL ini dengan link Google Maps Desa Tempok yang benar
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/5W1uYcjAhGPSMng47";

export default function ChartSection({ isAdmin }: ChartSectionProps) {
  return (
    // Section utama sekarang berisi grid 2 kolom
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

      {/* Kolom 1: Grafik Profesi */}
      <div className="relative">
        <h2 className="mb-4 text-2xl font-semibold text-ink">
          Grafik Profesi Penduduk
        </h2>
        {isAdmin && (
          <EditBadge href="/admin/edit/profesi" label="Edit Data Profesi" />
        )}
        <div className="rounded-xl bg-white p-6 shadow-sm min-h-[300px]
                        flex flex-col items-center justify-center text-center">
          <PieChart size={64} className="text-gray-400" />
          <p className="mt-4 text-gray-500">
            [Placeholder untuk Pie Chart Profesi]
          </p>
          <p className="text-sm text-gray-400">
            (Nanti bisa pakai Recharts/Chart.js)
          </p>
        </div>
      </div>

      {/* Kolom 2: Peta Lokasi */}
      <div className="relative">
        <h2 className="mb-4 text-2xl font-semibold text-ink">
          Lokasi Kami
        </h2>
        {/* Kita tidak perlu EditBadge di sini karena link peta statis */}
        <div className="rounded-xl bg-white shadow-sm p-3 h-[300px] lg:h-full min-h-[300px]">
           {/* Komponen peta akan dirender di sini, hanya di client */}
           <MapComponentWithNoSSR />
        </div>
      </div>

    </section>
  );
}