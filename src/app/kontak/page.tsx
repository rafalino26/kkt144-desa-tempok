// src/app/kontak/page.tsx
import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import KontakClient from './components/KontakClient';

export const metadata = {
  title: 'Kontak - Desa Tempok',
  description: 'Hubungi pemerintah Desa Tempok untuk informasi dan pelayanan.',
};

export default function KontakDesaPage() {
  // Dummy info (SSR)
  const info = {
    alamat:
      'Jl. Raya Tempok No. 1, Desa Tempok, Kec. Tompaso, Kab. Minahasa, Sulawesi Utara, 95693',
    telepon: '+62 812-3456-7890',
    email: 'desatempok@gmail.com',
    jam: 'Senin – Jumat, 08.00 – 15.00 WITA',
    facebook: '#',
    instagram: '#',
  };

  return (
    <main>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
        {/* Header Section */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary/70 via-brand-light/60 to-brand-primary/70 border border-black/5 shadow-sm p-8 md:p-10 text-brand-dark">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-semibold">Kontak Desa Tempok</h1>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-brand-dark/90">
              Hubungi pemerintah desa untuk informasi, pelayanan, atau kerja sama.
            </p>
          </div>
        </section>

        {/* Informasi + Peta */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Informasi Umum (SSR) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-ink">Informasi Umum</h2>
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-dark mt-0.5" />
                <span>{info.alamat}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-dark" />
                <span>{info.telepon}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-dark" />
                <span>{info.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-dark" />
                <span>{info.jam}</span>
              </li>
            </ul>

            {/* Media Sosial */}
            <div className="flex gap-4 pt-2">
              <a href={info.facebook} className="text-gray-600 hover:text-brand-dark flex items-center gap-1">
                <Facebook size={18} /> Facebook
              </a>
              <a href={info.instagram} className="text-gray-600 hover:text-brand-dark flex items-center gap-1">
                <Instagram size={18} /> Instagram
              </a>
            </div>
          </div>

          {/* Peta Google Maps (SSR) */}
          <div className="rounded-xl overflow-hidden border border-black/5 shadow-sm h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15943.227603334265!2d124.84!3d1.121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32877662c3129c23%3A0x8212dcf0dfab5e7a!2sTempok%2C%20Tompaso%2C%20Kabupaten%20Minahasa!5e0!3m2!1sid!2sid!4v1707650012345!5m2!1sid!2sid"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Form (Client Component agar interaktif) */}
        <KontakClient />
      </div>
    </main>
  );
}
