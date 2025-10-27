// src/app/profil/components/SosialEkonomiSection.tsx


function MiniStatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-black/5">
      <div className="text-[11px] text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-ink">{value}</div>
      {note && <div className="mt-1 text-[11px] text-gray-500">{note}</div>}
    </div>
  );
}

export default function SosialEkonomiSection() {
  return (
    <section className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MiniStatCard
          label="Perkiraan Jumlah Penduduk"
          value="— jiwa"
          note="(menunggu data resmi)"
        />
        <MiniStatCard
          label="Mata Pencaharian Utama"
          value="Pertanian"
          note="Petani & usaha rumah tangga"
        />
        <MiniStatCard
          label="Sektor Pendukung"
          value="UMKM lokal"
          note="Perdagangan kecil, olahan pangan"
        />
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5 text-sm text-gray-700 leading-relaxed space-y-4">
        <p>
          Sebagian besar warga Desa Tempok bekerja dalam sektor pertanian.
          Selain itu terdapat usaha kecil menengah berbasis rumah tangga,
          perdagangan lokal, serta layanan jasa masyarakat.
        </p>

        <p>
          Distribusi profesi (petani, wiraswasta, PNS/TNI/Polri, karyawan swasta, dll)
          akan divisualisasikan dalam bentuk grafik seperti di halaman utama desa.
        </p>
      </div>
    </section>
  );
}
