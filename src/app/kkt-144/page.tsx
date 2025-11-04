import Image from "next/image";

export const metadata = {
  title: "KKT-144 Universitas Sam Ratulangi",
  description: "Halaman tentang KKT-144 Posko Desa Tempok.",
};

export default function KKT144Page() {
  return (
    <main>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        {/* JUDUL & DESKRIPSI */}
        <section className="space-y-6 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 dark:text-ink">
            KKT-144 Universitas Sam Ratulangi, Posko Tempok
          </h2>

          {/* Instagram section */}
          <div className="flex items-center justify-center gap-2 text-ink dark:text-ink">
            <a
              href="https://www.instagram.com/kkt144_tempok?igsh=dWVtaXZvZzJ5amNq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.25a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              <span className="font-medium">@kkt144_tempok</span>
            </a>
          </div>
        </section>

        {/* FOTO LANDSCAPE UTAMA */}
        <section>
          <figure className="space-y-3">
            <div className="relative h-[300px] sm:h-[600px] rounded-xl overflow-hidden shadow-lg border border-black/5 dark:border-white/20">
              <Image
                src="/poskotempok.jpeg"
                alt="Foto landscape utama KKT-144 di Desa Tempok"
                fill
                className="object-cover object-[center_70%]"
                sizes="100vw"
                priority
              />
            </div>
            <figcaption className="text-sm text-gray-800 dark:text-ink text-center">
              KKT-144 Posko Tempok.
            </figcaption>
          </figure>
        </section>

        {/* 2 FOTO DI ATAS (BERSEBELAHAN) */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* FOTO 1 */}
            <figure className="space-y-3">
              <div className="relative h-48 sm:h-56 md:h-80 rounded-xl overflow-hidden border border-black/5 dark:border-white/20 shadow-sm">
                <Image
                  src="/bersamadpl.jpeg"
                  alt="Kegiatan KKT-144 di lapangan"
                  fill
                  className="object-cover object-[center_70%]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
              </div>
              <figcaption className="text-sm text-gray-800 dark:text-ink text-center">
                Dokumentasi bersama Pengawas Lapangan di lokasi kegiatan.
              </figcaption>
            </figure>

            {/* FOTO 2 */}
            <figure className="space-y-3">
              <div className="relative h-48 sm:h-56 md:h-80 rounded-xl overflow-hidden border border-black/5 dark:border-white/20 shadow-sm">
                <Image
                  src="/bersamadpl2.jpeg"
                  alt="Koordinasi tim KKT-144"
                  fill
                  className="object-cover object-[center_70%]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
              </div>
              <figcaption className="text-sm text-gray-800 dark:text-ink text-center">
                Dokumentasi bersama Dosen Pembimbing Lapangan di lokasi kegiatan.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* GALERI BAWAH */}
<section className="space-y-10 pt-20">
  <h2 className="text-center text-3xl font-semibold text-ink">
    Dokumentasi Program Kerja KKT-144 Posko Tempok
  </h2>

  <div className="space-y-6 pt-10">
    <h3 className="text-2xl font-semibold text-center text-ink">
      Program Tambahan - Sabtu Bersih (Kerja Bakti di Balai Desa)
    </h3>

    {/* GRID FOTO */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* FOTO 1 */}
      <figure className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-black/5 shadow-sm">
        <Image
          src="/kerjabakti1.jpeg"
          alt="Kerja bakti bersama warga Desa Tempok"
          fill
          className="object-cover object-[center_65%] hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </figure>

      {/* FOTO 2 */}
      <figure className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-black/5 shadow-sm">
        <Image
          src="/kerjabakti2.jpeg"
          alt="Gotong royong membersihkan area sekitar posko"
          fill
          className="object-cover object-[center_30%] hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </figure>

      {/* FOTO 3 */}
      <figure className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-black/5 shadow-sm">
        <Image
          src="/kerjabakti3.jpeg"
          alt="Kegiatan bersih-bersih di lingkungan desa"
          fill
          className="object-cover object-[center_65%] hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </figure>
    </div>

    {/* BARIS TERAKHIR (2 FOTO CENTER) */}
    <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
      <figure className="relative h-48 sm:h-56 md:h-64 sm:w-[45%] lg:w-[30%] rounded-xl overflow-hidden border border-black/5 shadow-sm">
        <Image
          src="/kerjabakti4.jpeg"
          alt="Mahasiswa bersama warga saat kerja bakti"
          fill
          className="object-cover object-[center_60%] hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 30vw"
        />
      </figure>

      <figure className="relative h-48 sm:h-56 md:h-64 sm:w-[45%] lg:w-[30%] rounded-xl overflow-hidden border border-black/5 shadow-sm">
        <Image
          src="/kerjabakti5.jpeg"
          alt="Kerja bakti pembersihan jalan utama Desa Tempok"
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 30vw"
        />
      </figure>
    </div>
  </div>

  <div className="space-y-6 pt-20">
    <h3 className="text-2xl font-semibold text-center text-ink">
      Program Tambahan - Belajar Seru Penuh Kreasi (Belajar Mengajar)
    </h3>

    {/* BARIS ATAS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <figure className="relative h-48 sm:h-56 md:h-80 rounded-xl overflow-hidden border border-black/5 shadow-sm">
        <Image
          src="/homeschooling.jpeg"
          alt="Kegiatan belajar bersama anak-anak"
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </figure>

      <figure className="relative h-48 sm:h-56 md:h-80 rounded-xl overflow-hidden border border-black/5 shadow-sm">
        <Image
          src="/homeschooling2.jpeg"
          alt="Mahasiswa KKT mengajar di sekolah desa"
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </figure>
    </div>

    {/* BARIS BAWAH (CENTER) */}
    <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
      <figure className="relative h-48 sm:h-56 md:h-64 sm:w-[45%] lg:w-[30%] rounded-xl overflow-hidden border border-black/5 shadow-sm">
        <Image
          src="/homeschooling3.jpeg"
          alt="Belajar interaktif bersama anak-anak"
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 30vw"
        />
      </figure>

      <figure className="relative h-48 sm:h-56 md:h-64 sm:w-[45%] lg:w-[30%] rounded-xl overflow-hidden border border-black/5 shadow-sm">
        <Image
          src="/homeschooling4.jpeg"
          alt="Kegiatan kreatif belajar penuh warna"
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 30vw"
        />
      </figure>
    </div>
  </div>

{/* ========================================== */}
{/* 3️⃣ PROGRAM: PENGENALAN ECOBIN */}
{/* ========================================== */}
<div className="space-y-6 pt-20">
  <h3 className="text-2xl font-semibold text-center text-ink">
    Program Tambahan - Pengenalan Ecobin (Pembuatan dan Pemilahan Sampah Organik dan Non-Organik) dan PHBS (Perilaku Hidup Bersih dan Sehat), Pendampingan cuci tangan menurut WHO
  </h3>

  {/* GRID FOTO ATAS (3 FOTO) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <figure className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-black/5 shadow-sm">
      <Image
        src="/phbs3.jpeg"
        alt="Pembuatan ecobin oleh mahasiswa KKT-144"
        fill
        className="object-cover object-center hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </figure>

    <figure className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-black/5 shadow-sm">
      <Image
        src="/phbs4.jpeg"
        alt="Sosialisasi pemilahan sampah kepada masyarakat"
        fill
        className="object-cover object-center hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </figure>

    <figure className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-black/5 shadow-sm">
      <Image
        src="/phbs5.jpeg"
        alt="Mahasiswa memperkenalkan ecobin ke warga"
        fill
        className="object-cover object-center hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </figure>
  </div>

  {/* BARIS BAWAH (2 FOTO CENTER) */}
  <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
    <figure className="relative h-48 sm:h-56 md:h-64 sm:w-[45%] lg:w-[30%] rounded-xl overflow-hidden border border-black/5 shadow-sm">
      <Image
        src="/phbs.jpeg"
        alt="Warga belajar memilah sampah organik dan non-organik"
        fill
        className="object-cover object-center hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 30vw"
      />
    </figure>

    <figure className="relative h-48 sm:h-56 md:h-64 sm:w-[45%] lg:w-[30%] rounded-xl overflow-hidden border border-black/5 shadow-sm">
      <Image
        src="/phbs2.jpeg"
        alt="Ecobin hasil karya mahasiswa KKT-144"
        fill
        className="object-cover object-center hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 30vw"
      />
    </figure>
  </div>
</div>

{/* ========================================== */}
{/* 4️⃣ PROGRAM: SENSUS PENDUDUK (PENDATAAN) */}
{/* ========================================== */}
<div className="space-y-6 pt-20">
  <h3 className="text-2xl font-semibold text-center text-ink">
    Program Tambahan - Sensus Penduduk (Pendataan)
  </h3>

  {/* GRID FOTO ATAS (3 FOTO) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <figure className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-black/5 shadow-sm">
      <Image
        src="/sensus.jpeg"
        alt="Kegiatan sensus penduduk oleh mahasiswa KKT-144"
        fill
        className="object-cover object-center hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </figure>

    <figure className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-black/5 shadow-sm">
      <Image
        src="/sensus2.jpeg"
        alt="Pendataan rumah tangga di Desa Tempok"
        fill
        className="object-cover object-center hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </figure>

    <figure className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-black/5 shadow-sm">
      <Image
        src="/sensus3.jpeg"
        alt="Koordinasi tim pendataan bersama aparat desa"
        fill
        className="object-cover object-center hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </figure>
  </div>

  {/* FOTO TERAKHIR (CENTER) */}
  <div className="flex justify-center">
    <figure className="relative h-48 sm:h-56 md:h-64 w-full sm:w-[70%] lg:w-[40%] rounded-xl overflow-hidden border border-black/5 shadow-sm">
      <Image
        src="/sensus4.jpeg"
        alt="Warga mengisi data sensus bersama mahasiswa KKT-144"
        fill
        className="object-cover object-center hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    </figure>
  </div>
</div>


</section>
      </div>
    </main>
  );
}
