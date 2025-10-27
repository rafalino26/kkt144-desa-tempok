import { db } from '@/app/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import HomePageClient from '@/app/components/HomePageClient';

import type {
  PageData,
  HeroData,
  StatsData,
  ProfesiSectionData,
} from '@/app/types';

async function getPageData(): Promise<PageData> {
  const [
    heroTitle,
    heroSubtitle,
    statsResult,
    posts,
    lastProfesiSnapshot,
  ] = await Promise.all([
    db.pageContent.findFirst({
      where: { slug: 'hero-title' },
      select: { content: true },
    }),
    db.pageContent.findFirst({
      where: { slug: 'hero-subtitle' },
      select: { content: true },
    }),
    db.statistik.findFirst({
      orderBy: { updatedAt: 'desc' },
    }),
    db.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    db.profesiSnapshot.findFirst({
      orderBy: { updatedAt: 'desc' },
      include: {
        items: true,
      },
    }),
  ]);


  const hero: HeroData = {
    title: heroTitle?.content || "Selamat Datang di Desa Tempok",
    subtitle: heroSubtitle?.content || "Portal informasi resmi desa.",
  };

  const stats: StatsData = {
    penduduk: statsResult?.jumlahPenduduk ?? 0,
    kk:       statsResult?.jumlahKK ?? 0,
    wilayah:  statsResult?.luasWilayah ?? 0,
    dusun:    statsResult?.jumlahDusun ?? 0,

    lastUpdatedPenduduk: statsResult?.updatedPenduduk
      ? statsResult.updatedPenduduk.toISOString()
      : null,
    lastUpdatedKK: statsResult?.updatedKK
      ? statsResult.updatedKK.toISOString()
      : null,
    lastUpdatedWilayah: statsResult?.updatedWilayah
      ? statsResult.updatedWilayah.toISOString()
      : null,
    lastUpdatedDusun: statsResult?.updatedDusun
      ? statsResult.updatedDusun.toISOString()
      : null,
  };

  const profesi: ProfesiSectionData = {
    items: lastProfesiSnapshot
      ? lastProfesiSnapshot.items.map((row) => ({
          name: row.jobName,
          value: row.jumlah,
        }))
      : [],
    lastUpdated: lastProfesiSnapshot
      ? lastProfesiSnapshot.updatedAt.toISOString()
      : null,
  };

  return {
    hero,
    stats,
    posts,
    profesi,
  };
}

export default async function Home() {
  const data = await getPageData();
  const session = await getServerSession(authOptions);
  const isAdmin = !!session?.user;

  return (
    <HomePageClient
      initialData={data}
      isAdmin={isAdmin}
    />
  );
}
