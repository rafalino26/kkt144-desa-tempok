import type { Post } from '@prisma/client';

// Tipe untuk Hero
export interface HeroData {
  title: string;
  subtitle: string;
}

// Tipe untuk Stats (konsisten pakai 'wilayah')
export interface StatsData {
  penduduk: number;
  kk: number;
  wilayah: number;
  dusun: number;
}

// Tipe untuk Data Profesi (untuk ChartSection)
export interface ProfesiData {
  name: string;
  value: number;
}

// Tipe gabungan untuk data halaman
export interface PageData {
  hero: HeroData;
  stats: StatsData;
  posts: Post[];
}