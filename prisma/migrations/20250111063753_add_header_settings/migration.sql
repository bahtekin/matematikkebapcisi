/*
  Warnings:

  - You are about to drop the `VideoIlerleme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "VideoIlerleme";

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "siteDescription" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "address" TEXT,
    "socialMedia" JSONB NOT NULL,
    "smtp" JSONB NOT NULL,
    "header" JSONB NOT NULL DEFAULT '{"logo": "", "menuBackground": "", "menuTextColor": "", "isSticky": true}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
