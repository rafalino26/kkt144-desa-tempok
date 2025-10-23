'use client';

import React, { useState, useId } from 'react'; // <-- Impor useId di sini
import { Eye, EyeOff } from 'lucide-react';

// Props yang bisa diterima oleh komponen ini
interface InputPasswordWithToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
}

export default function InputPasswordWithToggle({
  label,
  id: propId, // <-- Ganti nama prop 'id' agar tidak bentrok
  className,
  labelClassName,
  containerClassName,
  ...props 
}: InputPasswordWithToggleProps) {
  
  // --- PERBAIKAN: Panggil useId selalu di sini ---
  const generatedId = useId(); 
  // Gunakan propId jika ada, jika tidak, gunakan hasil useId
  const inputId = propId || generatedId; 
  // ---------------------------------------------

  // State untuk mengontrol visibilitas password
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk toggle visibilitas
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // Kontainer utama (div)
    <div className={`w-full ${containerClassName || ''}`}>
      {/* Label untuk input */}
      <label
        htmlFor={inputId} // <-- Gunakan inputId yang sudah benar
        className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName || ''}`}
      >
        {label}
      </label>
      {/* Wrapper relatif untuk input dan tombol ikon */}
      <div className="relative">
        {/* Input field */}
        <input
          // Tipe input berubah berdasarkan state showPassword
          type={showPassword ? 'text' : 'password'}
          id={inputId} // <-- Gunakan inputId yang sudah benar
          // Gabungkan className default dengan className dari props
          className={`w-full rounded-md border border-gray-300 px-3 py-2 pr-10
                      focus:outline-none focus:ring-2 focus:ring-blue-500 
                      ${className || ''}`}
          // Teruskan semua props lain ke input
          {...props}
        />
        {/* Tombol ikon mata */}
        <button
          type="button" // Penting agar tidak submit form
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 
                     hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
        >
          {/* Tampilkan ikon yang sesuai berdasarkan state */}
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}