import type { Post } from "@prisma/client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function cleanHtml(html: string): string {
  return html ? html.replace(/<[^>]*>?/gm, "") : "";
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const cleanContent = cleanHtml(post.content);

  return (
    <Link
      href={`/berita/${post.id}`}
      className="
        group rounded-xl bg-white dark:bg-elev
        p-4 shadow-sm transition-all duration-200
        hover:shadow-md hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20
        border border-gray-100 dark:border-border
        min-h-[150px] flex flex-col justify-between
      "
    >
      <div>
        <h3
          className="
            font-semibold text-lg text-ink line-clamp-2
            group-hover:text-brand-primary transition-colors
          "
        >
          {post.title || "Tanpa Judul"}
        </h3>
        <p
          className="
            text-sm text-gray-600 dark:text-ink/70 line-clamp-3 mt-2
          "
        >
          {cleanContent.substring(0, 120) + "..."}
        </p>
      </div>

      <p
        className="
          text-xs text-gray-400 dark:text-ink/60
          mt-3 pt-2 border-t border-gray-100 dark:border-border
        "
      >
        {new Date(post.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </Link>
  );
};

interface BeritaSectionProps {
  posts: Post[];
  isAdmin: boolean;
}

export default function BeritaSection({ posts, isAdmin }: BeritaSectionProps) {
  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-ink">
          Berita & Kegiatan
        </h2>

        <Link
          href="/berita"
          className="
            inline-flex items-center gap-1.5 self-start rounded-full
            bg-brand-primary/90 px-3 py-1 text-xs font-medium text-brand-dark
            ring-1 ring-brand-dark/10
            hover:bg-brand-light hover:shadow-sm
            transition-colors
          "
        >
          {isAdmin ? "Lihat Semua & Edit" : "Lihat Semua Berita"}
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-gray-500 dark:text-ink/70 md:col-span-3 text-center py-6">
            Belum ada berita untuk ditampilkan.
          </p>
        )}
      </div>
    </section>
  );
}
