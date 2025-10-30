'use server';

import { db } from '@/app/lib/prisma';
import type { VisiMisiData } from '../components/types';

export async function updateVisiMisi(
  newData: VisiMisiData
): Promise<
  | { success: true; data: VisiMisiData }
  | { success: false; message: string }
> {
  try {
    // Asumsi hanya ada satu row untuk desa ini.
    const current = await db.profilVisiMisi.findFirst();

    if (!current) {
      // kalau belum ada row sama sekali → create
      const created = await db.profilVisiMisi.create({
        data: {
          visi: newData.visi,
          misi: newData.misi, // Prisma Json menerima array<string> langsung
        },
      });

      return {
        success: true,
        data: {
          visi: created.visi,
          misi: Array.isArray(created.misi) ? (created.misi as string[]) : [],
          lastUpdated: created.updatedAt.toISOString(),
        },
      };
    }

    // kalau sudah ada → update
    const updated = await db.profilVisiMisi.update({
      where: { id: current.id },
      data: {
        visi: newData.visi,
        misi: newData.misi,
      },
    });

    return {
      success: true,
      data: {
        visi: updated.visi,
        misi: Array.isArray(updated.misi) ? (updated.misi as string[]) : [],
        lastUpdated: updated.updatedAt.toISOString(),
      },
    };
  } catch (err) {
    console.error('updateVisiMisi error:', err);
    return {
      success: false,
      message: 'Gagal menyimpan Visi & Misi.',
    };
  }
}
