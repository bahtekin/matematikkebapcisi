/*
  Warnings:

  - You are about to drop the column `egitmenId` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `guncellenmeTarihi` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `olusturmaTarihi` on the `kurslar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `kurslar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guncellendi` to the `kurslar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ogretmenId` to the `kurslar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `kurslar` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "kurslar_egitmenId_idx";

-- DropIndex
DROP INDEX "kurslar_kategoriId_idx";

-- AlterTable
ALTER TABLE "kurslar" DROP COLUMN "egitmenId",
DROP COLUMN "guncellenmeTarihi",
DROP COLUMN "olusturmaTarihi",
ADD COLUMN     "curriculum" JSONB DEFAULT '[]',
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "guncellendi" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ogretmenId" INTEGER NOT NULL,
ADD COLUMN     "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
ADD COLUMN     "requirements" JSONB DEFAULT '[]',
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT,
ADD COLUMN     "whatYouWillLearn" JSONB DEFAULT '[]';

-- CreateIndex
CREATE UNIQUE INDEX "kurslar_slug_key" ON "kurslar"("slug");
