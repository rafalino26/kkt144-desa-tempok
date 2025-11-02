import PotensiPertanianClient from "./components/PotensiPertanianClient";
import PotensiTabsClient from "./components/PotensiTabsClient";

export const metadata = {
  title: "Potensi Desa Tempok",
  description: "Potensi pertanian dan peternakan Desa Tempok, Kecamatan Tompaso.",
};

export default async function PotensiDesaPage() {
  const pertanianData = {
    isAdmin: false,
    items: [
      {
        id: "i1",
        judul: "Tanaman Hortikultura",
        ringkasan:
          "Tanaman hortikultura seperti kubis, wortel, cabai, tomat, dan daun bawang menjadi komoditas utama di desa ini.",
        kategori: { id: "k1", slug: "pertanian", nama: "Pertanian", urutan: 1 },
        tanaman: [
          { nama: "Kubis", deskripsi: "Kubis adalah salah satu tanaman sayuran yang banyak dibudidayakan di Desa Tempok.", gambar: "/kol.jpeg" },
          { nama: "Cabai", deskripsi: "Cabai adalah komoditas unggulan yang banyak dimanfaatkan untuk masakan lokal.", gambar: "/rica.jpeg" },
          { nama: "Tomat", deskripsi: "Tomat memiliki banyak manfaat, baik untuk konsumsi maupun industri.", gambar: "/tomat.jpeg" },
        ],
      },
      {
        id: "i2",
        judul: "Tanaman Pangan",
        ringkasan:
          "Tanaman pangan seperti padi dan jagung juga masih banyak dibudidayakan di Desa Tempok.",
        kategori: { id: "k1", slug: "pertanian", nama: "Pertanian", urutan: 1 },
        tanaman: [
          { nama: "Padi", deskripsi: "Padi adalah tanaman pangan utama di desa, untuk konsumsi lokal.", gambar: "/padi.jpeg" },
          { nama: "Jagung", deskripsi: "Jagung memiliki banyak kegunaan dalam berbagai industri.", gambar: "/jagung.jpeg" },
        ],
      },
    ],
  };

  return (
    <main>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        <PotensiTabsClient />
        <PotensiPertanianClient initialData={pertanianData} />
      </div>
    </main>
  );
}
