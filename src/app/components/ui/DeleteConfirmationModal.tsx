'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName = 'item ini',
  isLoading = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 dark:bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl
                   dark:bg-elev dark:border dark:border-white/10 dark:text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-2 right-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 disabled:opacity-50
                     dark:text-ink/70 dark:hover:bg-white/10"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        <div className="flex items-start">
          <div className="mr-4 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-0">
            <h3
              className="text-lg font-semibold leading-6 text-gray-900 dark:text-ink"
              id="modal-title"
            >
              Konfirmasi Penghapusan
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-600 dark:text-ink/80">
                Apakah Anda yakin ingin menghapus {itemName}? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-6 flex flex-row-reverse gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700
                       disabled:bg-red-300 disabled:cursor-not-allowed
                       dark:bg-red-500 dark:hover:bg-red-400 dark:disabled:bg-red-500/60"
          >
            {isLoading ? 'Menghapus...' : 'Ya, Hapus'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50
                       dark:bg-elev/60 dark:text-ink dark:ring-white/10 dark:hover:bg-elev/80"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
