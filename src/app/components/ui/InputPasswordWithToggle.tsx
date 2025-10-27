'use client';

import React, { useState, useId } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputPasswordWithToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
}

export default function InputPasswordWithToggle({
  label,
  id: propId, 
  className,
  labelClassName,
  containerClassName,
  ...props 
}: InputPasswordWithToggleProps) {
  
  const generatedId = useId(); 
  const inputId = propId || generatedId; 
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`w-full ${containerClassName || ''}`}>
      <label
        htmlFor={inputId} 
        className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName || ''}`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={inputId}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 pr-10
                      focus:outline-none focus:ring-2 focus:ring-blue-500 
                      ${className || ''}`}

          {...props}
        />
        <button
          type="button" 
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 
                     hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}