'use client';

import { useState } from 'react';
import { deletePesanKontak } from '../actions/kontakAction';

interface PesanKontak {
  id: string;
  nama: string;
  email: string;
  isiPesan: string;
  createdAt: string;
  isDibaca: boolean;
}

export default function AdminInboxClient({ initialData }: { initialData: PesanKontak[] }) {
  const [pesanList, setPesanList] = useState(initialData);
  const [selected, setSelected] = useState<PesanKontak | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    const result = await deletePesanKontak(id);
    if (result.success) {
      setPesanList((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(result.message || 'Gagal menghapus pesan.');
    }
    setIsDeleting(null);
  };

  return (
    <div className="rounded-xl bg-white border border-black/5 shadow-sm p-6">
      <h2 className="text-xl font-semibold text-ink mb-4">Kotak Masuk Pesan</h2>

      {pesanList.length === 0 ? (
        <p className="text-gray-500 text-sm">Belum ada pesan masuk.</p>
      ) : (
        <div className="space-y-3">
          {pesanList.map((pesan) => (
            <div
              key={pesan.id}
              className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-sm font-medium text-ink">{pesan.nama}</p>
                <p className="text-xs text-gray-500">{pesan.email}</p>
                <p className="text-sm text-gray-700 line-clamp-1">{pesan.isiPesan}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(pesan)}
                  className="text-xs rounded-md px-3 py-1 bg-brand-light text-brand-dark hover:bg-brand-primary transition"
                >
                  Lihat
                </button>
                <button
                  onClick={() => handleDelete(pesan.id)}
                  disabled={isDeleting === pesan.id}
                  className="text-xs rounded-md px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                >
                  {isDeleting === pesan.id ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail Pesan */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
          >
            <h3 className="text-lg font-semibold text-ink mb-2">{selected.nama}</h3>
            <p className="text-xs text-gray-500 mb-3">{selected.email}</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">{selected.isiPesan}</p>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="text-sm px-4 py-2 rounded-md bg-brand-primary text-brand-dark hover:bg-brand-light transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
