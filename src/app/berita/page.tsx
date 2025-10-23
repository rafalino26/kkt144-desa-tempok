import { db } from '@/app/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// Hapus 'Plus' dan 'Link' jika tidak dipakai lagi di sini
// import { Plus } from 'lucide-react';
// import Link from 'next/link';
import BeritaListClient from './components/BeritaListClient'; // Komponen Client baru

// Fungsi untuk mengambil SEMUA post
async function getAllPosts() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return posts;
}

export default async function BeritaPage() {
  const posts = await getAllPosts();
  const session = await getServerSession(authOptions);
  const isAdmin = !!session?.user;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Halaman (tanpa tombol tambah) */}
      <div className="relative mb-8 rounded-2xl overflow-hidden
                      bg-gradient-to-br from-brand-primary/70 via-brand-light/60 to-brand-primary/70
                      border border-black/5 shadow-sm p-6 md:p-10">
        
        {/* HAPUS Link Tambah Berita dari sini */}

        {/* Judul Halaman */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand-dark">
          Berita & Kegiatan Desa
        </h1>
        <p className="mt-2 max-w-2xl text-brand-dark/90">
          Informasi terbaru seputar Desa Tempok.
        </p>
      </div>

      {/* Komponen Client untuk menampilkan list berita & tombol admin */}
      <BeritaListClient initialPosts={posts} isAdmin={isAdmin} />

    </div>
  );
}