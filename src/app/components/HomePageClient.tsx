'use client';

import React, { useState, useTransition } from 'react';
import HeroSection from '@/app/components/sections/HeroSection';
import StatsSection from '@/app/components/sections/StatsSection';
import ChartSection from '@/app/components/sections/ChartSection';
import BeritaSection from '@/app/components/sections/BeritaSection';
import AdminHeroModal from '@/app/components/ui/AdminHeroModal';
import AdminInfoModal from '@/app/components/ui/AdminInfoModal';

import type {
  PageData,
  HeroData,
  StatsData,
  ProfesiSectionData,
  ProfesiData,
} from '@/app/types';

import { updateHeroData, updateStatsData } from '@/app/action';
import { createProfesiSnapshot } from '../types/profesi';

interface HomePageClientProps {
  initialData: PageData;
  isAdmin: boolean;
}

export default function HomePageClient({ initialData, isAdmin }: HomePageClientProps) {
  const [heroData, setHeroData] = useState<HeroData>(initialData.hero);
  const [statsData, setStatsData] = useState<StatsData>(initialData.stats);
  const [profesiData, setProfesiData] = useState<ProfesiSectionData>(initialData.profesi);

  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- HERO ---
  const handleSaveHero = (newData: HeroData) => {
    setErrorMessage(null);
    startTransition(async () => {
      const result = await updateHeroData(newData);
      if (result.success) {
        setHeroData(newData);
        setIsHeroModalOpen(false);
      } else {
        setErrorMessage(result.message || 'Gagal menyimpan data Hero.');
      }
    });
  };

  // --- STATS ---
  const handleSaveStats = (newData: StatsData) => {
    setErrorMessage(null);
    startTransition(async () => {
      const result = await updateStatsData(newData);
      if (result.success && result.data) {
        setStatsData(result.data);
        setIsStatsModalOpen(false);
      } else {
        setErrorMessage(result.message || 'Gagal menyimpan data Statistik.');
      }
    });
  };

  // --- PROFESI ---
  const handleSaveProfesi = (items: ProfesiData[]) => {
    setErrorMessage(null);
    startTransition(async () => {
      const result = await createProfesiSnapshot(items);
      if (result.success) setProfesiData(result.profesi);
      else setErrorMessage(result.message || 'Gagal menyimpan data profesi.');
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Alert error */}
      {errorMessage && (
        <div
          role="alert"
          className="
            mb-4 rounded-xl border border-border
            bg-muted/60 p-3 text-sm text-ink
          "
        >
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-block size-2 rounded-full bg-red-500" />
            <div>
              <div className="font-semibold">Terjadi kesalahan</div>
              <div className="opacity-90">{errorMessage}</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-12">
        {isAdmin && (
          <div
            className="
              rounded-xl border border-border
              bg-muted/50 px-4 py-2 text-ink
              flex items-center gap-2
            "
          >
            <span className="inline-block size-2 rounded-full bg-brand-primary" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              Admin Panel
            </span>
          </div>
        )}

        <HeroSection
          title={heroData.title}
          subtitle={heroData.subtitle}
          isAdmin={isAdmin}
          onEditClick={() => setIsHeroModalOpen(true)}
        />

        <StatsSection
          stats={statsData}
          isAdmin={isAdmin}
          onEditClick={() => setIsStatsModalOpen(true)}
        />

        <ChartSection
          isAdmin={isAdmin}
          profesiData={profesiData}
          onSaveProfesi={handleSaveProfesi}
        />

        <BeritaSection posts={initialData.posts} isAdmin={isAdmin} />
      </div>

      {isHeroModalOpen && (
        <AdminHeroModal
          initialData={heroData}
          onClose={() => setIsHeroModalOpen(false)}
          onSave={handleSaveHero}
        />
      )}

      {isStatsModalOpen && (
        <AdminInfoModal
          initialData={statsData}
          onClose={() => setIsStatsModalOpen(false)}
          onSave={handleSaveStats}
        />
      )}

      {/* Show loading state if isPending is true */}
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="text-white">Menyimpan...</div>
        </div>
      )}
    </div>
  );
}
