'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LineChart, Mail, MonitorPlay, Atom, Star } from 'lucide-react';

interface Kategori {
  id: number;
  isim: string;
  _count: {
    kurslar: number;
  };
}

// Kategori ikonları için yardımcı fonksiyon
const getKategoriIcon = (isim: string) => {
  const icons = {
    'Matematik': MonitorPlay,
    'Türkçe': Mail,
    'Geometri': LineChart,
    'Fizik': Atom,
  };

  return icons[isim as keyof typeof icons] || MonitorPlay;
};

export default function BrowseCategories() {
  const [kategoriler, setKategoriler] = useState<Kategori[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKategoriler = async () => {
      try {
        const response = await fetch('/api/kategoriler');
        if (!response.ok) throw new Error('Kategoriler yüklenirken bir hata oluştu');
        const data = await response.json();
        setKategoriler(data);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
        setError(error instanceof Error ? error.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchKategoriler();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sol taraf loading */}
            <div className="lg:w-1/3 space-y-4">
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            {/* Sağ taraf loading */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 animate-pulse shadow-lg">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4" />
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sol taraf - Bilgi */}
          <div className="lg:w-1/3 lg:sticky lg:top-8 lg:self-start">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1">
                <p className="text-sm text-blue-600 font-medium">Kategorilere Göz At</p>
              </div>
              <h2 className="text-3xl font-bold">
                Kategorilere Göre <span className="text-blue-600">Keşfet</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                İhtiyacın olan tüm dersler kategorilere ayrılmış şekilde seni bekliyor. Her kategori özenle hazırlanmış içerikler ve uzman eğitmenler tarafından oluşturulmuş dersler içerir.
              </p>
              <div className="pt-4">
                <Link
                  href="/kurslar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  TÜM KATEGORİLERİ GÖR
                </Link>
              </div>
            </div>
          </div>

          {/* Sağ taraf - Kategori Kartları */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kategoriler.map((kategori) => {
                const Icon = getKategoriIcon(kategori.isim);
                return (
                  <Link
                    key={kategori.id}
                    href={`/kategoriler/${kategori.isim.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-6 overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-2">
                        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {kategori.isim}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {kategori._count.kurslar} Kurs
                      </p>
                    </div>
                    
                    {/* Dekoratif elementler */}
                    <div className="absolute right-4 top-4">
                      <Star className="w-6 h-6 text-pink-200 dark:text-pink-900/20" />
                    </div>
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 rounded-tl-full transform translate-x-8 translate-y-8 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 