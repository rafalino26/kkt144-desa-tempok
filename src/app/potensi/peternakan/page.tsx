
import Image from "next/image";
import PotensiTabsClient from "../components/PotensiTabsClient";

export const metadata = {
  title: "Potensi Peternakan Desa Tempok",
  description: "Informasi tentang peternakan di Desa Tempok.",
};

type PetItem = {
  nama: string;
  desc: string;
  src: string;
  alt: string;
  figureClass?: string;
  imageClass?: string;
};

export default function PotensiPeternakanPage() {
  const items: PetItem[] = [
    {
      nama: "Sapi",
      desc:
        "Sapi dimanfaatkan untuk daging, susu, dan menunjang aktivitas pertanian. Populasinya tersebar di beberapa kandang milik warga.",
      src: "/sapi.jpeg",
      alt: "Peternakan sapi Desa Tempok",
      figureClass: "h-56 md:h-72",
      imageClass: "object-cover object-[center_90%]",
    },
    {
      nama: "Bebek",
      desc:
        "Bebek menjadi sumber telur dan daging. Pemeliharaannya relatif mudah dan cocok dengan lingkungan desa.",
      src: "/bebek.jpeg",
      alt: "Peternakan bebek Desa Tempok",
      figureClass: "h-56 md:h-72",
      imageClass: "object-cover object-[center_20%]",
    },
  ];

  return (
    <main>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        {/* Tabs */}
        <PotensiTabsClient />

        {/* Intro */}
        <section className="space-y-6 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-ink dark:text-ink">
            Potensi Peternakan Desa Tempok
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed dark:text-ink/70">
            Selain pertanian, Desa Tempok juga memiliki potensi di sektor
            peternakan — terutama sapi dan bebek — yang mendukung ekonomi rumah
            tangga warga.
          </p>
        </section>

        {/* Alternating grid */}
        <section className="space-y-12">
          {items.map((item, idx) => {
            const imgOrder = idx % 2 === 0 ? "md:order-1" : "md:order-2";
            const textOrder = idx % 2 === 0 ? "md:order-2" : "md:order-1";

            return (
              <div
                key={item.nama}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                {/* Kolom Gambar */}
                <figure
                  className={`relative rounded-xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm ${item.figureClass ?? "h-56 md:h-72"} ${imgOrder}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={`${item.imageClass ?? "object-cover"}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                </figure>

                {/* Kolom Teks */}
                <div
                  className={`flex flex-col justify-center text-center md:text-left ${textOrder}`}
                >
                  <h3 className="text-2xl font-semibold text-ink dark:text-ink">
                    {item.nama}
                  </h3>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed dark:text-ink/70">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
