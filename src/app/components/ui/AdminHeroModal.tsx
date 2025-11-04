'use client';

import React, { useEffect, useState } from 'react';
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
  isLoading = false,
}: AdminHeroModalProps) {
  const [formData, setFormData] = useState(initialData);

  // 🔒 Kunci scroll body saat modal terbuka
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleChange = (field: keyof HeroData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
    if (!isLoading) onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-lg rounded-xl border shadow-2xl
                   bg-white dark:bg-elev border-gray-100 dark:border-border 
                   p-6 text-ink dark:text-ink animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol tutup */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-3 right-3 rounded-full p-1.5
                     text-gray-500 hover:bg-gray-100 dark:text-ink/70 dark:hover:bg-white/10
                     disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold mb-6 text-ink dark:text-ink">
          Edit Hero Section
        </h3>

        <div className="space-y-4">
          {/* Input: Judul Utama */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-ink/70"
            >
              Judul Utama
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              disabled={isLoading}
              className="
                mt-1 w-full rounded-md border border-gray-300 dark:border-border
                px-3 py-2 bg-white dark:bg-elev
                text-ink dark:text-ink
                focus:outline-none focus:ring-2 focus:ring-brand-primary
                disabled:bg-gray-100 dark:disabled:bg-elev/70
              "
            />
          </div>

          {/* Input: Sub Judul */}
          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium text-gray-700 dark:text-ink/70"
            >
              Sub-Judul
            </label>
            <input
              type="text"
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              disabled={isLoading}
              className="
                mt-1 w-full rounded-md border border-gray-300 dark:border-border
                px-3 py-2 bg-white dark:bg-elev
                text-ink dark:text-ink
                focus:outline-none focus:ring-2 focus:ring-brand-primary
                disabled:bg-gray-100 dark:disabled:bg-elev/70
              "
            />
          </div>
        </div>

        {/* Tombol aksi */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="
              rounded-md bg-gray-100 dark:bg-elev/60
              px-4 py-2 text-sm font-medium text-gray-800 dark:text-ink
              hover:bg-gray-200 dark:hover:bg-elev/80
              disabled:opacity-50
            "
          >
            Batal
          </button>

          <button
            onClick={handleSaveClick}
            disabled={isLoading}
            className="
              rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white
              hover:bg-brand-primary/90
              disabled:bg-brand-primary/50 disabled:cursor-not-allowed
            "
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}
