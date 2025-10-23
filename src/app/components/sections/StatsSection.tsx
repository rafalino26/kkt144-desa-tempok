'use client';

import StatsCard from '@/app/components/ui/StatsCard';
import { Users, UsersRound, Map, Home, Edit } from 'lucide-react'; 
import type { StatsData } from '@/app/types'; // Impor tipe

interface StatsSectionProps {
  stats: StatsData; // Gunakan tipe yang diimpor
  isAdmin: boolean;
  onEditClick: () => void;
}

export default function StatsSection({ stats, isAdmin, onEditClick }: StatsSectionProps) {
  return (
    <section className="relative mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-ink">
          Sekilas Info
        </h2>
        {isAdmin && (
          <button
            onClick={onEditClick}
            className="flex items-center gap-1.5 rounded-full
                       bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700
                       hover:bg-blue-200 transition-colors"
          >
            <Edit size={12} />
            Edit Info
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        <StatsCard
          Icon={Users}
          label="Jumlah Penduduk"
          value={stats.penduduk.toLocaleString('id-ID')}
          unit="Jiwa"
        />
        <StatsCard
          Icon={UsersRound}
          label="Jumlah KK"
          value={stats.kk.toLocaleString('id-ID')}
          unit="Keluarga"
        />
        <StatsCard
          Icon={Map}
          label="Luas Wilayah"
          value={stats.wilayah.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}
          unit="Hektar"
        />
        <StatsCard
          Icon={Home}
          label="Jumlah Jaga"
          value={stats.dusun.toLocaleString('id-ID')}
          unit="Jaga"
        />
      </div>
    </section>
  );
}