import { db } from '@/app/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import BeritaListClient from './components/BeritaListClient';

async function getAllPosts() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return posts;
}

export default async function BeritaPage() {
  const posts = await getAllPosts();
  const session = await getServerSession(authOptions);
  const isAdmin = !!session?.user;
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="relative mb-8 rounded-2xl overflow-hidden
                      bg-gradient-to-br from-brand-primary/70 via-brand-light/60 to-brand-primary/70
                      border border-black/5 shadow-sm p-6 md:p-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand-dark">
          Berita & Kegiatan Desa
        </h1>
        <p className="mt-2 max-w-2xl text-brand-dark/90">
          Informasi terbaru seputar Desa Tempok.
        </p>
      </div>
      <BeritaListClient initialPosts={posts} isAdmin={isAdmin} />
    </div>
  );
}