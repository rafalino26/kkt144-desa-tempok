'use server';

import { db } from '@/app/lib/prisma';
import type { SejarahData } from '../components/types';

export async function updateSejarahDesa(
  newData: SejarahData
): Promise<
  | { success: true; data: SejarahData }
  | { success: false; message: string }
> {
  try {
    // Asumsi cuma ada satu row sejarah desa
    const current = await db.profilSejarah.findFirst();

    if (!current) {
      // belum ada -> create
      const created = await db.profilSejarah.create({
        data: {
          content: newData.content,
        },
      });

      return {
        success: true,
        data: {
          content: created.content,
          lastUpdated: created.updatedAt.toISOString(),
        },
      };
    }

    // sudah ada -> update baris itu
    const updated = await db.profilSejarah.update({
      where: { id: current.id },
      data: {
        content: newData.content,
      },
    });

    return {
      success: true,
      data: {
        content: updated.content,
        lastUpdated: updated.updatedAt.toISOString(),
      },
    };
  } catch (err) {
    console.error('updateSejarahDesa error:', err);
    return {
      success: false,
      message: 'Gagal menyimpan sejarah desa.',
    };
  }
}
