'use client';

import { useState, useTransition } from 'react';
import { Edit } from 'lucide-react';
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
    <div className="rounded-xl bg-gradient-to-br from-brand-primary/70 via-brand-light/60 to-brand-primary/60 p-5 shadow-sm border border-black/5">
      <div className="text-[11px] text-brand-dark uppercase tracking-wide">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-brand-dark break-words">
        {value || '—'}
      </div>
      {note && (
        <div className="mt-1 text-[11px] text-brand-dark break-words">
          {note}
        </div>
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
        .map(s => s.trim())
        .filter(Boolean)
    : [];

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-ink">
            Kondisi Sosial &amp; Ekonomi
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
            Gambaran singkat aktivitas ekonomi warga dan komposisi mata
            pencaharian di Desa Tempok.
          </p>

          {formattedUpdated && (
            <p className="text-[11px] text-gray-500 leading-none">
              Terakhir diperbarui:{' '}
              <span className="font-medium text-ink">{formattedUpdated}</span>
            </p>
          )}
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 self-start rounded-full
                       bg-brand-primary/80 px-3 py-1 text-[11px] font-medium text-brand-dark
                       ring-1 ring-brand-dark/20 hover:bg-brand-primary transition-colors"
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

      {/* DESKRIPSI UTAMA */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5 text-sm text-gray-700 leading-relaxed space-y-4">
        {paragraphs.length > 0 ? (
          paragraphs.map((para, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {para}
            </p>
          ))
        ) : (
          <p className="italic text-gray-500">
            Ringkasan sosial ekonomi desa belum diisi.
          </p>
        )}

        <p className="text-[11px] text-gray-500 leading-relaxed">
          {data.catatan && data.catatan.trim() !== ''
            ? data.catatan
            : 'Data sektor ekonomi desa akan dilengkapi dan diperbarui secara bertahap. Grafik profesi penduduk dapat dilihat pada halaman utama.'}
        </p>
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
