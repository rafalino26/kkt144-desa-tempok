'use client';

import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { PerangkatDesaItem } from '../types';

interface AdminPerangkatModalProps {
  mode: 'create' | 'edit';
  isLoading: boolean;
  initialData?: PerangkatDesaItem;
  onClose: () => void;
  onSave: (payload: { id?: string; nama: string; jabatan: string; urutan: number }) => void;
  onDelete?: (id: string) => void;
}

export default function AdminPerangkatModal({
  mode,
  isLoading,
  initialData,
  onClose,
  onSave,
  onDelete,
}: AdminPerangkatModalProps) {
  const isEdit = mode === 'edit';

  const [nama, setNama] = useState(initialData?.nama ?? '');
  const [jabatan, setJabatan] = useState(initialData?.jabatan ?? '');

  const [urutanInput, setUrutanInput] = useState(
    initialData?.urutan ? String(initialData.urutan) : ''
  );

  function handleUrutanChange(e: React.ChangeEvent<HTMLInputElement>) {
    let raw = e.target.value;

    raw = raw.replace(/[^0-9]/g, '');

    raw = raw.replace(/^0+/, '');

    setUrutanInput(raw);
  }

  function handleSubmit() {
    if (isLoading) return;

    let finalUrutanNum = parseInt(urutanInput, 10);

    if (isNaN(finalUrutanNum) || finalUrutanNum < 1) {
      finalUrutanNum = 1;
    }

    onSave({
      id: initialData?.id,
      nama,
      jabatan,
      urutan: finalUrutanNum,
    });
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">
              {isEdit ? 'Edit Perangkat Desa' : 'Tambah Perangkat Desa'}
            </h3>
            <p className="text-[12px] text-gray-500 leading-relaxed">
              Isi nama dan jabatan perangkat desa.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 text-sm">
          {/* NAMA */}
          <div>
            <label className="block text-[12px] font-medium text-ink mb-1">
              Nama
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              disabled={isLoading}
              placeholder="(Nama Orang)"
            />
          </div>

          {/* JABATAN */}
          <div>
            <label className="block text-[12px] font-medium text-ink mb-1">
              Jabatan
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              disabled={isLoading}
              placeholder="Kepala Desa / Sekretaris Desa / Kaur Umum / ..."
            />
          </div>

          {/* URUTAN */}
          <div>
            <label className="block text-[12px] font-medium text-ink mb-1">
              Urutan Tampil
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
              value={urutanInput}
              onChange={handleUrutanChange}
              disabled={isLoading}
              placeholder="1"
            />
            <p className="mt-1 text-[11px] text-gray-500 leading-snug">
              Angka lebih kecil akan muncul lebih dulu di daftar.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {isEdit && onDelete && initialData?.id && (
            <button
              onClick={() => onDelete(initialData.id)}
              disabled={isLoading}
              className="inline-flex items-center gap-1 rounded-md bg-red-100 px-3 py-2 text-[12px] font-medium text-red-700 ring-1 ring-red-300 hover:bg-red-200 disabled:opacity-50"
            >
              <Trash2 size={14} />
              Hapus
            </button>
          )}

          <div className="flex ml-auto gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 disabled:opacity-50"
            >
              Batal
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="rounded-md bg-brand-primary/80 px-4 py-2 text-sm font-medium text-brand-dark ring-1 ring-brand-dark/20 hover:bg-brand-primary disabled:opacity-50"
            >
              {isLoading ? 'Menyimpan…' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
