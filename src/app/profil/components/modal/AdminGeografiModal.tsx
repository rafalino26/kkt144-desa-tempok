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
    setFormData((prev: GeoData) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!isLoading) {
      onSave(formData);
    }
  };

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
              Edit Informasi Geografis
            </h3>
            <p className="text-[12px] text-gray-500 leading-relaxed">
              Perbarui deskripsi lokasi, batas wilayah, dan tautan Maps.
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

        {/* Isi form */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-5 text-sm">
          {/* Deskripsi lokasi */}
          <div>
            <label className="block text-[12px] font-medium text-ink mb-1">
              Lokasi &amp; Topografi
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
              rows={4}
              value={formData.deskripsiLokasi}
              onChange={(e) => handleChange('deskripsiLokasi', e.target.value)}
              disabled={isLoading}
              placeholder={
                'Contoh:\nDesa Tempok terletak di Kecamatan Tompaso, Kabupaten Minahasa.\nWilayah desa berada pada kawasan dataran tinggi Minahasa...'
              }
            />
            <p className="mt-1 text-[11px] text-gray-500 leading-snug">
              Tuliskan gambaran posisi desa, ketinggian, karakter wilayah, dll.
            </p>
          </div>

          {/* Batas wilayah */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Batas Utara
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.batasUtara}
                onChange={(e) => handleChange('batasUtara', e.target.value)}
                disabled={isLoading}
                placeholder="(desa tetangga)"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Batas Timur
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.batasTimur}
                onChange={(e) => handleChange('batasTimur', e.target.value)}
                disabled={isLoading}
                placeholder="(desa tetangga)"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Batas Selatan
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.batasSelatan}
                onChange={(e) => handleChange('batasSelatan', e.target.value)}
                disabled={isLoading}
                placeholder="(desa tetangga)"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Batas Barat
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.batasBarat}
                onChange={(e) => handleChange('batasBarat', e.target.value)}
                disabled={isLoading}
                placeholder="(desa tetangga)"
              />
            </div>
          </div>

          {/* Additional fields for new data */}
          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Lintang Utara
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.lintangUtara}
                onChange={(e) => handleChange('lintangUtara', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Bujur Timur
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.bujurTimur}
                onChange={(e) => handleChange('bujurTimur', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Ketinggian (m dpl)
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.ketinggian}
                onChange={(e) => handleChange('ketinggian', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Topografi
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.topografi}
                onChange={(e) => handleChange('topografi', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Hidrologi
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.hidrologi}
                onChange={(e) => handleChange('hidrologi', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1">
                Klimatologi
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                value={formData.klimatologi}
                onChange={(e) => handleChange('klimatologi', e.target.value)}
                disabled={isLoading}
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
    </div>
  );
}
