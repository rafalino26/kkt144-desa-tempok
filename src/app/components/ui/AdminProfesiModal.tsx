'use client';

import React, { useState, useEffect } from 'react';
import type { ProfesiData } from '@/app/types';
import { Plus, Trash2, X } from 'lucide-react';
import DeleteConfirmationModal from '@/app/components/ui/DeleteConfirmationModal';

interface AdminProfesiModalProps {
  initialData: ProfesiData[];
  onClose: () => void;
  onSave: (newData: ProfesiData[]) => void;
}

type ProfesiRowForm = {
  name: string;
  value: string;
};

export default function AdminProfesiModal({
  initialData,
  onClose,
  onSave,
}: AdminProfesiModalProps) {
  const [rows, setRows] = useState<ProfesiRowForm[]>(
    initialData.length > 0
      ? initialData.map((item) => ({
          name: item.name,
          value: item.value === 0 ? '' : item.value.toString(),
        }))
      : [{ name: '', value: '' }]
  );

  // --- state untuk konfirmasi hapus ---
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rowIndexToDelete, setRowIndexToDelete] = useState<number | null>(null);

  // 🔒 Kunci scroll body saat modal terbuka
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleChangeName = (index: number, newName: string) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], name: newName };
      return copy;
    });
  };

  const handleChangeValue = (index: number, rawVal: string) => {
    const numericOnly = rawVal.replace(/[^0-9]/g, '');
    let cleaned = numericOnly;
    if (cleaned.length > 1) {
      cleaned = cleaned.replace(/^0+/, '');
      if (cleaned === '') cleaned = '0';
    }

    setRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], value: cleaned };
      return copy;
    });
  };

  const handleAdd = () => setRows((prev) => [...prev, { name: '', value: '' }]);

  // buka dialog konfirmasi untuk index tertentu
  const askDelete = (index: number) => {
    setRowIndexToDelete(index);
    setConfirmOpen(true);
  };

  // eksekusi hapus setelah konfirmasi
  const confirmDelete = () => {
    if (rowIndexToDelete === null) return;
    setRows((prev) => prev.filter((_, i) => i !== rowIndexToDelete));
    setConfirmOpen(false);
    setRowIndexToDelete(null);
  };

  const handleSave = () => {
    const finalData: ProfesiData[] = rows
      .map((item) => ({
        name: item.name.trim(),
        value: item.value === '' ? 0 : Number(item.value),
      }))
      .filter((item) => item.name !== '');
    onSave(finalData);
  };

  const itemNameForConfirm =
    rowIndexToDelete !== null
      ? `entri profesi "${rows[rowIndexToDelete]?.name || 'tanpa nama'}"`
      : 'entri profesi';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
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
          className="absolute top-3 right-3 rounded-full p-1.5
                     text-gray-500 hover:bg-gray-100 
                     dark:text-ink/70 dark:hover:bg-white/10"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold mb-4 text-ink dark:text-ink">
          Edit Data Profesi Penduduk
        </h3>

        {/* Input rows */}
        <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2">
          {rows.map((row, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={row.name}
                onChange={(e) => handleChangeName(index, e.target.value)}
                placeholder="Nama Profesi (cth: Petani)"
                className="flex-grow rounded-md border border-gray-300 dark:border-border
                           px-3 py-2 text-sm text-ink dark:text-ink
                           bg-white dark:bg-elev
                           focus:outline-none focus:ring-2 focus:ring-brand-primary
                           placeholder:text-gray-400 dark:placeholder:text-ink/50"
              />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={row.value}
                onChange={(e) => handleChangeValue(index, e.target.value)}
                placeholder="Jumlah"
                className="w-24 rounded-md border border-gray-300 dark:border-border
                           px-3 py-2 text-sm text-right text-ink dark:text-ink
                           bg-white dark:bg-elev
                           focus:outline-none focus:ring-2 focus:ring-brand-primary
                           placeholder:text-gray-400 dark:placeholder:text-ink/50"
              />
              <button
                onClick={() => askDelete(index)}
                className="rounded-md p-2 text-red-500 hover:bg-red-100
                           dark:text-red-400 dark:hover:bg-red-500/10"
                aria-label="Hapus item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Tombol bawah */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 rounded-md 
                       bg-green-100 dark:bg-elev/60 
                       px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400 
                       hover:bg-green-200 dark:hover:bg-elev/80"
          >
            <Plus size={16} />
            Tambah Data
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-md bg-gray-100 dark:bg-elev/60 
                         px-4 py-2 text-sm font-medium text-gray-800 dark:text-ink 
                         hover:bg-gray-200 dark:hover:bg-elev/80"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white
                         hover:bg-brand-primary/90
                         disabled:bg-brand-primary/50 disabled:cursor-not-allowed"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>

      {/* Modal konfirmasi hapus */}
      <DeleteConfirmationModal
        isOpen={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setRowIndexToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={itemNameForConfirm}
        isLoading={false}
      />
    </div>
  );
}
