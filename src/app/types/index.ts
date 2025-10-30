export type HeroData = {
  title: string;
  subtitle: string;
};

export type StatsData = {
  penduduk: number;
  kk: number;
  wilayah: number;
  dusun: number;
  lastUpdated: string | null;

  lastUpdatedPenduduk: string | null;
  lastUpdatedKK: string | null;
  lastUpdatedWilayah: string | null;
  lastUpdatedDusun: string | null;
};

export type ProfesiData = {
  name: string;  
  value: number;  
};

export type ProfesiSectionData = {
  items: ProfesiData[];
  lastUpdated: string | null; 
};

export type PageData = {
  hero: HeroData;
  stats: StatsData;
  posts: {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  profesi: ProfesiSectionData;
};
