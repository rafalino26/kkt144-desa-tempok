'use client';

import React, { useState } from 'react';
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

  function handleChange(field: keyof IdentitasData, value: string) {
    setFormData(prev => ({
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
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">
              Edit Identitas Desa
            </h3>
            <p className="text-[12px] text-gray-500 leading-relaxed">
              Perbarui informasi administratif desa.
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

        {/* Body form */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-5 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Nama Desa
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.namaDesa}
                onChange={(e) => handleChange('namaDesa', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Kepala Desa
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.kepalaDesa}
                onChange={(e) => handleChange('kepalaDesa', e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Kecamatan
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.kecamatan}
                onChange={(e) => handleChange('kecamatan', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Kabupaten
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.kabupaten}
                onChange={(e) => handleChange('kabupaten', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Provinsi
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.provinsi}
                onChange={(e) => handleChange('provinsi', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Kode Pos
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.kodePos}
                onChange={(e) => handleChange('kodePos', e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Kode Kemendagri
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.kodeKemendagri}
                onChange={(e) => handleChange('kodeKemendagri', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Koordinat
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.koordinat}
                onChange={(e) => handleChange('koordinat', e.target.value)}
                disabled={isLoading}
                placeholder={`1°11′26.48″ N, 124°48′43.49″ E`}
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ink mb-1">
              Catatan / Keterangan Tambahan
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
              rows={3}
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
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            onClick={handleSave}
            disabled={isLoading}
            className="rounded-md bg-brand-primary/80 px-4 py-2 text-sm font-medium text-brand-dark ring-1 ring-brand-dark/20 hover:bg-brand-primary disabled:opacity-50"
          >
            {isLoading ? 'Menyimpan…' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}
