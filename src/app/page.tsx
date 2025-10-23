import { db } from '@/app/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { Post } from '@prisma/client';

// Impor komponen-komponen section baru
import HeroSection from '@/app/components/sections/HeroSection';
import StatsSection from '@/app/components/sections/StatsSection';
import ChartSection from '@/app/components/sections/ChartSection';
import BeritaSection from '@/app/components/sections/BeritaSection';

// Update Interface Data
interface PageData {
  title: string;
  subtitle: string;
  stats: {
    penduduk: number;
    kk: number;      // <-- Baru
    wilayah: number;
    dusun: number;   // <-- Baru
  };
  posts: Post[];
}

// Update Fungsi Pengambilan Data
async function getPageData(): Promise<PageData> {
  const heroTitle = await db.pageContent.findFirst({
    where: { slug: 'hero-title' },
    select: { content: true }
  });

  const heroSubtitle = await db.pageContent.findFirst({
    where: { slug: 'hero-subtitle' },
    select: { content: true }
  });

  // Ambil data statistik BARU
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
      kk: stats?.jumlahKK || 0,           // <-- Data baru
      wilayah: stats?.luasWilayah || 0,
      dusun: stats?.jumlahDusun || 0,       // <-- Data baru
    },
    posts: posts,
  };
}

export default async function Home() {
  const data = await getPageData();
  const session = await getServerSession(authOptions);
  const isAdmin = !!session?.user;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="space-y-12">

        {/* 1. HERO SECTION */}
        <HeroSection
          title={data.title}
          subtitle={data.subtitle}
          isAdmin={isAdmin}
        />

        {/* 2. KARTU STATISTIK */}
        <StatsSection
          stats={data.stats}
          isAdmin={isAdmin}
        />

        {/* 3. GRAFIK (Placeholder) */}
        <ChartSection
          isAdmin={isAdmin}
        />

        {/* 5. BERITA & KEGIATAN */}
        <BeritaSection
          posts={data.posts}
          isAdmin={isAdmin}
        />

      </div>
    </div>
  );
}