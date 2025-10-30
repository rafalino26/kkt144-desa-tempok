// src/app/kontak/components/KontakClient.tsx
'use client';

import { useState } from 'react';

export default function KontakClient() {
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm border border-black/5">
      <h2 className="text-xl font-semibold text-ink mb-4">Kirim Pesan</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Terima kasih! Pesan Anda telah dikirim (dummy).');
          setForm({ nama: '', email: '', pesan: '' });
        }}
        className="space-y-4"
      >
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
          className="rounded-full bg-brand-primary px-5 py-2 text-sm font-medium text-brand-dark ring-1 ring-brand-dark/20 hover:bg-brand-light transition-colors"
        >
          Kirim Pesan
        </button>
      </form>
    </section>
  );
}
