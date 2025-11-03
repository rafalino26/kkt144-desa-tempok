'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { db } from '@/app/lib/prisma';

// ====== Types lokal agar bebas dari "any" ======
export interface KirimPesanPayload {
  nama: string;
  email: string;
  pesan: string;
}

export interface ActionResultOk<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ActionResultErr {
  success: false;
  message: string;
}

type ActionResult<T> = ActionResultOk<T> | ActionResultErr;

// ====== Guard Admin ======
async function verifyAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Tidak terautentikasi.');
  }
  return session;
}

// =======================
//  PESAN KONTAK (USER)
// =======================
export async function kirimPesanKontak(
  payload: KirimPesanPayload
): Promise<ActionResult<{ id: string }>> {
  try {
    if (!payload.nama || !payload.email || !payload.pesan) {
      return { success: false, message: 'Nama, email, dan pesan wajib diisi.' };
    }

    const created = await db.pesanKontak.create({
      data: {
        nama: payload.nama,
        email: payload.email,
        isiPesan: payload.pesan,
      },
      select: { id: true },
    });

    revalidatePath('/kontak');
    return { success: true, data: { id: created.id }, message: 'Pesan terkirim.' };
  } catch (err) {
    console.error('kirimPesanKontak error:', err);
    return { success: false, message: 'Gagal mengirim pesan.' };
  }
}

export async function getPesanKontak(): Promise<
  ActionResult<
    Array<{
      id: string;
      nama: string;
      email: string;
      isiPesan: string;
      isDibaca: boolean;
      createdAt: Date;
    }>
  >
> {
  try {
    await verifyAdminSession();
    const rows = await db.pesanKontak.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: rows };
  } catch (err) {
    console.error('getPesanKontak error:', err);
    return { success: false, message: 'Gagal mengambil pesan kontak.' };
  }
}

export async function deletePesanKontak(id: string): Promise<ActionResult<{ id: string }>> {
  try {
    await verifyAdminSession();
    if (!id) return { success: false, message: 'ID tidak valid.' };

    await db.pesanKontak.delete({ where: { id } });
    revalidatePath('/kontak');
    return { success: true, data: { id }, message: 'Pesan dihapus.' };
  } catch (err) {
    console.error('deletePesanKontak error:', err);
    return { success: false, message: 'Gagal menghapus pesan.' };
  }
}

// ==============================
//  INFORMASI KONTAK (ADMIN EDIT)
// ==============================
export interface InformasiKontakDTO {
  alamat: string;
  telepon: string;
  email: string;
  jam: string;
  facebook?: string;
  instagram?: string;
}

export async function getInformasiKontak(): Promise<
  ActionResult<InformasiKontakDTO & { id: string | null }>
> {
  try {
    const row = await db.informasiKontak.findFirst();
    if (!row) {
      // default fallback kalau belum ada di DB
      return {
        success: true,
        data: {
          id: null,
          alamat:
            'Jl. Raya Tempok No. 1, Desa Tempok, Kec. Tompaso, Kab. Minahasa, Sulawesi Utara, 95693',
          telepon: '+62 812-3456-7890',
          email: 'desatempok@gmail.com',
          jam: 'Senin – Jumat, 08.00 – 15.00 WITA',
          facebook: '#',
          instagram: '#',
        },
      };
    }
    return {
      success: true,
      data: {
        id: row.id,
        alamat: row.alamat,
        telepon: row.telepon,
        email: row.email,
        jam: row.jam,
        facebook: row.facebook ?? '#',
        instagram: row.instagram ?? '#',
      },
    };
  } catch (err) {
    console.error('getInformasiKontak error:', err);
    return { success: false, message: 'Gagal memuat informasi kontak.' };
  }
}

export async function updateInformasiKontak(
  data: InformasiKontakDTO
): Promise<ActionResult<{ id: string }>> {
  try {
    await verifyAdminSession();

    // Ambil satu baris (kita anggap 1 desa = 1 baris)
    const current = await db.informasiKontak.findFirst();

    const payload = {
      alamat: data.alamat,
      telepon: data.telepon,
      email: data.email,
      jam: data.jam,
      facebook: data.facebook ?? null,
      instagram: data.instagram ?? null,
    };

    let savedId: string;
    if (current) {
      const updated = await db.informasiKontak.update({
        where: { id: current.id },
        data: payload,
        select: { id: true },
      });
      savedId = updated.id;
    } else {
      const created = await db.informasiKontak.create({
        data: payload,
        select: { id: true },
      });
      savedId = created.id;
    }

    revalidatePath('/kontak');
    return { success: true, data: { id: savedId }, message: 'Informasi kontak diperbarui.' };
  } catch (err) {
    console.error('updateInformasiKontak error:', err);
    return { success: false, message: 'Gagal memperbarui informasi kontak.' };
  }
}
