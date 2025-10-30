/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `ProfesiSnapshot` table. All the data in the column will be lost.
  - You are about to drop the `ProfesiItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "ProfesiSnapshot" DROP COLUMN "updatedAt",
ADD COLUMN     "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "items" JSONB;

-- DropTable
DROP TABLE "public"."ProfesiItem";

-- CreateTable
CREATE TABLE "ProfilHero" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfilHero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilIdentitas" (
    "id" TEXT NOT NULL,
    "namaDesa" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kodePos" TEXT,
    "kodeKemendagri" TEXT,
    "koordinat" TEXT,
    "kepalaDesa" TEXT,
    "catatan" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfilIdentitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilVisiMisi" (
    "id" TEXT NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfilVisiMisi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilSejarah" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfilSejarah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilGeografis" (
    "id" TEXT NOT NULL,
    "deskripsiLokasi" TEXT NOT NULL,
    "batasUtara" TEXT,
    "batasTimur" TEXT,
    "batasSelatan" TEXT,
    "batasBarat" TEXT,
    "googleMapsUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfilGeografis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilPerangkatDesa" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfilPerangkatDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilSosialEkonomi" (
    "id" TEXT NOT NULL,
    "ringkasan" TEXT NOT NULL,
    "mataPencaharian" TEXT,
    "sektorPendukung" TEXT,
    "catatan" TEXT,
    "jumlahPendudukTekstual" TEXT,
    "catatanPenduduk" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfilSosialEkonomi_pkey" PRIMARY KEY ("id")
);
