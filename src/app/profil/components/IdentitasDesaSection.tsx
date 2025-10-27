function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-gray-500 text-[11px] uppercase tracking-wide">{label}</dt>
      <dd className="text-ink font-medium text-sm">{value}</dd>
    </div>
  );
}

export default function IdentitasDesaSection() {
  return (
    <section className="space-y-6">


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-ink">
            <InfoRow label="Nama Desa" value="Desa Tempok" />
            <InfoRow label="Kecamatan" value="Tompaso" />
            <InfoRow label="Kabupaten" value="Minahasa" />
            <InfoRow label="Provinsi" value="Sulawesi Utara" />
            <InfoRow label="Kode Pos" value="95693" />
            <InfoRow label="Kode Kemendagri" value="71.02.07.2009" />
            <InfoRow label="Koordinat" value="1°11′26.48″ N, 124°48′43.49″ E" />
            <InfoRow label="Luas Wilayah" value="(belum tersedia)" />
            <InfoRow label="Jumlah Penduduk" value="(menunggu data desa)" />
            <InfoRow label="Kepala Desa" value="(nama Kepala Desa)" />
          </dl>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-ink">
              Kantor Pemerintah Desa
            </h3>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
              Desa Tempok, Kecamatan Tompaso,
              Kabupaten Minahasa, Sulawesi Utara.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Jam layanan: Senin – Jumat, 08.00–15.00 WITA
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-brand-light/60 ring-1 ring-brand-dark/10 p-4 text-xs text-brand-dark">
            <p className="font-semibold text-brand-dark/90">
              Catatan
            </p>
            <p className="text-brand-dark/80 leading-relaxed mt-1">
              Tempok adalah salah satu desa di Kecamatan Tompaso,
              Kabupaten Minahasa, Sulawesi Utara, Indonesia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
