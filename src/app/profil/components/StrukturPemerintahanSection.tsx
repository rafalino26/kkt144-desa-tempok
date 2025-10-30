'use client';

import { useState, useTransition } from 'react';
import { Edit, Plus } from 'lucide-react';
import AdminPerangkatModal from './modal/AdminPerangkatModal';
import type { PerangkatDesaItem } from './types';
import {
  createPerangkatDesa,
  updatePerangkatDesa,
  deletePerangkatDesa,
} from '../actions/perangkatDesaActions';

interface Props {
  isAdmin: boolean;
  initialPerangkat: PerangkatDesaItem[];
}

export default function StrukturPemerintahanSection({
  isAdmin,
  initialPerangkat,
}: Props) {
  const [perangkat, setPerangkat] = useState<PerangkatDesaItem[]>(initialPerangkat);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedItem, setSelectedItem] = useState<PerangkatDesaItem | null>(null);
  const [isPending, startTransition] = useTransition();

  function openCreateModal() {
    setSelectedItem(null);
    setModalMode('create');
  }

  function openEditModal(item: PerangkatDesaItem) {
    setSelectedItem(item);
    setModalMode('edit');
  }

  function closeModal() {
    setSelectedItem(null);
    setModalMode(null);
  }


  function handleSave(payload: { id?: string; nama: string; jabatan: string; urutan: number }) {
    startTransition(async () => {
      if (modalMode === 'create') {
        const result = await createPerangkatDesa({
          nama: payload.nama,
          jabatan: payload.jabatan,
          urutan: payload.urutan,
        });

        if (result.success) {
          setPerangkat((prev) =>
            [...prev, result.item].sort((a, b) => a.urutan - b.urutan)
          );
          closeModal();
        } else {
          console.error(result.message);
        }
      } else if (modalMode === 'edit' && payload.id) {
        const result = await updatePerangkatDesa({
          id: payload.id,
          nama: payload.nama,
          jabatan: payload.jabatan,
          urutan: payload.urutan,
        });

        if (result.success) {
          setPerangkat((prev) =>
            prev
              .map((p) => (p.id === result.item.id ? result.item : p))
              .sort((a, b) => a.urutan - b.urutan)
          );
          closeModal();
        } else {
          console.error(result.message);
        }
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deletePerangkatDesa(id);
      if (result.success) {
        setPerangkat((prev) => prev.filter((p) => p.id !== id));
        closeModal();
      } else {
        console.error(result.message);
      }
    });
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-ink">
            Struktur Pemerintahan Desa
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
            Daftar perangkat desa yang bertugas melayani masyarakat Desa Tempok.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 self-start rounded-full
                       bg-brand-primary/80 px-3 py-1 text-[11px] font-medium text-brand-dark
                       ring-1 ring-brand-dark/20 hover:bg-brand-primary transition-colors"
          >
            <Plus size={12} />
            Tambah Perangkat
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {perangkat.map((p) => (
          <div
            key={p.id}
            className="relative rounded-xl bg-brand-light/70 text-brand-dark p-4 shadow-sm border border-black/5 text-center text-sm flex flex-col items-center justify-center"
          >
            <div className="text-[13px] font-semibold text-brand-dark leading-snug text-center">
              {p.nama || '(Nama)'}
            </div>

            <div className="mt-2 px-2 py-1 text-[10px] font-medium leading-none tracking-wide text-brand-dark">
              {p.jabatan || '(Jabatan)'}
            </div>
            {isAdmin && (
              <button
                className="absolute right-2 top-2 inline-flex items-center rounded-full bg-white/70 p-1 text-[10px] text-brand-dark ring-1 ring-black/10 hover:bg-white"
                onClick={() => openEditModal(p)}
              >
                <Edit size={12} />
              </button>
            )}
          </div>
        ))}
      </div>

      {modalMode && (
        <AdminPerangkatModal
          mode={modalMode}
          isLoading={isPending}
          initialData={selectedItem ?? undefined}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={modalMode === 'edit' ? handleDelete : undefined}
        />
      )}
    </section>
  );
}
