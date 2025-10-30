'use server';

import { db } from '@/app/lib/prisma';
import { PerangkatDesaItem } from '../components/types';

// CREATE
export async function createPerangkatDesa(data: {
  nama: string;
  jabatan: string;
  urutan: number;
}): Promise<
  | { success: true; item: PerangkatDesaItem }
  | { success: false; message: string }
> {
  try {
    const created = await db.profilPerangkatDesa.create({
      data: {
        nama: data.nama,
        jabatan: data.jabatan,
        urutan: data.urutan,
      },
    });

    return {
      success: true,
      item: {
        id: created.id,
        nama: created.nama,
        jabatan: created.jabatan,
        urutan: created.urutan,
        updatedAt: created.updatedAt.toISOString(),
      },
    };
  } catch (err) {
    console.error('createPerangkatDesa error:', err);
    return { success: false, message: 'Gagal membuat perangkat desa baru.' };
  }
}

// UPDATE
export async function updatePerangkatDesa(data: {
  id: string;
  nama: string;
  jabatan: string;
  urutan: number;
}): Promise<
  | { success: true; item: PerangkatDesaItem }
  | { success: false; message: string }
> {
  try {
    const updated = await db.profilPerangkatDesa.update({
      where: { id: data.id },
      data: {
        nama: data.nama,
        jabatan: data.jabatan,
        urutan: data.urutan,
      },
    });

    return {
      success: true,
      item: {
        id: updated.id,
        nama: updated.nama,
        jabatan: updated.jabatan,
        urutan: updated.urutan,
        updatedAt: updated.updatedAt.toISOString(),
      },
    };
  } catch (err) {
    console.error('updatePerangkatDesa error:', err);
    return { success: false, message: 'Gagal mengubah data perangkat desa.' };
  }
}

// DELETE
export async function deletePerangkatDesa(id: string): Promise<
  | { success: true; id: string }
  | { success: false; message: string }
> {
  try {
    await db.profilPerangkatDesa.delete({
      where: { id },
    });

    return { success: true, id };
  } catch (err) {
    console.error('deletePerangkatDesa error:', err);
    return { success: false, message: 'Gagal menghapus perangkat desa.' };
  }
}
