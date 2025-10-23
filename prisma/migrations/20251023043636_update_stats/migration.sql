/*
  Warnings:

  - You are about to drop the column `jumlahUMKM` on the `Statistik` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Statistik" DROP COLUMN "jumlahUMKM",
ADD COLUMN     "jumlahDusun" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "jumlahKK" INTEGER NOT NULL DEFAULT 0;
