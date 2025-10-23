'use client';

import React, { useState, useTransition } from 'react';
import type { Post } from '@prisma/client';
import Link from 'next/link';
import { Edit, Trash2, Plus } from 'lucide-react'; 
import { deletePost } from '@/app/action'; 
import AddBeritaModal from '@/app/components/ui/AddBeritaModal';
import EditBeritaModal from '@/app/components/ui/EditBeritaModal';
import DeleteConfirmationModal from '@/app/components/ui/DeleteConfirmationModal'; 

// --- Helper Functions (Perbaikan Tipe Return) ---
function cleanHtml(html: string | null): string { // <-- Terima null juga
  return html ? html.replace(/<[^>]*>?/gm, '') : '';
}
// ---------------------

// --- Komponen AdminPostCard (Update Tombol) ---
interface AdminPostCardProps {
  post: Post;
  isAdmin: boolean;
  onEditClick: (post: Post) => void; 
  onDeleteClick: (post: Post) => void; 
  isDeleting: boolean; 
}
const AdminPostCard = ({ post, isAdmin, onEditClick, onDeleteClick, isDeleting }: AdminPostCardProps) => {
  // Panggil helper dengan post.content (yang bisa null)
  const cleanContent = cleanHtml(post.content);

  return (
    <div className="relative rounded-xl border bg-white p-4 shadow-sm 
                   transition-shadow hover:shadow-md min-h-[150px] flex flex-col justify-between">
      
      {isAdmin && (
        <div className="absolute top-3 right-3 z-10 flex gap-1.5">
          {/* Tombol Edit (Buka Modal) */}
          <button 
             onClick={() => onEditClick(post)} 
             className="p-1.5 bg-gray-100 rounded text-blue-600 hover:bg-gray-200 shadow-sm" aria-label="Edit">
            <Edit size={14} />
          </button>
          {/* Tombol Delete (Buka Modal Konfirmasi) */}
          <button
            onClick={() => onDeleteClick(post)} 
            disabled={isDeleting} 
            className="p-1.5 bg-gray-100 rounded text-red-600 hover:bg-gray-200 shadow-sm disabled:opacity-50"
            aria-label="Hapus"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* Konten Teks */}
      <div className="pr-16"> 
        <Link
  href={`/berita/${post.id}`}
  className="block group"
  aria-label={post.title || 'Berita'}
>
  <h3 className="font-semibold text-lg text-ink line-clamp-2 group-hover:text-brand-primary transition-colors">
    {post.title || 'Tanpa Judul'}
  </h3>
</Link>
        <p className="text-sm text-gray-600 line-clamp-3 mt-2">
          {cleanContent.substring(0, 120) + '...'}
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100"> 
        {new Date(post.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
      </p>
    </div>
  );
};
// ---------------------------------------------


interface BeritaListClientProps {
  initialPosts: Post[];
  isAdmin: boolean;
}

export default function BeritaListClient({ initialPosts, isAdmin }: BeritaListClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); 

  // --- Fungsi untuk Buka Modal ---
  const handleOpenEditModal = (post: Post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };
  const handleOpenDeleteConfirm = (post: Post) => {
    setSelectedPost(post);
    setIsDeleteConfirmOpen(true);
  };
  // -----------------------------

  // Fungsi Delete (Dipanggil dari Modal Konfirmasi)
  const executeDelete = () => {
    if (!selectedPost) return; 
    const postIdToDelete = selectedPost.id; 
    setIsDeleteConfirmOpen(false); 
    setDeleteError(null); 
    startDeleteTransition(async () => {
      const result = await deletePost(postIdToDelete); 
      if (result.success) {
        setPosts(currentPosts => currentPosts.filter(p => p.id !== postIdToDelete));
        setSelectedPost(null); 
      } else {
        setDeleteError(result.message || 'Gagal menghapus berita.');
        console.error("Gagal menghapus:", result.message);
        setSelectedPost(null); 
      }
    });
  };

  // Callback setelah post baru dibuat
  const handlePostCreated = (newPost: Post) => {
    setPosts(currentPosts => [newPost, ...currentPosts]); 
  };

  // Callback setelah post diupdate
  const handlePostUpdated = (updatedPost: Post) => {
    setPosts(currentPosts => 
      currentPosts.map(p => p.id === updatedPost.id ? updatedPost : p)
    );
    setSelectedPost(null); 
  };

  return (
    <div>
      {/* Tombol Tambah Berita Baru */}
      {isAdmin && (
        <div className="mb-6 text-right"> 
          <button
            onClick={() => setIsAddModalOpen(true)} 
            className="inline-flex items-center gap-1.5 rounded-md bg-green-100 px-4 py-2
                       text-sm font-medium text-green-700 hover:bg-green-200"
          >
            <Plus size={16} />
            Tambah Berita Baru
          </button>
        </div>
      )}

      {/* Tampilkan error delete jika ada */}
      {deleteError && ( 
         <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-sm text-red-700">
          Error: {deleteError}
        </div> 
      )}

      {/* Grid berita */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <AdminPostCard 
              key={post.id} 
              post={post} 
              isAdmin={isAdmin}
              onEditClick={handleOpenEditModal}   
              onDeleteClick={handleOpenDeleteConfirm} 
              isDeleting={isDeleting && selectedPost?.id === post.id} 
            />
          ))
        ) : (
          <p className="text-gray-500 md:col-span-3 text-center py-10">
            Belum ada berita untuk ditampilkan.
          </p>
        )}
      </div>

      {/* --- Render Semua Modal --- */}
      {isAddModalOpen && (
        <AddBeritaModal 
          onClose={() => setIsAddModalOpen(false)} 
          onPostCreated={handlePostCreated} 
        />
      )}
      {isEditModalOpen && selectedPost && ( 
        <EditBeritaModal 
          initialData={selectedPost}
          onClose={() => { setIsEditModalOpen(false); setSelectedPost(null); }} 
          onPostUpdated={handlePostUpdated} 
        />
      )}
      {/* Gunakan state 'isDeleteConfirmOpen' */}
      <DeleteConfirmationModal 
        isOpen={isDeleteConfirmOpen} 
        onClose={() => { setIsDeleteConfirmOpen(false); setSelectedPost(null); }}
        onConfirm={executeDelete} 
        // --- PERBAIKAN SINTAKS: Tambahkan '}' penutup ---
         itemName={`berita "${
 (selectedPost?.title ?? null) ?? truncateText(selectedPost?.content ?? null, 20)
 }"`}
        // --------------------------------------------
        isLoading={isDeleting} 
      />
      {/* ------------------------- */}
    </div>
  );
}

// Tambahkan fungsi truncateText di sini juga
function truncateText(text: string | null, length: number = 50): string { // <-- Terima null
    if (!text) return '(Tanpa Konten)';
    const cleanText = text.replace(/<[^>]*>?/gm, ''); // Hapus HTML
    return cleanText.length > length ? cleanText.substring(0, length) + '...' : cleanText;
}