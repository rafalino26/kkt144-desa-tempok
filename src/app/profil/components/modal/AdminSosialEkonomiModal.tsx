'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import type { SosialEkonomiData } from '../types';

interface AdminSosialEkonomiModalProps {
  initialData: SosialEkonomiData;
  isLoading: boolean;
  onClose: () => void;
  onSave: (data: SosialEkonomiData) => void;
}

export default function AdminSosialEkonomiModal({
  initialData,
  isLoading,
  onClose,
  onSave,
}: AdminSosialEkonomiModalProps) {
  const [jumlahPendudukTekstual, setJumlahPendudukTekstual] = useState(initialData.jumlahPendudukTekstual ?? '');
  const [catatanPenduduk, setCatatanPenduduk] = useState(initialData.catatanPenduduk ?? '');

  const [mataPencaharian, setMataPencaharian] = useState(initialData.mataPencaharian ?? '');
  const [sektorPendukung, setSektorPendukung] = useState(initialData.sektorPendukung ?? '');

  const [ringkasan, setRingkasan] = useState(initialData.ringkasan ?? '');
  const [catatan, setCatatan] = useState(initialData.catatan ?? '');

  function handleSubmit() {
    if (isLoading) return;
    onSave({
      jumlahPendudukTekstual: jumlahPendudukTekstual.trim(),
      catatanPenduduk: catatanPenduduk.trim(),
      mataPencaharian: mataPencaharian.trim(),
      sektorPendukung: sektorPendukung.trim(),
      ringkasan: ringkasan.trim(),
      catatan: catatan.trim(),
      lastUpdated: null,
    });
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 dark:bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl
                   dark:bg-elev dark:border dark:border-border dark:text-ink transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-ink dark:text-ink">
              Edit Kondisi Sosial &amp; Ekonomi
            </h3>
            <p className="text-[12px] text-gray-500 leading-relaxed dark:text-ink/70">
              Perbarui gambaran sosial ekonomi desa.
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

        {/* BODY */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 text-sm space-y-6">
          {/* KARTU 1: Penduduk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-ink mb-1 dark:text-ink">
                Perkiraan Jumlah Penduduk
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                           dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
                value={jumlahPendudukTekstual}
                disabled={isLoading}
                onChange={(e) => setJumlahPendudukTekstual(e.target.value)}
                placeholder={`Contoh: "1.234 jiwa" / "— jiwa"`}
              />

              <label className="block text-[12px] font-medium text-ink mb-1 mt-4 dark:text-ink">
                Catatan Penduduk
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                           dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
                value={catatanPenduduk}
                disabled={isLoading}
                onChange={(e) => setCatatanPenduduk(e.target.value)}
                placeholder={`Contoh: "menunggu data resmi pemerintah desa"`}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ink mb-1 dark:text-ink">
                Pencaharian Utama
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                           dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
                value={mataPencaharian}
                disabled={isLoading}
                onChange={(e) => setMataPencaharian(e.target.value)}
                placeholder="Contoh: Pertanian"
              />

              <label className="block text-[12px] font-medium text-ink mb-1 mt-4 dark:text-ink">
                Pekerjaan / Sektor Pendukung
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                           dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
                value={sektorPendukung}
                disabled={isLoading}
                onChange={(e) => setSektorPendukung(e.target.value)}
                placeholder="Contoh: Buruh harian, sopir, pedagang kecil"
              />
            </div>
          </div>

          {/* RINGKASAN */}
          <div>
            <label className="block text-[12px] font-medium text-ink mb-1 dark:text-ink">
              Ringkasan Sosial Ekonomi
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm leading-relaxed
                         focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                         dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
              rows={5}
              value={ringkasan}
              disabled={isLoading}
              onChange={(e) => setRingkasan(e.target.value)}
              placeholder={`Contoh:
Warga Desa Tempok sebagian besar bergantung pada sektor pertanian — baik mengelola kebun sendiri maupun membantu di lahan keluarga.`}
            />
          </div>

          {/* CATATAN FOOTER */}
          <div>
            <label className="block text-[12px] font-medium text-ink mb-1 dark:text-ink">
              Catatan Tambahan (keterangan kecil di bawah)
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm leading-relaxed
                         focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100
                         dark:bg-elev dark:border-border dark:text-ink dark:disabled:bg-elev/60"
              rows={3}
              value={catatan}
              disabled={isLoading}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder={`Contoh:
Data sektor ekonomi desa akan dilengkapi dan diperbarui secara bertahap.`}
            />
          </div>
        </div>

        {/* FOOTER */}
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
