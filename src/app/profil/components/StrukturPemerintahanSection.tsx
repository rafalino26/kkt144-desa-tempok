import Image from 'next/image';

export default function StrukturPemerintahanSection() {
  const perangkat = [
    {
      jabatan: 'Kepala Desa',
      nama: '(Nama Kepala Desa)',
      foto: 'https://placehold.co/200x200?text=Kepala+Desa',
    },
    {
      jabatan: 'Sekretaris Desa',
      nama: '(Nama Sekdes)',
      foto: 'https://placehold.co/200x200?text=Sekdes',
    },
    {
      jabatan: 'Kaur Umum',
      nama: '(Nama)',
      foto: 'https://placehold.co/200x200?text=Kaur+Umum',
    },
    {
      jabatan: 'Kaur Keuangan',
      nama: '(Nama)',
      foto: 'https://placehold.co/200x200?text=Kaur+Keu',
    },
    {
      jabatan: 'Kepala Dusun',
      nama: '(Nama)',
      foto: 'https://placehold.co/200x200?text=Kepala+Dusun',
    },
  ];

  return (
    <section className="space-y-6">

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {perangkat.map((p, i) => (
          <div
            key={i}
            className="rounded-xl bg-white p-4 shadow-sm border border-black/5 text-center text-sm"
          >
            <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full bg-gray-200 ring-1 ring-brand-dark/10 relative">
              <Image
                src={p.foto}
                alt={p.nama}
                fill
                className="object-cover"
                sizes="80px"
                priority={i === 0} 
              />
            </div>

            <div className="font-semibold text-ink text-[13px] leading-snug">
              {p.nama}
            </div>
            <div className="text-[11px] text-gray-500 leading-snug mt-1">
              {p.jabatan}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
