'use client';

import Image from 'next/image';

type PotensiItem = {
  id: string;
  judul: string;
  ringkasan: string;
  kategori: { id: string; slug: string; nama: string; urutan: number };
  tanaman: Array<{
    nama: string;
    deskripsi: string;
    gambar: string;
  }>;
};

type Props = { initialData: { items: PotensiItem[] } };

export default function PotensiPertanianClient({ initialData }: Props) {
  return (
    <section className="space-y-10">
      {/* Penjelasan singkat */}
    <div className="max-w-3xl text-left">
  <h2 className="text-3xl font-semibold text-ink">
    Potensi Pertanian Desa Tempok
  </h2>
  <p className="mt-3 text-sm text-gray-600">
    Desa Tempok memiliki potensi besar di sektor pertanian, khususnya dalam tanaman hortikultura dan pangan. 
    Tanaman-tanaman seperti kubis, cabai dan tomat menjadi komoditas utama yang banyak dibudidayakan di sini.
  </p>
</div>
      {/* Hero sawah tetap */}
      <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/sawah.jpeg"
          alt="Sawah Desa Tempok"
          fill
          className="object-cover"
          priority
        />
      </div>


      {/* Kategori + daftar tanaman */}
      <div className="space-y-12">
        {initialData.items.map((item, idxCat) => (
          <div key={item.id} className="space-y-8">
            {/* Header kategori: TANPA gambar, center */}
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-semibold text-ink">{item.judul}</h3>
              <p className="mt-3 text-sm text-gray-600">{item.ringkasan}</p>
            </div>

            {/* Daftar tanaman: gambar + teks selang-seling */}
            <div className="space-y-10">
              {item.tanaman.map((tanaman, index) => {
                const imgOrder = index % 2 === 0 ? 'md:order-1' : 'md:order-2';
                const textOrder = index % 2 === 0 ? 'md:order-2' : 'md:order-1';
                return (
                  <div
                    key={tanaman.nama}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                  >
                    <div className={`relative h-[250px] md:h-[300px] ${imgOrder}`}>
                      <Image
                        src={tanaman.gambar}
                        alt={tanaman.nama}
                        fill
                        className="object-cover rounded-lg shadow-lg"
                      />
                    </div>
                    <div className={`flex flex-col justify-center text-center md:text-left ${textOrder}`}>
                      <h4 className="text-xl font-semibold text-ink">{tanaman.nama}</h4>
                      <p className="mt-3 text-sm text-gray-700">{tanaman.deskripsi}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pemisah halus antar kategori */}
            {idxCat < initialData.items.length - 1 && (
              <hr className="my-2 border-black/10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
