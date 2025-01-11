-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- CreateTable
CREATE TABLE "Urun" (
    "id" SERIAL NOT NULL,
    "isim" TEXT NOT NULL,
    "aciklama" TEXT NOT NULL,
    "fiyat" DOUBLE PRECISION NOT NULL,
    "resimUrl" TEXT,
    "kategori" TEXT NOT NULL,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Urun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Musteri" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT,
    "adres" TEXT,
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Musteri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Siparis" (
    "id" SERIAL NOT NULL,
    "musteriId" INTEGER NOT NULL,
    "toplamFiyat" DOUBLE PRECISION NOT NULL,
    "durum" TEXT NOT NULL DEFAULT 'beklemede',
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Siparis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiparisDetay" (
    "id" SERIAL NOT NULL,
    "siparisId" INTEGER NOT NULL,
    "urunId" INTEGER NOT NULL,
    "miktar" INTEGER NOT NULL,
    "fiyat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SiparisDetay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "sifre" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'STUDENT',
    "telefon" TEXT,
    "adres" TEXT,
    "resimUrl" TEXT,
    "biyografi" TEXT,
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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

    CONSTRAINT "kurslar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id" SERIAL NOT NULL,
    "isim" TEXT NOT NULL,
    "aciklama" TEXT,
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KursKayit" (
    "id" SERIAL NOT NULL,
    "kursId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "durum" TEXT NOT NULL DEFAULT 'aktif',
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KursKayit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ders" (
    "id" SERIAL NOT NULL,
    "baslik" TEXT NOT NULL,
    "icerik" TEXT NOT NULL,
    "videoUrl" TEXT,
    "sure" INTEGER NOT NULL,
    "kursId" INTEGER NOT NULL,
    "sira" INTEGER NOT NULL,
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ders_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "baslik" TEXT NOT NULL,
    "icerik" TEXT NOT NULL,
    "resimUrl" TEXT,
    "yazarId" INTEGER NOT NULL,
    "etiketler" TEXT,
    "olusturuldu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Musteri_email_key" ON "Musteri"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "kurslar_slug_key" ON "kurslar"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Ayarlar_anahtar_key" ON "Ayarlar"("anahtar");
