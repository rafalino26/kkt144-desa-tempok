'use client';

import { useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { Edit } from 'lucide-react';
import AdminGeografiModal from './modal/AdminGeografiModal';
import { updateProfilGeografis } from '../actions/geografisActions';

const MapComponentNoSSR = dynamic(
  () => import('@/app/components/ui/MapComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-gray-500 text-sm dark:text-ink/60">
        Memuat peta...
      </div>
    ),
  }
);

export interface GeoData {
  deskripsiLokasi: string;
  batasUtara: string;
  batasTimur: string;
  batasSelatan: string;
  batasBarat: string;
  googleMapsUrl: string;
  lastUpdated: string | null;
  lintangUtara: string;
  bujurTimur: string;
  ketinggian: string;
  topografi: string;
  hidrologi: string;
  klimatologi: string;
}

export interface GeografisSectionProps {
  isAdmin: boolean;
  initialData: GeoData;
}

export default function GeografisSection({
  isAdmin,
  initialData,
}: GeografisSectionProps) {
  const [geoData, setGeoData] = useState<GeoData>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const formattedUpdated: string | null = geoData.lastUpdated
    ? new Date(geoData.lastUpdated).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  function handleSaveGeo(updated: GeoData) {
    startTransition(async () => {
      const result = await updateProfilGeografis(updated);
      if (result.success) {
        setGeoData(result.data);
        setIsModalOpen(false);
      } else {
        console.error(result.message);
      }
    });
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-ink dark:text-ink">
            Demografi Desa Tempok
          </h2>

          <p className="text-sm text-gray-600 dark:text-ink/70 leading-relaxed max-w-xl">
            Desa Tempok berada di wilayah dataran tinggi Minahasa, Kecamatan
            Tompaso. Berikut informasi geografi terkait.
          </p>

          {formattedUpdated && (
            <p className="text-[11px] text-gray-500 dark:text-brand-primary leading-none">
              Terakhir diperbarui:{' '}
              <span className="font-medium text-ink dark:text-ink">
                {formattedUpdated}
              </span>
            </p>
          )}
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 self-start rounded-full
                       bg-brand-primary px-3 py-1 text-[11px] font-medium text-black
                       ring-1 ring-brand-dark/20 hover:bg-brand-primary transition-colors"
          >
            <Edit size={12} />
            Edit Geografis
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Info */}
        <div
          className="rounded-xl border border-black/5 bg-white p-6 shadow-sm
                     dark:bg-elev dark:border-border transition-colors
                     text-sm text-gray-700 dark:text-ink leading-relaxed space-y-4"
        >
          <div>
            <h3 className="text-base font-semibold text-ink dark:text-ink">
              Batas Wilayah
            </h3>
            <ul className="mt-2 text-sm space-y-1">
              <li>
                <span className="font-medium text-ink">Utara</span> :{' '}
                {geoData.batasUtara || '(belum diisi)'}
              </li>
              <li>
                <span className="font-medium text-ink">Timur</span> :{' '}
                {geoData.batasTimur || '(belum diisi)'}
              </li>
              <li>
                <span className="font-medium text-ink">Selatan</span> :{' '}
                {geoData.batasSelatan || '(belum diisi)'}
              </li>
              <li>
                <span className="font-medium text-ink">Barat</span> :{' '}
                {geoData.batasBarat || '(belum diisi)'}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-ink dark:text-ink">
              Informasi Tambahan
            </h3>
            <ul className="mt-2 text-sm space-y-1">
              <li>
                <span className="font-medium text-ink">Lintang Utara</span> :{' '}
                {geoData.lintangUtara || '(belum diisi)'}
              </li>
              <li>
                <span className="font-medium text-ink">Bujur Timur</span> :{' '}
                {geoData.bujurTimur || '(belum diisi)'}
              </li>
              <li>
                <span className="font-medium text-ink">Ketinggian</span> :{' '}
                {geoData.ketinggian || '(belum diisi)'}
              </li>
              <li>
                <span className="font-medium text-ink">Topografi</span> :{' '}
                {geoData.topografi || '(belum diisi)'}
              </li>
              <li>
                <span className="font-medium text-ink">Hidrologi</span> :{' '}
                {geoData.hidrologi || '(belum diisi)'}
              </li>
              <li>
                <span className="font-medium text-ink">Klimatologi</span> :{' '}
                {geoData.klimatologi || '(belum diisi)'}
              </li>
            </ul>
          </div>
        </div>

        {/* Map */}
        <div
          className="rounded-xl border border-black/5 bg-white p-4 shadow-sm flex flex-col
                     dark:bg-elev dark:border-border transition-colors"
        >
          <div className="text-sm font-semibold text-ink dark:text-ink mb-3 flex items-center justify-between">
            <span>Peta Lokasi Desa Tempok</span>

            {geoData.googleMapsUrl && (
              <a
                className="text-[11px] font-medium text-brand-dark underline hover:opacity-80"
                href={geoData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka di Google Maps
              </a>
            )}
          </div>

          <div
            className="relative flex-1 overflow-hidden rounded-lg ring-1 ring-brand-dark/10 z-[1]"
            style={{
              minHeight: '260px',
              maxHeight: '320px',
            }}
          >
            <MapComponentNoSSR />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AdminGeografiModal
          initialData={geoData}
          isLoading={isPending}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveGeo}
        />
      )}
    </section>
  );
}
