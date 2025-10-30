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
    // Asumsi cuma ada 1 row ProfilGeografis di desa ini.
    // Kita ambil row pertama.
    const current = await db.profilGeografis.findFirst();

    if (!current) {
      // Kalau belum ada satupun row -> kita create baru
      const created = await db.profilGeografis.create({
        data: {
          deskripsiLokasi: newData.deskripsiLokasi,
          batasUtara: newData.batasUtara,
          batasTimur: newData.batasTimur,
          batasSelatan: newData.batasSelatan,
          batasBarat: newData.batasBarat,
          googleMapsUrl: newData.googleMapsUrl,
        },
      });

      return {
        success: true,
        data: {
          deskripsiLokasi: created.deskripsiLokasi,
          batasUtara: created.batasUtara ?? '',
          batasTimur: created.batasTimur ?? '',
          batasSelatan: created.batasSelatan ?? '',
          batasBarat: created.batasBarat ?? '',
          googleMapsUrl: created.googleMapsUrl ?? '',
          lastUpdated: created.updatedAt.toISOString(),
        },
      };
    }

    // Kalau row sudah ada -> update row itu
    const updated = await db.profilGeografis.update({
      where: { id: current.id },
      data: {
        deskripsiLokasi: newData.deskripsiLokasi,
        batasUtara: newData.batasUtara,
        batasTimur: newData.batasTimur,
        batasSelatan: newData.batasSelatan,
        batasBarat: newData.batasBarat,
        googleMapsUrl: newData.googleMapsUrl,
      },
    });

    return {
      success: true,
      data: {
        deskripsiLokasi: updated.deskripsiLokasi,
        batasUtara: updated.batasUtara ?? '',
        batasTimur: updated.batasTimur ?? '',
        batasSelatan: updated.batasSelatan ?? '',
        batasBarat: updated.batasBarat ?? '',
        googleMapsUrl: updated.googleMapsUrl ?? '',
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
