import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Pemerintah Desa Tempok</p>
        <p>
          Dibangun dengan <span className="font-semibold">Next.js</span> · Warna:{" "}
          <span className="ml-1 inline-flex items-center gap-2">
            <span className="inline-block size-3 rounded bg-brand-primary" title="#b3d43d" />
            <span className="inline-block size-3 rounded bg-brand-light" title="#e0f687" />
            <span className="inline-block size-3 rounded bg-brand-dark" title="#5e644f" />
          </span>
        </p>
      </div>
    </footer>
  );
}
