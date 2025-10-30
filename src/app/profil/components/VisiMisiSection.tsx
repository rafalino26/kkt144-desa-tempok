'use client';

import { useState, useTransition } from 'react';
import { Edit } from 'lucide-react';
import type { VisiMisiData } from '../components/types';
import AdminVisiMisiModal from './modal/AdminVisiMisiModal';
import { updateVisiMisi } from '../actions/visiMisiActions';

interface VisiMisiSectionProps {
  isAdmin: boolean;
  initialData: VisiMisiData;
}

export default function VisiMisiSection({
  isAdmin,
  initialData,
}: VisiMisiSectionProps) {
  const [data, setData] = useState<VisiMisiData>(initialData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const formattedUpdated = data.lastUpdated
    ? new Date(data.lastUpdated).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  function handleSave(updatedDraft: VisiMisiData) {
    startTransition(async () => {
      const result = await updateVisiMisi(updatedDraft);
      if (result.success) {
        setData(result.data);
        setIsModalOpen(false);
      } else {
        console.error(result.message);
      }
    });
  }

  return (
    <section className="space-y-6">
      {/* Header + tombol edit */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-ink">
            Visi &amp; Misi Desa
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
            Visi dan Misi dari Desa Tempok.
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
            Edit Visi &amp; Misi
          </button>
        )}
      </div>

      {/* 2 kolom: Visi, Misi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VISI */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5">
          <h3 className="text-base font-semibold text-ink uppercase tracking-wide">
            Visi
          </h3>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {data.visi || 'Belum ada visi.'}
          </p>
        </div>

        {/* MISI */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5">
          <h3 className="text-base font-semibold text-ink uppercase tracking-wide">
            Misi
          </h3>

          {data.misi && data.misi.length > 0 ? (
            <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 leading-relaxed space-y-2">
              {data.misi.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-gray-500 italic">
              Belum ada daftar misi.
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AdminVisiMisiModal
          initialData={data}
          isLoading={isPending}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
