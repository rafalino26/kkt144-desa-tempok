'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { HeroData } from '@/app/types';

interface AdminHeroModalProps {
  initialData: HeroData;
  onClose: () => void;
  onSave: (newData: HeroData) => void;
  isLoading?: boolean; 
}

export default function AdminHeroModal({ 
  initialData, 
  onClose, 
  onSave, 
  isLoading = false 
}: AdminHeroModalProps) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (field: keyof HeroData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
    if (!isLoading) {
      onSave(formData);
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          disabled={isLoading} 
          className="absolute top-3 right-3 rounded-full p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          <X size={20} />
        </button>
        <h3 className="text-xl font-semibold text-ink mb-6">Edit Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Judul Utama
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              disabled={isLoading} 
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
              Sub-Judul
            </label>
            <input
              type="text"
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              disabled={isLoading} 
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            disabled={isLoading} 
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 disabled:opacity-50"
          >
            Batal
          </button>
          <button 
            onClick={handleSaveClick} 
            disabled={isLoading} 
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed" 
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'} 
          </button>
        </div>
      </div>
    </div>
  );
}