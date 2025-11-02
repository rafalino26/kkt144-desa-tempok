import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import KontakClient from './components/KontakClient';
import AdminInboxClient from './components/AdminInboxClient';
import { getPesanKontak } from './actions/kontakAction';
import type { PesanKontak as PrismaPesanKontak } from '@prisma/client';

export const metadata = {
  title: 'Kontak - Desa Tempok',
  description: 'Hubungi pemerintah Desa Tempok untuk informasi dan pelayanan.',
};

export default async function KontakDesaPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = !!session?.user;
  const pesanResult = isAdmin ? await getPesanKontak() : null;

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
        {/* HEADER */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary/70 via-brand-light/60 to-brand-primary/70 border border-black/5 shadow-sm p-8 md:p-10 text-brand-dark">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-semibold">
              {isAdmin ? 'Kotak Masuk Pesan' : 'Kontak Desa Tempok'}
            </h1>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-brand-dark/90">
              {isAdmin
                ? 'Pesan dari warga dan pengunjung akan muncul di sini.'
                : 'Hubungi pemerintah desa untuk informasi, pelayanan, atau kerja sama.'}
            </p>
          </div>
        </section>

        {/* ISI */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Kolom kiri: info umum */}
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

            <div className="flex gap-4 pt-2">
              <a href={info.facebook} className="text-gray-600 hover:text-brand-dark flex items-center gap-1">
                <Facebook size={18} /> Facebook
              </a>
              <a href={info.instagram} className="text-gray-600 hover:text-brand-dark flex items-center gap-1">
                <Instagram size={18} /> Instagram
              </a>
            </div>
          </div>

          {/* Kolom kanan: tergantung role */}
          {isAdmin ? (
            <AdminInboxClient
              initialData={(pesanResult?.data ?? []).map((p: PrismaPesanKontak) => ({
                id: p.id,
                nama: p.nama,
                email: p.email,
                isiPesan: p.isiPesan,
                isDibaca: p.isDibaca,
                createdAt: p.createdAt.toISOString(),
              }))}
            />
          ) : (
            <KontakClient />
          )}
        </section>
      </div>
    </main>
  );
}
