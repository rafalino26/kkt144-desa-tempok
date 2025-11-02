'use server';

import { db } from '@/app/lib/prisma';
import type { GeoData } from '../components/GeografisSection';

export async function updateProfilGeografis(
  newData: GeoData
): Promise<
  | { success: true; data: GeoData }
  | { success: false; message: string }
> {
  try {
    // Ambil baris pertama (karena cuma ada 1 profil desa)
    const current = await db.profilGeografis.findFirst();

    // --- Data yang akan disimpan ---
    const dataToSave = {
      batasUtara: newData.batasUtara,
      batasTimur: newData.batasTimur,
      batasSelatan: newData.batasSelatan,
      batasBarat: newData.batasBarat,
      googleMapsUrl: newData.googleMapsUrl,
      lintangUtara: newData.lintangUtara,
      bujurTimur: newData.bujurTimur,
      ketinggian: newData.ketinggian,
      topografi: newData.topografi,
      hidrologi: newData.hidrologi,
      klimatologi: newData.klimatologi,
    };

    let updated;

    if (!current) {
      // kalau belum ada data sama sekali → buat baru
      updated = await db.profilGeografis.create({
        data: {
          ...dataToSave,
          deskripsiLokasi:
            newData.deskripsiLokasi ||
            'Belum ada deskripsi lokasi yang diinputkan.',
        },
      });
    } else {
      // kalau sudah ada → update baris yang ada
      updated = await db.profilGeografis.update({
        where: { id: current.id },
        data: {
          ...dataToSave,
          deskripsiLokasi: newData.deskripsiLokasi,
        },
      });
    }

    // --- Kembalikan hasil ke frontend ---
    return {
      success: true,
      data: {
        deskripsiLokasi: updated.deskripsiLokasi ?? '',
        batasUtara: updated.batasUtara ?? '',
        batasTimur: updated.batasTimur ?? '',
        batasSelatan: updated.batasSelatan ?? '',
        batasBarat: updated.batasBarat ?? '',
        googleMapsUrl: updated.googleMapsUrl ?? '',
        lintangUtara: updated.lintangUtara ?? '',
        bujurTimur: updated.bujurTimur ?? '',
        ketinggian: updated.ketinggian ?? '',
        topografi: updated.topografi ?? '',
        hidrologi: updated.hidrologi ?? '',
        klimatologi: updated.klimatologi ?? '',
        lastUpdated: updated.updatedAt.toISOString(),
      },
    };
  } catch (err) {
    console.error('updateProfilGeografis error:', err);
    return {
      success: false,
      message: 'Gagal menyimpan data geografis.',
    };
  }
}
