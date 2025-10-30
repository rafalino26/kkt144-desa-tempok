// src/app/potensi/types.ts
export type PotensiKategori = {
  id: string;
  slug: string;
  nama: string;
  urutan: number;
};

export type PotensiMedia = {
  id: string;
  url: string;
  caption?: string | null;
};

export type PotensiItem = {
  id: string;
  judul: string;
  ringkasan: string;
  lokasi?: string | null;
  koordinat?: string | null;
  tags: string[];
  coverUrl?: string | null;
  kategori: PotensiKategori;
  media: PotensiMedia[];
};

export type PotensiPageData = {
  kategori: PotensiKategori[];
  items: PotensiItem[];
  isAdmin: boolean;
};
