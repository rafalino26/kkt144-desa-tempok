'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SessionExpiredModal() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm text-center p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold text-ink mb-2">Sesi Telah Berakhir</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          Sesi login Anda telah berakhir. Silakan kembali ke beranda dan login kembali untuk melanjutkan.
        </p>
        <button
          onClick={() => {
            setVisible(false);
            router.push('/');
          }}
          className="rounded-md bg-brand-primary text-brand-dark font-medium py-2 px-5 hover:bg-brand-light transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
