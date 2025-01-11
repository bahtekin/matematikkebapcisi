/*
  Warnings:

  - You are about to drop the column `icerik` on the `Ders` table. All the data in the column will be lost.
  - You are about to drop the column `adres` on the `User` table. All the data in the column will be lost.
  - The `rol` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Ayarlar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kurslar` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kursId,userId]` on the table `KursKayit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Made the column `videoUrl` on table `Ders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ders" DROP COLUMN "icerik",
ADD COLUMN     "aciklama" TEXT,
ALTER COLUMN "videoUrl" SET NOT NULL,
ALTER COLUMN "sure" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Kategori" ADD COLUMN     "resimUrl" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "adres",
DROP COLUMN "rol",
ADD COLUMN     "rol" TEXT NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "Ayarlar";

-- DropTable
DROP TABLE "kurslar";

-- CreateTable
CREATE TABLE "Kurs" (
    "id" SERIAL NOT NULL,
    "baslik" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "aciklama" TEXT NOT NULL,
    "resimUrl" TEXT,
    "fiyat" DOUBLE PRECISION NOT NULL,
    "tag" TEXT,
    "duration" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "kategoriId" INTEGER NOT NULL,
    "ogretmenId" INTEGER NOT NULL,
    "whatYouWillLearn" JSONB,
    "requirements" JSONB,
    "curriculum" JSONB,
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DersTamamlama" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dersId" INTEGER NOT NULL,
    "tamamlanmaTarihi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DersTamamlama_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kurs_slug_key" ON "Kurs"("slug");

-- CreateIndex
CREATE INDEX "Kurs_kategoriId_idx" ON "Kurs"("kategoriId");

-- CreateIndex
CREATE INDEX "Kurs_ogretmenId_idx" ON "Kurs"("ogretmenId");

-- CreateIndex
CREATE INDEX "DersTamamlama_userId_idx" ON "DersTamamlama"("userId");

-- CreateIndex
CREATE INDEX "DersTamamlama_dersId_idx" ON "DersTamamlama"("dersId");

-- CreateIndex
CREATE UNIQUE INDEX "DersTamamlama_userId_dersId_key" ON "DersTamamlama"("userId", "dersId");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE INDEX "Blog_yazarId_idx" ON "Blog"("yazarId");

-- CreateIndex
CREATE INDEX "Ders_kursId_idx" ON "Ders"("kursId");

-- CreateIndex
CREATE INDEX "KursKayit_kursId_idx" ON "KursKayit"("kursId");

-- CreateIndex
CREATE INDEX "KursKayit_userId_idx" ON "KursKayit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "KursKayit_kursId_userId_key" ON "KursKayit"("kursId", "userId");

-- AddForeignKey
ALTER TABLE "Siparis" ADD CONSTRAINT "Siparis_musteriId_fkey" FOREIGN KEY ("musteriId") REFERENCES "Musteri"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiparisDetay" ADD CONSTRAINT "SiparisDetay_siparisId_fkey" FOREIGN KEY ("siparisId") REFERENCES "Siparis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiparisDetay" ADD CONSTRAINT "SiparisDetay_urunId_fkey" FOREIGN KEY ("urunId") REFERENCES "Urun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kurs" ADD CONSTRAINT "Kurs_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kurs" ADD CONSTRAINT "Kurs_ogretmenId_fkey" FOREIGN KEY ("ogretmenId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KursKayit" ADD CONSTRAINT "KursKayit_kursId_fkey" FOREIGN KEY ("kursId") REFERENCES "Kurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KursKayit" ADD CONSTRAINT "KursKayit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ders" ADD CONSTRAINT "Ders_kursId_fkey" FOREIGN KEY ("kursId") REFERENCES "Kurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DersTamamlama" ADD CONSTRAINT "DersTamamlama_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DersTamamlama" ADD CONSTRAINT "DersTamamlama_dersId_fkey" FOREIGN KEY ("dersId") REFERENCES "Ders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_yazarId_fkey" FOREIGN KEY ("yazarId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
