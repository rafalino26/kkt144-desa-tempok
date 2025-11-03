-- CreateTable
CREATE TABLE "InformasiKontak" (
    "id" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jam" TEXT NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InformasiKontak_pkey" PRIMARY KEY ("id")
);
