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
  const snapshot = await db.profesiSnapshot.create({
    data: {}, 
  });

  await db.$transaction(
    items.map((item) =>
      db.profesiItem.create({
        data: {
          jobName: item.name,
          jumlah: item.value,
          snapshotId: snapshot.id,
        },
      })
    )
  );

  const fresh = await db.profesiSnapshot.findUnique({
    where: { id: snapshot.id },
    include: { items: true },
  });

  if (!fresh) {
    return {
      success: false,
      message: 'Gagal membuat snapshot profesi baru.',
    };
  }

  return {
    success: true,
    profesi: {
      items: fresh.items.map((row) => ({
        name: row.jobName,
        value: row.jumlah,
      })),
      lastUpdated: fresh.updatedAt.toISOString(),
    },
  };
}
