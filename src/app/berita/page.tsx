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
      {/* HERO SECTION */}
      <div
        className="relative mb-8 rounded-2xl overflow-hidden 
                    bg-brand-primary border border-black/5 dark:border-white/10 
                    shadow-md p-6 md:p-10 transition-colors duration-300"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
          Berita & Kegiatan Desa
        </h1>
        <p className="mt-2 max-w-2xl text-black">
          Informasi terbaru seputar Desa Tempok.
        </p>

        {/* Optional subtle overlay effect for dark mode readability */}
        <div className="absolute inset-0 bg-black/0 dark:bg-black/10 rounded-2xl pointer-events-none" />
      </div>

      <BeritaListClient initialPosts={posts} isAdmin={isAdmin} />
    </div>
  );
}
