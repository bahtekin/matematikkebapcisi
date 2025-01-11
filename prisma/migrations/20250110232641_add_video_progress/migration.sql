/*
  Warnings:

  - You are about to drop the column `slug` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `aciklama` on the `Ders` table. All the data in the column will be lost.
  - You are about to drop the column `resimUrl` on the `Kategori` table. All the data in the column will be lost.
  - The `rol` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `DersTamamlama` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kurs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `icerik` to the `Ders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sure` on the `Ders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_yazarId_fkey";

-- DropForeignKey
ALTER TABLE "Ders" DROP CONSTRAINT "Ders_kursId_fkey";

-- DropForeignKey
ALTER TABLE "DersTamamlama" DROP CONSTRAINT "DersTamamlama_dersId_fkey";

-- DropForeignKey
ALTER TABLE "DersTamamlama" DROP CONSTRAINT "DersTamamlama_userId_fkey";

-- DropForeignKey
ALTER TABLE "Kurs" DROP CONSTRAINT "Kurs_kategoriId_fkey";

-- DropForeignKey
ALTER TABLE "Kurs" DROP CONSTRAINT "Kurs_ogretmenId_fkey";

-- DropForeignKey
ALTER TABLE "KursKayit" DROP CONSTRAINT "KursKayit_kursId_fkey";

-- DropForeignKey
ALTER TABLE "KursKayit" DROP CONSTRAINT "KursKayit_userId_fkey";

-- DropForeignKey
ALTER TABLE "Siparis" DROP CONSTRAINT "Siparis_musteriId_fkey";

-- DropForeignKey
ALTER TABLE "SiparisDetay" DROP CONSTRAINT "SiparisDetay_siparisId_fkey";

-- DropForeignKey
ALTER TABLE "SiparisDetay" DROP CONSTRAINT "SiparisDetay_urunId_fkey";

-- DropIndex
DROP INDEX "Blog_slug_key";

-- DropIndex
DROP INDEX "Blog_yazarId_idx";

-- DropIndex
DROP INDEX "Ders_kursId_idx";

-- DropIndex
DROP INDEX "KursKayit_kursId_idx";

-- DropIndex
DROP INDEX "KursKayit_kursId_userId_key";

-- DropIndex
DROP INDEX "KursKayit_userId_idx";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Ders" DROP COLUMN "aciklama",
ADD COLUMN     "icerik" TEXT NOT NULL,
ALTER COLUMN "videoUrl" DROP NOT NULL,
DROP COLUMN "sure",
ADD COLUMN     "sure" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Kategori" DROP COLUMN "resimUrl";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adres" TEXT,
DROP COLUMN "rol",
ADD COLUMN     "rol" "Role" NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "DersTamamlama";

-- DropTable
DROP TABLE "Kurs";

-- CreateTable
CREATE TABLE "kurslar" (
    "id" SERIAL NOT NULL,
    "baslik" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "aciklama" TEXT NOT NULL,
    "fiyat" DOUBLE PRECISION NOT NULL,
    "resimUrl" TEXT,
    "tag" TEXT,
    "duration" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,
    "kategoriId" INTEGER NOT NULL,
    "ogretmenId" INTEGER NOT NULL,
    "whatYouWillLearn" JSONB DEFAULT '[]',
    "requirements" JSONB DEFAULT '[]',
    "curriculum" JSONB DEFAULT '[]',
    "videoUrl" TEXT,
    "kaynaklar" JSONB DEFAULT '[]',

    CONSTRAINT "kurslar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ayarlar" (
    "id" SERIAL NOT NULL,
    "anahtar" TEXT NOT NULL,
    "deger" TEXT NOT NULL,
    "aciklama" TEXT,
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ayarlar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoIlerleme" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "tamamlandi" BOOLEAN NOT NULL DEFAULT false,
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoIlerleme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kurslar_slug_key" ON "kurslar"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Ayarlar_anahtar_key" ON "Ayarlar"("anahtar");

-- CreateIndex
CREATE INDEX "VideoIlerleme_userId_idx" ON "VideoIlerleme"("userId");

-- CreateIndex
CREATE INDEX "VideoIlerleme_videoId_idx" ON "VideoIlerleme"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoIlerleme_userId_videoId_key" ON "VideoIlerleme"("userId", "videoId");
