'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { GeoData } from '../GeografisSection';

interface AdminGeografiModalProps {
  initialData: GeoData;
  isLoading: boolean;
  onClose: () => void;
  onSave: (newData: GeoData) => void;
}

export default function AdminGeografiModal({
  initialData,
  isLoading,
  onClose,
  onSave,
}: AdminGeografiModalProps) {
  const [formData, setFormData] = useState<GeoData>({
    ...initialData,
    lintangUtara: initialData.lintangUtara ?? '',
    bujurTimur: initialData.bujurTimur ?? '',
    ketinggian: initialData.ketinggian ?? '',
    topografi: initialData.topografi ?? '',
    hidrologi: initialData.hidrologi ?? '',
    klimatologi: initialData.klimatologi ?? '',
  });

  const handleChange = (field: keyof GeoData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!isLoading) onSave(formData);
  };

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
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-ink dark:text-ink">
              Edit Informasi Geografis
            </h3>
            <p className="text-[12px] text-gray-500 leading-relaxed dark:text-ink/70">
              Perbarui deskripsi lokasi, batas wilayah, dan tautan Maps.
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

        {/* Isi form */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-5 text-sm">
          {/* Deskripsi lokasi */}
          <div>
            <label className="block text-[12px] font-medium text-ink mb-1 dark:text-ink">
              Lokasi &amp; Topografi
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                         dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
              rows={4}
              value={formData.deskripsiLokasi}
              onChange={(e) => handleChange('deskripsiLokasi', e.target.value)}
              disabled={isLoading}
              placeholder={
                'Contoh:\nDesa Tempok terletak di Kecamatan Tompaso, Kabupaten Minahasa.\nWilayah desa berada pada kawasan dataran tinggi Minahasa...'
              }
            />
            <p className="mt-1 text-[11px] text-gray-500 leading-snug dark:text-ink/70">
              Tuliskan gambaran posisi desa, ketinggian, karakter wilayah, dll.
            </p>
          </div>

          {/* Batas wilayah */}
          <div className="grid grid-cols-2 gap-4">
            {([
              { key: 'batasUtara', label: 'Batas Utara' },
              { key: 'batasTimur', label: 'Batas Timur' },
              { key: 'batasSelatan', label: 'Batas Selatan' },
              { key: 'batasBarat', label: 'Batas Barat' },
            ] as const).map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[12px] font-medium text-ink mb-1 dark:text-ink">
                  {label}
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                             dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
                  value={formData[key] as string}
                  onChange={(e) => handleChange(key, e.target.value)}
                  disabled={isLoading}
                  placeholder="(desa tetangga)"
                />
              </div>
            ))}
          </div>

          {/* Additional fields */}
          <div className="space-y-4">
            {([
              { key: 'lintangUtara', label: 'Lintang Utara' },
              { key: 'bujurTimur', label: 'Bujur Timur' },
              { key: 'ketinggian', label: 'Ketinggian (m dpl)' },
              { key: 'topografi', label: 'Topografi' },
              { key: 'hidrologi', label: 'Hidrologi' },
              { key: 'klimatologi', label: 'Klimatologi' },
            ] as const).map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[12px] font-medium text-ink mb-1 dark:text-ink">
                  {label}
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                             dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
                  value={formData[key] as string}
                  onChange={(e) => handleChange(key, e.target.value)}
                  disabled={isLoading}
                />
              </div>
            ))}
          </div>

          {/* Footer */}
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
              onClick={handleSave}
              disabled={isLoading}
              className="rounded-md bg-brand-primary/80 px-4 py-2 text-sm font-medium text-brand-dark 
                         ring-1 ring-brand-dark/20 hover:bg-brand-primary disabled:opacity-50"
            >
              {isLoading ? 'Menyimpan…' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
