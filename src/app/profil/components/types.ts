export interface IdentitasData {
  namaDesa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  kodeKemendagri: string;
  koordinat: string;
  kepalaDesa: string;
  catatan: string;
  lastUpdated: string | null; 
}

export interface PerangkatDesaItem {
  id: string;
  nama: string;
  jabatan: string;
  urutan: number;
  updatedAt: string; 
}

export interface StrukturDataProps {
  isAdmin: boolean;
  initialPerangkat: PerangkatDesaItem[];
}

export interface VisiMisiData {
  visi: string;
  misi: string[]; 
  lastUpdated: string | null; 
}

export interface SejarahData {
  content: string;
  lastUpdated: string | null;
}

export interface SosialEkonomiData {
  jumlahPendudukTekstual: string;
  catatanPenduduk: string;
  mataPencaharian: string;
  sektorPendukung: string;
  ringkasan: string; 
  catatan: string;  
  lastUpdated: string | null; 
}
