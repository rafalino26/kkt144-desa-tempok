'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { StatsData } from '@/app/types';

interface AdminInfoModalProps {
  initialData: StatsData;
  onClose: () => void;
  onSave: (newData: StatsData) => void;
  isLoading?: boolean; 
}

export default function AdminInfoModal({ 
  initialData, 
  onClose, 
  onSave, 
  isLoading = false 
}: AdminInfoModalProps) {
  const [formData, setFormData] = useState<StatsData>(initialData);
  const handleChange = (field: keyof StatsData, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ''); 
    setFormData(prev => ({
      ...prev,
      [field]: Number(numericValue) || 0 
    }));
  };

  const handleSave = () => {
    if (!isLoading) {
      onSave(formData);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          disabled={isLoading} 
          className="absolute top-3 right-3 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold text-ink mb-6">
          Edit Sekilas Info
        </h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="penduduk" className="block text-sm font-medium text-gray-700">
              Jumlah Penduduk (Jiwa)
            </label>
            <input
              type="text"        
              inputMode="numeric" 
              pattern="[0-9]*"    
              id="penduduk"
              value={formData.penduduk === 0 ? '' : formData.penduduk.toString()} 
              onChange={(e) => handleChange('penduduk', e.target.value)}
              disabled={isLoading}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="kk" className="block text-sm font-medium text-gray-700">
              Jumlah KK (Keluarga)
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              id="kk"
              value={formData.kk === 0 ? '' : formData.kk.toString()}
              onChange={(e) => handleChange('kk', e.target.value)}
              disabled={isLoading}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="wilayah" className="block text-sm font-medium text-gray-700">
              Luas Wilayah (Hektar)
            </label>
            <input
              type="text"
              inputMode="numeric" 
              pattern="[0-9]*[.,]?[0-9]*" 
              id="wilayah"
              value={formData.wilayah === 0 ? '' : formData.wilayah.toString()}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.'); 
                setFormData(prev => ({ ...prev, wilayah: Number(value) || 0 }));
              }}
              disabled={isLoading}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="dusun" className="block text-sm font-medium text-gray-700">
              Jumlah Dusun
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              id="dusun"
              value={formData.dusun === 0 ? '' : formData.dusun.toString()} 
              onChange={(e) => handleChange('dusun', e.target.value)}
              disabled={isLoading}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>

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
            disabled={isLoading} 
            className="rounded-md bg-blue-600 px-4 py-2
                       text-sm font-medium text-white hover:bg-blue-700
                       disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'} 
          </button>
        </div>
        
      </div>
    </div>
  );
}