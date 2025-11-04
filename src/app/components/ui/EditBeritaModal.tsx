'use client';

import React, { useState, useTransition } from 'react';
import { X } from 'lucide-react';
import { updatePost } from '@/app/action';
import type { Post } from '@prisma/client';

interface EditBeritaModalProps {
  initialData: Post;
  onClose: () => void;
  onPostUpdated: (updatedPost: Post) => void;
}

export default function EditBeritaModal({
  initialData,
  onClose,
  onPostUpdated,
}: EditBeritaModalProps) {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
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
        postId: initialData.id,
        title,
        content,
      });
      if (result.success && result.post) {
        onPostUpdated(result.post);
        onClose();
      } else {
        setError(result.message || 'Gagal memperbarui berita.');
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl flex flex-col
                   dark:bg-elev dark:border dark:border-white/10 dark:text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-ink dark:text-ink">Edit Berita</h3>
          <button
            onClick={onClose}
            disabled={isPending}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-50
                       dark:text-ink/70 dark:hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-4">
          <div>
            <label
              htmlFor="edit-title"
              className="block text-sm font-medium text-gray-700 dark:text-ink/80"
            >
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
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100
                         dark:bg-elev dark:border-border dark:text-ink dark:placeholder:text-ink/50
                         dark:focus:ring-blue-400 dark:disabled:bg-elev/70"
            />
          </div>

          <div className="flex flex-col flex-grow">
            <label
              htmlFor="edit-content"
              className="block text-sm font-medium text-gray-700 dark:text-ink/80"
            >
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
                         focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100
                         dark:bg-elev dark:border-border dark:text-ink dark:placeholder:text-ink/50
                         dark:focus:ring-blue-400 dark:disabled:bg-elev/70"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t pt-4 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-md bg-gray-100 px-4 py-2
                         text-sm font-medium text-gray-800 hover:bg-gray-200 disabled:opacity-50
                         dark:bg-elev/60 dark:text-ink dark:hover:bg-elev/80"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-blue-600 px-4 py-2
                         text-sm font-medium text-white hover:bg-blue-700
                         disabled:bg-blue-300 disabled:cursor-not-allowed
                         dark:bg-blue-500 dark:hover:bg-blue-400 dark:disabled:bg-blue-500/60"
            >
              {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
