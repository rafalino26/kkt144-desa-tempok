import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from '@/app/lib/prisma'; 
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
        const user = await db.user.findUnique({ where: { email } });
        
        if (!user) return null;
        
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: String(user.id), email: user.email, name: user.nama ?? undefined };
      },
    }),
  ],
  pages: { 
    signIn: "/login" 
  },
  session: { 
    strategy: "jwt"
  },
};

export default NextAuth(authOptions);