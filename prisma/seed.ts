// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Hapus semua data sebelumnya (opsional, bisa dihapus jika tidak perlu)
  await prisma.service.deleteMany();

  // Menambahkan data contoh
  await prisma.service.createMany({
    data: [
      {
        name: 'Service A',
        description: 'Description A',
        price: 100,
        capacity: 10,
      },
      {
        name: 'Service B',
        description: 'Description B',
        price: 200,
        capacity: 20,
      },
      {
        name: 'Service C',
        description: 'Description C',
        price: 300,
        capacity: 30,
      },
      {
        name: 'Service D',
        description: 'Description D',
        price: 400,
        capacity: 40,
      },
      {
        name: 'Service E',
        description: 'Description E',
        price: 500,
        capacity: 50,
      },
    ],
  });

  console.log('Seeder ran successfully!');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
