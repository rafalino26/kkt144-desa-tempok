'use server';

import { db } from '@/app/lib/prisma';
import type { SosialEkonomiData } from '../components/types';

export async function updateSosialEkonomi(
  newData: SosialEkonomiData
): Promise<
  | { success: true; data: SosialEkonomiData }
  | { success: false; message: string }
> {
  try {
    // Asumsi: cuma ada satu row data sosial ekonomi
    const current = await db.profilSosialEkonomi.findFirst();

    if (!current) {
      // Belum ada -> create
      const created = await db.profilSosialEkonomi.create({
        data: {
          ringkasan: newData.ringkasan,
          mataPencaharian: newData.mataPencaharian || null,
          sektorPendukung: newData.sektorPendukung || null,
          catatan: newData.catatan || null,

          jumlahPendudukTekstual: newData.jumlahPendudukTekstual || null,
          catatanPenduduk: newData.catatanPenduduk || null,
        },
      });

      return {
        success: true,
        data: {
          ringkasan: created.ringkasan,
          mataPencaharian: created.mataPencaharian ?? '',
          sektorPendukung: created.sektorPendukung ?? '',
          catatan: created.catatan ?? '',

          jumlahPendudukTekstual: created.jumlahPendudukTekstual ?? '',
          catatanPenduduk: created.catatanPenduduk ?? '',

          lastUpdated: created.updatedAt.toISOString(),
        },
      };
    }

    // Sudah ada -> update row itu
    const updated = await db.profilSosialEkonomi.update({
      where: { id: current.id },
      data: {
        ringkasan: newData.ringkasan,
        mataPencaharian: newData.mataPencaharian || null,
        sektorPendukung: newData.sektorPendukung || null,
        catatan: newData.catatan || null,

        jumlahPendudukTekstual: newData.jumlahPendudukTekstual || null,
        catatanPenduduk: newData.catatanPenduduk || null,
      },
    });

    return {
      success: true,
      data: {
        ringkasan: updated.ringkasan,
        mataPencaharian: updated.mataPencaharian ?? '',
        sektorPendukung: updated.sektorPendukung ?? '',
        catatan: updated.catatan ?? '',

        jumlahPendudukTekstual: updated.jumlahPendudukTekstual ?? '',
        catatanPenduduk: updated.catatanPenduduk ?? '',

        lastUpdated: updated.updatedAt.toISOString(),
      },
    };
  } catch (err) {
    console.error('updateSosialEkonomi error:', err);
    return {
      success: false,
      message: 'Gagal menyimpan data sosial & ekonomi.',
    };
  }
}
