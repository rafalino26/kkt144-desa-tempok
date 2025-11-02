'use server';

import { db } from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

// kirim pesan dari form publik
export async function kirimPesanKontak(formData: {
  nama: string;
  email: string;
  pesan: string;
}) {
  try {
    await db.pesanKontak.create({
      data: {
        nama: formData.nama,
        email: formData.email,
        isiPesan: formData.pesan,
      },
    });
    revalidatePath('/kontak');
    return { success: true, message: 'Pesan berhasil dikirim.' };
  } catch (error) {
    console.error('Error kirim pesan:', error);
    return { success: false, message: 'Gagal mengirim pesan.' };
  }
}

// ambil semua pesan untuk admin
export async function getPesanKontak() {
  try {
    const pesan = await db.pesanKontak.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: pesan };
  } catch (error) {
    console.error('Error ambil pesan:', error);
    return { success: false, message: 'Gagal memuat pesan.' };
  }
}

// hapus pesan
export async function deletePesanKontak(id: string) {
  try {
    await db.pesanKontak.delete({ where: { id } });
    revalidatePath('/kontak');
    return { success: true };
  } catch (error) {
    console.error('Error hapus pesan:', error);
    return { success: false, message: 'Gagal menghapus pesan.' };
  }
}
