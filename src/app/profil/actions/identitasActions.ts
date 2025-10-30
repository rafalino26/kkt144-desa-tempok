'use server';

import { db } from '@/app/lib/prisma';
import { IdentitasData } from '../components/types';

export async function updateProfilIdentitas(
  newData: IdentitasData
): Promise<
  | { success: true; data: IdentitasData }
  | { success: false; message: string }
> {
  try {
    // Asumsi: cuma ada satu baris ProfilIdentitas untuk desa ini
    const current = await db.profilIdentitas.findFirst();

    // Kalau belum ada row → create
    if (!current) {
      const created = await db.profilIdentitas.create({
        data: {
          namaDesa: newData.namaDesa,
          kecamatan: newData.kecamatan,
          kabupaten: newData.kabupaten,
          provinsi: newData.provinsi,

          kodePos: newData.kodePos || null,
          kodeKemendagri: newData.kodeKemendagri || null,

          koordinat: newData.koordinat || null,
          kepalaDesa: newData.kepalaDesa || null,

          catatan: newData.catatan || null,
        },
      });

      return {
        success: true,
        data: {
          namaDesa: created.namaDesa,
          kecamatan: created.kecamatan,
          kabupaten: created.kabupaten,
          provinsi: created.provinsi,
          kodePos: created.kodePos ?? '',
          kodeKemendagri: created.kodeKemendagri ?? '',
          koordinat: created.koordinat ?? '',
          kepalaDesa: created.kepalaDesa ?? '',
          catatan: created.catatan ?? '',
          lastUpdated: created.updatedAt.toISOString(),
        },
      };
    }

    // Kalau sudah ada → update baris pertama itu
    const updated = await db.profilIdentitas.update({
      where: { id: current.id },
      data: {
        namaDesa: newData.namaDesa,
        kecamatan: newData.kecamatan,
        kabupaten: newData.kabupaten,
        provinsi: newData.provinsi,

        kodePos: newData.kodePos || null,
        kodeKemendagri: newData.kodeKemendagri || null,

        koordinat: newData.koordinat || null,
        kepalaDesa: newData.kepalaDesa || null,

        catatan: newData.catatan || null,
      },
    });

    return {
      success: true,
      data: {
        namaDesa: updated.namaDesa,
        kecamatan: updated.kecamatan,
        kabupaten: updated.kabupaten,
        provinsi: updated.provinsi,
        kodePos: updated.kodePos ?? '',
        kodeKemendagri: updated.kodeKemendagri ?? '',
        koordinat: updated.koordinat ?? '',
        kepalaDesa: updated.kepalaDesa ?? '',
        catatan: updated.catatan ?? '',
        lastUpdated: updated.updatedAt.toISOString(),
      },
    };
  } catch (err) {
    console.error('updateProfilIdentitas error:', err);
    return {
      success: false,
      message: 'Gagal menyimpan identitas desa.',
    };
  }
}
