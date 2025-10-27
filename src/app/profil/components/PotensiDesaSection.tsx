import Image from 'next/image';

export default function PotensiDesaSection() {
  const items = [
    {
      title: "Pertanian & Perkebunan",
      desc: "Lahan produktif dengan potensi hasil pertanian skala rumah tangga.",
      img: "https://placehold.co/600x400?text=Pertanian",
    },
    {
      title: "UMKM & Produk Lokal",
      desc: "Olahan hasil tani, makanan rumahan, dan usaha kecil masyarakat.",
      img: "https://placehold.co/600x400?text=UMKM",
    },
    {
      title: "Budaya & Komunitas",
      desc: "Tradisi lokal dan kegiatan sosial masyarakat desa.",
      img: "https://placehold.co/600x400?text=Budaya",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-white shadow-sm border border-black/5 overflow-hidden flex flex-col"
          >
            <div className="relative h-32 w-full bg-gray-200">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                priority={idx === 0} 
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed flex-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
