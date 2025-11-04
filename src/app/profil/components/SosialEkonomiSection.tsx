'use client';

import { useState, useTransition } from 'react';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import type { SosialEkonomiData } from '../components/types';
import AdminSosialEkonomiModal from './modal/AdminSosialEkonomiModal';
import { updateSosialEkonomi } from '../actions/sosialEkonomiActions';

function MiniStatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div
      className="rounded-xl border border-black/5 shadow-sm 
                 bg-brand-primary text-black
                 dark:bg-brand-primary dark:text-black
                 p-5 transition-colors"
    >
      <div className="text-[11px] uppercase tracking-wide">{label}</div>
      <div className="mt-2 text-2xl font-semibold break-words">
        {value || '—'}
      </div>
      {note && (
        <div className="mt-1 text-[11px] opacity-90 break-words">{note}</div>
      )}
    </div>
  );
}

interface SosialEkonomiSectionProps {
  isAdmin: boolean;
  initialData: SosialEkonomiData;
}

export default function SosialEkonomiSection({
  isAdmin,
  initialData,
}: SosialEkonomiSectionProps) {
  const [data, setData] = useState<SosialEkonomiData>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const formattedUpdated = data.lastUpdated
    ? new Date(data.lastUpdated).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  function handleSave(updatedDraft: SosialEkonomiData) {
    startTransition(async () => {
      const result = await updateSosialEkonomi(updatedDraft);
      if (result.success) {
        setData(result.data);
        setIsModalOpen(false);
      } else {
        console.error(result.message);
      }
    });
  }

  const paragraphs = data.ringkasan
    ? data.ringkasan
        .split(/\n{2,}/g)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-ink dark:text-ink">
            Kondisi Sosial &amp; Ekonomi
          </h2>

          <p className="text-sm text-gray-600 dark:text-ink/70 leading-relaxed max-w-xl">
            Gambaran singkat aktivitas ekonomi warga dan komposisi mata
            pencaharian di Desa Tempok.
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
            disabled={isPending}
            className="inline-flex items-center gap-1.5 self-start rounded-full
                       bg-brand-primary/80 px-3 py-1 text-[11px] font-medium text-black
                       ring-1 ring-brand-dark/20 hover:bg-brand-primary transition-colors disabled:opacity-50"
          >
            <Edit size={12} />
            Edit Sosial &amp; Ekonomi
          </button>
        )}
      </div>

      {/* 3 KARTU KECIL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MiniStatCard
          label="Perkiraan Jumlah Penduduk"
          value={data.jumlahPendudukTekstual || '— jiwa'}
          note={data.catatanPenduduk || ''}
        />

        <MiniStatCard
          label="Pencaharian Utama"
          value={data.mataPencaharian || '—'}
          note={data.mataPencaharian ? 'Sumber utama penghidupan' : ''}
        />

        <MiniStatCard
          label="Pekerjaan Lain / Sektor Pendukung"
          value={data.sektorPendukung || '—'}
          note="Bidang pendapatan tambahan warga"
        />
      </div>

      {/* DESKRIPSI UTAMA + GAMBAR */}
      <div
        className="rounded-xl border border-black/5 bg-white p-6 shadow-sm 
                   dark:bg-elev dark:border-border transition-colors
                   text-sm text-gray-700 dark:text-ink leading-relaxed space-y-4"
      >
        {paragraphs.length > 0 ? (
          paragraphs.map((para, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {para}
            </p>
          ))
        ) : (
          <p className="italic text-gray-500 dark:text-ink/60">
            Ringkasan sosial ekonomi desa belum diisi.
          </p>
        )}

        {/* Catatan */}
        <p className="text-[11px] text-gray-500 dark:text-ink/60 leading-relaxed">
          {data.catatan && data.catatan.trim() !== ''
            ? data.catatan
            : 'Data sektor ekonomi desa akan dilengkapi dan diperbarui secara bertahap. Grafik profesi penduduk dapat dilihat pada halaman utama.'}
        </p>

        {/* GALERI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
          <figure className="relative h-48 md:h-64 rounded-xl overflow-hidden border border-black/5 dark:border-border shadow-sm">
            <Image
              src="/hortikultura.jpeg"
              alt="Aktivitas bertani di lahan"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </figure>

          <figure className="relative h-48 md:h-64 rounded-xl overflow-hidden border border-black/5 dark:border-border shadow-sm">
            <Image
              src="/panen.jpeg"
              alt="Petani Desa Tempok saat panen"
              fill
              className="object-cover object-[center_80%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </figure>
        </div>
      </div>

      {isModalOpen && (
        <AdminSosialEkonomiModal
          initialData={data}
          isLoading={isPending}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
