'use server'; // <-- Tanda bahwa ini adalah Server Actions

import { revalidatePath } from 'next/cache';
import { db } from '@/app/lib/prisma';
import type { HeroData, StatsData } from '@/app/types';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"; 
// --- 1. Impor Tipe dari Prisma Client ---
import { Post, Prisma } from '@prisma/client'; 
// (PrismaClientKnownRequestError biasanya tidak perlu diimpor eksplisit, 
//  kita bisa gunakan 'instanceof Prisma.PrismaClientKnownRequestError')
// ------------------------------------------

// Helper function untuk cek otentikasi
async function verifyAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Tidak terautentikasi.'); 
  }
  return session;
}


// Action untuk menyimpan data Hero
export async function updateHeroData(newData: HeroData) {
  try {
    await verifyAdminSession();
    await db.pageContent.updateMany({ where: { slug: 'hero-title' }, data: { content: newData.title } });
    await db.pageContent.updateMany({ where: { slug: 'hero-subtitle' }, data: { content: newData.subtitle } });
    revalidatePath('/'); 
    return { success: true, message: 'Data Hero berhasil diperbarui.' };
  } catch (error) {
    console.error("Error updating hero data:", error);
    const message = error instanceof Error ? error.message : 'Gagal memperbarui data Hero.';
    return { success: false, message: message };
  }
}

// Action untuk menyimpan data Stats
export async function updateStatsData(newData: StatsData) {
  try {
    await verifyAdminSession();
    const latestStat = await db.statistik.findFirst({ orderBy: { updatedAt: 'desc' } });

    // --- 2. Lengkapi Data Stats ---
    const dataToSave = {
        jumlahPenduduk: newData.penduduk,
        jumlahKK: newData.kk,
        luasWilayah: newData.wilayah,
        jumlahDusun: newData.dusun,
    };
    // ----------------------------

    if (latestStat) {
        await db.statistik.update({ 
            where: { id: latestStat.id }, 
            data: dataToSave // <-- Gunakan dataToSave
        });
    } else {
         await db.statistik.create({ 
             data: dataToSave // <-- Gunakan dataToSave
         });
    }

    revalidatePath('/');
    return { success: true, message: 'Data Statistik berhasil diperbarui.' };
  } catch (error) {
    console.error("Error updating stats data:", error);
    const message = error instanceof Error ? error.message : 'Gagal memperbarui data Statistik.';
    return { success: false, message: message };
  }
}

// --- Action untuk DELETE POST ---
export async function deletePost(postId: string) {
  try {
    await verifyAdminSession(); 
    if (!postId) { return { success: false, message: 'ID Post tidak valid.' }; }
    await db.post.delete({ where: { id: postId } });
    revalidatePath('/'); 
    revalidatePath('/berita'); 
    return { success: true, message: 'Berita berhasil dihapus.' };
  } catch (error) {
    console.error("Error deleting post:", error);
    const message = error instanceof Error ? error.message : 'Gagal menghapus berita.';
    return { success: false, message: message };
  }
}

// --- Action untuk CREATE POST ---
interface CreatePostData {
  title: string;
  content: string;
  published?: boolean; 
}
export async function createPost(data: CreatePostData): Promise<{ success: boolean; message: string; post?: Post }> { 
  try {
    await verifyAdminSession(); 
    if (!data.title || !data.content) { return { success: false, message: 'Judul dan Konten harus diisi.' }; }
    
    // --- 2. Lengkapi Data Create Post ---
    const newPost = await db.post.create({ 
      data: {
        title: data.title,
        content: data.content,
        published: data.published ?? true, 
      } 
    });
    // ---------------------------------

    revalidatePath('/'); 
    revalidatePath('/berita'); 
    return { success: true, message: 'Berita baru berhasil dibuat.', post: newPost }; 
  } catch (error) {
    console.error("Error creating post:", error);
    const message = error instanceof Error ? error.message : 'Gagal membuat berita baru.';
    return { success: false, message: message };
  }
}

// --- Action untuk UPDATE POST ---
interface UpdatePostData extends CreatePostData {
  postId: string; 
}
export async function updatePost(data: UpdatePostData): Promise<{ success: boolean; message: string; post?: Post }> {
  try {
    await verifyAdminSession(); 

    if (!data.postId) { return { success: false, message: 'ID Post dibutuhkan untuk update.' }; }
    if (!data.title || !data.content) { return { success: false, message: 'Judul dan Konten harus diisi.' }; }

    const updatedPost = await db.post.update({
      where: { id: data.postId },
      data: {
        title: data.title,
        content: data.content,
        published: data.published ?? true, 
      },
    });

    revalidatePath('/'); 
    revalidatePath('/berita'); 
    revalidatePath(`/berita/${data.postId}`); 

    return { success: true, message: 'Berita berhasil diperbarui.', post: updatedPost }; 

  } catch (error) {
    console.error("Error updating post:", error);
    // --- 3. Perbaikan Error Handling 'any' ---
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Cek kode error spesifik Prisma
      if (error.code === 'P2025') {
          return { success: false, message: 'Berita tidak ditemukan.' };
      }
    }
    // ----------------------------------------
    const message = error instanceof Error ? error.message : 'Gagal memperbarui berita.';
    return { success: false, message: message };
  }
}
// ------------------------------------