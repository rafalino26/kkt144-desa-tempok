// src/actions/auth.ts
'use server'; // <-- Wajib ada di baris paling atas file

import { redirect } from 'next/navigation';

export async function handleLogout() {
  // v4 logout dilakukan dengan redirect ke API route-nya
  redirect('/api/auth/signout');
}