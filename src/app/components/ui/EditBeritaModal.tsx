'use client';

import React, { useState, useTransition } from 'react';
import { X } from 'lucide-react';
import { updatePost } from '@/app/action'; // Impor action update
import type { Post } from '@prisma/client'; // Impor tipe Post

interface EditBeritaModalProps {
  initialData: Post; // Data post yang akan diedit
  onClose: () => void;
  onPostUpdated: (updatedPost: Post) => void; // Callback saat post berhasil diupdate
}

export default function EditBeritaModal({ initialData, onClose, onPostUpdated }: EditBeritaModalProps) {
  // Isi state awal dengan initialData
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  // Anda bisa tambahkan state 'published' jika perlu
  // const [published, setPublished] = useState(initialData.published);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!title || !content) {
      setError('Judul dan Konten harus diisi.');
      return;
    }

    startTransition(async () => {
      const result = await updatePost({ 
        postId: initialData.id, // <-- Kirim ID post
        title, 
        content,
        // published // <-- Kirim status publish jika ada
      });
      if (result.success && result.post) {
        onPostUpdated(result.post); // Panggil callback dengan post yang sudah diupdate
        onClose(); // Tutup modal
      } else {
        setError(result.message || 'Gagal memperbarui berita.');
      }
    });
  };

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* Konten Modal */}
      <div 
        className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-ink">
            Edit Berita
          </h3>
          <button 
            onClick={onClose}
            disabled={isPending}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tampilkan Error */}
        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        {/* Form Edit Berita */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-4">
          {/* Input Judul */}
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
              Judul Berita
            </label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isPending}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          {/* Input Konten (Textarea) */}
          <div className="flex flex-col flex-grow">
            <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700">
              Konten Berita
            </label>
            <textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={isPending}
              rows={10} 
              className="mt-1 w-full flex-grow rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            {/* Tambahkan checkbox 'Published' di sini jika perlu */}
          </div>
          
          {/* Footer Modal (Tombol Aksi) */}
          <div className="mt-6 flex justify-end gap-3 border-t pt-4">
            <button
              type="button" 
              onClick={onClose}
              disabled={isPending}
              className="rounded-md bg-gray-100 px-4 py-2
                         text-sm font-medium text-gray-800 hover:bg-gray-200 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-blue-600 px-4 py-2
                         text-sm font-medium text-white hover:bg-blue-700
                         disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isPending ? 'Menyimpan...' : 'Simpan Perubahan'} 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}