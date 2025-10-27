import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  await db.user.deleteMany({});

  const hashedPassword = await bcrypt.hash('desatempok', 10); 

  await db.user.create({
    data: {
      email: 'desatempok@gmail.com', 
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