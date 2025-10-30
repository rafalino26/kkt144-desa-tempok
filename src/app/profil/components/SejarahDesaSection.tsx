'use client';

import { useState, useTransition } from 'react';
import { Edit } from 'lucide-react';
import type { SejarahData } from '../components/types';
import AdminSejarahModal from './modal/AdminSejarahModal';
import { updateSejarahDesa } from '../actions/sejarahActions';

interface SejarahDesaSectionProps {
  isAdmin: boolean;
  initialData: SejarahData;
}

export default function SejarahDesaSection({
  isAdmin,
  initialData,
}: SejarahDesaSectionProps) {
  const [data, setData] = useState<SejarahData>(initialData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const formattedUpdated = data.lastUpdated
    ? new Date(data.lastUpdated).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  function handleSave(updatedDraft: SejarahData) {
    startTransition(async () => {
      const result = await updateSejarahDesa(updatedDraft);
      if (result.success) {
        setData(result.data);
        setIsModalOpen(false);
      } else {
        console.error(result.message);
      }
    });
  }

  const paragraphs = data.content
    ? data.content
        .split(/\n{2,}/g) 
        .map(s => s.trim())
        .filter(Boolean)
    : [];

  return (
    <section className="space-y-6">
      {/* Header + tombol edit */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-ink">
            Sejarah Desa
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
            Berisi sejarah singkat dari Desa Tempok.
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
            Edit Sejarah
          </button>
        )}
      </div>

      {/* Konten sejarah */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5 text-sm leading-relaxed text-gray-700 space-y-4">
        {paragraphs.length > 0 ? (
          paragraphs.map((para, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {para}
            </p>
          ))
        ) : (
          <p className="italic text-gray-500">
            Sejarah desa belum diisi.
          </p>
        )}

        <p className="text-gray-500 text-xs">
          *Catatan detail sejarah lisan akan ditambahkan.
        </p>
      </div>

      {isModalOpen && (
        <AdminSejarahModal
          initialData={data}
          isLoading={isPending}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
