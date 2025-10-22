import React from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
};

export default function StatCard({ label, value, unit, hint }: StatCardProps) {
  return (
    <div className="relative rounded-xl bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-black/5 p-4 sm:p-5">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <div className="text-2xl sm:text-3xl font-semibold text-brand-dark">{value}</div>
        {unit && <div className="text-sm text-gray-500">{unit}</div>}
      </div>
      {hint && <div className="mt-1 text-xs text-gray-500">{hint}</div>}
    </div>
  );
}
