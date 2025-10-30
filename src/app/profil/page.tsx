import { db } from '@/app/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import IdentitasDesaSection from './components/IdentitasDesaSection';
import SejarahDesaSection from './components/SejarahDesaSection';
import GeografisSection from './components/GeografisSection';
import SosialEkonomiSection from './components/SosialEkonomiSection';
import VisiMisiSection from './components/VisiMisiSection';
import StrukturPemerintahanSection from './components/StrukturPemerintahanSection';

export default async function ProfilDesaPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = !!session?.user;

   const geoRow = await db.profilGeografis.findFirst();

  const geoInitialData = geoRow
    ? {
        deskripsiLokasi: geoRow.deskripsiLokasi,
        batasUtara: geoRow.batasUtara ?? '',
        batasTimur: geoRow.batasTimur ?? '',
        batasSelatan: geoRow.batasSelatan ?? '',
        batasBarat: geoRow.batasBarat ?? '',
        googleMapsUrl: geoRow.googleMapsUrl ?? '',
        lastUpdated: geoRow.updatedAt
          ? geoRow.updatedAt.toISOString()
          : null,
      }
    : {
        deskripsiLokasi:
`Desa Tempok terletak di Kecamatan Tompaso, Kabupaten Minahasa.
Wilayah desa berada di kawasan dataran tinggi Minahasa
dengan lahan pertanian dan permukiman warga.
Perkiraan ketinggian: > 600 mdpl (akan dikonfirmasi).`,
        batasUtara: "(belum diisi)",
        batasTimur: "(belum diisi)",
        batasSelatan: "(belum diisi)",
        batasBarat: "(belum diisi)",
        googleMapsUrl: "",
        lastUpdated: null,
      };

  const identRow = await db.profilIdentitas.findFirst();
  const identInitialData = identRow
    ? {
        namaDesa: identRow.namaDesa,
        kecamatan: identRow.kecamatan,
        kabupaten: identRow.kabupaten,
        provinsi: identRow.provinsi,
        kodePos: identRow.kodePos ?? '',
        kodeKemendagri: identRow.kodeKemendagri ?? '',
        koordinat: identRow.koordinat ?? '',
        kepalaDesa: identRow.kepalaDesa ?? '',
        catatan: identRow.catatan ?? '',
        lastUpdated: identRow.updatedAt
          ? identRow.updatedAt.toISOString()
          : null,
      }
    : {
        namaDesa: 'Desa Tempok',
        kecamatan: 'Tompaso',
        kabupaten: 'Minahasa',
        provinsi: 'Sulawesi Utara',
        kodePos: '95693',
        kodeKemendagri: '71.02.07.2009',
        koordinat: '1°11′26.48″ N, 124°48′43.49″ E',
        kepalaDesa: '(nama Kepala Desa)',
        catatan: '',
        lastUpdated: null,
      };

const perangkatRows = await db.profilPerangkatDesa.findMany({
  orderBy: { urutan: 'asc' },
});

const perangkatInitialData = perangkatRows.map(row => ({
  id: row.id,
  nama: row.nama,
  jabatan: row.jabatan,
  urutan: row.urutan,
  updatedAt: row.updatedAt.toISOString(),
}));

const visiMisiRow = await db.profilVisiMisi.findFirst();

const visiMisiInitialData = visiMisiRow
  ? {
      visi: visiMisiRow.visi,
      misi: Array.isArray(visiMisiRow.misi)
        ? (visiMisiRow.misi as string[])
        : [],
      lastUpdated: visiMisiRow.updatedAt
        ? visiMisiRow.updatedAt.toISOString()
        : null,
    }
  : {
      visi: '“Mewujudkan Desa Tempok yang mandiri, maju, dan sejahtera melalui pemerataan pembangunan serta pemberdayaan masyarakat.”',
      misi: [
        'Meningkatkan pelayanan publik yang transparan dan mudah diakses.',
        'Mendorong ekonomi masyarakat berbasis potensi lokal.',
        'Membangun infrastruktur desa secara merata dan bertahap.',
        'Menjaga kerukunan, keamanan, dan partisipasi warga.',
      ],
      lastUpdated: null,
    };

    const sejarahRow = await db.profilSejarah.findFirst();

const sejarahInitialData = sejarahRow
  ? {
      content: sejarahRow.content,
      lastUpdated: sejarahRow.updatedAt
        ? sejarahRow.updatedAt.toISOString()
        : null,
    }
  : {
      content: `Desa Tempok merupakan salah satu desa di Kecamatan Tompaso,
Kabupaten Minahasa, Sulawesi Utara. Permukiman ini berkembang
sebagai bagian dari wilayah Minahasa yang dikenal dengan tradisi
pertanian dan kehidupan komunitas yang kuat.

Nama “Tempok” diyakini berasal dari penamaan lokal masyarakat setempat.
Seiring waktu, desa ini tumbuh sebagai pusat aktivitas warga di bidang
pertanian, usaha rumah tangga, dan kegiatan sosial.`,
      lastUpdated: null,
    };

    const sosEkRow = await db.profilSosialEkonomi.findFirst();

const sosialEkonomiInitialData = sosEkRow
  ? {
      jumlahPendudukTekstual: sosEkRow.jumlahPendudukTekstual ?? '— jiwa',
      catatanPenduduk: sosEkRow.catatanPenduduk ?? 'menunggu data resmi pemerintah desa',

      mataPencaharian: sosEkRow.mataPencaharian ?? 'Pertanian',
      sektorPendukung: sosEkRow.sektorPendukung ?? 'Pekerja harian & jasa',

      ringkasan: sosEkRow.ringkasan ?? '',
      catatan:
        sosEkRow.catatan ??
        'Data sektor ekonomi desa akan dilengkapi dan diperbarui secara bertahap. Grafik profesi penduduk dapat dilihat pada halaman utama.',

      lastUpdated: sosEkRow.updatedAt
        ? sosEkRow.updatedAt.toISOString()
        : null,
    }
  : {
      jumlahPendudukTekstual: '— jiwa',
      catatanPenduduk: 'menunggu data resmi pemerintah desa',

      mataPencaharian: 'Pertanian',
      sektorPendukung: 'Buruh, sopir, pedagang kecil',

      ringkasan:
        `Warga Desa Tempok sebagian besar bergantung pada sektor pertanian — baik mengelola kebun sendiri maupun membantu di lahan keluarga. Komoditas spesifik (jenis tanaman, hasil kebun, dsb.) akan ditambahkan setelah data resmi dari pemerintah desa tersedia.\n\nSelain bertani, ada juga warga yang bekerja sebagai tenaga harian lepas, jasa transport, dan pekerjaan informal lain. Sebagian kecil bekerja di sektor pemerintahan, pendidikan, atau pelayanan publik di luar desa.`,
      catatan:
        'Data sektor ekonomi desa akan dilengkapi dan diperbarui secara bertahap. Grafik profesi penduduk dapat dilihat pada halaman utama.',

      lastUpdated: null,
    };

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
          <IdentitasDesaSection
            isAdmin={isAdmin}
            initialData={identInitialData}
          />

          <StrukturPemerintahanSection
            isAdmin={isAdmin}
            initialPerangkat={perangkatInitialData}
          />


         <VisiMisiSection
            isAdmin={isAdmin}
            initialData={visiMisiInitialData}
          />


          <SejarahDesaSection
            isAdmin={isAdmin}
            initialData={sejarahInitialData}
          />

          <GeografisSection
            isAdmin={isAdmin}
            initialData={geoInitialData}
          />

         <SosialEkonomiSection
            isAdmin={isAdmin}
            initialData={sosialEkonomiInitialData}
          />

        </div>

      </div>
    </main>
  );
}
