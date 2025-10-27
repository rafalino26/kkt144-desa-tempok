'use client';

import Link from 'next/link';
import { Edit } from 'lucide-react'; 

interface HeroSectionProps {
  title: string;
  subtitle: string;
  isAdmin: boolean;
  onEditClick: () => void;
}

export default function HeroSection({ title, subtitle, isAdmin, onEditClick }: HeroSectionProps) {
  return (
    <section className="relative rounded-2xl overflow-hidden
                       bg-gradient-to-br from-brand-primary/70 via-brand-light/60 to-brand-primary/70
                       border border-black/5 shadow-sm">

      {isAdmin && (
        <button
          onClick={onEditClick}
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full
                     bg-white/80 px-3 py-1 text-xs font-medium text-brand-dark
                     hover:bg-white transition-colors backdrop-blur-sm shadow-sm" 
        >
          <Edit size={12} />
          Edit Info
        </button>
      )}

      <div className="px-6 py-10 sm:px-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand-dark">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-brand-dark/90">
          {subtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/profil"
            className="inline-flex items-center rounded-lg bg-white text-brand-dark px-4 py-2 text-sm font-semibold shadow-sm hover:bg-white/90"
          >
            Lihat Profil
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center rounded-lg border border-brand-dark/30 px-4 py-2 text-sm font-medium text-brand-dark hover:bg-white/50"
          >
            Kontak
          </Link>
        </div>
      </div>
    </section>
  );
}