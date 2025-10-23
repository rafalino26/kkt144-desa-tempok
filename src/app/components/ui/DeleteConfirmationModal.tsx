'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean; // Kontrol dari parent
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string; // Nama item yang akan dihapus (opsional)
  isLoading?: boolean; // Status loading dari parent
}

export default function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName = 'item ini', // Default message
  isLoading = false
}: DeleteConfirmationModalProps) {
  
  // Jangan render jika tidak isOpen
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" // z-index lebih tinggi dari modal lain
      onClick={onClose} 
    >
      {/* Konten Modal */}
      <div 
        className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl" // Lebih kecil (max-w-sm)
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close (X) - opsional */}
        <button 
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-2 right-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 disabled:opacity-50"
        >
          <X size={18} />
        </button>

        <div className="flex items-start">
          {/* Ikon Peringatan */}
          <div className="mr-4 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
          </div>
          {/* Teks Konfirmasi */}
          <div className="mt-0">
            <h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
              Konfirmasi Penghapusan
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Apakah Anda yakin ingin menghapus {itemName}? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-5 sm:mt-6 flex flex-row-reverse gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Menghapus...' : 'Ya, Hapus'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}