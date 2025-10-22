import StatCard from "./components/ui/StatCard";
import EditBadge from "./components/ui/EditBadge";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary/20 via-white to-brand-light/40 border border-black/5">
        <EditBadge title="Edit hero" message="Edit Hero (admin only)" />
        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand-dark">didi ganteng </h1>
          <p className="mt-2 max-w-2xl text-gray-700">
            Portal informasi resmi: profil desa, data penduduk, potensi UMKM & wisata mangrove, layanan, dan berita kegiatan.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="/profil" className="inline-flex items-center rounded-lg bg-brand-primary text-black px-4 py-2 text-sm font-medium hover:brightness-95 border border-brand-dark/10">
              Lihat Profil
            </a>
            <a href="/kontak" className="inline-flex items-center rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
              Kontak
            </a>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Data Singkat</h2>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <EditBadge title="Edit jumlah penduduk" message="Edit: Jumlah Penduduk" />
            <StatCard label="Jumlah Penduduk" value={2140} unit="jiwa" hint="Update: Okt 2025" />
          </div>
          <div className="relative">
            <EditBadge title="Edit luas wilayah" message="Edit: Luas Wilayah" />
            <StatCard label="Luas Wilayah" value={12.8} unit="km²" />
          </div>
          <div className="relative">
            <EditBadge title="Edit jumlah KK" message="Edit: Jumlah KK" />
            <StatCard label="Jumlah KK" value={560} unit="KK" />
          </div>
          <div className="relative">
            <EditBadge title="Edit jumlah dusun" message="Edit: Dusun" />
            <StatCard label="Dusun" value={4} />
          </div>
        </div>
      </section>

      {/* Potensi Desa */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Potensi Desa</h2>
          <a href="/potensi" className="text-sm text-gray-600 hover:text-black">Lihat semua</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Pertanian", "UMKM", "Wisata Mangrove"].map((t) => (
            <div key={t} className="relative rounded-xl bg-white border border-black/5 p-5 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
              <EditBadge title={`Edit ${t}`} message={`Edit: ${t}`} />
              <div className="text-brand-dark font-medium">{t}</div>
              <p className="mt-1 text-sm text-gray-600">Deskripsi singkat…</p>
              <div className="mt-4">
                <a href="/potensi" className="text-sm underline">Selengkapnya</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
