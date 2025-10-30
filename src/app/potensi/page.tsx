// src/app/potensi/page.tsx
import PotensiPertanianClient from "./components/PotensiPertanianClient";

export const metadata = {
  title: 'Potensi Pertanian Desa Tempok',
  description: 'Galeri potensi pertanian desa: tanaman hortikultura dan pangan.',
};

export default async function PotensiDesaPage() {
  const data = {
    isAdmin: false, // bisa diubah kalau nanti ada admin
    kategori: [
      { id: 'k1', slug: 'pertanian', nama: 'Pertanian', urutan: 1 },
    ],
    items: [
      {
        id: 'i1',
        judul: 'Tanaman Hortikultura',
        ringkasan:
          'Tanaman hortikultura seperti kubis, wortel, cabai, tomat, dan daun bawang menjadi komoditas utama di desa ini.',
        kategori: { id: 'k1', slug: 'pertanian', nama: 'Pertanian', urutan: 1 },
        tanaman: [
          {
            nama: 'Kol',
            deskripsi: 'Kol adalah salah satu tanaman sayuran yang banyak dibudidayakan di Desa Tempok.',
            gambar: '/kol.jpeg',
          },
          {
            nama: 'Cabai',
            deskripsi: 'Cabai adalah komoditas unggulan yang banyak dimanfaatkan untuk masakan lokal.',
            gambar: '/rica.jpeg',
          },
          {
            nama: 'Tomat',
            deskripsi: 'Tomat adalah salah satu tanaman yang memiliki banyak manfaat, baik untuk konsumsi maupun industri.',
            gambar: '/tomat.jpeg',
          },
        ],
      },
      {
        id: 'i2',
        judul: 'Tanaman Pangan',
        ringkasan:
          'Tanaman pangan seperti padi dan jagung juga masih banyak dibudidayakan di Desa Tempok.',
        kategori: { id: 'k1', slug: 'pertanian', nama: 'Pertanian', urutan: 1 },
        tanaman: [
          {
            nama: 'Padi',
            deskripsi: 'Padi adalah tanaman pangan utama di desa, yang diproduksi untuk konsumsi lokal.',
            gambar: '/padi.jpeg',
          },
          {
            nama: 'Jagung',
            deskripsi: 'Jagung menjadi tanaman pangan yang memiliki banyak kegunaan dalam berbagai industri.',
            gambar: '/jagung.jpeg',
          },
        ],
      },
    ],
  };

  return (
    <main>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        <PotensiPertanianClient initialData={data} />
      </div>
    </main>
  );
}
