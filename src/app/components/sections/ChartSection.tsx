'use client'; 

import React, { useEffect, useRef, useState } from 'react'; 
import dynamic from 'next/dynamic'; 
import AdminProfesiModal from '@/app/components/ui/AdminProfesiModal';
import { Edit } from 'lucide-react';
import type { ProfesiData } from '@/app/types'; // Impor tipe

// --- DEKLARASI TIPE 'google' ---
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any; 
  }
}
// -------------------------------------

// Impor MapComponent
const MapComponentWithNoSSR = dynamic(
  () => import('@/app/components/ui/MapComponent'), 
  { 
    ssr: false, 
    loading: () => <div className="flex h-full items-center justify-center text-gray-500">Memuat peta...</div>
  } 
);

// --- Palet Warna Besar ---
const PALETTE_LENGKAP = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#E34234', '#F3A0F2', '#A0E6F3', '#F3E7A0', '#A0F3AD',
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D'
];
// ----------------------------------------

// --- Komponen Internal 3D Pie Chart ---
interface ProfesiPieChart3DProps {
  data: ProfesiData[];
  colors: string[];
}
const ProfesiPieChart3D = ({ data, colors }: ProfesiPieChart3DProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const drawChart = () => {
    if (!chartRef.current || !window.google || !window.google.visualization) return;
    if (data.length === 0) {
       if (chartRef.current) {
         chartRef.current.innerHTML = '<div class="text-gray-500">Tidak ada data.</div>';
       }
       return;
    }
    const dataForGoogle = [
      ['Profesi', 'Jumlah'],
      ...data.map(item => [item.name, item.value])
    ];
    const dataTable = window.google.visualization.arrayToDataTable(dataForGoogle);
    const options = {
      is3D: true, 
      backgroundColor: 'transparent', 
      legend: { position: 'bottom', maxLines: 3 },
      chartArea: { left: '5%', top: '10%', width: '90%', height: '70%' },
      colors: colors, 
      fontName: 'Inter', 
      titleTextStyle: { fontSize: 16, bold: false },
      legendTextStyle: { fontSize: 12 },
    };
    const chart = new window.google.visualization.PieChart(chartRef.current);
    chart.draw(dataTable, options);
  };

  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const loadAndDraw = () => {
      if (window.google && window.google.charts) {
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(drawChart);
      } else {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.onload = () => {
          window.google.charts.load('current', { packages: ['corechart'] });
          window.google.charts.setOnLoadCallback(drawChart);
        };
        document.body.appendChild(script);
      }
    };
    loadAndDraw();
    drawChart(); 
    const handleResize = () => { if(chartRef.current) { drawChart(); } };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data, colors]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
  );
};
// ---------------------------------------------


interface ChartSectionProps {
  isAdmin: boolean;
}

export default function ChartSection({ isAdmin }: ChartSectionProps) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Data dummy (nanti ambil dari firestore)
  const [dataProfesi, setDataProfesi] = useState<ProfesiData[]>([
    { name: 'Petani', value: 450 },
    { name: 'Wiraswasta', value: 150 },
    { name: 'PNS/TNI/Polri', value: 100 },
    { name: 'Karyawan Swasta', value: 120 },
    { name: 'Lainnya', value: 80 },
  ]);

  const handleSimpanData = (newData: ProfesiData[]) => {
    console.log("Menyimpan data profesi baru:", newData);
    // TODO: Simpan ke Firestore
    setDataProfesi(newData); 
    setIsModalOpen(false); 
  };
  
  const chartColors = dataProfesi.map((_, index) => 
    PALETTE_LENGKAP[index % PALETTE_LENGKAP.length]
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

      {/* Kolom 1: Grafik Profesi */}
      <div className="relative">
        <h2 className="mb-4 text-2xl font-semibold text-ink">
          Grafik Profesi Penduduk
        </h2>
        
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-0 right-0 flex items-center gap-1.5 rounded-full
                       bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700
                       hover:bg-blue-200 transition-colors"
          >
            <Edit size={12} />
            Edit Data
          </button>
        )}

        <div className="rounded-xl bg-white p-6 shadow-sm min-h-[400px] flex items-center justify-center overflow-hidden">
          <div style={{ width: '100%', height: '350px' }}>
            <ProfesiPieChart3D data={dataProfesi} colors={chartColors} />
          </div>
        </div>
      </div>

      {/* Kolom 2: Peta Lokasi (Perbaikan overflow & z-index) */}
      <div className="relative z-10"> {/* z-10 untuk bug 'tembus' modal */}
        <h2 className="mb-4 text-2xl font-semibold text-ink">
          Lokasi Kami
        </h2>
        {/* Kontainer luar (400px + padding) */}
        <div className="rounded-xl bg-white shadow-sm h-[400px] p-3">
           {/* Kontainer dalam (mengisi sisa ruang & memotong) */}
           <div className="h-full w-full overflow-hidden rounded-lg">
             <MapComponentWithNoSSR />
           </div>
        </div>
      </div>

      {/* --- RENDER MODAL --- */}
      {isModalOpen && (
        <AdminProfesiModal
          initialData={dataProfesi}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSimpanData}
        />
      )}
    </section>
  );
}