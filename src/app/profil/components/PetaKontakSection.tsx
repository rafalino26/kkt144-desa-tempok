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

export default function PetaKontakSection() {
  return (
    <section className="space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5 text-sm text-gray-700 leading-relaxed space-y-4">
          <div>
            <h3 className="text-base font-semibold text-ink">
              Kantor Desa Tempok
            </h3>
            <p className="mt-2">
              Desa Tempok, Kecamatan Tompaso,
              Kabupaten Minahasa, Sulawesi Utara, Indonesia.
            </p>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-ink uppercase tracking-wide">
              Kontak
            </h4>
            <p className="mt-1 text-sm text-gray-700">
              Telepon: <span className="font-medium text-ink">-</span><br/>
              Email: <span className="font-medium text-ink">-</span>
            </p>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-ink uppercase tracking-wide">
              Jam Layanan
            </h4>
            <p className="mt-1 text-sm text-gray-700">
              Senin – Jumat<br/>
              08.00 – 15.00 WITA
            </p>
          </div>

          <p className="text-[11px] text-gray-500">
            *Gunakan layanan ini untuk kebutuhan administrasi seperti surat
            keterangan domisili, usaha, dan keperluan kependudukan lainnya.
          </p>
        </div>

        {/* Peta */}
        <div className="rounded-xl bg-white shadow-sm border border-black/5 h-[260px] p-4 flex flex-col">
          <div className="text-sm font-semibold text-ink mb-3 flex items-center justify-between">
            <span>Peta Kantor Desa</span>
            <a
              className="text-[11px] font-medium text-brand-dark underline hover:opacity-80"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lihat di Maps
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
