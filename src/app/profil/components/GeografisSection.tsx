'use client';

import dynamic from 'next/dynamic';

const MapComponentNoSSR = dynamic(
  () => import('@/app/components/ui/MapComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-gray-500 text-sm">
        Memuat peta...
      </div>
    ),
  }
);

export default function GeografisSection() {
  return (
    <section className="space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5 text-sm text-gray-700 leading-relaxed space-y-4">
          <div>
            <h3 className="text-base font-semibold text-ink">
              Lokasi & Topografi
            </h3>
            <p className="mt-2">
              Desa Tempok terletak di Kecamatan Tompaso, Kabupaten Minahasa.
              Wilayah desa berada pada kawasan dataran tinggi Minahasa
              dengan lahan pertanian dan pemukiman warga.
              Perkiraan ketinggian: &gt; 600 mdpl (akan dikonfirmasi).
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-ink">Batas Wilayah</h3>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li><span className="font-medium text-ink">Utara</span> : (desa tetangga)</li>
              <li><span className="font-medium text-ink">Timur</span> : (desa tetangga)</li>
              <li><span className="font-medium text-ink">Selatan</span> : (desa tetangga)</li>
              <li><span className="font-medium text-ink">Barat</span> : (desa tetangga)</li>
            </ul>
          </div>

          <div className="text-xs text-gray-500">
            *Batas administratif akan diverifikasi dari pemerintah desa.
          </div>
        </div>

        <div className="rounded-xl bg-white shadow-sm border border-black/5 h-[320px] p-4 flex flex-col">
          <div className="text-sm font-semibold text-ink mb-3 flex items-center justify-between">
            <span>Peta Lokasi Desa Tempok</span>
            <a
              className="text-[11px] font-medium text-brand-dark underline hover:opacity-80"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buka di Google Maps
            </a>
          </div>
          <div className="flex-1 overflow-hidden rounded-lg ring-1 ring-brand-dark/10">
            <MapComponentNoSSR />
          </div>
        </div>
      </div>
    </section>
  );
}
