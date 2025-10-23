import { db } from '@/app/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Impor komponen wrapper
import HomePageClient from '@/app/components/HomePageClient';
// Impor tipe data terpusat
import type { PageData, HeroData, StatsData } from '@/app/types';

// Update Fungsi Pengambilan Data
async function getPageData(): Promise<PageData> {
  // Ambil semua data secara paralel
  // --- PERBAIKAN: Ganti nama 'stats' menjadi 'statsResult' ---
  const [heroTitle, heroSubtitle, statsResult, posts] = await Promise.all([
    db.pageContent.findFirst({
      where: { slug: 'hero-title' },
      select: { content: true }
    }),
    db.pageContent.findFirst({
      where: { slug: 'hero-subtitle' },
      select: { content: true }
    }),
    db.statistik.findFirst({
      orderBy: { updatedAt: 'desc' }
    }),
    db.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    })
  ]);

  // Objek Hero (sudah benar)
  const hero: HeroData = {
    title: heroTitle?.content || "Selamat Datang di Desa Tempok",
    subtitle: heroSubtitle?.content || "Portal informasi resmi desa.",
  };

  // --- PERBAIKAN: Gunakan 'statsResult' di sini ---
  // Objek Stats (sekarang aman dari 'null')
  const stats: StatsData = {
    penduduk: statsResult?.jumlahPenduduk || 0,
    kk: statsResult?.jumlahKK || 0,
    wilayah: statsResult?.luasWilayah || 0,
    dusun: statsResult?.jumlahDusun || 0,
  };

  return {
    hero: hero,
    stats: stats,
    posts: posts,
  };
}

export default async function Home() {
  const data = await getPageData();
  const session = await getServerSession(authOptions);
  const isAdmin = !!session?.user;

  // Render Client Component dan teruskan semua data
  return (
    <HomePageClient 
      initialData={data} 
      isAdmin={isAdmin} 
    />
  );
}