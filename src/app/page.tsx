// src/app/page.tsx
import { ArrowRight, Users, Map, Store, MapPin } from 'lucide-react'; // <-- LogIn, LogOut dihapus
import Link from 'next/link';
import { db } from '@/app/lib/prisma'; // Sesuai path yang kamu berikan
// import { redirect } from 'next/navigation'; // <-- Dihapus, tidak perlu lagi

// Import v4 yang Benar
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"; // Path ke authOptions v4 kamu

import EditBadge from '@/app/components/ui/EditBadge'; // Sesuai path yang kamu berikan

// Fungsi untuk mengambil data (ini akan berjalan di server)
async function getPageData() {
  const heroTitle = await db.pageContent.findFirst({
    where: { slug: 'hero-title' },
    select: { content: true }
  });

  const heroSubtitle = await db.pageContent.findFirst({
    where: { slug: 'hero-subtitle' },
    select: { content: true }
  });

  const stats = await db.statistik.findFirst({
    orderBy: { updatedAt: 'desc' }
  });
  
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  return {
    title: heroTitle?.content || "Selamat Datang di Desa Tempok",
    subtitle: heroSubtitle?.content || "Portal informasi resmi desa.",
    stats: {
      penduduk: stats?.jumlahPenduduk || 0,
      wilayah: stats?.luasWilayah || 0,
      umkm: stats?.jumlahUMKM || 0,
    },
    posts: posts,
  };
}

// <-- FUNGSI 'handleLogout' DIHAPUS DARI SINI -->

export default async function Home() {
  const data = await getPageData();
  
  // Cara v4 untuk mendapatkan sesi di Server Component
  const session = await getServerSession(authOptions); 
  
  const isAdmin = !!session?.user; // Cek apakah ada sesi (artinya admin login)

  return (
    // 'relative' sudah tidak diperlukan lagi di sini
    <div className="container p-4 mx-auto sm:p-6 lg:p-8">
      
      {/* <-- BLOK KODE TOMBOL LOGIN/LOGOUT YANG KAMU PASTE DIHAPUS DARI SINI --> */}

      <div className="space-y-12">

        {/* 1. HERO SECTION (Sekarang dinamis) */}
        <section className="relative rounded-2xl overflow-hidden 
                            bg-gradient-to-br from-brand-primary/70 via-brand-light/60 to-brand-primary/70 
                            border border-black/5 shadow-sm">
          
          {/* Edit Badge untuk Hero Section */}
          {isAdmin && (
            <EditBadge href="/admin/edit/hero" label="Edit Hero" />
          )}
          
          <div className="px-6 py-10 sm:px-10 sm:py-14">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand-dark">
              {data.title}
            </h1>
            <p className="mt-2 max-w-2xl text-brand-dark/90"> 
              {data.subtitle}
            </p>
            
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a 
                href="/profil" 
                className="inline-flex items-center rounded-lg bg-white text-brand-dark px-4 py-2 text-sm font-semibold shadow-sm hover:bg-white/90"
              >
                Lihat Profil
              </a>
              <a 
                href="/kontak" 
                className="inline-flex items-center rounded-lg border border-brand-dark/30 px-4 py-2 text-sm font-medium text-brand-dark hover:bg-white/50"
              >
                Kontak
              </a>
            </div>
          </div>
        </section>

        {/* 2. KARTU STATISTIK (Sekarang dinamis) */}
        <section className="relative"> {/* Tambah 'relative' untuk posisi EditBadge */}
          <h2 className="mb-4 text-2xl font-semibold text-ink">
            Sekilas Info
          </h2>
          {isAdmin && (
            <EditBadge href="/admin/edit/stats" label="Edit Statistik" />
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink/70">Jumlah Penduduk</span>
                <Users size={20} className="text-brand-primary" />
              </div>
              <p className="mt-2 text-3xl font-bold text-ink">
                {data.stats.penduduk.toLocaleString('id-ID')} <span className="text-base font-normal">Jiwa</span>
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink/70">Luas Wilayah</span>
                <Map size={20} className="text-brand-primary" />
              </div>
              <p className="mt-2 text-3xl font-bold text-ink">
                {data.stats.wilayah.toLocaleString('id-ID')} <span className="text-base font-normal">Hektar</span>
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink/70">Potensi UMKM</span>
                <Store size={20} className="text-brand-primary" />
              </div>
              <p className="mt-2 text-3xl font-bold text-ink">
                {data.stats.umkm.toLocaleString('id-ID')}+ <span className="text-base font-normal">Unit</span>
              </p>
            </div>
          </div>
        </section>

        {/* 3. LOKASI & PETA INTERAKTIF (Masih statis, tidak apa-apa) */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-ink">
            Lokasi Kami
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm min-h-[300px]">
              <div className="relative group">
                <MapPin size={100} className="text-brand-primary/50 transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 text-sm font-medium text-white rounded-md bg-brand-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Desa Tempok
                </span>
              </div>
              <p className="mt-4 text-center text-ink/70">
                Arahkan kursor ke ikon pin untuk melihat nama desa.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-3">
              <p className="mb-3 text-sm font-medium text-center text-ink/70">
                Klik peta untuk membuka Google Maps
              </p>
              <a 
                href="https://maps.app.goo.gl/DEFAULT_LINK_DESA_TEMPOK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-64 overflow-hidden rounded-lg group"
              >
                <div className="flex items-center justify-center w-full h-full text-center transition-transform duration-300 bg-gray-200 group-hover:scale-105">
                  <span className="text-gray-500">
                    [Placeholder Screenshot Google Maps]
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* 4. BERITA & KEGIATAN (Sekarang dinamis) */}
        <section className="relative"> {/* Tambah 'relative' untuk posisi EditBadge */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-ink">
              Berita & Kegiatan
            </h2>
            <Link href="/berita" className="flex items-center text-sm font-medium text-brand-primary hover:underline">
              Lihat Semua <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          {isAdmin && (
            <EditBadge href="/admin/edit/berita" label="Tambah/Edit Berita" />
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            
            {data.posts.map((post) => (
              <Link 
                key={post.id}
                href={`/berita/${post.id}`}
                className="block p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow relative"
              >
                 {/* Edit Badge untuk setiap Post (jika admin) */}
                 {isAdmin && (
                    <EditBadge 
                      href={`/admin/edit/berita/${post.id}`} 
                      label="Edit" // Label lebih singkat untuk tiap post
                    />
                 )}
                <span className="text-xs text-ink/60">
                  {post.createdAt.toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
                <h3 className="mt-2 font-semibold text-ink">
                  {post.title}
                </h3>
              </Link>
            ))}

            {data.posts.length === 0 && (
              <p className="text-ink/70 md:col-span-3">Belum ada berita untuk ditampilkan.</p>
            )}

          </div>
        </section>

      </div>
    </div>
  );
}