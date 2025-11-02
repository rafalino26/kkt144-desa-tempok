'use client';

import { useState, useTransition } from 'react';
import { kirimPesanKontak } from '../actions/kontakAction';

export default function KontakClient() {
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    startTransition(async () => {
      const result = await kirimPesanKontak(form);
      if (result.success) {
        setStatus('✅ Pesan Anda berhasil dikirim!');
        setForm({ nama: '', email: '', pesan: '' });
      } else {
        setStatus('❌ Gagal mengirim pesan, coba lagi.');
      }
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-ink mb-4">Kirim Pesan</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
              placeholder="Nama lengkap Anda"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
              placeholder="Alamat email Anda"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
            <textarea
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
              rows={4}
              placeholder="Tulis pesan atau pertanyaan Anda..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-brand-primary px-5 py-2 text-sm font-medium text-brand-dark ring-1 ring-brand-dark/20 hover:bg-brand-light transition-colors disabled:opacity-50"
          >
            {isPending ? 'Mengirim...' : 'Kirim Pesan'}
          </button>
        </form>

        {status && (
          <p className="mt-3 text-sm text-gray-600">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
