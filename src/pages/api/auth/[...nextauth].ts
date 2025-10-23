// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from '@/app/lib/prisma'; // <-- Pastikan path ini benar
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { 
        email: { label: "Email", type: "email" }, 
        password: { label: "Password", type: "password" } 
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        const email = String(credentials.email ?? "");
        const password = String(credentials.password ?? "");
        
        // Menggunakan 'db' dari lib/prisma.ts kita
        const user = await db.user.findUnique({ where: { email } });
        
        if (!user) return null;
        
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;
        
        // Menggunakan 'nama' dari skema kita
        return { id: String(user.id), email: user.email, name: user.nama ?? undefined };
      },
    }),
  ],
  pages: { 
    signIn: "/login" // Arahkan ke halaman login kustom kita
  },
  session: { 
    strategy: "jwt" // Gunakan JWT untuk session
  },
};

export default NextAuth(authOptions);