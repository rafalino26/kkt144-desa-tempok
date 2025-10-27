'use client';

import React, { useState } from 'react';
import type { ProfesiData } from '@/app/types';
import { Plus, Trash2, X } from 'lucide-react';

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
      : [
          {
            name: '',
            value: '',
          },
        ]
  );

  const handleChangeName = (index: number, newName: string) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        name: newName,
      };
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
      copy[index] = {
        ...copy[index],
        value: cleaned,
      };
      return copy;
    });
  };

  const handleAdd = () => {
    setRows((prev) => [
      ...prev,
      {
        name: '',
        value: '',
      },
    ]);
  };

  const handleDelete = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
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
          className="absolute top-3 right-3 rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold text-ink mb-4">
          Edit Data Profesi Penduduk
        </h3>

        <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2">
          {rows.map((row, index) => (
            <div key={index} className="flex items-center gap-2">
              {/* Input nama profesi */}
              <input
                type="text"
                value={row.name}
                onChange={(e) => handleChangeName(index, e.target.value)}
                placeholder="Nama Profesi (cth: Petani)"
                className="flex-grow rounded-md border border-gray-300 px-3 py-2
                           text-sm
                           focus:outline-none focus:ring-2"
              />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={row.value}
                onChange={(e) => handleChangeValue(index, e.target.value)}
                placeholder="Jumlah"
                className="w-24 rounded-md border border-gray-300 px-3 py-2
                           text-sm text-right
                           focus:outline-none"
              />
              <button
                onClick={() => handleDelete(index)}
                className="rounded-md p-2 text-red-500 hover:bg-red-100"
                aria-label="Hapus item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 rounded-md bg-green-100 px-4 py-2
                       text-sm font-medium text-green-700 hover:bg-green-200"
          >
            <Plus size={16} />
            Tambah Data
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-md bg-gray-100 px-4 py-2
                         text-sm font-medium text-gray-800 hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="rounded-md bg-blue-600 px-4 py-2
                         text-sm font-medium text-white hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
