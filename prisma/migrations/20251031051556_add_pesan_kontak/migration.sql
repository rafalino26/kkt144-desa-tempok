-- CreateTable
CREATE TABLE "PesanKontak" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isiPesan" TEXT NOT NULL,
    "isDibaca" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PesanKontak_pkey" PRIMARY KEY ("id")
);
