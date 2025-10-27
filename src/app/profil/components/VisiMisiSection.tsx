export default function VisiMisiSection() {
  return (
    <section className="space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5">
          <h3 className="text-base font-semibold text-ink uppercase tracking-wide">
            Visi
          </h3>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">
            “Mewujudkan Desa Tempok yang mandiri, maju, dan sejahtera
            melalui pemerataan pembangunan serta pemberdayaan masyarakat.”
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-black/5">
          <h3 className="text-base font-semibold text-ink uppercase tracking-wide">
            Misi
          </h3>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 leading-relaxed space-y-2">
            <li>Meningkatkan pelayanan publik yang transparan dan mudah diakses.</li>
            <li>Mendorong ekonomi masyarakat berbasis potensi lokal.</li>
            <li>Membangun infrastruktur desa secara merata dan bertahap.</li>
            <li>Menjaga kerukunan, keamanan, dan partisipasi warga.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
