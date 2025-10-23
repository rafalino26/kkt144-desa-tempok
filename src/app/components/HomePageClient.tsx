'use client';

// Impor React hooks
import React, { useState, useTransition } from 'react';

// Impor semua section
import HeroSection from '@/app/components/sections/HeroSection';
import StatsSection from '@/app/components/sections/StatsSection';
import ChartSection from '@/app/components/sections/ChartSection';
import BeritaSection from '@/app/components/sections/BeritaSection';

// Impor semua modal
import AdminHeroModal from '@/app/components/ui/AdminHeroModal';
import AdminInfoModal from '@/app/components/ui/AdminInfoModal';

// Impor tipe data terpusat
import type { PageData, HeroData, StatsData } from '@/app/types';

// --- Impor Server Actions ---
import { updateHeroData, updateStatsData } from '@/app/action'; 
// --------------------------


interface HomePageClientProps {
  initialData: PageData;
  isAdmin: boolean;
}

export default function HomePageClient({ initialData, isAdmin }: HomePageClientProps) {
  
  // State data (berasal dari initialData)
  const [heroData, setHeroData] = useState<HeroData>(initialData.hero);
  const [statsData, setStatsData] = useState<StatsData>(initialData.stats);

  // State modal
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  // --- State Loading untuk Server Actions ---
  const [, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // ----------------------------------------

  // --- Fungsi Simpan (Diperbarui dengan Server Actions) ---
  const handleSaveHero = (newData: HeroData) => {
    setErrorMessage(null); // Reset pesan error
    startTransition(async () => { // Bungkus pemanggilan action
      const result = await updateHeroData(newData);
      if (result.success) {
        setHeroData(newData); // Update state lokal jika sukses
        setIsHeroModalOpen(false);
      } else {
        // Tampilkan pesan error jika gagal
        setErrorMessage(result.message || 'Gagal menyimpan data Hero.');
        console.error("Gagal menyimpan Hero:", result.message); 
      }
    });
  };
  
  const handleSaveStats = (newData: StatsData) => {
    setErrorMessage(null); // Reset pesan error
    startTransition(async () => { // Bungkus pemanggilan action
      const result = await updateStatsData(newData);
      if (result.success) {
        setStatsData(newData); // Update state lokal jika sukses
        setIsStatsModalOpen(false);
      } else {
         // Tampilkan pesan error jika gagal
        setErrorMessage(result.message || 'Gagal menyimpan data Statistik.');
        console.error("Gagal menyimpan Stats:", result.message); 
      }
    });
  };
  // ----------------------------------

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      
      {/* --- Tampilkan Pesan Error (jika ada) --- */}
      {errorMessage && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-sm text-red-700">
          Error: {errorMessage}
        </div>
      )}
      {/* -------------------------------------- */}

      <div className="space-y-8">
        {isAdmin && (
  <div className="rounded-xl px-2
                  text-brand-dark flex items-center gap-2">
    
    <span className="text-2xl font-semibold tracking-wide uppercase">Admin Panel</span>
    <span className="inline-block size-2 rounded-full bg-brand-primary" />
  </div>
)}
        {/* --- 1. HERO SECTION --- */}
        <HeroSection
          title={heroData.title}
          subtitle={heroData.subtitle}
          isAdmin={isAdmin}
          onEditClick={() => setIsHeroModalOpen(true)}
        />

        {/* --- 2. KARTU STATISTIK --- */}
        <StatsSection
          stats={statsData}
          isAdmin={isAdmin}
          onEditClick={() => setIsStatsModalOpen(true)}
        />

        {/* --- 3. GRAFIK & PETA --- */}
        <ChartSection isAdmin={isAdmin} />

        {/* --- 5. BERITA & KEGIATAN --- */}
        <BeritaSection posts={initialData.posts} isAdmin={isAdmin} />
      </div>

      {/* --- Render Modal (Tambahkan isLoading/isPending jika perlu) --- */}
      {isHeroModalOpen && (
        <AdminHeroModal
          initialData={heroData}
          onClose={() => setIsHeroModalOpen(false)}
          onSave={handleSaveHero}
          // Tambahkan prop 'isLoading={isPending}' jika modal Anda mendukungnya
          // isLoading={isPending} 
        />
      )}
      
      {isStatsModalOpen && (
        <AdminInfoModal
          initialData={statsData}
          onClose={() => setIsStatsModalOpen(false)}
          onSave={handleSaveStats}
          // Tambahkan prop 'isLoading={isPending}' jika modal Anda mendukungnya
          // isLoading={isPending} 
        />
      )}
      {/* ----------------------------------------------------------- */}

    </div>
  );
}