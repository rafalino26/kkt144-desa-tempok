// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  // Hapus data lama jika ada (opsional, bagus untuk testing)
  await db.user.deleteMany({});

  // Buat 1 admin
  const hashedPassword = await bcrypt.hash('desatempok', 10); // Ganti 'admin123' dengan password amann

  await db.user.create({
    data: {
      email: 'desatempok@gmail.com', // Ganti dengan email admin
      nama: 'Admin Desa',
      passwordHash: hashedPassword,
    },
  });

  console.log('Database seeded with admin user!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });