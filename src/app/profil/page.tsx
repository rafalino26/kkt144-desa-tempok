import IdentitasDesaSection from './components/IdentitasDesaSection';
import SejarahDesaSection from './components/SejarahDesaSection';
import GeografisSection from './components/GeografisSection';
import SosialEkonomiSection from './components/SosialEkonomiSection';
import PotensiDesaSection from './components/PotensiDesaSection';
import VisiMisiSection from './components/VisiMisiSection';
import StrukturPemerintahanSection from './components/StrukturPemerintahanSection';
import PetaKontakSection from './components/PetaKontakSection';

export default function ProfilDesaPage() {
  return (
    <main>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
        <section
          className="relative rounded-2xl overflow-hidden
                     bg-gradient-to-br from-brand-primary/70 via-brand-light/60 to-brand-primary/70
                     border border-black/5 shadow-sm p-6 md:p-10"
        >
          <div className="max-w-2xl">

            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-brand-dark">
             Profil Desa Tempok
            </h1>

            <p className="mt-2 text-brand-dark/90 text-sm sm:text-base leading-relaxed">
              Gambaran umum Desa Tempok, Kecamatan Tompaso, Kabupaten Minahasa,
              Sulawesi Utara.
            </p>
          </div>
        </section>

        <div className="space-y-12">
          <IdentitasDesaSection />

          <SejarahDesaSection />

          <GeografisSection />

          <SosialEkonomiSection />

          <PotensiDesaSection />

          <VisiMisiSection />

          <StrukturPemerintahanSection />

          <PetaKontakSection />
        </div>

      </div>
    </main>
  );
}