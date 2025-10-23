import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
}

export default function StatsCard({ Icon, label, value, unit }: StatsCardProps) {
  return (
    // 'group' memungkinkan kita mengubah style anak (icon, text) saat parent (div) di-hover
    <div className="group rounded-xl bg-white p-5 shadow-sm
                    transition-all duration-300 ease-in-out
                    hover:bg-gradient-to-br from-brand-primary/80 via-brand-light/70 to-brand-primary/80
                    hover:shadow-lg"> {/* Hapus hover:text-white dari parent */}

      <div className="flex items-center justify-between">
        {/* Ganti text-white/90 menjadi text-brand-dark/90 */}
        <span className="text-sm font-medium text-ink/70 transition-colors duration-300 group-hover:text-brand-dark/90">
          {label}
        </span>
        {/* Ganti text-white menjadi text-brand-dark */}
        <Icon
          size={20}
          className="text-brand-primary transition-colors duration-300 group-hover:text-brand-dark"
        />
      </div>
      {/* Ganti text-white menjadi text-brand-dark */}
      <p className="mt-2 text-3xl font-bold text-ink transition-colors duration-300 group-hover:text-brand-dark">
        {value} <span className="text-base font-normal">{unit}</span>
      </p>
    </div>
  );
}