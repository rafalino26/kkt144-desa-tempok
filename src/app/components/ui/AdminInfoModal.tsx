'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { StatsData } from '@/app/types'; // Impor tipe

interface AdminInfoModalProps {
  initialData: StatsData;
  onClose: () => void;
  onSave: (newData: StatsData) => void;
  isLoading?: boolean; // Opsi untuk state loading
}

export default function AdminInfoModal({ 
  initialData, 
  onClose, 
  onSave, 
  isLoading = false // Default ke false
}: AdminInfoModalProps) {
  // State lokal untuk form
  const [formData, setFormData] = useState<StatsData>(initialData);

  // Helper untuk update form
  const handleChange = (field: keyof StatsData, value: string) => {
    // Hanya izinkan angka, hapus karakter non-digit
    const numericValue = value.replace(/[^0-9]/g, ''); 
    setFormData(prev => ({
      ...prev,
      // Simpan sebagai number di state, atau 0 jika kosong
      [field]: Number(numericValue) || 0 
    }));
  };

  const handleSave = () => {
    // Panggil onSave hanya jika tidak sedang loading
    if (!isLoading) {
      onSave(formData);
    }
  };

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* Konten Modal */}
      <div 
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close (X) */}
        <button 
          onClick={onClose}
          disabled={isLoading} // Nonaktifkan saat loading
          className="absolute top-3 right-3 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold text-ink mb-6">
          Edit Sekilas Info
        </h3>

        {/* Form Input */}
        <div className="space-y-4">
          {/* Input 1: Jumlah Penduduk */}
          <div>
            <label htmlFor="penduduk" className="block text-sm font-medium text-gray-700">
              Jumlah Penduduk (Jiwa)
            </label>
            <input
              // --- PERBAIKAN ---
              type="text"         // Ganti ke text
              inputMode="numeric" // Minta keyboard numeric
              pattern="[0-9]*"    // Validasi hanya angka
              // --- AKHIR PERBAIKAN ---
              id="penduduk"
              value={formData.penduduk === 0 ? '' : formData.penduduk.toString()} // Tampilkan string, kosong jika 0
              onChange={(e) => handleChange('penduduk', e.target.value)}
              disabled={isLoading}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {/* Input 2: Jumlah KK */}
          <div>
            <label htmlFor="kk" className="block text-sm font-medium text-gray-700">
              Jumlah KK (Keluarga)
            </label>
            <input
              // --- PERBAIKAN ---
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              // --- AKHIR PERBAIKAN ---
              id="kk"
              value={formData.kk === 0 ? '' : formData.kk.toString()} // Tampilkan string, kosong jika 0
              onChange={(e) => handleChange('kk', e.target.value)}
              disabled={isLoading}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {/* Input 3: Luas Wilayah */}
          <div>
            <label htmlFor="wilayah" className="block text-sm font-medium text-gray-700">
              Luas Wilayah (Hektar)
            </label>
            <input
              // --- PERBAIKAN ---
              type="text"
              inputMode="numeric" 
              // Izinkan desimal untuk luas wilayah
              pattern="[0-9]*[.,]?[0-9]*" 
              // --- AKHIR PERBAIKAN ---
              id="wilayah"
              value={formData.wilayah === 0 ? '' : formData.wilayah.toString()} // Tampilkan string, kosong jika 0
              onChange={(e) => {
                // Untuk luas, kita biarkan koma/titik
                const value = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.'); // Ganti koma jadi titik
                setFormData(prev => ({ ...prev, wilayah: Number(value) || 0 }));
              }}
              disabled={isLoading}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {/* Input 4: Jumlah Dusun */}
          <div>
            <label htmlFor="dusun" className="block text-sm font-medium text-gray-700">
              Jumlah Dusun
            </label>
            <input
              // --- PERBAIKAN ---
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              // --- AKHIR PERBAIKAN ---
              id="dusun"
              value={formData.dusun === 0 ? '' : formData.dusun.toString()} // Tampilkan string, kosong jika 0
              onChange={(e) => handleChange('dusun', e.target.value)}
              disabled={isLoading}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-md bg-gray-100 px-4 py-2
                       text-sm font-medium text-gray-800 hover:bg-gray-200
                       disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading} // Nonaktifkan saat loading
            className="rounded-md bg-blue-600 px-4 py-2
                       text-sm font-medium text-white hover:bg-blue-700
                       disabled:bg-blue-300 disabled:cursor-not-allowed" // Style saat disabled
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'} 
          </button>
        </div>
        
      </div>
    </div>
  );
}