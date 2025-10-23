// app/lib/prisma.ts (atau src/app/lib/prisma.ts)
import { PrismaClient } from '@prisma/client';

// Deklarasikan variabel global untuk menyimpan cache client
declare global {
  var prisma: PrismaClient | undefined;
}

// Gunakan cache global di development, atau buat instance baru di production
export const db =
  global.prisma ||
  new PrismaClient({
    // Opsi untuk melihat log query SQL (berguna saat debugging)
    // log: ['query', 'info', 'warn', 'error'],
  });

// Simpan instance ke cache global di development
if (process.env.NODE_ENV !== 'production') {
  global.prisma = db;
}