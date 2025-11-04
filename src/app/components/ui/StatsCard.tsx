import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
  lastUpdated?: string | null;
}

export default function StatsCard({
  Icon,
  label,
  value,
  unit,
  lastUpdated,
}: StatsCardProps) {
  const formattedUpdatedAt = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div
      className="
        group rounded-xl p-5 shadow-sm
        bg-elev border border-border
        transition-all duration-200
        hover:bg-brand-primary hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">
        <span
          className="
            text-sm font-medium text-ink/70
            transition-colors duration-200 group-hover:text-brand-dark
          "
        >
          {label}
        </span>

        <Icon
          size={20}
          className="
            text-brand-primary
            transition-colors duration-200 group-hover:text-brand-dark
          "
        />
      </div>

      <p
        className="
          mt-2 text-3xl font-bold text-ink
          transition-colors duration-200 group-hover:text-brand-dark
        "
      >
        {value}{' '}
        {unit && (
          <span className="text-base font-normal text-ink/80 group-hover:text-brand-dark/90">
            {unit}
          </span>
        )}
      </p>

      {formattedUpdatedAt && (
        <p
          className="
            mt-2 text-[11px] leading-tight
            text-ink/70 transition-colors duration-200 group-hover:text-brand-dark/80
          "
        >
          <span className="font-medium text-ink/80 group-hover:text-brand-dark">
            {formattedUpdatedAt}
          </span>
        </p>
      )}
    </div>
  );
}
