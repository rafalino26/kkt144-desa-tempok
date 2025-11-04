'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { IdentitasData } from '../types';

interface AdminIdentitasModalProps {
  initialData: IdentitasData;
  isLoading: boolean;
  onClose: () => void;
  onSave: (newData: IdentitasData) => void;
}

export default function AdminIdentitasModal({
  initialData,
  isLoading,
  onClose,
  onSave,
}: AdminIdentitasModalProps) {
  const [formData, setFormData] = useState<IdentitasData>(initialData);

  // Kunci scroll saat modal aktif
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  function handleChange(field: keyof IdentitasData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSave() {
    if (!isLoading) {
      onSave(formData);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl border shadow-2xl
                   bg-white dark:bg-elev border-gray-100 dark:border-border
                   text-ink dark:text-ink p-6 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-ink dark:text-ink">
              Edit Identitas Desa
            </h3>
            <p className="text-[12px] text-gray-500 dark:text-ink/70 leading-relaxed">
              Perbarui informasi administratif desa.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            aria-label="Tutup"
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 
                       dark:text-ink/70 dark:hover:bg-white/10 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body form */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-5 text-sm">
          {/* Nama Desa + Kepala Desa */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-ink dark:text-ink mb-1">
                Nama Desa
              </label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-border
                           px-3 py-2 text-sm bg-white dark:bg-elev
                           text-ink dark:text-ink focus:outline-none
                           focus:ring-2 focus:ring-brand-primary disabled:bg-gray-100
                           dark:disabled:bg-elev/60"
                value={formData.namaDesa}
                onChange={(e) => handleChange('namaDesa', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink dark:text-ink mb-1">
                Kepala Desa
              </label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-border
                           px-3 py-2 text-sm bg-white dark:bg-elev
                           text-ink dark:text-ink focus:outline-none
                           focus:ring-2 focus:ring-brand-primary disabled:bg-gray-100
                           dark:disabled:bg-elev/60"
                value={formData.kepalaDesa}
                onChange={(e) => handleChange('kepalaDesa', e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Kecamatan, Kabupaten, Provinsi, Kode Pos */}
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                ['kecamatan', 'Kecamatan'],
                ['kabupaten', 'Kabupaten'],
                ['provinsi', 'Provinsi'],
                ['kodePos', 'Kode Pos'],
              ] as Array<[keyof IdentitasData, string]>
            ).map(([fieldKey, label]) => (
              <div key={fieldKey}>
                <label className="block text-[12px] font-medium text-ink dark:text-ink mb-1">
                  {label}
                </label>
                <input
                  className="w-full rounded-md border border-gray-300 dark:border-border
                             px-3 py-2 text-sm bg-white dark:bg-elev
                             text-ink dark:text-ink focus:outline-none
                             focus:ring-2 focus:ring-brand-primary disabled:bg-gray-100
                             dark:disabled:bg-elev/60"
                  value={formData[fieldKey] ?? ''}
                  onChange={(e) => handleChange(fieldKey, e.target.value)}
                  disabled={isLoading}
                />
              </div>
            ))}
          </div>

          {/* Kode Kemendagri + Koordinat */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-ink dark:text-ink mb-1">
                Kode Kemendagri
              </label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-border
                           px-3 py-2 text-sm bg-white dark:bg-elev
                           text-ink dark:text-ink focus:outline-none
                           focus:ring-2 focus:ring-brand-primary disabled:bg-gray-100
                           dark:disabled:bg-elev/60"
                value={formData.kodeKemendagri}
                onChange={(e) => handleChange('kodeKemendagri', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink dark:text-ink mb-1">
                Koordinat
              </label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-border
                           px-3 py-2 text-sm bg-white dark:bg-elev
                           text-ink dark:text-ink focus:outline-none
                           focus:ring-2 focus:ring-brand-primary disabled:bg-gray-100
                           dark:disabled:bg-elev/60"
                value={formData.koordinat}
                onChange={(e) => handleChange('koordinat', e.target.value)}
                disabled={isLoading}
                placeholder="1°11′26.48″ N, 124°48′43.49″ E"
              />
            </div>
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-[12px] font-medium text-ink dark:text-ink mb-1">
              Catatan / Keterangan Tambahan
            </label>
            <textarea
              rows={3}
              className="w-full rounded-md border border-gray-300 dark:border-border
                         px-3 py-2 text-sm bg-white dark:bg-elev
                         text-ink dark:text-ink focus:outline-none
                         focus:ring-2 focus:ring-brand-primary disabled:bg-gray-100
                         dark:disabled:bg-elev/60"
              value={formData.catatan}
              onChange={(e) => handleChange('catatan', e.target.value)}
              disabled={isLoading}
              placeholder="(opsional) Informasi tambahan tentang status administratif desa, sejarah penetapan, dsb."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-md bg-gray-100 dark:bg-elev/60
                       px-4 py-2 text-sm font-medium text-gray-800 dark:text-ink
                       hover:bg-gray-200 dark:hover:bg-elev/80
                       disabled:opacity-50"
          >
            Batal
          </button>

          <button
            onClick={handleSave}
            disabled={isLoading}
            className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white
                       hover:bg-brand-primary/90 disabled:bg-brand-primary/50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Menyimpan…' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}
