'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SessionExpiredModal() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  if (!visible) return null;

  const handleOkClick = () => {
    setVisible(false);
    router.push('/');  
    router.refresh();  
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 dark:bg-black/70 flex items-center justify-center">
      <div className="bg-white dark:bg-elev rounded-xl shadow-xl w-[90%] max-w-sm text-center p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold text-ink dark:text-ink mb-2">Sesi Telah Berakhir</h2>
        <p className="text-sm text-gray-600 dark:text-ink/80 leading-relaxed mb-5">
          Sesi login Anda telah berakhir. Silakan kembali ke beranda dan login kembali untuk melanjutkan.
        </p>
        <button
          onClick={handleOkClick}
          className="rounded-md bg-brand-primary text-black font-medium py-2 px-5 hover:bg-brand-light transition dark:bg-brand-primary dark:text-white dark:hover:bg-brand-dark/80"
        >
          OK
        </button>
      </div>
    </div>
  );
}
  