'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Users, BookOpen, DollarSign } from 'lucide-react';

interface Kurs {
  id: number;
  baslik: string;
  aciklama: string;
  fiyat: number;
  resimUrl: string;
  olusturmaTarihi: string;
  ogrenciSayisi?: number;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [kurslar, setKurslar] = useState<Kurs[]>([]);
  const [istatistikler, setIstatistikler] = useState({
    toplamKurs: 0,
    toplamOgrenci: 0,
    toplamKazanc: 0,
  });

  useEffect(() => {
    // Kullanıcı kontrolü
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!user || !token) {
      router.push('/giris');
      return;
    }

    const userObj = JSON.parse(user);
    if (userObj.rol !== 'TEACHER') {
      router.push('/');
      return;
    }

    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await fetch('/api/egitmen/kurslar', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Kurslar alınamadı');
      }

      const data = await response.json();
      setKurslar(data);

      // İstatistikleri hesapla
      const toplamKurs = data.length;
      const toplamOgrenci = data.reduce((acc: number, kurs: Kurs) => acc + (kurs.ogrenciSayisi || 0), 0);
      const toplamKazanc = data.reduce((acc: number, kurs: Kurs) => acc + (kurs.fiyat * (kurs.ogrenciSayisi || 0)), 0);

      setIstatistikler({
        toplamKurs,
        toplamOgrenci,
        toplamKazanc,
      });
    } catch (error) {
      console.error('Kurs yükleme hatası:', error);
      setError('Kurslar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-grid-pattern py-8">
      <div className="container max-w-7xl">
        {/* Başlık ve Yeni Kurs Butonu */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Eğitmen Paneli</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Kurslarınızı yönetin ve istatistiklerinizi görüntüleyin
            </p>
          </div>

          <Link
            href="/egitmen/kurs-ekle"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kurs Ekle
          </Link>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Toplam Kurs */}
          <div className="bg-background rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam Kurs</p>
                <p className="text-2xl font-bold mt-1">{istatistikler.toplamKurs}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Toplam Öğrenci */}
          <div className="bg-background rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam Öğrenci</p>
                <p className="text-2xl font-bold mt-1">{istatistikler.toplamOgrenci}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Toplam Kazanç */}
          <div className="bg-background rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam Kazanç</p>
                <p className="text-2xl font-bold mt-1">₺{istatistikler.toplamKazanc.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Kurslar */}
        {error ? (
          <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        ) : kurslar.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Henüz kursunuz yok</h3>
            <p className="text-sm text-muted-foreground mt-1">
              İlk kursunuzu eklemek için "Yeni Kurs Ekle" butonuna tıklayın
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kurslar.map((kurs) => (
              <Link
                key={kurs.id}
                href={`/egitmen/kurslar/${kurs.id}`}
                className="group bg-background rounded-xl border overflow-hidden hover:border-primary transition-colors"
              >
                {/* Kurs Resmi */}
                <div className="relative w-full h-48">
                  {kurs.resimUrl ? (
                    <Image
                      src={kurs.resimUrl}
                      alt={kurs.baslik}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Kurs Bilgileri */}
                <div className="p-6">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {kurs.baslik}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {kurs.aciklama}
                  </p>

                  {/* Alt Bilgiler */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      {kurs.ogrenciSayisi || 0} Öğrenci
                    </div>
                    <p className="font-medium">₺{kurs.fiyat}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 