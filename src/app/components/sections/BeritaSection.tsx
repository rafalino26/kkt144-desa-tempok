import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import EditBadge from '@/app/components/ui/EditBadge';
import type { Post } from '@prisma/client';

interface BeritaSectionProps {
  posts: Post[];
  isAdmin: boolean;
}

export default function BeritaSection({ posts, isAdmin }: BeritaSectionProps) {
  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-ink">
          Berita & Kegiatan
        </h2>
        <Link href="/berita" className="flex items-center text-sm font-medium text-brand-primary hover:underline">
          Lihat Semua <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      {isAdmin && (
        <EditBadge href="/admin/edit/berita" label="Tambah/Edit Berita" />
      )}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/berita/${post.id}`}
            className="block rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-shadow relative"
          >
             {isAdmin && (
                <EditBadge
                  href={`/admin/edit/berita/${post.id}`}
                  label="Edit"
                />
             )}
            <span className="text-xs text-ink/60">
              {post.createdAt.toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </span>
            <h3 className="mt-2 font-semibold text-ink line-clamp-2"> {/* line-clamp-2 batasi 2 baris */}
              {post.title}
            </h3>
          </Link>
        ))}

        {posts.length === 0 && (
          <p className="rounded-xl bg-white p-5 text-center text-ink/70 md:col-span-3">
            Belum ada berita untuk ditampilkan.
          </p>
        )}

      </div>
    </section>
  );
}