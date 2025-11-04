'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import AdminProfesiModal from '@/app/components/ui/AdminProfesiModal';
import { Edit } from 'lucide-react';
import type { ProfesiData, ProfesiSectionData } from '@/app/types';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

const MapComponentWithNoSSR = dynamic(
  () => import('@/app/components/ui/MapComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-gray-500 dark:text-ink/70">
        Memuat peta...
      </div>
    ),
  }
);

const PALETTE_LENGKAP = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#E34234', '#F3A0F2', '#A0E6F3', '#F3E7A0', '#A0F3AD',
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
];

function ProfesiPieChart3D({ data, colors }: { data: ProfesiData[]; colors: string[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  const drawChart = React.useCallback(() => {
    if (!chartRef.current || !window.google || !window.google.visualization) return;

    if (data.length === 0) {
      chartRef.current.innerHTML =
        '<div class="text-gray-500 dark:text-ink/70 text-sm">Tidak ada data.</div>';
      return;
    }

    const dataTable = window.google.visualization.arrayToDataTable([
      ['Profesi', 'Jumlah'],
      ...data.map((item) => [item.name, item.value]),
    ]);

    // Detect dark mode via <html>.dark
    const isDark =
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark');

    const legendColor = isDark ? '#E8EAEE' : '#171717';
    const titleColor  = isDark ? '#E8EAEE' : '#171717';

    const options = {
      is3D: true,
      backgroundColor: 'transparent',
      legend: { position: 'bottom', maxLines: 3, textStyle: { color: legendColor, fontSize: 12 } },
      titleTextStyle: { color: titleColor, fontSize: 16, bold: false },
      chartArea: { left: '5%', top: '10%', width: '90%', height: '70%' },
      colors,
      fontName: 'Inter',
    };

    const chart = new window.google.visualization.PieChart(chartRef.current);
    chart.draw(dataTable, options);
  }, [data, colors]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadAndDraw = () => {
      if (window.google?.charts) {
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(drawChart);
      } else {
        const s = document.createElement('script');
        s.src = 'https://www.gstatic.com/charts/loader.js';
        s.async = true;
        s.onload = () => {
          window.google.charts.load('current', { packages: ['corechart'] });
          window.google.charts.setOnLoadCallback(drawChart);
        };
        document.body.appendChild(s);
      }
    };

    loadAndDraw();
    drawChart();

    const handleResize = () => drawChart();
    window.addEventListener('resize', handleResize);

    // redraw when <html> class changes (dark ↔ light)
    const observer = new MutationObserver(drawChart);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [drawChart]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
}


interface ChartSectionProps {
  isAdmin: boolean;
  profesiData: ProfesiSectionData;
  onSaveProfesi: (items: ProfesiData[]) => void;
}

export default function ChartSection({ isAdmin, profesiData, onSaveProfesi }: ChartSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items, lastUpdated } = profesiData;

  const chartColors = items.map(
    (_, index) => PALETTE_LENGKAP[index % PALETTE_LENGKAP.length]
  );

  const formattedUpdatedAt = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const handleSimpanData = (newItems: ProfesiData[]) => {
    onSaveProfesi(newItems);
    setIsModalOpen(false);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* --- Grafik Profesi --- */}
      <div className="relative">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Grafik Profesi Penduduk</h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                inline-flex items-center gap-1.5 self-start rounded-full
                bg-brand-primary/90 px-3 py-1 text-xs font-medium text-black
                ring-1 ring-brand-dark/10
                hover:bg-brand-light hover:shadow-sm
                transition-colors
              "
            >
              <Edit size={12} />
              Edit Data
            </button>
          )}
        </div>

        <div
          className="
            rounded-xl bg-white dark:bg-elev
            p-6 shadow-sm min-h-[400px] flex flex-col overflow-hidden
            border border-gray-100 dark:border-border
          "
        >
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div style={{ width: '100%', height: '320px' }}>
              <ProfesiPieChart3D data={items} colors={chartColors} />
            </div>
          </div>

          {formattedUpdatedAt && (
            <div className="mt-6 border-t border-gray-100 dark:border-border pt-4 text-center">
              <p className="text-[11px] leading-tight dark:text-brand-primary">
                <span className="block text-[10px] uppercase tracking-wide text-gray-400 dark:text-brand-primary">
                  Terakhir diperbarui
                </span>
                <span className="font-medium text-gray-600 dark:text-ink/80">
                  {formattedUpdatedAt}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- Map --- */}
      <div className="relative z-10">
        <h2 className="mb-4 text-2xl font-semibold text-ink">Lokasi Desa</h2>

        <div
          className="
            rounded-xl bg-white dark:bg-elev shadow-sm h-[400px] p-3
            border border-gray-100 dark:border-border
          "
        >
          <div className="h-full w-full overflow-hidden rounded-lg">
            <MapComponentWithNoSSR />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AdminProfesiModal
          initialData={items}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSimpanData}
        />
      )}
    </section>
  );
}
