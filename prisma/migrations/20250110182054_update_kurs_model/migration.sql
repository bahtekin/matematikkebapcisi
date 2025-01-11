/*
  Warnings:

  - You are about to drop the column `hedefSinav` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sinif` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `curriculum` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `guncellendi` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `ogretmenId` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `olusturuldu` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `kurslar` table. All the data in the column will be lost.
  - You are about to drop the column `whatYouWillLearn` on the `kurslar` table. All the data in the column will be lost.
  - Added the required column `egitmenId` to the `kurslar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guncellenmeTarihi` to the `kurslar` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "kurslar_slug_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hedefSinav",
DROP COLUMN "sinif";

-- AlterTable
ALTER TABLE "kurslar" DROP COLUMN "curriculum",
DROP COLUMN "duration",
DROP COLUMN "guncellendi",
DROP COLUMN "ogretmenId",
DROP COLUMN "olusturuldu",
DROP COLUMN "rating",
DROP COLUMN "requirements",
DROP COLUMN "slug",
DROP COLUMN "tag",
DROP COLUMN "whatYouWillLearn",
ADD COLUMN     "egitmenId" INTEGER NOT NULL,
ADD COLUMN     "guncellenmeTarihi" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "olusturmaTarihi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "examType" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE INDEX "kurslar_egitmenId_idx" ON "kurslar"("egitmenId");

-- CreateIndex
CREATE INDEX "kurslar_kategoriId_idx" ON "kurslar"("kategoriId");
