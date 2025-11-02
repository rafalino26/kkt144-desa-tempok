'use server'; 

import { revalidatePath } from 'next/cache';
import { db } from '@/app/lib/prisma';
import type { HeroData, StatsData } from '@/app/types';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"; 
import { Post, Prisma } from '@prisma/client'; 

async function verifyAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Tidak terautentikasi.'); 
  }
  return session;
}

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

export async function updateStatsData(newData: StatsData) {
  try {
    await verifyAdminSession();

    const current = await db.statistik.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!current) {
      const created = await db.statistik.create({
        data: {
          jumlahPenduduk: newData.penduduk,
          jumlahKK: newData.kk,
          luasWilayah: newData.wilayah,
          jumlahDusun: newData.dusun,
        },
      });

      return {
        success: true as const,
        data: {
          penduduk: created.jumlahPenduduk,
          kk: created.jumlahKK,
          wilayah: created.luasWilayah,
          dusun: created.jumlahDusun,
          lastUpdated: created.updatedAt.toISOString(),
          lastUpdatedPenduduk: created.updatedPenduduk.toISOString(),
          lastUpdatedKK: created.updatedKK.toISOString(),
          lastUpdatedWilayah: created.updatedWilayah.toISOString(),
          lastUpdatedDusun: created.updatedDusun.toISOString(),
        } as StatsData,
        message: 'Data Statistik berhasil dibuat.',
      };
    }

    // ✅ Hindari `any`: pakai tipe Partial dari Prisma UncheckedUpdateInput
    type UpdatableKeys =
      | 'jumlahPenduduk' | 'updatedPenduduk'
      | 'jumlahKK'       | 'updatedKK'
      | 'luasWilayah'    | 'updatedWilayah'
      | 'jumlahDusun'    | 'updatedDusun';

    const dataToUpdate: Partial<Pick<Prisma.StatistikUncheckedUpdateInput, UpdatableKeys>> = {};

    if (newData.penduduk !== current.jumlahPenduduk) {
      dataToUpdate.jumlahPenduduk = newData.penduduk;
      dataToUpdate.updatedPenduduk = new Date();
    }
    if (newData.kk !== current.jumlahKK) {
      dataToUpdate.jumlahKK = newData.kk;
      dataToUpdate.updatedKK = new Date();
    }
    if (newData.wilayah !== current.luasWilayah) {
      dataToUpdate.luasWilayah = newData.wilayah;
      dataToUpdate.updatedWilayah = new Date();
    }
    if (newData.dusun !== current.jumlahDusun) {
      dataToUpdate.jumlahDusun = newData.dusun;
      dataToUpdate.updatedDusun = new Date();
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return {
        success: true as const,
        data: {
          penduduk: current.jumlahPenduduk,
          kk: current.jumlahKK,
          wilayah: current.luasWilayah,
          dusun: current.jumlahDusun,
          lastUpdated: current.updatedAt.toISOString(),
          lastUpdatedPenduduk: current.updatedPenduduk.toISOString(),
          lastUpdatedKK: current.updatedKK.toISOString(),
          lastUpdatedWilayah: current.updatedWilayah.toISOString(),
          lastUpdatedDusun: current.updatedDusun.toISOString(),
        } as StatsData,
        message: 'Tidak ada perubahan data.',
      };
    }

    const updated = await db.statistik.update({
      where: { id: current.id },
      data: dataToUpdate,
    });

    const data: StatsData = {
      penduduk: updated.jumlahPenduduk,
      kk: updated.jumlahKK,
      wilayah: updated.luasWilayah,
      dusun: updated.jumlahDusun,
      lastUpdated: updated.updatedAt.toISOString(),
      lastUpdatedPenduduk: updated.updatedPenduduk.toISOString(),
      lastUpdatedKK: updated.updatedKK.toISOString(),
      lastUpdatedWilayah: updated.updatedWilayah.toISOString(),
      lastUpdatedDusun: updated.updatedDusun.toISOString(),
    };

    revalidatePath('/');
    return { success: true as const, data, message: 'Data Statistik berhasil diperbarui.' };
  } catch (error: unknown) { // ✅ no `any`
    console.error('Error updating stats data:', error);
    const message = error instanceof Error ? error.message : 'Gagal memperbarui data Statistik.';
    return { success: false as const, message };
  }
}



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

interface CreatePostData {
  title: string;
  content: string;
  published?: boolean; 
}
export async function createPost(data: CreatePostData): Promise<{ success: boolean; message: string; post?: Post }> { 
  try {
    await verifyAdminSession(); 
    if (!data.title || !data.content) { return { success: false, message: 'Judul dan Konten harus diisi.' }; }

    const newPost = await db.post.create({ 
      data: {
        title: data.title,
        content: data.content,
        published: data.published ?? true, 
      } 
    });

    revalidatePath('/'); 
    revalidatePath('/berita'); 
    return { success: true, message: 'Berita baru berhasil dibuat.', post: newPost }; 
  } catch (error) {
    console.error("Error creating post:", error);
    const message = error instanceof Error ? error.message : 'Gagal membuat berita baru.';
    return { success: false, message: message };
  }
}

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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
          return { success: false, message: 'Berita tidak ditemukan.' };
      }
    }
    const message = error instanceof Error ? error.message : 'Gagal memperbarui berita.';
    return { success: false, message: message };
  }
}
