'use server';

import { db } from '@/app/lib/prisma';
import type { ProfesiSectionData } from '@/app/types';

type CreateProfesiSnapshotResult =
  | {
      success: true;
      profesi: ProfesiSectionData;
    }
  | {
      success: false;
      message: string;
    };

export async function createProfesiSnapshot(
  items: { name: string; value: number }[]
): Promise<CreateProfesiSnapshotResult> {
  try {
    const snapshot = await db.profesiSnapshot.create({
      data: {
        items: items, 
      },
    });
    return {
      success: true,
      profesi: {
        items: items,
        lastUpdated: snapshot.capturedAt
          ? snapshot.capturedAt.toISOString()
          : null,
      },
    };
  } catch (err) {
    console.error('createProfesiSnapshot error:', err);
    return {
      success: false,
      message: 'Gagal membuat snapshot profesi baru.',
    };
  }
}
