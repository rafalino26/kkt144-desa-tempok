"use client";
import React from "react";
import { useAuth } from "@/app/lib/auth";

type Props = {
  /** tooltip/title */
  title?: string;
  /** pesan yang mau di-alert saat diklik (opsional) */
  message?: string;
  className?: string;
};

export default function EditBadge({ title = "Edit", message, className = "" }: Props) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;

  return (
    <button
      title={title}
      onClick={() => {
        if (message) alert(message);
      }}
      className={`absolute right-2 top-2 inline-flex items-center justify-center size-8 rounded-full border bg-white/90 shadow-sm hover:bg-white ${className}`}
      aria-label="Edit section"
    >
      ✎
    </button>
  );
}
