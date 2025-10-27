'use client';

import { Edit, Users, Home as HomeIcon, Map, MapPin } from 'lucide-react';
import type { StatsData } from '@/app/types';
import StatsCard from '@/app/components/ui/StatsCard';

export type StatsSectionProps = {
  stats: StatsData;
  isAdmin: boolean;
  onEditClick: () => void;
};

export default function StatsSection({ stats, isAdmin, onEditClick }: StatsSectionProps) {
  return (
    <section className="relative">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Sekilas Info</h2>
          <p className="text-xs text-gray-500">
            Data dasar desa Tempok
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onEditClick}
            className="inline-flex items-center gap-1.5 self-start rounded-full
             bg-brand-light/70 px-3 py-1 text-xs font-medium text-brand-dark
             ring-1 ring-brand-dark/10
             hover:bg-brand-light hover:shadow-sm
             transition-colors"
>
            <Edit size={12} />
            Edit Data
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          Icon={Users}
          label="Jumlah Penduduk"
          value={stats.penduduk.toString()}
          unit="jiwa"
          lastUpdated={stats.lastUpdatedPenduduk}
        />

        <StatsCard
          Icon={HomeIcon}
          label="Jumlah KK"
          value={stats.kk.toString()}
          unit="KK"
          lastUpdated={stats.lastUpdatedKK}
        />

        <StatsCard
          Icon={Map}
          label="Luas Wilayah"
          value={stats.wilayah.toString()}
          unit="km²"
          lastUpdated={stats.lastUpdatedWilayah}
        />

        <StatsCard
          Icon={MapPin}
          label="Dusun"
          value={stats.dusun.toString()}
          unit=""
          lastUpdated={stats.lastUpdatedDusun}
        />
      </div>
    </section>
  );
}
