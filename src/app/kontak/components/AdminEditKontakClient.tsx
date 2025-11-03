'use client';

import { useState, useTransition } from 'react';
import { updateInformasiKontak, InformasiKontakDTO } from '../actions/kontakAction';
import { Edit, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  initialInfo: InformasiKontakDTO;
}

export default function AdminEditKontakClient({ initialInfo }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<InformasiKontakDTO>({
    alamat: initialInfo.alamat,
    telepon: initialInfo.telepon,
    email: initialInfo.email,
    jam: initialInfo.jam,
    facebook: initialInfo.facebook ?? '',
    instagram: initialInfo.instagram ?? '',
  });

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateInformasiKontak(form);
      if (res.success) {
        setOpen(false);
        router.refresh(); // segarkan konten server (kolom info)
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 self-start rounded-full
                   bg-brand-light/70 px-3 py-1 text-xs font-medium text-brand-dark
                   ring-1 ring-brand-dark/10 hover:bg-brand-light transition-colors"
      >
        <Edit size={12} /> Edit Informasi
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center"
          onClick={() => !isPending && setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl border border-black/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-ink">Edit Informasi Kontak</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  Perbarui alamat, nomor telepon, email, jam layanan, dan tautan medsos.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 text-sm">
              <div>
                <label className="block text-[12px] font-medium text-ink mb-1">Alamat</label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                  value={form.alamat}
                  onChange={(e) => setForm((s) => ({ ...s, alamat: e.target.value }))}
                  disabled={isPending}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-ink mb-1">Telepon</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                    value={form.telepon}
                    onChange={(e) => setForm((s) => ({ ...s, telepon: e.target.value }))}
                    disabled={isPending}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-ink mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    disabled={isPending}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-ink mb-1">Jam Layanan</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                  value={form.jam}
                  onChange={(e) => setForm((s) => ({ ...s, jam: e.target.value }))}
                  disabled={isPending}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-ink mb-1">Facebook (opsional)</label>
                  <input
                    type="url"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                    value={form.facebook ?? ''}
                    onChange={(e) => setForm((s) => ({ ...s, facebook: e.target.value }))}
                    disabled={isPending}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-ink mb-1">Instagram (opsional)</label>
                  <input
                    type="url"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/60 disabled:bg-gray-100"
                    value={form.instagram ?? ''}
                    onChange={(e) => setForm((s) => ({ ...s, instagram: e.target.value }))}
                    disabled={isPending}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="rounded-md bg-brand-primary/80 px-4 py-2 text-sm font-medium text-brand-dark ring-1 ring-brand-dark/20 hover:bg-brand-primary disabled:opacity-50"
              >
                {isPending ? 'Menyimpan…' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
