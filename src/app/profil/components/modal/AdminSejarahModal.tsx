'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import type { SejarahData } from '../types';

interface AdminSejarahModalProps {
  initialData: SejarahData;
  isLoading: boolean;
  onClose: () => void;
  onSave: (data: SejarahData) => void;
}

export default function AdminSejarahModal({
  initialData,
  isLoading,
  onClose,
  onSave,
}: AdminSejarahModalProps) {
  const [content, setContent] = useState<string>(initialData.content ?? '');

  function handleSubmit() {
    if (isLoading) return;
    onSave({
      content: content.trim(),
      lastUpdated: null, // server akan isi updatedAt baru
    });
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 dark:bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl 
                   dark:bg-elev dark:border dark:border-border dark:text-ink transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-ink dark:text-ink">
              Edit Sejarah Desa
            </h3>
            <p className="text-[12px] text-gray-500 leading-relaxed dark:text-ink/70">
              Perbarui narasi sejarah desa. Teks ini akan tampil publik.
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

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 text-sm space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-ink mb-1 dark:text-ink">
              Sejarah Desa
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm leading-relaxed
                         focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                         dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
              placeholder={`Contoh:\nDesa Tempok merupakan salah satu desa di Kecamatan Tompaso...`}
            />
            <p className="mt-1 text-[11px] text-gray-500 leading-snug dark:text-ink/70">
              Kamu bisa tulis beberapa paragraf. Gunakan enter untuk paragraf baru.
            </p>
          </div>
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
