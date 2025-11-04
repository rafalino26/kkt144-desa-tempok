'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { VisiMisiData } from '../types';

interface AdminVisiMisiModalProps {
  initialData: VisiMisiData;
  isLoading: boolean;
  onClose: () => void;
  onSave: (data: VisiMisiData) => void;
}

export default function AdminVisiMisiModal({
  initialData,
  isLoading,
  onClose,
  onSave,
}: AdminVisiMisiModalProps) {
  const [visi, setVisi] = useState<string>(initialData.visi ?? '');
  const [misiList, setMisiList] = useState<string[]>(initialData.misi ?? []);

  function handleMisiChange(idx: number, value: string) {
    setMisiList(prev => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  }

  function handleAddMisi() {
    setMisiList(prev => [...prev, '']);
  }

  function handleRemoveMisi(idx: number) {
    setMisiList(prev => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit() {
    if (isLoading) return;
    const cleanedMisi = misiList
      .map(m => m.trim())
      .filter(m => m.length > 0);

    onSave({
      visi: visi.trim(),
      misi: cleanedMisi,
      lastUpdated: null,
    });
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 dark:bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl 
                   dark:bg-elev dark:border dark:border-border dark:text-ink transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-ink dark:text-ink">
              Edit Visi &amp; Misi Desa
            </h3>
            <p className="text-[12px] text-gray-500 leading-relaxed dark:text-ink/70">
              Perbarui visi jangka panjang dan poin-poin misi desa.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 
                       dark:text-ink/70 dark:hover:bg-white/10 disabled:opacity-50"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-6 text-sm">
          {/* VISI */}
          <div>
            <label className="block text-[12px] font-medium text-ink mb-1 dark:text-ink">
              Visi
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                         dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
              rows={3}
              value={visi}
              onChange={(e) => setVisi(e.target.value)}
              disabled={isLoading}
              placeholder={`Contoh:\n“Mewujudkan Desa Tempok yang mandiri, maju, dan sejahtera...”`}
            />
            <p className="mt-1 text-[11px] text-gray-500 leading-snug dark:text-ink/70">
              Tuliskan visi utama desa dalam 1 kalimat/poin besar.
            </p>
          </div>

          {/* MISI */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[12px] font-medium text-ink dark:text-ink">
                Misi
              </label>

              <button
                onClick={handleAddMisi}
                disabled={isLoading}
                className="inline-flex items-center gap-1 rounded-full
                           bg-brand-primary/80 px-2 py-1 text-[11px] font-medium text-brand-dark
                           ring-1 ring-brand-dark/20 hover:bg-brand-primary disabled:opacity-50"
              >
                <Plus size={12} />
                Tambah Poin
              </button>
            </div>

            <div className="space-y-3">
              {misiList.length === 0 && (
                <div className="text-[12px] text-gray-500 italic dark:text-ink/60">
                  Belum ada misi. Tambahkan poin misi.
                </div>
              )}

              {misiList.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2"
                >
                  <textarea
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm
                               focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                               dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
                    rows={2}
                    value={m}
                    onChange={(e) => handleMisiChange(idx, e.target.value)}
                    disabled={isLoading}
                    placeholder={`Contoh:\nMeningkatkan pelayanan publik yang transparan dan mudah diakses.`}
                  />

                  <button
                    onClick={() => handleRemoveMisi(idx)}
                    disabled={isLoading}
                    className="mt-1 rounded-md bg-red-100 p-2 text-red-600 ring-1 ring-red-300 
                               hover:bg-red-200 disabled:opacity-50
                               dark:bg-red-900/40 dark:text-red-300 dark:ring-red-800 dark:hover:bg-red-900/60"
                    aria-label="Hapus poin misi"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-2 text-[11px] text-gray-500 leading-snug dark:text-ink/70">
              Setiap baris misi akan tampil sebagai bullet point.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 
                       hover:bg-gray-200 disabled:opacity-50
                       dark:bg-elev/60 dark:text-ink dark:hover:bg-elev/80"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded-md bg-brand-primary/80 px-4 py-2 text-sm font-medium text-brand-dark
                       ring-1 ring-brand-dark/20 hover:bg-brand-primary disabled:opacity-50"
          >
            {isLoading ? 'Menyimpan…' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}
