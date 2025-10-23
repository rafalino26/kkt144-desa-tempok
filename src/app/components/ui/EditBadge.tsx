// src/components/EditBadge.tsx
import Link from 'next/link';
import { Pencil } from 'lucide-react';

interface EditBadgeProps {
  href: string; // Link ke halaman edit (misal: /admin/edit/hero)
  label: string; // Teks yang ditampilkan di badge (misal: "Edit Hero")
}

export default function EditBadge({ href, label }: EditBadgeProps) {
  return (
    <Link
      href={href}
      className="absolute top-4 right-4 z-10 
                 inline-flex items-center gap-1 
                 rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-white 
                 shadow-md transition-transform duration-200 
                 hover:scale-105 hover:bg-brand-primary/90"
      aria-label={`Edit ${label}`}
    >
      <Pencil size={14} />
      <span>{label}</span>
    </Link>
  );
}