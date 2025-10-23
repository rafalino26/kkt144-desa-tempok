// TIDAK PERLU 'use client'
import type { Post } from '@prisma/client';
import Link from 'next/link';
// Hapus Image
// import Image from 'next/image'; 
import { ArrowRight } from 'lucide-react'; 

// --- Helper Functions (Tetap sama) ---
// Hapus extractImageUrl karena tidak dipakai
// function extractImageUrl(content: string): string | null { ... }
function cleanHtml(html: string): string {
  return html ? html.replace(/<[^>]*>?/gm, '') : '';
}
// ---------------------


// --- Komponen PostCard (TANPA GAMBAR) ---
interface PostCardProps {
  post: Post;
}
const PostCard = ({ post }: PostCardProps) => {
  // Hapus logika imageUrl
  const cleanContent = cleanHtml(post.content);

  // Layout baru tanpa gambar
  return (
    <Link 
      href={`/berita/${post.id}`} 
      // Styling card baru: padding lebih sedikit, tinggi minimum
      className="group rounded-xl border bg-white p-4 shadow-sm 
                 transition-shadow hover:shadow-md min-h-[150px] flex flex-col justify-between" 
    >
      {/* Konten Teks */}
      <div>
        <h3 className="font-semibold text-lg text-ink line-clamp-2 group-hover:text-brand-primary transition-colors"> 
          {post.title || 'Tanpa Judul'}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mt-2">
          {cleanContent.substring(0, 120) + '...'} {/* Tampilkan lebih banyak teks */}
        </p>
      </div>
      {/* Tanggal di bawah */}
      <p className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100"> {/* Tambah border pemisah */}
        {new Date(post.createdAt).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric'
        })}
      </p>
    </Link>
  );
};
// ------------------------------------


interface BeritaSectionProps {
  posts: Post[]; // Hanya 3 post terbaru
  isAdmin: boolean;
}

export default function BeritaSection({ posts, isAdmin }: BeritaSectionProps) {
  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-ink">
          Berita & Kegiatan
        </h2>
        
        {/* Link ke Halaman /berita */}
        <Link 
          href="/berita" 
          className="flex items-center gap-1.5 rounded-full
                     px-3 py-1 text-xs font-medium 
                     transition-colors
                     bg-blue-100 text-blue-700 hover:bg-blue-200" 
        >
          {isAdmin ? 'Lihat Semua & Edit' : 'Lihat Semua Berita'}
          <ArrowRight size={12} /> 
        </Link>
      </div>
      
      {/* Grid berita (tampilkan 3 terbaru dari props) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-gray-500 md:col-span-3 text-center py-6"> 
            Belum ada berita untuk ditampilkan.
          </p>
        )}
      </div>
    </section>
  );
}