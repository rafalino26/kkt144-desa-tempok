import EditBadge from '@/app/components/ui/EditBadge';
import StatsCard from '@/app/components/ui/StatsCard';
import { Users, UsersRound, Map, Home } from 'lucide-react'; // Impor ikon baru

interface StatsSectionProps {
  stats: {
    penduduk: number;
    kk: number;
    wilayah: number;
    dusun: number;
  };
  isAdmin: boolean;
}

export default function StatsSection({ stats, isAdmin }: StatsSectionProps) {
  return (
    <section className="relative">
      <h2 className="mb-4 text-2xl font-semibold text-ink">
        Sekilas Info
      </h2>
      {isAdmin && (
        <EditBadge href="/admin/edit/stats" label="Edit Statistik" />
      )}
      {/* Grid 2 kolom di mobile (<md), 4 di desktop (md:) */}
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
          // Format angka dengan 1 desimal jika perlu
          value={stats.wilayah.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}
          unit="Hektar"
        />
        <StatsCard
          Icon={Home}
          label="Jumlah Dusun"
          value={stats.dusun.toLocaleString('id-ID')}
          unit="Dusun"
        />

      </div>
    </section>
  );
}