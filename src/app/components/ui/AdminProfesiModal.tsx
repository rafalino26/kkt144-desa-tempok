'use client';

import React, { useState } from 'react';
import type { ProfesiData } from '@/app/types'; // Impor tipe
import { Plus, Trash2, X } from 'lucide-react';

interface AdminProfesiModalProps {
  initialData: ProfesiData[];
  onClose: () => void;
  onSave: (newData: ProfesiData[]) => void;
}

export default function AdminProfesiModal({ initialData, onClose, onSave }: AdminProfesiModalProps) {
  const [data, setData] = useState(initialData);

  const handleUpdate = (index: number, field: 'name' | 'value', value: string | number) => {
    const newData = [...data];
    if (field === 'value') {
      newData[index][field] = Number(value) || 0; 
    } else {
      newData[index][field] = value as string;
    }
    setData(newData);
  };

  const handleAdd = () => {
    setData([...data, { name: '', value: 0 }]);
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleSave = () => {
    const finalData = data.filter(item => item.name.trim() !== '');
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
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                placeholder="Nama Profesi (cth: Petani)"
                className="flex-grow rounded-md border border-gray-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={item.value}
                onChange={(e) => handleUpdate(index, 'value', e.target.value)}
                placeholder="Jumlah"
                className="w-24 rounded-md border border-gray-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
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