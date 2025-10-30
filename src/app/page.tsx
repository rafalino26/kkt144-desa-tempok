import { db } from '@/app/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import HomePageClient from '@/app/components/HomePageClient';

import type {
  PageData,
  HeroData,
  StatsData,
  ProfesiSectionData,
  ProfesiData,
} from '@/app/types';

async function getPageData(): Promise<PageData> {
  const [heroTitle, heroSubtitle, statsRow, posts, snapshot] = await Promise.all([
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
    }),
    db.profesiSnapshot.findFirst({
      orderBy: { capturedAt: 'desc' },
    })
  ]);

  const hero: HeroData = {
    title: heroTitle?.content || "Selamat Datang di Desa Tempok",
    subtitle: heroSubtitle?.content || "Portal informasi resmi desa.",
  };

  const stats: StatsData = {
  penduduk: statsRow?.jumlahPenduduk ?? 0,
  kk:       statsRow?.jumlahKK ?? 0,
  wilayah:  statsRow?.luasWilayah ?? 0,
  dusun:    statsRow?.jumlahDusun ?? 0,

  
  lastUpdated: statsRow?.updatedAt
    ? statsRow.updatedAt.toISOString()
    : null,

  lastUpdatedPenduduk: statsRow?.updatedPenduduk
    ? statsRow.updatedPenduduk.toISOString()
    : null,

  lastUpdatedKK: statsRow?.updatedKK
    ? statsRow.updatedKK.toISOString()
    : null,

  lastUpdatedWilayah: statsRow?.updatedWilayah
    ? statsRow.updatedWilayah.toISOString()
    : null,

  lastUpdatedDusun: statsRow?.updatedDusun
    ? statsRow.updatedDusun.toISOString()
    : null,
};


  let profesiItems: ProfesiData[] = [];
  if (snapshot?.items && Array.isArray(snapshot.items)) {
    profesiItems = snapshot.items as ProfesiData[];
  }

  const profesi: ProfesiSectionData = {
    items: profesiItems,
    lastUpdated: snapshot?.capturedAt
      ? snapshot.capturedAt.toISOString()
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
