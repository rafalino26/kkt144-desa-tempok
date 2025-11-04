'use client';

import { useState, useTransition } from 'react';
import { Edit } from 'lucide-react';
import { updateProfilIdentitas } from '../actions/identitasActions';
import { IdentitasData } from '../components/types';
import AdminIdentitasModal from './modal/AdminIdentitasModal';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-gray-500 dark:text-ink/60 text-[11px] uppercase tracking-wide">
        {label}
      </dt>
      <dd className="text-ink dark:text-ink font-medium text-sm">
        {value || '(belum diisi)'}
      </dd>
    </div>
  );
}

export interface IdentitasDesaSectionProps {
  isAdmin: boolean;
  initialData: IdentitasData;
}

export default function IdentitasDesaSection({
  isAdmin,
  initialData,
}: IdentitasDesaSectionProps) {
  const [identitas, setIdentitas] = useState<IdentitasData>(initialData);
  const [openModal, setOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const formattedUpdated = identitas.lastUpdated
    ? new Date(identitas.lastUpdated).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  function handleSave(updatedData: IdentitasData) {
    startTransition(async () => {
      const result = await updateProfilIdentitas(updatedData);
      if (result.success) {
        setIdentitas(result.data);
        setOpenModal(false);
      } else {
        console.error(result.message);
      }
    });
  }

  return (
    <section className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-ink dark:text-ink">
            Identitas Desa
          </h2>

          {formattedUpdated && (
            <p className="text-[11px] text-gray-500 dark:text-ink/60 leading-none">
              Terakhir diperbarui:{' '}
              <span className="font-medium text-ink dark:text-ink">
                {formattedUpdated}
              </span>
            </p>
          )}
        </div>

        {isAdmin && (
          <button
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center gap-1.5 self-start rounded-full
                       bg-brand-primary/90 px-3 py-1 text-[11px] font-medium text-brand-dark
                       ring-1 ring-brand-dark/20 hover:bg-brand-primary
                       dark:text-ink dark:ring-0 dark:hover:bg-brand-primary/50
                       transition-colors"
          >
            <Edit size={12} />
            Edit Identitas
          </button>
        )}
      </div>

      {/* Konten */}
      <div
        className="rounded-xl border border-gray-100 dark:border-border
                   bg-white dark:bg-elev p-6 shadow-sm text-ink dark:text-ink"
      >
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <InfoRow label="Nama Desa" value={identitas.namaDesa} />
          <InfoRow label="Kecamatan" value={identitas.kecamatan} />
          <InfoRow label="Kabupaten" value={identitas.kabupaten} />
          <InfoRow label="Provinsi" value={identitas.provinsi} />
          <InfoRow label="Kode Pos" value={identitas.kodePos} />
          <InfoRow label="Kode Kemendagri" value={identitas.kodeKemendagri} />
          <InfoRow label="Koordinat" value={identitas.koordinat} />
          <InfoRow label="Hukum Tua" value={identitas.kepalaDesa} />
        </dl>

        {identitas.catatan && (
          <div className="mt-6 text-[12px] text-gray-600 dark:text-ink/70 leading-relaxed">
            <div className="text-[11px] uppercase text-gray-500 dark:text-ink/60 font-medium tracking-wide mb-1">
              Catatan
            </div>
            <div className="whitespace-pre-line">{identitas.catatan}</div>
          </div>
        )}
      </div>

      {openModal && (
        <AdminIdentitasModal
          initialData={identitas}
          isLoading={isPending}
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
